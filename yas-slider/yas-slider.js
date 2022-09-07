(function ($) {
    "use strict";

    $.fn.yasSlider = function (options) {
        let _ys_slider = new YasSlider();
    };
})(jQuery);

class YasSlider {
    _ys_e_content = null;
    _ys_e_container = null;
    _ys_e_controls = null;
    _ys_e_controls__prev = null;
    _ys_e_controls__next = null;
    _ys_e_controls__dots = null;

    _ys_container = [];
    _ys_timer = null;
    constructor() {
        try {
            this._ys_e_content = $("[yas-slider]");

            if (this._ys_e_content.length === 0)
                throw new Error('Main element [yas-slider] not defined');

            if ($(this._ys_e_content).find("img,div").length === 0)
                throw new Error('Main element [yas-slider] cannot be empty');

            this._ys_timer = ms => new Promise(res => setTimeout(res, ms));
            $(this._ys_e_content).addClass('yas-slider-main');
            this.createSliderViewport();
            this.createSliderControls();
            this.getElements();
            this.controlsListener();
        } catch (e) {
            console.error(e.name + ': ' + e.message);
            return false;
        }
        return true;
    }

    async createSliderViewport() {
        $(this._ys_e_content).append(
            $(this.createElement('div', 'yas-slider-viewport'))
        ); this._ys_e_container = $('.yas-slider-viewport');
    }

    async createSliderControls() {
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

    getElements() {
        let _this = this;
        $(_this._ys_e_content).find("img,div").each(function (iteration, element) {
            if ($(element)[0].nodeName === 'IMG') {
                _this._ys_e_container.prepend(
                    _this.createElement('div', 'yas-slide', 'yas-slide-id-' + iteration, 'style="background-image: url(' + $(element).attr('src') + ');"')
                );
                _this._ys_container.push($('#yas-slide-id-' + iteration));
                // Append dots
                _this._ys_e_controls__dots.append(
                    $(_this.createElement('div', '--dot'))
                );
                $('.--dot').first().addClass('--selected');
                // Remove element
                $(element).remove();
            }
        });
    }

    createElement(type, className, idName, attribute, content) {
        let idFiltered = (idName != undefined) ? 'id="' + idName + '"' : '';
        let attributeFiltered = (attribute != undefined) ? attribute : '';
        let contentFiltered = (content != undefined) ? content : '';
        return '<' + type + ' class="' + className + '" ' + idFiltered + ' ' + attributeFiltered + '>' + contentFiltered + '</' + type + '>'
    }

    controlsListener() {
        let _this = this;

        $(_this._ys_e_controls__prev).on('click', function () {
            console.log("controlListenerPrev") 
            _this.movePrev(); 
        });

        $(_this._ys_e_controls__next).on('click', function () {
            console.log("controlListenerNext") 
            _this.moveNext();
        });

        // setInterval(function(){ 
        //     _this.moveNext();
        // },5000);
    }

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
        }());
    }

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
        }());
    }
}
