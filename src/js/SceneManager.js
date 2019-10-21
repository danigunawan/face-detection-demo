/**
 * ==================================================================================
 * Manages all scene objects/elements
 *
 * ==================================================================================
 **/

import { GLOBAL } from './Global.js';
import { EVENTBUS } from './EventBus.js';
import { LOGGER } from './libs/Logger.js';
import { UTILS } from './libs/Utils.js';

import { GAMESTATE } from './states/GameState.js';
import { GAMEATTR } from './attributes/GameAttr.js';
import { FACEDETECTATTR } from './attributes/elements/FaceDetectAttr.js';

import GUIManager from './gui/GUIManager.js';
import FaceDetect from './elements/FaceDetect.js';
import User from './elements/User.js';
import ItemSpawner from './elements/ItemSpawner.js';
import ParticleSpawner from './elements/ParticleSpawner.js';
import UserItem from './elements/UserItem.js';


export default class SceneManager {

    constructor(body, video, canvas) {
        this.body = body;
        this.video = video;
        this.canvas = canvas;
        this.context = this.getCanvasContext();


        this.init();


		this.reportDevTools();
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Initiate class
     */
    init() {
        this.elements = [];

        this.setupStates();
        this.setupStage();

        this.buildElements();

        this.bindEvents();

        this.render();
    }

    /**
     * Initialize states
     */
    setupStates() {
        //
    }

    /**
     * Initialze `stage` variables
     */
    setupStage() {
        this.fps = 60;
        this.time = {
            interval: 1000 / this.fps,
            lastTime: (new Date()).getTime(),
            currentTime: 0,
            delta: 0
        };


        //
    }


    /**
     * Create elements
     */
    buildElements() {
        /* Create managers */
        this.guiManager = this.addToElem(new GUIManager(this.canvas, this.context));

        /* Create elements */
    	this.faceDetect = this.addToElem(new FaceDetect(this.video, this.body));
        this.user = this.addToElem(new User(this.canvas, this.context));


        /* Create spawners */
        this.itemSpawner = this.addToElem(new ItemSpawner(this.canvas, this.context));
        this.particleSpawner = this.addToElem(new ParticleSpawner(this.canvas, this.context));


        /* Create interaction elements */
        this.userItem = this.addToElem(new UserItem(
                                                this.canvas, this.context, this.user,
                                                this.itemSpawner, this.particleSpawner
                                            )
                                        );
    }


    /**
     * Add to element collection
     * @param  {Object} obj
     * @return {Object}
     */
    addToElem(obj) {
        this.elements.push(obj);
        return obj;
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    bindEvents() {
        //
    }

    /**
     * Callback on window size changes
     */
    onWindowResize() {
        let height = this.body.offsetHeight,
            width = this.body.offsetWidth;


        this.canvas.width = width;
        this.canvas.height = height;


        /* Update elements on game screen small screen */
        if(width > GAMEATTR.minimizeWidth) {
            UTILS.runCollection(this.elements, 'minimize');
        } else {
            UTILS.runCollection(this.elements, 'maximize');
        }

        /* Update elements on screen changes */
        UTILS.runCollection(this.elements, 'onWindowResize', {width: width, height: height});
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    update(delta) {
        UTILS.runCollection(this.elements, 'update', delta);
    }


    /**
     * ==================================================================================
     * @Renderers
     * ==================================================================================
     **/

    /**
     * Clear all canvas context
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(delta) {
        UTILS.runCollection(this.elements, 'draw', delta);
    }


    /**
     * Canvas callback per tick
     */
    render() {
        /* Update timers */
        this.time.currentTime = (new Date()).getTime();
        this.time.delta = this.time.currentTime - this.time.lastTime;

        if(this.time.delta > this.time.interval) {

            this.clearCanvas();


            this.update(this.time.delta);
            this.draw(this.time.delta);


            this.time.lastTime = this.time.currentTime - (this.time.delta % this.time.interval);
        }


        requestAnimationFrame(() => {
            this.render();
        });
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get canvas context object
     * @return {Context}
     */
    getCanvasContext() {
        if(this.canvas)
            return this.canvas.getContext('2d');

        return null;
    }




    /**
     * ==================================================================================
     * @DEVELOPMENT
     * ==================================================================================
     **/

    /**
     * Render diff. app reports for debugging purposes
     * @return string
     */
    reportDevTools() {
        /* Events */
        if(LOGGER.canLog(GLOBAL.findLogLevel('events')))
            EVENTBUS.reportEvents();
    }
}