let streams = [];
var symbolSize =20;
var texts = "Hacking in progress";
function setup(){
  var c = createCanvas(window.innerWidth,window.innerHeight);

  background(0);
  for (let i = 0; i < width/symbolSize; i ++){
    var sy = new Stream(round(random(0,1))==0);
    sy.setSymbols(i * symbolSize,random(-300,0));
    streams.push(sy);
  }

}
function draw(){
  background(0,150);
  for ( var sy of streams){
    sy.render();
  }

}
function Symbols(x,y,speed,first,value){
  this.x = x;
  this.y = y;
  if (value){
    this.speed = speed;
  }else{
    this.speed = -speed;
  }
  this.speed = speed;

  this.value;
  this.first = first;
  this.switchInterval = round(random(30,40));

  this.setValue = function(){
    if (frameCount % this.switchInterval == 0){
      this.value = String.fromCharCode(0x30A0 + round(random(0,96)));
    }


  }
  this.rain = function(){
    if (this.y < -600){
      this.y = 600;
    }
    if (this.y > height){
      this.y = 0;
    }else{
      this.y += this.speed;
    }


    //this.y = (this.y <= -600) ? height: this.y+= this.speed;

  }
  this.show = function(){
    if (this.first){
      fill(180,255,200)
    }
    else{fill(0,255,100);}

    textSize(symbolSize);
    text(this.value,this.x,this.y);
  }
}

function Stream(value){
  this.symbols = [];
  this.value = value;
  this.totalLength = random(5,20);
  this.speed = random(3,10);
  var first =  round(random(0,4)) == 1;
  this.setSymbols = function(x1,y1){
    var y = y1;
    var x =x1;
    for (var i = 0;i < this.totalLength;i++){
      var s = new Symbols(x,y,this.speed,first,this.value);
      s.setValue();
      this.symbols.push(s);
      y -= symbolSize;
      first = false;
    }
  this.render = function(){
    for (let i of this.symbols){
      i.setValue();
      i.show();
      i.rain();
    }
  }
}
}
