import { constant as con } from "../constants.js";


export var stats, controller, loop;

var currEvent, preEvent;
var movementX, movementY;
stats = {
    height: 32,
    jumping: true,
    width: 32,
    x: con.screenWidth / 2 - 16,
    speedX: 0,
    y: 0,
    speedY: 0,
    gravity: con.gravity,
    friction: con.friction,
    isHeld: false,
    mouseOffset: {
        x:0,
        y:0,
    }

};

controller = {

    left: false,
    right: false,
    up: false,
    held: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {
            case 37: //left
                controller.left = key_state;
                break;
            case 38: //up
                controller.up = key_state;
                break;
            case 39: //right
                controller.right = key_state;
                break;

        }
    },
    mouseListener: function (event, rect) {

        switch (event.type) {
            case "mousedown":
                controller.isHeld = isOnPlayer(rect);
                break;
            case "mouseup":
                controller.isHeld = controller.isHeld ? letGo() : false;
                break;
            case "mousemove":
                if (controller.isHeld) {
                    currEvent = event;
                    stats.gravity = 0;
                    stats.friction = 0;

                    stats.x = rect.x - stats.mouseOffset.x;
                    stats.y = rect.y - stats.mouseOffset.y;
                }
                break;
        }

    }

};

loop = function () {
    if (controller.up && !stats.jumping) {
        stats.speedY -= 40;
        stats.jumping = true;
    }

    if (controller.left) {
        stats.speedX -= 0.8;
    }
    if (controller.right) {
        stats.speedX += 0.8;
    }
    if(preEvent && currEvent){
        movementX = currEvent.screenX - preEvent.screenX;
        movementY = currEvent.screenY - preEvent.screenY;
    }
    preEvent = currEvent;

    stats.speedY += stats.gravity; //gravity
    stats.x += stats.speedX;
    stats.y += stats.speedY;
    stats.speedX *= stats.friction;
    stats.speedY *= stats.friction;


    if (stats.y > con.lineY - stats.height) {
        stats.jumping = false;
        stats.y = con.lineY - stats.height;
        stats.speedY = 0;
    }

    if (stats.x > con.screenWidth) {
        stats.x = -stats.width;
    }
    if (stats.x < -stats.width) {
        stats.x = con.screenWidth;
    }
}

function isOnPlayer(rect) {

    var myleft = stats.x;
    var myright = stats.x + (stats.width);
    var mytop = stats.y;
    var mybottom = stats.y + (stats.height);

    var inside = false;
    if ((rect.x < myright) &&
        (rect.y < mybottom) &&
        (rect.x > myleft) &&
        (rect.y > mytop)) {
        inside = true;
    }

    return inside;
};
function letGo() {
console.log("letGo()");

stats.gravity = con.gravity;
stats.friction = con.friction;

stats.speedX = movementX;
stats.speedY = movementY;

stats.speedY += stats.gravity; //gravity
stats.x += stats.speedX;
stats.y += stats.speedY;
stats.speedX *= stats.friction;
stats.speedY *= stats.friction;


}