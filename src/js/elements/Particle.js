/**
 * ==================================================================================
 * Particle element
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';
import { EVENTBUS } from '../EventBus.js';
import { LOGGER } from '../libs/Logger.js';

import { ITEMATTR } from '../attributes/elements/ItemAttr.js';
import { PARTICLEATTR } from '../attributes/elements/ParticleAttr.js';
import { GAMESTATE } from '../states/GameState.js';

import Math2 from '../libs/Math2.js';
import Vector2 from '../libs/Vector2.js';
import Element from './Element.js';

export default class Particle extends Element {

    constructor(canvas, context, position, speed, direction) {
        super();

    	this.canvas = canvas;
    	this.context = context;

    	this.position = position;
        this.gravity = new Vector2(0, PARTICLEATTR.gravity);

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

        this.sides = PARTICLEATTR.sides;
        this.radius = ITEMATTR.radius;

        this.currAngle = 0;
        this.rotSpeed = Math2.randomInt(PARTICLEATTR.rotSpeedMin, PARTICLEATTR.rotSpeedMax, false);

        this.setPoints();


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
        for(var i = 0; i < this.points.length; i++) {
            this.points[i].addTo(this.velocity);
        }
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
        // this.context.translate(this.position.x, this.position.y);
        // this.context.rotate(this.currAngle);

        this.context.beginPath();
        for(var i = 0; i < this.points.length; i++) {
            let point = this.points[i],
                x = point.x,
                y = point.y;
                // x = this.position.x - point.x,
                // y = this.position.y - point.y;

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
        this.drawPoly();
    }


    log(message) {
        LOGGER.log("Particle.js | " + message, GLOBAL.findLogLevel('elements'));
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Set randomized points from position
     */
    setPoints() {
        let minRadius = this.radius / 2,
            maxRadius = this.radius,
            minAngle = 0,
            maxAngle = Math.PI;

        /* Add initial position */
        this.points.push(new Vector2(this.position.x, this.position.y));
        /* Create random points */
        for(var i = 0; i < this.sides; i++) {
            let angle = Math2.randomInt(minAngle, maxAngle, false),
                length = Math2.randomInt(minRadius, maxRadius, false),

                x = Math.cos(angle) * length,
                y = Math.sin(angle) * length;

            this.points.push(new Vector2(
                                this.position.x + x,
                                this.position.y + y
                            ));
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
        /* If outside the... */
        if(
            /* ...left side */
            // p.position.x + this.radius < 0 ||
            /* ...top side */
            // p.position.y + this.radius < 0 ||
            /* ...right side */
            this.points[0].x > this.canvas.width ||
            /* ...bottom side */
            this.points[0].y > this.canvas.height
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
