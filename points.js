(function (id) {
    const pointsNumber = 500,
        width = window.innerWidth,
        height = window.innerHeight;

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        Point = (function () {
        function Point(x, y) {
            if (!(typeof x === 'undefined' || typeof y === 'undefined')) {
                this.x = x;
                this.y = y;
            } else {
                this.x = Math.round(Math.random() * width);
                this.y = Math.round(Math.random() * height)
            }
        }

        Point.prototype.setRandomMoveSpeed = function () {
            var x = Math.random() - 0.5,
                y = Math.random() - 0.5,
                speed = Math.ceil(Math.random() * 20)/5,
                length = Math.sqrt(x * x + y * y);

            this.vx = x * speed / length;
            this.vy = y * speed / length;
        };

        return Point;
    })();
    ctx.strokeStyle = '#000000';
    canvas.width = width;
    canvas.height = height;
    document.getElementById(id).appendChild(canvas);

    var points = [],
        p;
    for (var i = 0; i < pointsNumber; i += 1) {
        p = new Point();
        p.setRandomMoveSpeed();
        points.push(p);
    }
    draw();
    function draw() {
        canvas.width = canvas.width;
        points.forEach(function (point) {
            ctx.rect(point.x, point.y, 1, 1);
        });
        ctx.stroke();
    }

    function getAcceleration(x, y) {
        var centX = width/ 2,
            centY = height/ 2,
            vx = centX - x,
            vy = centY - y,
            dist = Math.sqrt(vx*vx + vy*vy),
            force = (dist/500)*(dist/500);

        vx *= force/dist;
        vy *= force/dist;

        return {
            x: vx,
            y: vy
        }
    }
    setInterval(function () {
        points.forEach(function (point) {
            var x = point.x + point.vx,
                y = point.y + point.vy;

            const g = 1;
            if (x < 0) {
                point.vx *= -g;
                x = point.x + point.vx;
            }

            if (x >= width) {
                point.vx *= -g;
                x = point.x + point.vx;
            }

            if (y < 0) {
                point.vy *= -g;
                y = point.y + point.vy;
            }

            if (y >= height) {
                point.vy *= -g;
                y = point.y + point.vy;
            }
            point.x = x;
            point.y = y;

            var a =  getAcceleration(x, y);
            point.vx += a.x;
            point.vy += a.y;
            point.vx *= 0.999;
            point.vy *= 0.999;
        });

        draw();
    }, 40);
})('field');