/**
 * ==================================================================================
 * Holds all global variables
 *
 * ==================================================================================
 **/

class Global {

    constructor() {
        //
    }


    /**
     * ==================================================================================
     * @Methods
     * ==================================================================================
     **/

    /**
     * Convert string to boolean value
     * @param  {string}  value
     * @return {boolean}
     */
    convertStrToBool(value) {
        return value === 'true';
    }


    /**
     * ==================================================================================
     * @Getter/Setter
     * ==================================================================================
     **/

    getEnv() { return process.env['APP_ENV']; }
    getDebug() { return this.convertStrToBool(process.env['DEBUG']); }
    getDebugLandmarks() { return this.convertStrToBool(process.env['DEBUG_LANDMARKS']); }
    getDebugMouse() { return this.convertStrToBool(process.env['DEBUG_MOUSE']); }
    getDebugLogLevel() { return process.env['DEBUG_LOG_LEVEL']; }


    /**
     * Get strings used for dev environment
     * @return {array}
     */
    getDevTriggers() {
        return [
            'dev', 'development', 'local', 'local'
        ];
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Find log level base on specified category
     * @param  {string} str
     * @return {int}
     */
    findLogLevel(str) {
        switch(str.toLowerCase()) {
            /* Includes `EventBus` logs */
            case 'states': return 1;
            case 'events': return 2;
            case 'controls': return 3;
            case 'elements': return 4;
            case 'others': return 5;
            default: return 0;
        }
    }

    /**
     * Check if `faceapi` detections, landmarks and expressions are visible
     */
    showMarkers() { return this.showLandmarks() };
    showLandmarks() { return this.isDebug() && this.getDebugLandmarks(); }
    showMouse() { return this.isDebug() && this.getDebugMouse(); }

    /**
     * Check if env. is on development
     */
    isDev() {
        if(this.getDevTriggers().indexOf(this.getEnv().toLowerCase()) >= 0)
            return true;

        return false;
    }

    /**
     * Check if debug mode is open
     */
    isDebug() {
        return this.getDebug();
    }
}



export const GLOBAL = new Global();
export default GLOBAL;