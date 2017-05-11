/*jslint browser:true, plusplus:true */
/*global
    define, requirejs, require, jQuery
*/


define(function () {

    function extendDefaults(src, prop) {
        var property;

        for (property in prop) {
            if (prop.hasOwnProperty(property)) {
                src[property] = prop[property];
            }
        }
    }

    function overlay(opt) {
        var that = this;

        that.options = {
            classes: {
                closeButton: '.overlay__close'
            },
            events: {
                init: '',
                beforeOpen: '',
                afterOpen: '',
                beforeClose: '',
                afterClose: ''
            }
        };

        if (typeof opt === 'object') {
            extendDefaults(that.options, opt);
        }

        that.elements = {};

        if (typeof that.options.trigger === "string") {
            that.elements.trigger = document.querySelector(that.options.trigger);
        } else {
            that.elements.trigger = that.options.trigger;
        }

        that.elements.closeButton = document.querySelector(that.options.classes.closeButton);

        if (that.elements.trigger !== null) {
            that.elements.trigger.addEventListener('click', that.open.bind(that), false);
        } else {
            return;
        }

        if (that.elements.closeButton !== null) {
            that.elements.closeButton.addEventListener('click', that.close.bind(that), false);
        }

        if (that.elements.trigger.getAttribute('data-target') !== null) {
            that.elements.overlay = document.querySelector(that.elements.trigger.getAttribute('data-target'));
            that.elements.inner = that.elements.overlay.children;
        }

        if (typeof that.options.events.init === 'function') {                   // Init Call
            that.options.events.init.call();
        }
    }


    overlay.prototype.open = function (e) {
        if (typeof e !== "undefined") {
            e.preventDefault();
        }

        if (typeof this.options.events.beforeOpen === 'function') {             // Before Open Call
            this.options.events.beforeOpen.call(this.elements);
        }

        this.elements.overlay.classList.add('is-visible');
        this.elements.inner[0].addEventListener('click', function (e) { e.stopPropagation(); });
        this.elements.overlay.addEventListener('click', this.close.bind(this), false);

        if (typeof this.options.events.afterOpen === 'function') {              // After Open Call
            this.options.events.afterOpen.call();
        }
    };

    overlay.prototype.close = function (e) {
        if (typeof e !== "undefined") {
            e.preventDefault();
        }

        if (typeof this.options.events.beforeClose === 'function') {            // Before Close Call
            this.options.events.beforeClose.call();
        }

        this.elements.overlay.classList.remove('is-visible');
        this.elements.overlay.removeEventListener('click', this.close.bind(this));

        if (typeof this.options.events.afterClose === 'function') {             // After Close Call
            this.options.events.afterClose.call();
        }

    };

    return overlay;
});
