let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function paddle(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hasCollidedWith = function(ball){
        let paddleLeftWall = this.x;
        let paddleRightWall = this.x + this.width;
        let paddleTopWall = this.y;
        let paddleBottomWall = this.y + this.height;
        if(ball.x > paddleLeftWall && ball.x < paddleRightWall
        && ball.y > paddleTopWall && ball.y < paddleBottomWall) return true;

        return false
    }
}
let player = new paddle(5, 200, 25, 100);
let ai = new paddle(610, 200, 25, 100);

let ball = {x: 320, y: 240, radius: 5.5, xSpeed: 2.5, ySpeed: 0.5,
    reverseX: function(){
        this.xSpeed *= -1;
    },
    reverseY: function(){
        this.ySpeed *= -1
    }

};


function tick(){
    updateGame();
    draw();
    window.setTimeout("tick()", 1000/60);
}

function updateGame(){
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
    if(player.hasCollidedWith(ball) || ai.hasCollidedWith(ball)){
        ball.reverseX();
        ball.reverseY();
    }
}


function draw(){
    ctx.fillStyle = "darkblue";
    ctx.fillRect(0, 0, 640, 480);
    renderPaddle(player);
    renderPaddle(ai);
    renderBall(ball);
}
function renderPaddle(paddle){
    ctx.fillStyle = "white";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
function renderBall(ball){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill()
}


tick();



