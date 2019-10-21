/**
 * ==================================================================================
 * Face Detection element
 *
 * ==================================================================================
 **/

import { GLOBAL } from '../Global.js';
import { EVENTBUS } from '../EventBus.js';
import { LOGGER } from '../libs/Logger.js';

import { FACEDETECTATTR } from '../attributes/elements/FaceDetectAttr.js';
import { USERATTR } from '../attributes/elements/UserAttr.js';
import { GAMESTATE } from '../states/GameState.js';

import Vector2 from '../libs/Vector2.js';

export default class FaceDetect {

    constructor(video, body) {
    	this.video = video;
    	this.body = body;


        /**
         * @DEVELOPMENT: Disable face detection and bind mouth coordinates to the
         * mouse axes
         */
        if(GLOBAL.showMouse()) {

            this.bindDebugMouse()

        } else {

            this.init();
        }

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
        this.loading = false;

    	this.setupAssets();


        /* @DEVELOPMENT */
        this.hasDebugCanvas = false;
    }

	/**
     * Initialize all model assets used on `face-api. Will call the `setupStream` once
     * all models were loaded
     */
    setupAssets() {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(FACEDETECTATTR.modelsUri),
            faceapi.nets.faceLandmark68Net.loadFromUri(FACEDETECTATTR.modelsUri),
        ]).then(() => {
            this.setupStream();
        });
    }

    /**
     * Initialize the camera to start streaming
     */
    setupStream() {
        /* Set `mediaDevices` as empty for older browsers who have no property of this yet */
        if(navigator.mediaDevices === undefined)
            navigator.mediaDevices = {};

        /* Check if `getUserMedia` function doesn't exist */
        if(navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function(constraints) {

                /* Throw error if `getUserMedia` is not found... */
                if(!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia)
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                /* ...return otherwise */
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }

        /* Run the native device camera */
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        }).then((stream) => {

            /* Set stream to `video` element */
            if('srcObject' in this.video) {
                this.video.srcObject = stream;
            } else {
                this.video.src = window.URL.createObjectURL(stream);
            }

            /* Play on load */
            this.video.onloadedmetadata = () => {
                this.stream();
            };

        }).catch((error) => {
            console.log('We encountered an error trying to access your camera. Please allow the app permission to continue. ' + error);
        });
    }


    /**
     * ==================================================================================
     * @Events
     * ==================================================================================
     **/

    onWindowResize(size) {
        this.video.width = size.width;
        this.video.height = size.height;
    }


    /**
     * ==================================================================================
     * @Controller
     * ==================================================================================
     **/

	/**
     * Start `play` event on the `video` element
     */
    stream() {
        this.video.play();

        /* Bind events */
        this.video.addEventListener('play', () => {

            /* Run `Faceapi` detection method per set interval */
            setInterval(async () => {

                this.detect();

            }, FACEDETECTATTR.detectionInterval);
        });
    }

    /**
     * Detect face landmarks & expressions
     */
    detect() {
        if(this.loading) return;

        this.loading = true;

        faceapi.detectSingleFace(
            this.video,
            new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.4 })
        )
        .withFaceLandmarks()
            .then((detections) => {

                /* DEVELOPMENT: Clear debug canvas */
                if(this.debugCanvas)
                    this.debugCanvas.getContext('2d').clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height);

                if(detections) {
                    this.setDetections(detections);
                } else {
                    if(GAMESTATE.isDetecting)
                        EVENTBUS.emit('onDetecting', false);
                }


                this.loading = false;


                if(!GAMESTATE.hasDetection)
                    EVENTBUS.emit('onHasDetection');

            }, (error) => {
                this.log('ERROR: ' + error);
            });
    }


    /**
     * ==================================================================================
     * @Renderer
     * ==================================================================================
     **/

    log(message) {
        LOGGER.log("FaceDetect.js | " + message, GLOBAL.findLogLevel('elements'));
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    /**
     * Set detections
     * @param {Detections} detections
     */
    setDetections(detections) {
    	this.detections = detections;


        /* Emit events */
        EVENTBUS.emit('onFaceDetect', detections);

		if(!GAMESTATE.isDetecting)
	    	EVENTBUS.emit('onDetecting', true);


        /**
         * @DEVELOPMENT! Canvas for displaying the `Face-api` detections, landmarks,
         * and expressions.
         */

	    if(GLOBAL.showMarkers()) {
	        this.showFaceMarkers(detections);
	    }
    }

    /**
     * Get `video` current width & height
     * @return {Object}
     */
    getVideoSize() {
        return {
            width: this.video.width,
            height: this.video.height,
        };
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

    /**
     * Bind detection to mouse move event
     */
    bindDebugMouse() {
        /* Fake emit events for the app to still proceed */
        EVENTBUS.emit('onHasDetection', true);
        EVENTBUS.emit('onDetection', true);

        /* Track mouse coordinates */
        this.body.addEventListener('mousemove', (event) => {
            let exp = {landmarks: {}},
                x = event.clientX - this.body.offsetLeft,
                y = event.clientY - this.body.offsetTop;

            /* Fake getter function for the `mouth` parts */
            exp.landmarks.getMouth = () => {
                let w = 80, wH = w / 2, wQ = wH / 2, wTQ = wQ / 2,
                    h = w * .35, hH = h / 2, hQ = hH / 2, hTQ = hQ / 2,
                    mouth = [];

                /* Create a polygon forming the mouth */
                mouth.push(new Vector2(x - wH, y));             // 00
                mouth.push(new Vector2(x - wQ, y - hQ));        // 01
                mouth.push(new Vector2(x - wTQ, y - hH));       // 02
                mouth.push(new Vector2(x, y - hTQ));            // 03
                mouth.push(new Vector2(x + wTQ, y - hH));       // 04
                mouth.push(new Vector2(x + wQ, y - hQ));        // 05
                mouth.push(new Vector2(x + wH, y));             // 06
                mouth.push(new Vector2(x + wQ, y + hQ));        // 07
                mouth.push(new Vector2(x + wTQ, y + hH));       // 08
                mouth.push(new Vector2(x, y + hH))              // 09
                mouth.push(new Vector2(x - wTQ, y + hH));       // 10
                mouth.push(new Vector2(x - wQ, y + hQ));        // 11
                mouth.push(new Vector2(x - wH + wTQ, y))        // 12
                mouth.push(new Vector2(x - wTQ, y - wTQ))       // 13
                mouth.push(new Vector2(x, y - wTQ))             // 14
                mouth.push(new Vector2(x + wTQ, y - wTQ))       // 15
                mouth.push(new Vector2(x + wH - wTQ, y))        // 16
                mouth.push(new Vector2(x + wTQ, y + wTQ))       // 17
                mouth.push(new Vector2(x, y + wTQ))             // 18
                mouth.push(new Vector2(x - wTQ, y + wTQ))       // 19

                return mouth;
            };

            EVENTBUS.emit('onFaceDetect', exp);
        });
    }

    /**
     * Create debug canvas for `Faceapi` markers
     */
    createDebugCanvas() {
        this.debugCanvas = faceapi.createCanvasFromMedia(this.video);
        this.body.append(this.debugCanvas);

        faceapi.matchDimensions(this.debugCanvas, this.getVideoSize());


        this.hasDebugCanvas = true;
    }

    /**
     * Create a `canvas` on top of the video element to show the face detection markers
     * (e.g: Face expressions, face landmarks, etc.)
     * @param {Detections} detections
     */
    showFaceMarkers(detections) {
        if(!this.hasDebugCanvas) {
            this.createDebugCanvas();
        }


        const resizedDetections = faceapi.resizeResults(detections, this.getVideoSize());

        /* Show enabled debugger markers */
        if(GLOBAL.showLandmarks()) faceapi.draw.drawFaceLandmarks(this.debugCanvas, resizedDetections);
    }
}