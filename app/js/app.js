
import * as player from "./controller/player.js";
import { constant as con } from "./constants.js";



var context, canvas;
var canvas = document.querySelector("canvas");
context = canvas.getContext("2d");

var  preEvent, currEvent;
var movementX, movementY;

context.canvas.width = con.screenWidth;
context.canvas.height = con.screenHeight;

setInterval(function () {

    if(preEvent && currEvent){
        movementX = (preEvent.screenX)
    }

    player.loop();
    context.fillStyle = "#202020";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);// x, y, width, height
    context.fillStyle = "#ff0000";// hex for red
    context.beginPath();
    context.rect(player.stats.x, player.stats.y, player.stats.width, player.stats.height);
    context.fill();
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, con.lineY);
    context.lineTo(context.canvas.width, con.lineY);
    context.stroke();
}, 20);

window.addEventListener("keydown", player.controller.keyListener);
window.addEventListener("keyup", player.controller.keyListener);
window.addEventListener("mousedown", function (event) {
    var rect = getMousePos(event);
    player.stats.mouseOffset.x = rect.x - player.stats.x;
    player.stats.mouseOffset.y = rect.y - player.stats.y;
    player.controller.mouseListener(event, rect);
});
window.addEventListener("mouseup", function (event) {
    var rect = getMousePos(event);
    player.controller.mouseListener(event, rect);
});
window.addEventListener("mousemove", function (event) {
    var rect = getMousePos(event);
    player.controller.mouseListener(event, rect);
});

function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}