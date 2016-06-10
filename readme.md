# Pixi-Canvas

Pixi wrapped in an API similar to CanvasRenderingContext2D.

## How to use

Pixi-canvas is an almost drop-in solution for accelerating your 2d canvas game with WebGL! Steps to follow:

* Include [pixi.js](https://github.com/pixijs/pixi.js/tree/master/bin) (v3.x.x is recommended) and include pixi-canvas.js in your html file.
* Instead of ```var context = canvas.getContext("2d");``` you call ```var context = canvas.getContext("2d");```
* Now for the part that you must add with pixi-canvas: at the start of your rendering loop you must call ```context.start();``` and at the end you call ```context.flush();```
* That's it! You can now use the context 2d API that's accelerated with Pixi's WebGL implementation!

## Unsupported features

Not all canvas functions were ported. Most notably:
* createImageData
* putImageData
* getImageData
* createPattern
* createLinearGradient
* createRadialGradient
...and a few more. Please check the source.

## Pixi version

Currently Pixi v3 is supported, v4 works partially.

Help implementing the remaining CanvasRenderingContext2D, porting to Pixi v4 and improving general perfomance would be appreciated!