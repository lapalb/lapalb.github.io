	var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        console.log(period);
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };
        TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 8; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period/8;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, 100);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            console.log(elements.length);
            var toRotate = elements[i].getAttribute('data-type');
            console.log(elements[i].getAttribute('data-type'))
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

    // When the user scrolls the page, execute myFunction 

window.onload = function()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    window.onresize = function()
    {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;

        canvas.width = screenWidth;
        canvas.height = screenHeight;

        bgGradient=context.createRadialGradient((screenWidth >> 1), screenHeight >> 1, screenWidth, screenWidth >> 1, screenHeight >> 1, 0);
        bgGradient.addColorStop(1, '#000');
        bgGradient.addColorStop(0.2, '#101010');
    };

    generatePoints();

    window.onresize();

    loop();
};

function generatePoints()
{
    var i = 1000;

    for(i; i > -1; --i)
    {
        var point3D = {x:(1 - Math.random() * 2) * 600, y:(1 - Math.random() * 2) * 600, z:(1 - Math.random() * 2) * 600, vx:0, vy:0, vz:0};

        points.push(point3D);
    }
}

window.getAnimationFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback)
{
    window.setTimeout(callback, 16.6);
};

function loop()
{
    context.globalAlpha = 0.4;
    context.fillStyle = bgGradient;
    context.fillRect(0, 0, screenWidth, screenHeight);
    context.globalAlpha = 1;

    updatePoints();
    renderPoints();
    renderWire();

    step += 0.02;

    getAnimationFrame(loop);
}

function renderPoints()
{
    var i = points.length - 1;

    for(i; i > -1; --i)
    {
        var point = points[i];
        var scale = focalLength / (point.z + focalLength);

        var px = (point.x * scale + (screenWidth >> 1));
        var py = point.y * scale + (screenHeight >> 1);

        drawPoint({x: px, y: py}, scale);
    }
}

function renderWire()
{
    context.globalAlpha = alp;
    context.lineWidth = 1;
    context.strokeStyle = bg2;
    context.beginPath();

    var i = points.length - 1;

    for(i; i > -1; --i)
    {
        var point = points[i];
        var scale = focalLength / (point.z + focalLength);

        if(i === points.length - 1) context.moveTo(point.x * scale + (screenWidth >> 1), point.y * scale + (screenHeight >> 1));
        else context.lineTo(point.x * scale + (screenWidth >> 1), point.y * scale + (screenHeight >> 1));
    }

    if(Math.random() > 0.4) context.stroke();
    context.closePath();
    context.globalAlpha = 1;
}

function updatePoints()
{
    var i = points.length - 1;

    for(i; i > -1; --i)
    {
        var point = points[i];
        point.x += Math.cos(step * 0.4) * 2;
        point.y += Math.sin(step * 0.8) * 2;
        point.z -= 2;

        checkBounds(point);
    }
}

function checkBounds(point)
{
    if(point.x < -2000) point.x = Math.random() * 2000;
    else if(point.x > 2000) point.x = Math.random() * -2000;

    if(point.y < -2000) point.y = Math.random() * 2000;
    else if(point.y > 2000) point.y = Math.random() * -2000;

    if(point.z < -500) point.z = Math.random() * 2400 + 200;
}

function drawPoint(point, scale)
{
    context.globalAlpha = scale;
    context.fillStyle = bg2;
    context.beginPath();
    context.rect(point.x, point.y, (1.6 * scale > 0) ? 1.6 * scale : 1, (1.6 * scale > 0) ? 1.6 * scale : 1);
    context.fill();
    context.closePath();
    context.globalAlpha = 1;
}