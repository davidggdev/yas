# YAS

![snapshot](http://davidggdev.es/images/snapshot_01.jpg)

Yet Another Slider is a jQuery plugin to create sliders with images. 
very basic and made mostly as a test to adapt new coding styles.  

PAY ATTENTION

This software is in a fully alpha version and its stability, performance or 
side effects is not assured.
 
# Updates

Only sumatory versions log.

---

![](https://img.shields.io/badge/UPDATE-2022/09/08-red?style=for-the-badge) 
![](https://img.shields.io/badge/Alpha_1_complete-2022/09/07-red?style=for-the-badge&logo=esbuild&labelColor=1e485a&logoColor=white) 

- [x] Slide 
- [x] [Options](#Options)
    - [x] autoplay
    - [x] custom elements prev/next
- [x] Make dots come live!
- [x] Set class selected to element in viewport 

---

![](https://img.shields.io/badge/UPDATE-2022/09/07-red?style=for-the-badge) 
![](https://img.shields.io/badge/Alpha_1_init-2022/09/07-red?style=for-the-badge&logo=esbuild&labelColor=1e485a&logoColor=white) 
 
Setup proyect and repository

## Getting Started

To use this plugin it is necessary to include the latest version of jQuery 
currently available in [3.x](https://releases.jquery.com/)

You must include/copy the plugin, which is currently located in the directory

    yas-slider/yas-slider.js
  
Finally, the css file must be linked/copy:

    style.css

This is generated from a Sass compiler from the source file style.scss. 
Currently the styles applied are example styles and we try to keep the responsibility for
the size to the developer to apply their own customization styles. 
 

## Running 

To create a new instance it is necessary to create a div with the data-attribute
of [yas-slider] and inside it must contain the images that we want to show in the 
show in the slider:

```html
<div class="my-slider" yas-slider>
    <img src="assets/slider/alain-bonnardeaux-nWMAakp1dKU-unsplash-min.jpg" alt="">
    <img src="assets/slider/kentaro-toma-gG917yFiR-U-unsplash-min.jpg" alt="">
    <img src="assets/slider/pawel-czerwinski-Sw-m6aYWPFw-unsplash-min.jpg" alt=""> 
</div>
```

It is important to note that currently it only works with img elements only. 
The slider transforms into divs with a series of options and setting 
the image as background-image.

Then in our javascript we will create the instance:


 ```javascript
 $(function($){
    "use strict";

    // yasSlider instance
    $('.my-slider').yasSlider({});
});
 ```

## <a name="Options"></a>Options

It is possible to pass a series of options to configure 
certain attributes of the slider.

Currently it is possible to activate the autorun and define the 
direction and time between slides.
 
Additionally you can customize the elements where to move the slider controls 
to place them where needed. It is important to remember that when activating a 
custom control the default element will no longer have any effect and functionality.

This is an example of how you can customize a slider by replacing 
the predefined controls:

In the js instance:
 ```javascript
 $(function($){
    "use strict";

    // yasSlider instance
    $('.my-slider').yasSlider({
        autorun : {                         // Active autorun slide
            reverse_direction : false,      // Value by default LTR
            speed_interval : 1000           // Speed between slides
        },
        prevElement : $('.prev'),           // Custom html element Pre control
        nextElement : $('.next'),           // Custom html element Next control
        dotsElement : $('.dots')            // Custom html element Dots control
    });
});
 ```

And the html:
```html
<div class="my-slider" yas-slider>
    <img src="assets/slider/alain-bonnardeaux-nWMAakp1dKU-unsplash-min.jpg" alt="">
    <img src="assets/slider/kentaro-toma-gG917yFiR-U-unsplash-min.jpg" alt="">
    <img src="assets/slider/pawel-czerwinski-Sw-m6aYWPFw-unsplash-min.jpg" alt="">
</div>

<div class="my-slider__controls">
    <div class="prev">Prev</div>
    <div class="dots"></div>
    <div class="next">Next</div>
</div>
```

Some sass:
```scss
.my-slider__controls{
    background-color: #121212;
    display: block;
    padding: 10px;
    text-align: center;
    margin: 0 auto;
    .prev{
        display: inline-block;
        padding: 7px; 
        color: #c2c2c2;
        vertical-align: top;
        background: #413152;
        font-family: monospace;
        cursor: pointer;
        transition: all .333s linear;
        &:active{
            transform: translateY(2px);
        }
    }
    .next{
        display: inline-block;
        padding: 7px; 
        color: #c2c2c2;
        vertical-align: top;
        background: #413152;
        font-family: monospace;
        cursor: pointer;
        transition: all .133s linear;
        &:active{
            transform: translateY(2px);
        }
    }
    .dots{
        display: inline-block;
        .yas-slider-controls__dots{
            display: inline-block;
            .--dot {
                display: inline-block;
                width: 8px;
                height: 8px;  
                margin: 10px 15px;
                cursor: pointer;
                background-color: #532d53;
                &.--selected {
                    background-color: #b66dff;
                }
            }
        }
    }
}
```

Ta-da!

![snapshot](http://davidggdev.es/images/snapshot_02.jpg)

## Authors

  - **David González** - *davidggdev@davidggdev.es*
  
## License

MIT License

Copyright (c) [2022] 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 
