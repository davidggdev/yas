/**
 * YAS - Yet another slider jQuery plugin
 * @author  David González <davidggdev@gmail.com>
 * @version 0.2
 * @since   2022-09-07
 */
(function ($) {
    "use strict";

    $.fn.yasSlider = function (options) {

        let _ys_slider = new YasSlider(options);
        try {
            if (!_ys_slider)
                throw new Error('Something goes very wrong');

        } catch (e) {
            console.error(e.name + ': ' + e.message);
            return false;
        }
    };
})(jQuery);

/**
 * Main class core
 */
class YasSlider {
    /** Main element */
    _ys_e_content = null;
    /** Slider container */
    _ys_e_container = null;
    /** Controls container */
    _ys_e_controls = null;
    /** Prev element container */
    _ys_e_controls__prev = null;
    /** Next element container */
    _ys_e_controls__next = null;
    /** Dots element container */
    _ys_e_controls__dots = null;
    /** Timer to handle pauses */
    _ys_timer = null;
    /** Container with single slides */
    _ys_container = [];
    /** Options get by instance create */
    _ys_options = [];

    /**
     * Initiates and calls the creation of elements necessary to execute the slider.
     * @param {object} options Collection of available options 
     * @returns bool
     */
    constructor(options) {
        try {
            this._ys_timer = ms => new Promise(res => setTimeout(res, ms));
            this._ys_options = options;
            this._ys_e_content = $("[yas-slider]");
            $(this._ys_e_content).addClass('yas-slider-main');

            if (this._ys_e_content.length === 0)
                throw new Error('Main element [yas-slider] not defined');

            if ($(this._ys_e_content).find("img,div").length === 0)
                throw new Error('Main element [yas-slider] cannot be empty');

            this.createSliderViewport();
            this.createSliderControls();
            this.createSliderDivElements();
            this.controlsListener();
        } catch (e) {
            console.error(e.name + ': ' + e.message);
            return false;
        }
        return true;
    }

    /**
     * Create viewport slider element
     */
    createSliderViewport() {
        this._ys_e_container =
            this.appendElements(
                $(this._ys_e_content),
                $(this.createElement('div', 'yas-slider-viewport')),
                '.yas-slider-viewport'
            )
    }

    /** 
     * Create slider controls 
     */
    createSliderControls() {
        $(this._ys_e_content).append(
            $(this.createElement('div', 'yas-slider-controls'))
        ); this._ys_e_controls = $('.yas-slider-controls');

        this._ys_e_controls.append(
            $(this.createElement('div', 'yas-slider-controls__prev'))
        ); this._ys_e_controls__prev = $('.yas-slider-controls__prev');

        this._ys_e_controls.append(
            $(this.createElement('div', 'yas-slider-controls__dots'))
        ); this._ys_e_controls__dots = $('.yas-slider-controls__dots');

        this._ys_e_controls.append(
            $(this.createElement('div', 'yas-slider-controls__next'))
        ); this._ys_e_controls__next = $('.yas-slider-controls__next');

    }

    /**
     * Returns the html code needed to create a custom html element
     * @param {string} type 
     * @param {string} className 
     * @param {string} idName 
     * @param {string} attribute 
     * @param {string} content 
     * @returns 
     */
    createElement(type, className, idName, attribute, content) {
        let idFiltered = (idName != undefined) ? 'id="' + idName + '"' : '';
        let attributeFiltered = (attribute != undefined) ? attribute : '';
        let contentFiltered = (content != undefined) ? content : '';
        return '<' + type + ' class="' + className + '" ' + idFiltered + ' ' + attributeFiltered + '>' + contentFiltered + '</' + type + '>'
    }

    /**
     * Add element and returns type jQuery instance object
     * @param {object} elementOrigin 
     * @param {object}elemenAppend 
     * @param {string} elementClassName 
     * @returns 
     */
    appendElements(elementOrigin, elemenAppend, elementClassName) {
        elementOrigin.append(elemenAppend);
        elemenAppend = elementClassName;
        return $('.yas-slider-viewport');
    }

    /**
     * Make divs with from img elements inside of main element
     */
    createSliderDivElements() {
        let _this = this;
        $(_this._ys_e_content).find("img,div").each(function (iteration, element) {
            if ($(element)[0].nodeName === 'IMG') {
                _this._ys_e_container.prepend(
                    _this.createElement('div', 'yas-slide', 'yas-slide-id-' + iteration, 'style="background-image: url(' + $(element).attr('src') + ');"')
                );
                _this._ys_container.push($('#yas-slide-id-' + iteration));

                if (iteration === 0) {
                    $('#yas-slide-id-' + iteration).addClass('--active')
                }

                // Append dots
                let dotId = parseInt(iteration);
                _this._ys_e_controls__dots.append(
                    $(_this.createElement('div', '--dot', 'dot-id-' + dotId))
                );
                $('.--dot').first().addClass('--selected');
                // Remove element
                $(element).remove();
            }
        });

    }

    /**
     * Handle controls click's and move
     */
    controlsListener() {
        let _this = this;

        // Define Prev element
        let prevElement = (_this._ys_options.prevElement !== undefined && _this._ys_options.prevElement) ?
            _this._ys_options.prevElement :
            _this._ys_e_controls__prev;

        prevElement.append(_this._ys_e_controls__prev);

        // Define Next element
        let nextElement = (_this._ys_options.nextElement !== undefined && _this._ys_options.nextElement) ?
            _this._ys_options.nextElement :
            _this._ys_e_controls__next;

        nextElement.append(_this._ys_e_controls__next);

        // Move Dots to destiny
        if (_this._ys_options.dotsElement !== undefined && _this._ys_options.dotsElement) {
            $(_this._ys_options.dotsElement).append(this._ys_e_controls__dots);
        }

        // Check Prev click
        $(prevElement).on('click', function () {
            _this.movePrev();
        });

        // Check Next click
        $(nextElement).on('click', function () {
            _this.moveNext();
        });

        // Move direction
        if (_this._ys_options.autorun !== undefined && _this._ys_options.autorun) {
            // Autoplay
            // Time elapsed between single slides
            let timeElapsed = (typeof (_this._ys_options.autorun.speed_interval) !== undefined && _this._ys_options.autorun.speed_interval) ?
                _this._ys_options.autorun.speed_interval :
                1000;

            setInterval(function () {
                if (_this._ys_options.autorun.reverse_direction !== undefined && _this._ys_options.autorun.reverse_direction) {
                    _this.movePrev();
                } else {
                    _this.moveNext();
                }
            }, timeElapsed);
        }
    }

    /**
     * Move slide to prev
     */
    movePrev() {
        let _this = this;
        let layerToMove = $(_this._ys_e_container).find('div').first();

        $('.yas-slider-viewport').append(layerToMove);
        layerToMove.css({ "transform": "translateX(-100%)" });

        (async function () {
            await _this._ys_timer(10);
            layerToMove.css({
                "transform": "translateX(0)"
            });
            
            $('.yas-slide').removeClass('--active');
            $(_this._ys_e_container).find('div').last().addClass('--active');
        }());

        _this.moveDots('prev', layerToMove);
    }

    /**
     * Move slide to next
     */
    moveNext() {
        let _this = this;

        let layerToMove = $(_this._ys_e_container).find('div').last();
        layerToMove.css({ "transform": "translateX(-100%)" });

        (async function () {
            await _this._ys_timer(333);
            $(_this._ys_e_container).prepend(layerToMove);
            layerToMove.css({
                "transform": "translateX(0)"
            });

            $('.yas-slide').removeClass('--active');
            $(_this._ys_e_container).find('div').last().addClass('--active');
        }());

        _this.moveDots('next', layerToMove);
    }

    /**
     * Move dots in reference on this slide
     * @param {string} mode 
     * @param {object} layerToMove 
     */
    moveDots(mode, layerToMove) {
        let id = 0;

        switch (mode) {
            case 'next':
                id = parseInt($(layerToMove).attr('id').match(/\d+/)[0]) + 1;
                id = (id !== $(this._ys_container).length) ? id : 0;

                $('.--dot').removeClass('--selected');
                $('#dot-id-' + id).addClass('--selected');
                break;

            case 'prev':
                id = parseInt($(layerToMove).attr('id').match(/\d+/)[0]);
                id = (id !== $(this._ys_container).length) ? id : 3;

                $('.--dot').removeClass('--selected');
                $('#dot-id-' + id).addClass('--selected');
                break;
        }
    }
}