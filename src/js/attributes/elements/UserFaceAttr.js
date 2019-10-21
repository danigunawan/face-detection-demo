/**
 * ==================================================================================
 * Holds all UserFace attributes
 *
 * ==================================================================================
 **/



class UserFaceAttr {

    constructor() {
        this.hitBoundery = 20;

        this.bounderyColor = "white";
        this.bounderyWidth = 10;
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

     init() {
        //
     }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Get predefined word attributes
     * @return {Object}
     */
    getPerfect() { return this.getWordAttr('perfect', '#2ecc71', 200); }
    getGood() { return this.getWordAttr('good', '#9b59b6', 150); }
    getBad() { return this.getWordAttr('bad', '#f39c12', 100); }
    getMiss() { return this.getWordAttr('miss', '#e74c3c', 0); }

    /**
     * Get and set the specified value for the word attribute object
     * @param {string}   text
     * @param {string}   color
     * @param {string}   score
     * @return {Object}
     */
    getWordAttr(text, color, score) {
        return {
            text: text,
            color: color,
            score: score
        };
    }
}



export const USERFACEATTR = new UserFaceAttr();
export default USERFACEATTR;