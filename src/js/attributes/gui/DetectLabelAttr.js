/**
 * ==================================================================================
 * Holds all Face Detection label attributes
 *
 * ==================================================================================
 **/



class DetectLabelAttr {

    constructor() {
        this.id = 'face-detection';

        this.minimizeClass = 'face-detection--minimize';
        this.waitingClass = 'face-detection--waiting';
        this.detectedClass = 'face-detection--detected';
        this.notDetectedClass = 'face-detection--not-detected';
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



export const DETECTLABELATTR = new DetectLabelAttr();
export default DETECTLABELATTR;