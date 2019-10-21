/**
 * ==================================================================================
 * Holds all Face Detection attributes
 *
 * ==================================================================================
 **/



class FaceDetectAttr {

    constructor() {
        this.minimizeClass = 'video--minimize';

        this.modelsUri = 'assets/models/';
        /* For github LIVE! */
        // this.modelsUri = './face-recognition-demo/assets/models';

        this.detectionInterval = 100;
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



export const FACEDETECTATTR = new FaceDetectAttr();
export default FACEDETECTATTR;