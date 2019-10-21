/**
 * ==================================================================================
 * Particle element spawner
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';
import { EVENTBUS } from '../EventBus.js';
import { LOGGER } from '../libs/Logger.js';
import { UTILS } from '../libs/Utils.js';

import { PARTICLESPAWNERATTR } from '../attributes/elements/ParticleSpawnerAttr.js';
import { USERATTR } from '../attributes/elements/UserAttr.js';
import { GAMESTATE } from '../states/GameState.js';

import Math2 from '../libs/Math2.js';
import Vector2 from '../libs/Vector2.js';
import Element from './Element.js';
import Particle from './Particle.js';

export default class ParticleSpawner extends Element {

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
    	this.particles = [];


    	this.bindEvents();
    }


    /**
     * Create `Particle` element
     * @param {Vector2} position
     */
    createParticle(position) {
        let particle = new Particle(
                            this.canvas, this.context,
                            position,
                            this.getSpawnSpeed(),
                            this.getSpawnDirection()
                        );

        this.particles.push(particle);
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
     * Spawn a `Particle` element
     * @param {Vector2} position
     */
    spawn(position) {
        this.createParticle(position);
    }


    update(delta) {
        if(GAMESTATE.isPlaying()) {

            /* Update or remove dead `Particle` elements */
            for(var i = 0; i < this.particles.length; i++) {
                let particle = this.particles[i];
                if(particle.isDead()) {
                    this.particles.splice(i, 1);
                } else {
                    particle.update();
                }
            }
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
        LOGGER.log("ParticleSpawner.js | " + message, GLOBAL.findLogLevel('elements'));
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get spawn speed
     * @return {Vector2}
     */
    getSpawnSpeed() {
        return Math2.randomInt(PARTICLESPAWNERATTR.particleSpeedMin, PARTICLESPAWNERATTR.particleSpeedMax, false);
    }

    /**
     * Get spawn direction
     * @return {Vector2}
     */
    getSpawnDirection() {
        return Math2.randomInt(PARTICLESPAWNERATTR.particleDirectionMin, PARTICLESPAWNERATTR.particleDirectionMax, false);
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
