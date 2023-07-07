import Photo from './assets/img/img1.jpg';

import 'normalize.css';
import './components/main.scss';


function addImage(img) {
    const image = document.createElement("img");
    image.src = img;
    document.body.appendChild(image)
}

addImage(Photo)


//GWIAZDY ANIMACJA

// const canvas = document.querySelector("#canvas");
// const ctx = canvas.getContext("2d");



// ctx.beginPath();
// ctx.lineWidth = 3;
// ctx.strokeStyle = "#00ff00"
// ctx.moveTo(50, 50);
// ctx.lineTo(100, 100);
// ctx.lineTo(200, 100);
// ctx.lineTo(75, 75);
// ctx.stroke();

// const canvas1 = document.querySelector("#canvas1");
// const ctx1 = canvas1.getContext("2d");

// class Sky {
//     constructor(canvas) {
//         this.canvas = canvas;
//         this.ctx = canvas.getContext('2d');
//         this.width = window.innerWidth;
//         this.height = window.innerHeight;
//     }

//     initCanvas() {
//         this.canvas.width = this.width;
//         this.canvas.height = this.height;
//         this.ctx.fillStyle = "#000000";
//         this.ctx.fillRect(0, 0, this.width, this.height)
//     }

//     generateStars(count) {
//         let stars = [];

//         for (let i = 0; i < count; i++) {
//             const radius = Math.random() * 3 + 2;

//             stars.push({
//                 x: Math.random() * this.width,
//                 y: Math.random() * this.height,
//                 radius: radius,
//                 originalradius: radius,
//                 color: "#fff",
//                 speed: Math.random() + 0.25,
//             })
//         }

//         this.stars = stars;

//     }

//     drawStars() {
//         this.stars.forEach(star => this.drawStar(star))
//     }

//     drawStar(star) {
//         this.ctx.save();
//         this.ctx.fillStyle = star.color;
//         this.ctx.beginPath();
//         this.ctx.translate(star.x, star.y);
//         this.ctx.moveTo(0, 0 - star.radius);

//         for (let i = 0; i < 5; i++) {
//             this.ctx.rotate((Math.PI / 180) * 36);
//             this.ctx.lineTo(0, 0 - star.radius * 0.75);
//             this.ctx.rotate((Math.PI / 180) * 36);
//             this.ctx.lineTo(0, 0 - star.radius);
//         }

//         this.ctx.fill();

//         this.ctx.restore();
//     }

//     updateStars() {
//         this.stars.forEach(star => {
//             star.x += star.speed;
//             star.y -= star.speed * ((this.width / 2) - star.x) / 3000;
//             star.radius = star.originalradius * (Math.random() / 5 + 0.9);

//             if (star.x > this.width + 2 * star.radius) {
//                 star.x = -2 * star.radius;
//             }
//         })
//     }

//     drawOverlayer() {
//         let gradient = this.ctx.createRadialGradient(this.width / 2, this.height / 2, 250, this.width / 2, this.height / 2, this.width / 2)
//         gradient.addColorStop(0, "rgba(0,0,0,0)");
//         gradient.addColorStop(1, "rgba(0,0,0,0.75)");


//         this.ctx.fillStyle = gradient;
//         this.ctx.fillRect(0, 0, this.width, this.height)
//     }

//     clearCanvas() {
//         this.ctx.fillStyle = "#000";
//         this.ctx.fillRect(0, 0, this.width, this.height)
//     }

//     draw() {

//         this.clearCanvas()
//         this.drawStars();
//         this.updateStars();

//         this.drawOverlayer();

//         window.requestAnimationFrame(() => this.draw());

//     }

//     run() {
//         this.initCanvas();
//         this.generateStars(500);
//         this.draw();
//         this.drawStars();
//         // this.drawStar({
//         //     x: 100,
//         //     y: 100,
//         //     color: "#00ff00",
//         //     radius: 50,
//         // })
//     }
// }

// const sky = new Sky(document.querySelector("#canvas1"));
// sky.run();


//Na wszeliki Wypadek



let hue = 0;

class Animation {
    constructor(canvas) {
        this.canvas = document.querySelector(`${canvas}`)
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;

        this.canvas.height = window.innerHeight;
        this.mouseX = undefined;
        this.mouseY = undefined;
        this.particlesArray = [];

        this.initCanvas();
        this.animate();


        window.addEventListener("resize", (e) => {

            this.canvas.width = e.target.window.innerWidth;
            this.canvas.height = e.target.window.innerHeight;

        });

        this.canvas.addEventListener("click", (event) => {

            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            for (let i = 0; i < 10; i++) {
                this.particlesArray.push(new Particle(this.mouseX, this.mouseY));

            }

        });

        this.canvas.addEventListener("mousemove", (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;

            for (let i = 0; i < 10; i++) {
                this.particlesArray.push(new Particle(this.mouseX, this.mouseY));

            }

        });

    }



    initCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.fillStyle = "#00ff00";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
    initParticles(mouse) {
        for (let i = 0; i < 10; i++) {
            this.particlesArray.push(new Particle())
        }
    };


    handleParticles() {
        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update();
            this.particlesArray[i].draw();

            if (this.particlesArray[i].size <= 0.3) {
                this.particlesArray.splice(i, 1);
                i--;
            }
        }
    };

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.fillStyle = "rgba(0,0,0,0.05)";
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.handleParticles();
        hue += 0.5;
        window.requestAnimationFrame(() => this.animate());
    }
}


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.x = Math.random() * canvas2.width;
        // this.x = Math.random() * 100;
        // this.y = Math.random() * 100;
        this.ctx = canvas2.getContext("2d");
        this.size = Math.random() * 10 + 1;

        this.color = `hsl(${hue}, 100%, 50%)`
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;

    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        if (this.hue >= 360) this.hue = 0;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

const animation = new Animation("#canvas2")
