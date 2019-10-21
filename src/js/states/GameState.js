/**
 * ==================================================================================
 * Holds all game state
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';
import { EVENTBUS } from '../EventBus.js';
import { LOGGER } from '../libs/Logger.js';

class GameState {

    constructor() {
        this.isStartGame = false;
        this.isSpawning = false;
        this.isPaused = false;

        this.isDetecting = false;
        this.hasDetection = false;

        this.round = {
            startTime: null,
            endTime: null,
            score: 0
        };



        this.bindEvents();
    }



    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Toggle state of `isDetecting` state
     */
    detecting(bool = true) {
    	this.isDetecting = bool;
    }

    /**
     * Toggle state of `isStartGame` state
     */
    gameStart(bool = true) {
        this.isStartGame = bool;


        if(bool) {
            this.setCurrStartTime();
        } else {
            this.setCurrEndTime();
            this.paused(false);
        }
    }

    /**
     * Toggle state of `isPaused` state
     */
    paused(bool = true) {
        this.isPaused = bool;
    }

    /**
     * Toggle state of `isSpawning` state
     */
    spawning(bool = true) {
        this.isSpawning = bool;
    }

    /**
     * Add value to score
     * @param {int} value
     */
    addScore(value) {
        this.round.score += parseInt(value);
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    bindEvents() {
        EVENTBUS.register('onStartGame', () => { this.gameStart(); });
        EVENTBUS.register('onPauseGame', (value) => { this.paused(value); });
        EVENTBUS.register('onEndGame', () => { this.gameStart(false); });

        EVENTBUS.register('onHasDetection', () => { this.hasDetection = true });
        EVENTBUS.register('onDetecting', (value) => { this.detecting(value); });

        EVENTBUS.register('onSpawnEnable', (value) => { this.spawning(value); });


        EVENTBUS.register('hasScored', (value) => { this.addScore(value); });
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get current round score
     * @return {Integer}
     */
    getCurrScore() {
        return this.round.score;
    }

    /**
     * Set current round start or end time
     * @param {Date} date
     */
    setCurrStartTime(date = null) {
        let start = date ? date : new Date();
        this.round.startTime = start;
    }

    setCurrEndTime(date = null) {
        let end = date ? date : new Date();
        this.round.endTime = end;
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Check if stage/round is on play
     * @return {Boolean}
     */
    isPlaying() {
        if(this.isStartGame && !this.isPaused)
            return true;

        return false;
    }
}



export const GAMESTATE = new GameState();
export default GAMESTATE;