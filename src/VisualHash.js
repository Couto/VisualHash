/**
 * VisualHash
 *
 * @author Luis Couto
 * @organization 15minuteslate.net
 * @contact couto@15minuteslate.net
 * @version 0.0.1
 * @requires MD5
 *
 * @license 2012 - MIT (http://couto.mit-license.org/)
 */
(function (w, d, undefined) {

    'use strict';

    /**
     * is - a Set of validation functions
     *
     * @class
     * @private
     */
    var is = {
        tester : Object.prototype.toString,

        /**
         * func
         * tests if value given is Function
         *
         * @static
         * @param {String|Object|Array|Boolean|Number} obj
         * @returns Boolean
         */
        func : function (obj) {
            return (this.tester.call(obj) === '[object Function]');
        },

        /**
         * string
         * tests if value given is String
         *
         * @static
         * @param {String|Object|Array|Boolean|Number} obj
         * @returns Boolean
         */
        string : function (obj) {
            return (this.tester.call(obj) === '[object String]');
        },

        //<validation>
        /**
         * element
         * tests if value given is a DOM Element
         *
         * @static
         * @param {String|Object|Array|Boolean|Number} obj
         * @returns Boolean
         */
        element : function (obj) { return !!(obj && obj.nodeType === 1); },

        /**
         * object
         * tests if value given is Object
         *
         * @static
         * @param {String|Object|Array|Boolean|Number} obj
         * @returns Boolean
         */
        object : function (obj) { return obj === new Object(obj); },

        /**
         * array
         * tests if value given is Array
         *
         * @static
         * @param {String|Object|Array|Boolean|Number} obj
         * @returns Boolean
         */
        array : function (obj) {
            return (this.tester.call(obj) === '[object Array]');
        },

        /**
         * number
         * tests if value given is Number
         *
         * @static
         * @param {String|Object|Array|Boolean|Number} obj
         * @returns Boolean
         */
        number : function (obj) {
            return (this.tester.call(obj) === '[object Number]');
        }
        //</validation>
    };

    /**
     * merge
     * Merges to objects into one.
     * Doesn't overwrite existing properties
     * Changes apply directly to target object.
     *
     * @private
     * @param {Object} target Object that will receive the new properties
     * @param {Object} source Object that will give its properties
     * @returns Object
     */
    function merge(target, source) {
        var k;

        //<validation>
        if (!is.object(target) || !is.object(source)) {
            throw new Error('Argument given must be of type Object');
        }
        //</validation>

        for (k in source) {
            if (source.hasOwnProperty(k) && !target[k]) {
                target[k] = source[k];
            }
        }

        return target;
    }

    /**
     * bind
     * Fixes the context for the given function
     *
     * @private
     * @param {Function} fn function whom context will be fixed
     * @param {Object} context object that will serve as context
     * @returns a function with the given context
     */
    function bind(fn, context) {
        var slice = Array.prototype.slice,
            tmp,
            args,
            proxy;

        if (is.string(context)) {
            tmp = fn[context];
            context = fn;
            fn = tmp;
        }

        if (!is.func(fn)) {
            return undefined;
        }

        args = slice.call(arguments, 2);
        proxy = function () {
            return fn.apply(context, args.concat(slice.call(arguments)));
        };

        return proxy;
    }
    /**
     * addEvent
     * cross-browser addEvent function
     *
     * @private
     * @param {DOM Elment} elm DOM Element to attach the event listener
     * @param {String} evType event name that it's going to be attached
     * @param {Function} fn Function that will serve as callback
     * @returns undefined
     */
    function addEvent(elm, evType, fn) {
        //<validation>
        if (!is.element(elm)) {
            throw new Error('addEvent requires elm parameter to be a DOM Element');
        }

        if (!is.string(evType)) {
            throw new Error('addEvent requires evTtype parameter to be a String');
        }

        if (!is.func(fn)) {
            throw new Error('addEvent requires evTtype parameter to be a Function');
        }
        //</validation>

        if (elm.addEventListener) {
            elm.addEventListener(evType, fn);
        } else if (elm.attachEvent) {
            elm.attachEvent('on' + evType);
        } else {
            elm['on' + evType] = fn;
        }
    }
    /**
     * removeEvent
     * cross-browser removeEvent function
     *
     * @private
     * @param {DOM Elment} elm DOM Element that has the listener attached
     * @param {String} evType event name that was attached
     * @param {Function} fn Function that served as callback
     * @returns true || handler
     */
    function removeEvent(elm, evType, fn) {

        //<validation>
        if (!is.element(elm)) {
            throw new Error('removeEvent requires elm parameter to be a DOM Element');
        }

        if (!is.string(evType)) {
            throw new Error('removeEvent requires evTtype parameter to be a String');
        }

        if (!is.func(fn)) {
            throw new Error('removeEvent requires evTtype parameter to be a Function');
        }
        //</validation>

        if (elm.removeEventListener) {
            elm.removeEventListener(evType, fn);
        } else if (elm.detachEvent) {
            elm.detachEvent('on' + evType, fn);
        } else {
            elm['on' + evType] = null;
        }
    }

    /**
     * indexOf
     * given an array, it will search for the string value.
     * if the browser supports indexOf on arrays it will use the browser version
     * instead
     *
     * @public
     * @param {Array} arr Array where to find the string
     * @param {String|Number|Boolean} val value to search for
     * @returns -1 if not found, index position otherwise
     */
    function indexOf(arr, val) {
        var i = arr.length - 1;

        if (Array.prototype.indexOf) { return arr.indexOf(val); }

        for (i; i >= 0; i -= 1) { if (arr[i] === val) { return i; } }

        return -1;
    }

    /**
     * VisualHash
     *
     * @class
     * @param  {DOM element} inputEl inputElement
     * @param  {Object} options
     * @return {Object} VisualHash instance
     *
     * @example
     *
     * var coloredhash = new VisualHash(d.querySelectorAll('input')[0], {
     *     stripes      : 3,                        // default
     *     className    : 'visual-hasher'           // default
     *     stripesClass : 'visual-hasher-stripe'    // default
     *     appendTo     : d.getElementById('color_placeholder'),
     *     hashFunction : MD5,
     *     onInput      : function() {
     *         console.log('A new color was typed')
     *     }
     * });
     *
     * coloredhash.destroy();
     */
    function VisualHash(inputEl, options) {

        // Ensure that the function is called as a constructor
        //<validation>
        if (!(this instanceof VisualHash)) {
            return new VisualHash(inputEl, options);
        }

        // yeah... predicting a lot of people passing a jQuery object
        if (inputEl.jquery) { inputEl = inputEl.get(0); }

        if (!inputEl || !is.element(inputEl)) {
            throw new Error('VisualHash constructor needs at least one argument and has to be a DOM element');
        }

        if (options && !is.object(options)) {
            throw new Error('VisualHash requires the options parameter to be of type object');
        }
        //</validation>

        this.inputEl = inputEl;
        this.options = (options) ? merge(options, this.defaults) : this.defaults;

        this.container = d.createElement('div');
        this.container.setAttribute('class', this.options.className);

        this.stripes = (function (placeholder, size, className) {
            var stripes = [],
                stripe;

            while (size) {
                stripe = d.createElement('div');
                stripe.setAttribute('class', className + ' stripe-' + size);
                stripes.push(stripe);
                placeholder.appendChild(stripe);

                size -= 1;
            }

            return stripes;

        }(this.container, this.options.stripes, this.options.stripesClass));

        this.inputHandler = bind(this.inputHandler, this);
        addEvent(this.inputEl, 'input', this.inputHandler);

        if (this.options.appendTo) { this.append(); }
    }

    VisualHash.prototype = {

        /**
         * @constructor
         * Set the constructor property back to the correct Function
         */
        constructor : VisualHash,

        /**
         * @property {Object} defaults
         * @readonly
         */
        defaults : {
            'stripes'       : 3,
            'appendTo'      : d.body,
            'className'     : 'visual-hasher',
            'stripesClass'  : 'visual-hasher-stripe'
        },

        /**
         * toHash
         * This is not the best option maybe, but I don't think
         * that VisualHash should have the responsability to hash a string
         * I could implement (aka copy+paste) a MD5 or SHAx implementation
         * but that would cause a huge increase of file size.
         * I do accept suggestions and opinions on this matter…
         *
         * This function will use the given hashFunction given on the constructor
         * or it will use any of the following functions if present
         *
         * Sha1 (from Chris Veness) - http://www.movable-type.co.uk/scripts/sha1.html
         * md5 (Joseph Myers) - http://www.myersdaily.org/joseph/javascript/md5-text.html
         * Crypto Collection (MD5, SHA1 & SHA256) - http://code.google.com/p/crypto-js/
         *
         * @method
         * @public
         * @param {String} str String to be converted to hash
         * @returns {String} Hashed value of the given string
         */
        toHash : function (str) {

            if (this.options.hashFunction) {
                return  this.options.hashFunction(str);
            }

            if (Sha1 && is.Function(Sha1.hash)) { return Sha1.hash(str); }
            if (md5 && isFunction(md5)) { return md5(str); }
            if (Crypto && isObject(Crypto)) {
                if (Crypto.MD5 && isFunction(Crypto.MD5)) { return Crypto.MD5(str); }
                if (Crypto.SHA1 && isFunction(Crypto.SHA1)) { return Crypto.SHA1(str); }
                if (Crypto.SHA256 && isFunction(Crypto.SHA256)) { return Crypto.MD5(str); }
            }

        },

        /**
         * split
         * Given a string it, will split in the given amount of chunks with the given size
         *
         * @method
         * @public
         * @param {String} str String to be splitted
         * @returns {Array} Array with the splitted string
         */
        split : function (str, size, chunks) {
            var parts = [],
                begin = 0,
                end = size,
                interval = size;

            //<validation>
            if (!is.string(str)) {
                throw new Error('split function must be called with str parameter being of type String');
            }

            if (!is.number(size)) {
                throw new Error('split function must be called with size parameter being of type Number');
            }

            if (!is.number(chunks)) {
                throw new Error('split function must be called with chunks parameter being of type Number');
            }
            //</validation>

            while (chunks) {
                parts.push(str.substring(begin, end));

                begin = end + 1;
                end = end + interval + 1;

                chunks -= 1;
            }

            return parts;
        },

        /**
         * fillColors
         * Given an array or array-like of elements and an array of colors,
         * it will set the background-color of each elements with the
         * respective color.
         *
         * @method
         * @public
         * @param {Array} elements Array of node Elements
         * @param {Array} colors Array of colors
         * @returns VisualHash instance (this)
         */
        fillColors : function (elements, colors) {
            var i = elements.length - 1,
                currentStyle = '',
                currentEl,
                splittedStyle = [],
                splittedIdx = 0;

            //<validation>
            if (!is.array(elements)) {
                throw new Error('fillColors function must be called with elements parameter being of type Array or Static Node');
            }

            if (!is.array(colors)) {
                throw new Error('fillColors function must be called with colors parameter being of type Array');
            }
            //</validation>

            for (i; i >= 0; i -= 1) {
                currentEl =  elements[i];
                currentStyle = currentEl.getAttribute('style');

                if (currentStyle) {
                    splittedStyle = currentStyle.split(/(\;|:)/gi);
                    splittedIdx = indexOf(splittedStyle, 'background-color');

                    if (splittedIdx !== -1) {
                        splittedStyle[splittedIdx + 2] = '#' + colors[i];
                    } else {
                        splittedStyle[splittedStyle.length] = ';background-color: #' + colors[i] + ';';
                    }

                    currentEl.setAttribute('style', splittedStyle.join(''));
                } else {
                    currentEl.setAttribute('style', 'background-color: #' + colors[i] + ';');
                }
            }

            return this;

        },

        /**
         * clearColors
         * Given an array or array-like of elements it will remove the
         * background-color property of the its style attribute
         *
         * @method
         * @public
         * @param {Array} elements Array of node Elements
         * @returns VisualHash instance (this)
         */
        clearColors : function (elements) {
            var i = elements.length - 1,
                currentStyle = '',
                currentEl,
                splittedStyle = [],
                splittedIdx = 0;

            //<validation>
            if (!is.array(elements)) {
                throw new Error('clearColors function must be called with elements parameter being of type Array or Static Node');
            }
            //</validation>

            for (i; i >= 0; i -= 1) {
                currentEl = elements[i];
                currentStyle = currentEl.getAttribute('style');

                if (currentStyle) {
                    splittedStyle = currentStyle.split(/(\;|:)/gi);
                    splittedIdx = indexOf(splittedStyle, 'background-color');

                    if (splittedIdx !== -1) {
                        // It's faster than another loop
                        // and since are just a few lines is still managable
                        splittedStyle[splittedIdx] = '';
                        splittedStyle[splittedIdx + 1] = '';
                        splittedStyle[splittedIdx + 2] = '';
                        splittedStyle[splittedIdx + 3] = '';
                        currentEl.setAttribute('style', splittedStyle.join(''));
                    }
                }
            }

            return this;
        },

        /**
         * append
         * Appends the VisualHash element inside the given element, if no element
         * is given it fallbacks to the options property (that ultimately gets
         * its value from the defaults property)
         *
         * @method
         * @public
         * @param {DOM Element} element Element where the VisualHash will be appended
         * @returns VisualHash instance (this)
         */
        append : function (element) {
            if (!element) { element = this.options.appendTo; }
            //<validation>
            if (!is.element(element)) { throw new Error('append function must be called with element parameter being of type Element or an Element must be given in the constructor options'); }
            //</validation>
            if (element) { element.appendChild(this.container); }

            return this;
        },

        /**
         * destroy
         * Removes all event listeners used by the VisualHash, and removes the
         * DOM element created
         *
         * @method
         * @public
         * @returns undefined
         */
        destroy : function () {
            removeEvent(this.inputEl, 'input', this.inputHandler);
            this.container.parentNode.removeChild(this.container);
            delete this.container;
            delete this.stripes;
            delete this.inputEl;
            delete this.options;
        },

        /**
         * inputHandler
         * Handler used when a new input is given in the inputbox
         * Calls the onInput handler if given
         *
         * @method
         * @protected
         * @returns undefined
         */
        inputHandler : function (evt) {

            var str = evt.target.value,
                hash = '',
                splittedHash = [],

            if (str) {
                hash = this.toHash(str);
                splittedHash = this.split(hash, 6, this.options.stripes);
                this.fillColors(this.stripes, splittedHash);
            } else { this.clearColors(this.stripes); }

            if (this.options.onInput) {
                this.options.onInput.call(this, str, splittedHash);
            }

        }
    };

    if (typeof define === 'function' && define.amd) {
        define('VisualHash', [], function () { return VisualHash; } );
    } else if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports) {
        module.exports = VisualHash;
    } else {
        w.VisualHash = VisualHash;
    }

    return VisualHash;

}(window, document));
