define(['./MD5'], function (md5) {

    'use strict';

    function isElement(obj) { return !!(obj && obj.nodeType === 1); }

    function isObject(obj) { return obj === new Object(obj); }

    function merge(target, source) {
        var k;


        for (k in source) {
            if (source.hasOwnProperty(k) && !target[k]) {
                target[k] = source[k];
            }
        }

        return target;
    }

    function bind(fn, context) {
        var isType = Object.prototype.toString,
            slice = Array.prototype.slice,
            tmp,
            args,
            proxy;

        if (isType.call(context) === '[object String]') {
            tmp = fn[context];
            context = fn;
            fn = tmp;
        }

        if (isType.call(fn) !== '[object Function]') {
            return undefined;
        }

        args = slice.call(arguments, 2);
        proxy = function () {
            return fn.apply(context, args.concat(slice.call(arguments)));
        };

        return proxy;
    }

    function addEvent(elm, evType, fn, useCapture) {
        if (elm.addEventListener) {
            elm.addEventListener(evType, fn, useCapture);
            return true;
        } else if (elm.attachEvent) {
            var r = elm.attachEvent('on' + evType, fn);
            return r;
        } else {
            elm['on' + evType] = fn;
        }
    }

    function removeEvent(elm, evType, fn, useCapture) {
        if (elm.removeEventListener) {
            elm.removeEventListener(evType, fn, useCapture);
            return true;
        } else if (elm.detachEvent) {
            var r = elm.detachEvent('on' + evType, fn);
            return r;
        } else {
            elm['on' + evType] = null;
        }
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
     * var coloredhash = new VisualHash(document.querySelectorAll('input')[0], {
     *     stripes      : 3,                        // default
     *     className    : 'visual-hasher'           // default
     *     stripesClass : 'visual-hasher-stripe'    // default
     *     appendTo     : document.getElementById('color_placeholder'),
     *     onInput      : function() {
     *         console.log('A new color was typed')
     *     }
     * });
     *
     * coloredhash.destroy();
     */
    function VisualHash(inputEl, options) {

        if (!inputEl || !isElement) {
            throw new Error('VisualHash constructor needs at least one argument and has to be a DOM element');
        }


        this.inputEl = inputEl;
        this.options = (options && isObject(options)) ? merge(options, this.defaults) : this.defaults;

        this.container = document.createElement('div');
        this.container.setAttribute('class', this.options.className);

        this.stripes = (function (placeholder, size, className) {
            var stripes = [],
                stripe;

            while (size) {

                stripe = document.createElement('div');
                stripe.setAttribute('class', className + ' stripe-' + size);
                stripes.push(stripe);
                placeholder.appendChild(stripe);

                size -= 1;
            }

            return stripes;

        }(this.container, this.options.stripes, this.options.stripesClass));

        this.inputHandler = bind(this.inputHandler, this);
        addEvent(this.inputEl, 'input', this.inputHandler);

        if (this.options.appendTo && isElement(this.options.appendTo)) {
            this.append();
        }
    }

    VisualHash.prototype = {

        constructor : VisualHash,

        defaults : {
            'stripes'       : 3,
            'appendTo'      : document.body,
            'className'     : 'visual-hasher',
            'stripesClass'  : 'visual-hasher-stripe'
        },

        toHash : function (str) {
            return md5(str);
        },

        splitHash : function (hash, size, chunks) {
            var parts = [],
                begin = 0,
                end = size,
                interval = size;

            while (chunks) {
                parts.push(hash.substring(begin, end));

                begin = end + 1;
                end = end + interval + 1;

                chunks -= 1;
            }

            return parts;
        },

        fillColors : function (elements, colors) {

            var i = elements.length - 1;

            while (i >= 0) {
                elements[i].setAttribute('style', 'background-color: #' + colors[i]);
                i -= 1;
            }

            return this;

        },

        clearColors : function (elements) {

            var i = elements.length - 1;

            while (i) {
                elements[i].setAttribute('style', null);
                i -= 1;
            }

            return this;
        },

        append : function (element) {
            if (isElement(element)) { this.options.appendTo = element; }

            if (this.options.appendTo) {
                this.options.appendTo.appendChild(this.container);
            }

            return this;
        },

        destroy : function () {
            removeEvent(this.inputEl, 'input', this.inputHandler);
            this.container.parentNode.removeChild(this.container);
            this.container = null;
            this.stripes = null;
            this.inputEl = null;
        },

        inputHandler : function (evt) {
            var str = evt.target.value,
                hash = "",
                splittedHash = [];

            if (str) {
                hash = this.toHash(str);
                splittedHash = this.splitHash(hash, 6, this.options.stripes);
                this.fillColors(this.stripes, splittedHash);
            } else {
                this.clearColors(this.stripes);
            }

            if (this.options.onInput) {
                this.options.onInput.call(this, splittedHash);
            }

        }
    };

    if (window.jQuery) {
        jQuery.fn.visualHash = function (options) {
            return $(this).each(function () {
                var $this = $(this);
                $this.data('visualHash', new VisualHash($this.get(0), options));
            });
        };
    }

    return VisualHash;

});