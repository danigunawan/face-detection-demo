/**
 * ==================================================================================
 * User element
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';
import { EVENTBUS } from '../EventBus.js';
import { LOGGER } from '../libs/Logger.js';

import { USERATTR } from '../attributes/elements/UserAttr.js';

import { Tween } from '../libs/Tween.js';
import Vector2 from '../libs/Vector2.js';
import Element from './Element.js';

export default class User extends Element {

    constructor(canvas, context) {
        super();

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
     * Initial setup
     */
    init() {
        this.resetCoordinates();

        this.duration = USERATTR.moveDuration;

    	this.bindEvents();
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    bindEvents() {
    	EVENTBUS.register('onFaceDetect', (value) => { this.onFaceDetect(value); });
    }

    /**
     * On face detection
     * @return {Detections} detection
     */
    onFaceDetect(detection) {
        if(detection) {
            this.setCoordinates(detection);
        } else {
            this.reset();
        }
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Start the movement animation
     */
    move() {
        this.updateCoordinates(this.currMouth, this.goalMouth);
    }

    /**
     * Reset all coordinates
     */
    resetCoordinates() {
        this.currMouth = [];
        this.goalMouth = [];
    }


    /**
     * Update all part coordinates
     * @param {arr} curr
     * @param {arr} goal
     */
    updateCoordinates(curr, goal) {
        for(var i = 0; i < curr.length; i++) {
            let currCoord = curr[i],
                goalCoord = goal[i];

            /* Update axes */
            new Tween(currCoord, {
                        x: goalCoord.x,
                        y: goalCoord.y
                    },
                    this.duration,
                    Tween.easeOutQuad
                );
        }
    }

    update() {
        //
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    /**
     * Draw the polygon
     * @param {array} coordinates
     */
    drawPoly(coordinates) {
        if(coordinates.length == 0) return;

        this.context.save();


        this.context.fillStyle = "white";
        this.context.beginPath();
        for(var i = 0; i < coordinates.length; i++) {
            let point = coordinates[i],
                x = point.x, y = point.y;

            if(i == 0) {
                this.context.moveTo(x, y);
            } else {
                this.context.lineTo(x, y);
            }
        }
        this.context.closePath();
        this.context.fill();


        this.context.restore();
    }

    draw() {
        this.drawPoly(this.currMouth);
    }


    log(message) {
        LOGGER.log("User.js | " + message, GLOBAL.findLogLevel('elements'));
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get inner mouth coordinates
     * @return {Array}
     */
    getInnerMouth() {
        if(!this.currMouth.length) return [];

        return this.currMouth.slice(12, 20)
    }

    /**
     * Set face coordinates
     * @param {Detection} detection
     */
    setCoordinates(detection) {
        /* Re-align points base on the canvas size */
        let resizedDetections = faceapi.resizeResults(detection, this.getCanvasSize());

        /* Set landmarks */
        if(resizedDetections.landmarks)
            this.setLandmarks(resizedDetections.landmarks);
    }

    /**
     * Set face part landmark coordinates
     * Mouth Coordinates:
     *
     *           02      04
     *      01       03       05
     *           13  14  15
     * 00 12                    16 06
     *           19  18  17
     *      11                07
     *           10  09  08
     *
     * @param {Landmarks} landmarks
     */
    setLandmarks(landmarks) {
        this.setPartCoordinates('goalMouth', 'currMouth', landmarks.getMouth());
        // this.setPartCoordinates('goalLeftEyeBrow', 'currLeftEyeBrow', landmarks.getLeftEyeBrow());
        // this.setPartCoordinates('goalRightEyeBrow', 'currRightEyeBrow', landmarks.getRightEyeBrow());
        // this.setPartCoordinates('goalLeftEye', 'currLeftEye', landmarks.getLeftEye());
        // this.setPartCoordinates('goalRightEye', 'currRightEye', landmarks.getRightEye());
        // this.setPartCoordinates('goalNose', 'currNose', landmarks.getNose());
        // this.setPartCoordinates('goalJaw', 'currJaw', landmarks.getJawOutline());


        this.move();
    }

    /**
     * Set part coordinates
     * @param {string} newVar
     * @param {string} oldVar
     * @param {array}  collection
     */
    setPartCoordinates(newVar, oldVar, collection) {

        /**
         * @DEVELOPMENT: Change the fetching of values when
         * debug mouse is enabled
         */

        if(GLOBAL.showMouse()) {

            this[newVar] = collection;

        } else {

            this[newVar] = this.getVector2FromPoint(collection);
        }


        /* Copy coordinates to current initially */
        if(this[oldVar].length == 0)
            this[oldVar] = this[newVar];
    }

    /**
     * Get Vector2 axes from array of `Point` element
     * @param  {Array}   arr
     * @return {Vector2}
     */
    getVector2FromPoint(arr) {
        let result = [];
        for(var i = 0; i < arr.length; i++) {
            let point = arr[i];
            result.push(new Vector2(point.x, point.y));
        }

        return result;
    }

    /**
     * Get `canvas` current width & height
     * @return {Object}
     */
    getCanvasSize() {
        return {
            width: this.canvas.width,
            height: this.canvas.height,
        };
    }


    /**
     * ==================================================================================
     * @Checker
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
