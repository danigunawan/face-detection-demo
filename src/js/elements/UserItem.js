/**
 * ==================================================================================
 * Handles all User & Item Spawner interaction
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';
import { EVENTBUS } from '../EventBus.js';
import { LOGGER } from '../libs/Logger.js';
import { UTILS } from '../libs/Utils.js';

import { USERITEMATTR } from '../attributes/elements/UserItemAttr.js';
import { ITEMATTR } from '../attributes/elements/ItemAttr.js';
import { ITEMSPAWNERATTR } from '../attributes/elements/ItemSpawnerAttr.js';

import { GAMESTATE } from '../states/GameState.js';

import Math2 from '../libs/Math2.js';
import Vector2 from '../libs/Vector2.js';
import Element from './Element.js';
import Item from './Item.js';


export default class UserItem extends Element {

    constructor(canvas, context, user, itemSpawner, particleSpawner) {
        super();

    	this.canvas = canvas;
    	this.context = context;
    	this.user = user;
        this.itemSpawner = itemSpawner;
        this.particleSpawner = particleSpawner;


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
        this.particles = [];


    	this.bindEvents();
    }

    /**
     * Overrided function from `Element`
     */
    setupCanvasVars() {
        //
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
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

    /**
     * Toggle `Item` element as a match to the current expression
     * @param  {Item} item
     */
    collided(item) {
        /* Toggle `Item` element */
        item.toggle();

        /* Create particle on `Item` */
        for(var i = 0; i < 5; i++) {
            this.particleSpawner.spawn(item.position);
        }


        /* Add score */
        EVENTBUS.emit('hasScored', 200);
    }


    update() {
        if(GAMESTATE.isPlaying()) {

            /* Handle interaction w/ the active `Item` elements */
            for(var i = 0; i < this.itemSpawner.items.length; i++) {
                let item = this.itemSpawner.items[i];

                /* Check for collision */
                if(item.active && this.isCollision(item))
                    this.collided(item);
            }


            UTILS.runCollection(this.particles, 'update');
        }
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    draw() {
        if(GAMESTATE.isPlaying()) {
            UTILS.runCollection(this.particles, 'draw');
        }
    }


    log(message) {
        LOGGER.log("UserItem.js | " + message, GLOBAL.findLogLevel('elements'));
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

    /**
     * Check if `Item` is in collision
     * @param  {Item}     item
     * @return {Boolean}
     */
    isCollision(item) {
        let mouth = this.user.getInnerMouth(),
            hexa = item.points;

        /* Check for line intersection on each line segment */
        for(var i = 0; i < hexa.length; i++) {
            let segment1 = UTILS.getLoopIteration(hexa, i);

            for(var o = 0; o < mouth.length; o++) {
                let segment2 = UTILS.getLoopIteration(mouth, o);

                if(Math2.isLineIntersecting(segment1.curr, segment1.next, segment2.curr, segment2.next))
                    return true;
            }
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
