/**
 * ==================================================================================
 * Holds all Particle attributes
 *
 * ==================================================================================
 **/



class ParticleAttr {

    constructor() {
        this.sides = 2;
        this.gravity = 0.25;

        this.rotSpeedMin = 0.01;
        this.rotSpeedMax = 0.09;
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    //
}



export const PARTICLEATTR = new ParticleAttr();
export default PARTICLEATTR;