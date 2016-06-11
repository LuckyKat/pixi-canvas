(function () {
    var canvas = document.getElementById("canvas");
    // var context = canvas.getContext("2d");
    var context = canvas.getContext("pixi");

    var start = function () {
        // make bunnies
        var i;
        for (i = 0; i < 5; ++i) {
            bunnies.push(new Bunny());
        }
        // start
        requestAnimationFrame(update);
    };
    var update = function () {
        var i, l;
        stats.begin();
        if (isAdding) {
            for (i = 0; i < 100; ++i) {
                bunnies.push(new Bunny());
            }
            counter.innerHTML = bunnies.length + " BUNNIES";
        }
        // reset
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (context.start) {
            // start renderer (only for pixi)
            context.start();
        }
        // draw the bunnies
        for (i = 0, l = bunnies.length; i < l; ++i) {
            bunnies[i].update();
            bunnies[i].draw();
        }
        // draw a rect
        // context.globalCompositeOperation = "source-in";
        // context.fillStyle = "red";
        // context.fillRect(32, 32, 64, 64);
        // context.globalCompositeOperation = "source-over";

        // context.font = "64px Calibri";
        // context.strokeStyle = "#000000";
        // // context.fillText("hello world", 96, 96);
        // context.strokeText("hello world", 96, 96);

        // context.beginPath();
        // context.moveTo(32, 32);
        // // context.lineTo(64, 32);
        // // context.lineTo(64, 64);
        // context.arcTo(64, 32, 64, 64, 32);
        // context.lineTo(32, 64);
        // context.closePath();
        // // context.stroke();
        // context.fill();

        if (context.flush) {
            // flush batch (only for pixi)
            context.flush();
        }
        stats.end();
        requestAnimationFrame(update);
    };

    var bunnies = [];
    var isAdding = false;
    var onMouseDown = function () {
        isAdding = true;
    };
    var onMouseUp = function () {
        isAdding = false;
        bunnyType = (bunnyType + 1) % 5;
    };
    var bunnyType = 2;
    var Bunny = function () {
        this.x = 0;
        this.y = 0;
        this.speedX = Math.random() * 5;
        this.speedY = (Math.random() * 10) - 5;
        this.rotation = (Math.random() - 0.5);
        this.alpha = Math.random();

        if (bunnyType === 0) {
            this.frame = {
                x: 2,
                y: 47,
                w: 26,
                h: 37
            };
        } else if (bunnyType === 1) {
            this.frame = {
                x: 2,
                y: 86,
                w: 26,
                h: 37
            };
        } else if (bunnyType === 2) {
            this.frame = {
                x: 2,
                y: 125,
                w: 26,
                h: 37
            };
        } else if (bunnyType === 3) {
            this.frame = {
                x: 2,
                y: 164,
                w: 26,
                h: 37
            };
        } else if (bunnyType === 4) {
            this.frame = {
                x: 2,
                y: 2,
                w: 26,
                h: 37
            };
        }
    };
    Bunny.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.25;

        if (this.x > canvas.width) {
            this.speedX *= -1;
            this.x = canvas.width;
        } else if (this.x < 0) {
            this.speedX *= -1;
            this.x = 0;
        }

        if (this.y > canvas.height) {
            this.speedY *= -0.85;
            this.y = canvas.height;
            if (Math.random() > 0.25) {
                this.speedY -= Math.random() * 3;
            }
        } else if (this.y < 0) {
            this.speedY = 0;
            this.y = 0;
        }
    };
    Bunny.prototype.draw = function () {
        var frame = this.frame;
        // context.save();
        
        // position
        context.translate(this.x, this.y);
        // rotation
        context.rotate(this.rotation);
        // origin
        context.translate(-15, -20);
        // context.globalAlpha = this.alpha;
        context.drawImage(image, frame.x, frame.y, frame.w, frame.h, 0, 0, frame.w, frame.h);
        // context.drawImage(image, 0, 0, 30, 40);

        // it's faster to avoid save and restore! lets try reversing all transforms
        context.translate(15, 20);
        context.rotate(-this.rotation);
        context.translate(-this.x, -this.y);
        // context.restore();
    };
    var stats = new Stats();
    var counter = document.createElement("div");

    document.body.appendChild(stats.domElement);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.top = "0px";
    counter.className = "counter";
    document.body.appendChild(counter);
    counter.innerHTML = 5 + " BUNNIES";

    canvas.width = 800;
    canvas.height = 600;

    // load bunny image and start
    var image = new Image();
    image.src = "bunny.png";
    image.onload = start;

    document.addEventListener("mousedown", onMouseDown, true);
    document.addEventListener("mouseup", onMouseUp, true);
    document.addEventListener("touchstart", onMouseDown, true);
    document.addEventListener("touchend", onMouseUp, true);

})();