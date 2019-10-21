/**
 * ==================================================================================
 * Holds all Particle Spawner attributes
 *
 * ==================================================================================
 **/


import { PARTICLEATTR } from './ParticleAttr.js';

import Math2 from '../../libs/Math2.js';


class ParticleSpawnerAttr {

    constructor() {
        this.interval = 7000;
        this.minInterval = 1500;

        this.margin = 20;

        this.particleSpeedMin = 5;
        this.particleSpeedMax = 7;

        this.particleDirectionMin = -Math.PI / 2.5;
        this.particleDirectionMax = -Math.PI / 1.5;
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    //
}



export const PARTICLESPAWNERATTR = new ParticleSpawnerAttr();
export default PARTICLESPAWNERATTR;