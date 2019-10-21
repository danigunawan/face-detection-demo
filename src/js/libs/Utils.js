/**
 * ==================================================================================
 * Collection of helper utils methods
 *
 * ==================================================================================
 **/

class Utils {

    constructor() {
        //
    }


    /**
     * ==================================================================================
     * @Canvas
     * ==================================================================================
     **/

    //


    /**
     * ==================================================================================
     * @DOMElement
     * ==================================================================================
     **/

    /**
     * Get DOMElement by id
     * @param  {string}     id
     * @return {DOMElement}
     */
    getElementById(id) {
        let elem = document.getElementById(id);
        if(elem)
            return elem;

        return console.error("Element with ID of '" + id + "' not found!");
    }

    /**
     * Get DOMElement by classname
     * @param  {string}     className
     * @return {DOMElement}
     */
    getElementByClass(className) {
        let elem = document.getElementsByClassName(className);
        if(elem.length > 0)
            return elem[0];

        return console.error("Element with class name of '" + className + "' not found!");
    }


    /**
     * ==================================================================================
     * @Colors
     * ==================================================================================
     **/

    /**
     * Convert RGB to Color object
     * @param  {int} r Red
     * @param  {int} g Green
     * @param  {int} b Blue
     * @param  {int} a Alpha
     * @return {BABYLON.Color}
     */
    rgbToColor(r, g, b, a = null) {
        if(a != null)
            return new BABYLON.Color4(r / 255, g / 255, b / 255, a);

        return new BABYLON.Color3(r / 255, g / 255, b / 255);
    }

    /**
     * Get alpha value from pixel data
     * @param  {Image.Data} pixels
     * @param  {int}        i
     * @return {int}
     */
    getAlphaFromPixel(pixels, i) {
        return pixels[i * 4 + 3];
    }


    /**
     * ==================================================================================
     * @Arrays
     * ==================================================================================
     **/

    /**
     * Run specified function on collection
     * @param {array}  collection
     * @param {string} func
     * @param {object} param
     */
    runCollection(collection, func, param = null) {
        if(!collection) return;

        for(var i = 0; i < collection.length; i++) {
            let obj = collection[i];

            if(typeof(obj[func]) == 'function') {
                obj[func](param);
            }
        }
    }

    /**
     * Get object from specified array
     * @param  {array}  name
     * @param  {string} name
     * @return {obj}
     */
    getFromArrByName(arr, name, collection = false) {
        let result = collection ? [] : null;
        for(var i = 0; i < arr.length; i++) {
            let item = arr[i];

            if(item.name && item.name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
                if(!collection)
                    return item;

                result.push(item);
            }
        }

        return result;
    }

    /**
     * Get current and next object in array w/in a loop
     * @param  {array}  arr
     * @param  {int}    currIndex
     * @return {Object}
     */
    getLoopIteration(arr, currIndex) {
        let nextInc = currIndex + 1,
            nextIndex = (nextInc) == arr.length ? 0 : nextInc;

        return {
            curr: arr[currIndex],
            next: arr[nextIndex]
        };
    }


    /**
     * ==================================================================================
     * @Checker
     * ==================================================================================
     **/

    /**
     * Check if specified value is an object
     * @param  {mixed}  value
     * @return {boolean}
     */
    isObject(value) {
        let type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }

    /**
     * Check if object is in the specified array
     * @param  {array}   arr
     * @param  {object}  obj
     * @return {Boolean}
     */
    hasObject(arr, obj) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] === obj)
                return true;
        }

        return false;
    }
}



export const UTILS = new Utils();
export default UTILS;