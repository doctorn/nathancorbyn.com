'use strict';

let scale = window.devicePixelRatio;

function loadImage(src) {
    const image = new Image();
    image.src = src;
    return image;
}

const BASE_LINE = 450;
const GRAVITY = 400;

const LEAF_IMAGES = [
    loadImage("./res/leaf_0.png"),
    loadImage("./res/leaf_1.png"),
    loadImage("./res/leaf_2.png"),
];

const CLOUD_IMAGES = [
    loadImage("./res/clouds_0.png"),
    loadImage("./res/clouds_1.png"),
];

const GROUND_IMAGE = loadImage("./res/ground.png")

const GROUND_IMAGE_WIDTH = 64;
const CLOUD_IMAGE_WIDTH = 128;

const ZOE_IMAGES = [
    loadImage("./res/zoe.png"),
];

var leaves = [];

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var clouds = {
    foregroundOffset: 0,
    backgroundOffset: 0,
};

context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;
context.msImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;

function createLeaf(x, y) {
    const ANGLE_VARIATION = 60;
    let angle = ANGLE_VARIATION * Math.random();

    let speedModifier = Math.random();
    let speedVariation = (500 * speedModifier * speedModifier) - 250;

    let speedXComponent = Math.cos(angle) * speedVariation;
    let speedYComponent = Math.sin(angle) * speedVariation;

    const BASE_DRAG = 0.005;
    let dragModifier = Math.random();
    let dragVariation = 0.02 * dragModifier * dragModifier;
    let drag = BASE_DRAG + dragVariation;

    let image = LEAF_IMAGES[Math.floor(Math.random() * LEAF_IMAGES.length)];

    var leaf = {
	position: { x: x, y: y },
	velocity: { x: speedXComponent, y: 0.0 + speedYComponent },
	angularVelocity: 5 * (2 * Math.random() - 1),
	rotation: 2 * Math.PI * Math.random(),
	drag: { x: drag , y: BASE_DRAG },
	image: image,
	timeout: 0,
    };

    leaves.push(leaf);
}

function updateLeaf(leaf, time) {
    const LEAF_LIFETIME = 4;

    if (leaf.position.y >= BASE_LINE) {
	leaf.position.y = BASE_LINE;

	leaf.timeout += time;

	if (leaf.timeout > LEAF_LIFETIME) {
	    leaves.splice(leaves.indexOf(leaf), 1);
	}

	return;
    }

    leaf.velocity.y += time * GRAVITY;

    let dragX = time * leaf.drag.x * leaf.velocity.x * leaf.velocity.x;
    let dragY = time * leaf.drag.y * leaf.velocity.y * leaf.velocity.y;

    if (leaf.velocity.x > 0) {
	leaf.velocity.x -= dragX;
    } else if (leaf.velocity.x < 0) {
	leaf.velocity.x += dragX;
    }

    if (leaf.velocity.y > 0) {
	leaf.velocity.y -= dragY;
    } else if (leaf.velocity.y < 0) {
	leaf.velocity.y += dragY;
    }

    leaf.position.x += time * leaf.velocity.x;
    leaf.position.y += time * leaf.velocity.y;

    leaf.rotation += time * leaf.angularVelocity;
}

function drawLeaf(leaf) {
    const LEAF_IMAGE_WIDTH = 32;
    const LEAF_IMAGE_HEIGHT = 32;

    context.translate(leaf.position.x, leaf.position.y);
    context.rotate(leaf.rotation);

    context.drawImage(
	leaf.image,
	-LEAF_IMAGE_WIDTH / 2,
	-LEAF_IMAGE_HEIGHT / 2,
	LEAF_IMAGE_WIDTH,
	LEAF_IMAGE_HEIGHT
    );

    context.rotate(-leaf.rotation);
    context.translate(-leaf.position.x, -leaf.position.y);
}

function drawGround() {
    context.beginPath();
    context.rect(0, BASE_LINE + GROUND_IMAGE_WIDTH, canvas.width, canvas.height);
    context.fill();

    for (var i = 0; i < canvas.width; i += GROUND_IMAGE_WIDTH) {
	context.drawImage(GROUND_IMAGE, i, BASE_LINE);
    }
}

function drawZoe() {
    context.drawImage(ZOE_IMAGES[0], 200, BASE_LINE - 126);
}

function drawClouds() {
    const ADJUSTMENT = 2;

    for (var i = -CLOUD_IMAGE_WIDTH; i < canvas.width; i += CLOUD_IMAGE_WIDTH) {
	context.drawImage(CLOUD_IMAGES[0], i + clouds.backgroundOffset, BASE_LINE - CLOUD_IMAGE_WIDTH + ADJUSTMENT);
    }

    for (var i = -CLOUD_IMAGE_WIDTH; i < canvas.width; i += CLOUD_IMAGE_WIDTH) {
	context.drawImage(CLOUD_IMAGES[1], i + clouds.foregroundOffset, BASE_LINE - CLOUD_IMAGE_WIDTH + ADJUSTMENT);
    }
}

function update(time) {
    for (let leaf of leaves) {
	updateLeaf(leaf, time);
    }

    clouds.foregroundOffset += 8 * time;
    clouds.backgroundOffset += 2 * time;

    clouds.foregroundOffset %= CLOUD_IMAGE_WIDTH;
    clouds.backgroundOffset %= CLOUD_IMAGE_WIDTH;
}

function draw() {
    canvas.width = Math.floor(document.body.clientWidth);
    canvas.height = Math.floor(document.body.clientHeight);

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawClouds();
    drawZoe();
    drawGround();

    for (let leaf of leaves) {
	drawLeaf(leaf);
    }
}

document.body.addEventListener('click', event => {
    const x = event.clientX;
    const y = event.clientY;

    if (y < BASE_LINE) {
	for (var i = 0; i < 100; i++) {
	    createLeaf(x, y);
	}
    }
});

setInterval(() => {
    update(0.01);
    draw();
}, 10);
