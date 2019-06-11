$(document).ready(function() {
  // Set the date we're counting down to
  var countDownDate = new Date("Sep 14, 2019 00:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
      
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = '<span class="count">'+  days + '</span>' + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
      
    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
  
  
  setTimeout(function() {
    $('.count').each(function () {
    var $this = $(this);
    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
      duration: 2000,
      easing: 'swing',
      step: function () {
        $this.text(Math.ceil(this.Counter));
      }
    });
  });
}, 1200);

var canvas = document.querySelector("#scene"),
        ctx = canvas.getContext("2d"),
        particles = [],
        amount = 0,
        mouse = {x:0,y:0},
        radius = 1;

    var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];

    var copy = document.querySelector("#copy-1");

    var ww = canvas.width = window.innerWidth;
    var wh = canvas.height = window.innerHeight;

    function Particle(x,y){
        this.x =  Math.random()*ww;
        this.y =  Math.random()*wh;
        this.dest = {
            x : x,
            y: y
        };
        this.r =  Math.random()*5 + 2;
        this.vx = (Math.random()-0.5)*20;
        this.vy = (Math.random()-0.5)*20;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random()*0.05 + 0.94;

        this.color = colors[Math.floor(Math.random()*6)];
    }

    Particle.prototype.render = function() {


        this.accX = (this.dest.x - this.x)/1000;
        this.accY = (this.dest.y - this.y)/1000;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y +=  this.vy;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.fill();

        var a = this.x - mouse.x;
        var b = this.y - mouse.y;

        var distance = Math.sqrt( a*a + b*b );
        if(distance<(radius*70)){
            this.accX = (this.x - mouse.x)/100;
            this.accY = (this.y - mouse.y)/100;
            this.vx += this.accX;
            this.vy += this.accY;
        }

    }

    function onMouseMove(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    function onTouchMove(e){
    if(e.touches.length > 0 ){
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
    }

function onTouchEnd(e){
  mouse.x = -9999;
  mouse.y = -9999;
}

    function initScene(){
        ww = canvas.width = window.innerWidth;
        wh = canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold "+(ww/10)+"px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(copy.value, ww/2, wh/2);

        var data  = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";

        particles = [];
        for(var i=0;i<ww;i+=Math.round(ww/150)){
            for(var j=0;j<wh;j+=Math.round(ww/150)){
                if(data[ ((i + j*ww)*4) + 3] > 150){
                    particles.push(new Particle(i,j));
                }
            }
        }
        amount = particles.length;

    }

    function onMouseClick(){
        radius++;
        if(radius ===5){
            radius = 0;
        }
    }

    function render(a) {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < amount; i++) {
            particles[i].render();
        }
    };

    copy.addEventListener("keyup", initScene);
    window.addEventListener("resize", initScene);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("click", onMouseClick);
    window.addEventListener("touchend", onTouchEnd);
    initScene();
    requestAnimationFrame(render);


});
