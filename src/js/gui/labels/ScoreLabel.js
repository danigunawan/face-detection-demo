/**
 * ==================================================================================
 * Face Score label element
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../../Global.js';
import { EVENTBUS } from '../../EventBus.js';
import { LOGGER } from '../../libs/Logger.js';
import { UTILS } from '../../libs/Utils.js';

import { SCORELABELATTR } from '../../attributes/gui/ScoreLabelAttr.js';
import { GAMESTATE } from '../../states/GameState.js';

import Label from './Label.js';

export default class ScoreLabel extends Label {

    constructor() {
        super(SCORELABELATTR.id);

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
    	this.setupLabels();


    	this.bindEvents();
    }

   	/**
   	 * Setup labels
   	 */
    setupLabels() {
        this.scoreLabel = UTILS.getElementByClass(SCORELABELATTR.scoreClassName);
        // this.combo = UTILS.getElementByClass(SCORELABELATTR.comboClassName);
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    bindEvents() {
        EVENTBUS.register('hasScored', () => { this.updateScore(); });
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Update score label
     */
    updateScore() {
        this.scoreLabel.innerHTML = GAMESTATE.getCurrScore();
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    log(message) {
        LOGGER.log("ScoreLabel.js | " + message, GLOBAL.findLogLevel('elements'));
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    //


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