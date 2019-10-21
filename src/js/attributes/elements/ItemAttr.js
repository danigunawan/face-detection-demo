/**
 * ==================================================================================
 * Holds all Item attributes
 *
 * ==================================================================================
 **/



class ItemAttr {

    constructor() {
        this.gravity = 0.25;

        this.radius = 50;
        this.sides = 6;
        this.slice = Math.PI / this.sides;

        this.rotSpeedMin = 0.01;
        this.rotSpeedMax = 0.09;

        this.defaultColor = '#f9ca24';
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    //
}



export const ITEMATTR = new ItemAttr();
export default ITEMATTR;