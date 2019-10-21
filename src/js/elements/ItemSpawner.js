/**
 * ==================================================================================
 * Item element spawner
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';
import { EVENTBUS } from '../EventBus.js';
import { LOGGER } from '../libs/Logger.js';
import { UTILS } from '../libs/Utils.js';

import { ITEMSPAWNERATTR } from '../attributes/elements/ItemSpawnerAttr.js';
import { ITEMATTR } from '../attributes/elements/ItemAttr.js';
import { USERATTR } from '../attributes/elements/UserAttr.js';
import { GAMESTATE } from '../states/GameState.js';

import Math2 from '../libs/Math2.js';
import Vector2 from '../libs/Vector2.js';
import Item from './Item.js';
import Element from './Element.js';

export default class ItemSpawner extends Element {

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
    	this.items = [];
        this.lastSpawnType = null;

        this.delta = 0;
        this.interval = 0;


    	this.bindEvents();
    }

    /**
     * Overrided function from `Element`
     */
    setupCanvasVars() {
        this.spawnCoords = ITEMSPAWNERATTR.getSpawnCoordinates(this.canvas);
    }


    /**
     * Create `Item` element
     */
    createItem() {
        let item = new Item(this.canvas, this.context,
                        this.getSpawnLocation(),
                        this.getSpawnSpeed(),
                        this.getSpawnDirection()
                    );

        this.items.push(item);
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    bindEvents() {
    	EVENTBUS.register('onStartGame', () => { this.enable(); });
        EVENTBUS.register('onPauseGame', () => { this.enable(false); });
        EVENTBUS.register('onEndGame', () => { this.enable(false); });
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Enable/Disable the `spawner`
     * @param {boolean} bool
     */
    enable(bool = true) {
        this.createItem();

        EVENTBUS.emit('onSpawnEnable', bool);
    }

    /**
     * Spawn a `Item` element
     */
    spawn(delta) {
        let spawn = false;

        /* If no `Items` remain */
        if(!this.hasItems())
            spawn = true;

        /* If spawn timer reaches the required time */
        this.delta += delta;
        this.interval = this.getSpawnInterval();
        if(this.delta > this.interval)
            spawn = true;


        /* Spawn if conditions are met */
        if(spawn) {
            this.createItem();

            this.delta = 0;
        }
    }


    update(delta) {
        if(GAMESTATE.isPlaying()) {

            /* Update or remove dead `Item` elements */
            for(var i = 0; i < this.items.length; i++) {
                let item = this.items[i];
                if(item.isDead()) {
                    this.items.splice(i, 1);
                } else {
                    item.update();
                }
            }


            if(GAMESTATE.isSpawning)
                this.spawn(delta);
        }
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    draw() {
        if(GAMESTATE.isPlaying()) {
            UTILS.runCollection(this.items, 'draw');
        }
    }


    log(message) {
        LOGGER.log("ItemSpawner.js | " + message, GLOBAL.findLogLevel('elements'));
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get spawn location
     * @return {Vector2}
     */
    getSpawnLocation() {
        return new Vector2(
                    Math2.randomInt(this.spawnCoords.minX, this.spawnCoords.maxX, false),
                    Math2.randomInt(this.spawnCoords.minY, this.spawnCoords.maxY, false)
                );
    }

    /**
     * Get spawn speed
     * @return {Vector2}
     */
    getSpawnSpeed() {
        return Math2.randomInt(ITEMSPAWNERATTR.itemSpeedMin, ITEMSPAWNERATTR.itemSpeedMax, false);
    }

    /**
     * Get spawn direction
     * @return {Vector2}
     */
    getSpawnDirection() {
        return Math2.randomInt(ITEMSPAWNERATTR.itemDirectionMin, ITEMSPAWNERATTR.itemDirectionMax, false);
    }

    /**
     * Get spawn interval depending on the current score
     * @return {Integer}
     */
    getSpawnInterval() {
        let currScore = GAMESTATE.getCurrScore(),
            interval = 0;

        /* Set cap for minimum interval */
        interval = ITEMSPAWNERATTR.interval - (currScore);
        if(interval < ITEMSPAWNERATTR.minInterval)
            interval = ITEMSPAWNERATTR.minInterval;

        return interval;
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Check if there are still enabled elements
     * @return {Boolean}
     */
    hasItems() {
        if(!this.items.length) return false;

        /* Check if no enabled */
        for(var i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if(item.active)
                return true;
        }

        return false;
    }




    /**
     * ==================================================================================
     * @DEVELOPMENT
     * ==================================================================================
     **/

    //
}
