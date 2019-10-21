/**
 * ==================================================================================
 * Holds all Score & combo label attributes
 *
 * ==================================================================================
 **/



class ScoreLabelAttr {

    constructor() {
        this.id = 'score';

        this.scoreClassName = 'score__label';
        this.comboClassName = 'combo__label';
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

     init() {
        //
     }
}



export const SCORELABELATTR = new ScoreLabelAttr();
export default SCORELABELATTR;