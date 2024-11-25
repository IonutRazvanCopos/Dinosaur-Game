const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gravity = 0.5;
const dinoSize = 50, dinoPosition = 140;
const objectHeight = 50, objectWidth = 30;
const objectPosition = 40, objectSpeed = 5;
const landHeight = 10;
const spawnTime = 1000;

let dinoX = 50;
let dinoY = 140;
let isJumping = false;
let jumpSpeed = 0;
let jumping = -8;

let objects = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    ctx.fillRect(0, canvas.height - landHeight, canvas.width, landHeight);

    ctx.fillStyle = 'black';
    ctx.fillRect(dinoX, dinoY, dinoSize, dinoSize);
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        jumpSpeed = jumping;
    }
}

function spawnRandomObject() {
    const object = {
        x: canvas.width,
        y: canvas.height - objectHeight,
        width: objectWidth,
        height: objectPosition
    };
    objects.push(object);
}

setInterval(spawnRandomObject, spawnTime);

function updateObjects() {
    objects.forEach((object) => {
        object.x -= objectSpeed;
    });

    objects = objects.filter((object) => object.x + object.width > 0);
}

function drawObjects() {
    objects.forEach((object) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(object.x, object.y, object.width, object.height);
    });
}

function checkCollision() {
    for (let object of objects) {
        if (
            dinoX < object.x + object.width &&
            dinoX + dinoSize > object.x &&
            dinoY < object.y + object.height &&
            dinoY + dinoSize > object.y
        ) {
            return true;
        }
    }
    return false;
}

function onFrameUpdate() {
    if (isJumping) {
        dinoY += jumpSpeed;
        jumpSpeed += gravity;

        if (dinoY >= dinoPosition) {
            dinoY = dinoPosition;
            isJumping = false;
            jumpSpeed = 0;
        }
    }

    updateObjects();
    if (checkCollision()) {
        return;
    }

    draw();
    drawObjects();
    requestAnimationFrame(onFrameUpdate);
}

window.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

onFrameUpdate();
