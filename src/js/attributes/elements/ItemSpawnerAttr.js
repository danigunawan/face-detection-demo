/**
 * ==================================================================================
 * Holds all Item Spawner attributes
 *
 * ==================================================================================
 **/


import { ITEMATTR } from './ItemAttr.js';

import Math2 from '../../libs/Math2.js';


class ItemSpawnerAttr {

    constructor() {
        this.interval = 7000;
        this.minInterval = 1500;

        this.margin = 20;

        this.itemSpeedMin = 12;
        this.itemSpeedMax = 17;

        this.itemDirectionMin = -Math.PI / 5;
        this.itemDirectionMax = -Math.PI / 3;
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get spawn min and max `X` coordinates
     * @param  {DOMElement} canvas
     * @param  {int}        offset
     * @return {Object}
     */
    getSpawnCoordinates(canvas, offset = 0) {
        let margin = Math2.percentOf(canvas.height, this.margin),
            minX = 0, maxX = 0,
            minY = margin, maxY = canvas.height - margin;

        return {
            minX: 0 - offset,
            maxX: 0 + offset,
            minY: minY - offset,
            maxY: maxY + offset,
        };
    }
}



export const ITEMSPAWNERATTR = new ItemSpawnerAttr();
export default ITEMSPAWNERATTR;