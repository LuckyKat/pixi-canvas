# Pixi-Canvas

Pixi wrapped in an API similar to CanvasRenderingContext2D.

## How to use

Pixi-canvas is an almost drop-in solution for accelerating your 2d canvas game with WebGL! Steps to follow:

1. Include [pixi.js](https://github.com/pixijs/pixi.js/tree/master/bin) (v3 is recommended) and include pixi-canvas.js in your html file.
2. Instead of ```var context = canvas.getContext("2d");``` you call ```var context = canvas.getContext("pixi");```
3. At the start of your rendering loop you must call ```context.start();``` and at the end of your draw loop you call ```context.flush();```

That's it! You can now use the context 2d API that's accelerated with Pixi's WebGL implementation!

## Quirks

* The canvas is cleared on every draw loop (unlike the 2d canvas). I'm not sure how to fix that.
* Be careful when using another canvas element as source for drawImage, for example: 


```
var otherCanvas = document.createElement("canvas");

/* ... draw stuff on otherCanvas */

context.drawImage(otherCanvas, x, y);
```

Pixi-canvas converts the source image (otherCanvas) to a PIXI.BaseTexture and saves it as a property called ```texture``` and does that only once. If you update the otherCanvas by drawing on it again, the texture will not be updated! You can force a new texture by setting ```otherCanvas.texture = null;```

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

## To do:

* Implement remaining API functions
* Add Pixi v4 support
* Improve performance
* Clean up repo, move the bunnymark test, replace the borrowed pixi bunny sprite
* Wrap in CommonJS/AMD module (???)


Help implementing the remaining CanvasRenderingContext2D, porting to Pixi v4 and improving general perfomance would be appreciated!