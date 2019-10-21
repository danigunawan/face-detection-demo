/**
 * ==================================================================================
 * Item element
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';
import { EVENTBUS } from '../EventBus.js';
import { LOGGER } from '../libs/Logger.js';

import { ITEMATTR } from '../attributes/elements/ItemAttr.js';
import { GAMESTATE } from '../states/GameState.js';

import Math2 from '../libs/Math2.js';
import Vector2 from '../libs/Vector2.js';
import Element from './Element.js';

export default class Item extends Element {

    constructor(canvas, context, position, speed, direction) {
        super();

    	this.canvas = canvas;
    	this.context = context;

    	this.setPosition(position);
        this.gravity = new Vector2(0, ITEMATTR.gravity);

        this.velocity = new Vector2(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);


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
        this.points = [];

        this.currAngle = 0;
        this.rotSpeed = Math2.randomInt(ITEMATTR.rotSpeedMin, ITEMATTR.rotSpeedMax, false);

        this.toggled = false;
        this.active = true;

        /* Run resize function initially */
        this.onWindowResize();


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
     * Toggling of diff. states
     */
    toggle(bool = true) {
        this.toggled = bool;
        this.active = !bool;
    }


    /**
     * Update angle rotation
     */
    updateRotation() {
        this.currAngle += this.rotSpeed;
    }

    update() {

        this.updateRotation();


        /* Add gravity to current velocity */
        this.velocity.addTo(this.gravity);

        /* Add velocity to current position */
        this.position.addTo(this.velocity);


        /* Update points */
        this.setPoints();
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    /**
     * Draw the polygon
     */
    drawPoly() {
        this.context.save();


        this.context.fillStyle = "white";
        this.context.translate(this.position.x, this.position.y);
        this.context.rotate(this.currAngle);

        this.context.beginPath();
        for(var i = 0; i < this.points.length; i++) {
            let point = this.points[i],
                x = this.position.x - point.x,
                y = this.position.y - point.y;

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
        if(this.toggled) return;

        this.drawPoly();
    }


    log(message) {
        LOGGER.log("Item.js | " + message, GLOBAL.findLogLevel('elements'));
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Set position and points
     * @param {Vector2} position
     */
    setPosition(position) {
        this.position = position;

        this.setPoints();
    }

    /**
     * Set polygon points
     */
    setPoints() {
        if(!this.points)
            this.points = [];

        for(var i = 0; i < ITEMATTR.sides; i++) {
            let angle = i * 2 * ITEMATTR.slice,
                x = this.position.x + Math.cos(angle) * ITEMATTR.radius,
                y = this.position.y + Math.sin(angle) * ITEMATTR.radius;

            this.points[i] = new Vector2(x, y);
        }
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Check if element is dead or enabled
     * @return {Boolean}
     */
    isDead() {
        /* If toggled */
        if(this.toggled)
            return true;

        /* If outside the... */
        if(
            /* ...left side */
            // p.position.x + this.radius < 0 ||
            /* ...top side */
            // p.position.y + this.radius < 0 ||
            /* ...right side */
            this.position.x - this.radius > this.canvas.width ||
            /* ...bottom side */
            this.position.y - this.radius > this.canvas.height
        ) {
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
