/**
 * ==================================================================================
 * Main
 * ==================================================================================
 **/

import SceneManager from './SceneManager.js';


const mainApp = function() {

    const body = document.getElementById('main');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const sceneManager = new SceneManager(body, video, canvas);


    /**
     * Initiate app
     */
    function init() {
        bindEventListeners();

        resizeCanvas();
    }

    /**
     * Bind event listeners to the canvas element
     */
    function bindEventListeners() {
        window.onresize = resizeCanvas;
    }

    /**
     * Trigger `resize` event on canvas elements
     */
    function resizeCanvas() {
        sceneManager.onWindowResize();
    }

    init();

}();