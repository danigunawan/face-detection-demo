/**
 * ==================================================================================
 * Manages all GUI objects/elements
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';
import { EVENTBUS } from '../EventBus.js';
import { LOGGER } from '../libs/Logger.js';
import { UTILS } from '../libs/Utils.js';

import { GAMESTATE } from '../states/GameState.js';
import { MENUATTR } from '../attributes/gui/MenuAttr.js';

import LoadingLabel from './labels/LoadingLabel.js';
import DetectLabel from './labels/DetectLabel.js';
import ScoreLabel from './labels/ScoreLabel.js';
import StartMenu from './menus/StartMenu.js';

export default class GUIManager {

    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;


        this.init();
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
        this.labels = [];
        this.menus = [];


        this.buildElements();

        this.bindEvents();

        this.show(this.labels, [this.loadingLabel]);
    }

    /**
     * Create elements
     */
    buildElements() {
        /* Create HTML labels */
        this.loadingLabel = this.addLabel(new LoadingLabel());
        this.detectLabel = this.addLabel(new DetectLabel());
        this.scoreLabel = this.addLabel(new ScoreLabel());
        /* Create HTML menus */
        this.startMenu = this.addMenu(new StartMenu());

        /* Create Canvas menus */
        //
    }


    /**
     * Add HTML label or menu elements to collection
     * @param {object} label
     */
    addLabel(label) {   return this.addToCollection(this.labels, label); }
    addMenu(menu) {     return this.addToCollection(this.menus, menu); }

    /**
     * Add to collection
     * @param  {array}  arr
     * @param  {object} obj
     * @return {Object}
     */
    addToCollection(arr, obj) {
        arr.push(obj);
        return obj;
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    bindEvents() {
    	EVENTBUS.register('onHasDetection', () => { this.onHasDetection(); });
        EVENTBUS.register('onStartGame', () => { this.onStartGame(); });
    }

    /**
     * On when face detection finished loading
     */
    onHasDetection() {
        this.show(this.labels, []);
        this.show(this.menus, [
                this.startMenu
            ]);
    }

    /**
     * On game start
     */
    onStartGame() {
        this.show(this.menus, []);
        this.show(this.labels, [
                this.expressionLabel,
                this.detectLabel,
                this.scoreLabel,
            ]);
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Run `show`/`hode` on specified collection
     * @param {Array}  collection
     * @param {Array}  objs
     */
    show(collection, objs) {
        for(var i = 0; i < collection.length; i++) {
            let currObj = collection[i];

            if(UTILS.hasObject(objs, currObj)) {
                currObj.show();
            } else {
                currObj.hide();
            }
        }
    }

    /**
     * Minimize/Maximize the main panel
     */
    minimize() {
        UTILS.runCollection(this.menus, 'minimize');
        UTILS.runCollection(this.labels, 'minimize');
    }

    maximize() {
        UTILS.runCollection(this.menus, 'maximize');
        UTILS.runCollection(this.labels, 'maximize');
    }


    update() {
        //
    }


    /**
     * ==================================================================================
     * @Renderers
     * ==================================================================================
     **/

    draw() {
        //
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    //




    /**
     * ==================================================================================
     * @DEVELOPMENT
     * ==================================================================================
     **/

    //
}