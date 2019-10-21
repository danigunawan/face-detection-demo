/**
 * ==================================================================================
 * Face Detection label element
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../../Global.js';
import { EVENTBUS } from '../../EventBus.js';
import { LOGGER } from '../../libs/Logger.js';
import { UTILS } from '../../libs/Utils.js';

import { DETECTLABELATTR } from '../../attributes/gui/DetectLabelAttr.js';

import Label from './Label.js';

export default class DetectLabel extends Label {

    constructor() {
        super(DETECTLABELATTR.id);

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
        //

    	this.bindEvents();
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    bindEvents() {
    	EVENTBUS.register('onDetecting', (value) => { this.onDetecting(value) });
    }

    /**
     * On face detection
     * @param {boolean} value
     */
    onDetecting(value) {
    	if(value) {
    		this.detected();
    	} else {
			this.notDetected();
    	}
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Add detected or not detected class to the main label panel
     */
    detected() {
    	this.setClassname(
            DETECTLABELATTR.detectedClass,
            DETECTLABELATTR.notDetectedClass
        );
    }

    notDetected() {
    	this.setClassname(
            DETECTLABELATTR.notDetectedClass,
            DETECTLABELATTR.detectedClass
        );
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    log(message) {
        LOGGER.log("DetectLabel.js | " + message, GLOBAL.findLogLevel('elements'));
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Set classes to the main panel
     * @param {string} add
     * @param {string} remove
     */
    setClassname(add, remove) {
    	this.panel.classList.remove(remove);
    	this.panel.classList.add(add);
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