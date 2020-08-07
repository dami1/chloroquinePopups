// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/FUI7HEEz9B0

let angle = 0;
let bozozo;
let train;
let d = 0;
let cam;
let fov;
let cameraZ;
let trans;
let innerX =0;
let graphics;
let geno;
let guit;
let guit1;
function preload() {
  cam = createVideo('bozo1.mp4');
  guit = loadSound('guitarLoop.mp3');
  guit1 = loadSound('guitarLoop.mp3');
  train = loadModel('cartela.obj');
  font =  loadFont('Bebas-Regular.otf');
}

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight, WEBGL);
   //canvas.autoClear = false;
  guit.play();
  guit.setVolume(0);
  guit.rate(0.01);
  guit.loop();
  guit1.play();
  guit1.setVolume(0);
  guit1.rate(0.1);
  guit1.loop();

  //cam = createVideo(bozozo);
  cam.loop();
  cam.size(600, 600);
  cam.hide();
  Pd.start();
  geno = createGraphics(600, 600);
  //love.background(255, 100);
  geno.fill(255);
  geno.textAlign(CENTER, CENTER);
  geno.textSize(64);
  geno.text('GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA GENOCIDA', 150, 150);
  geno.textFont(font);
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(324);
  background(0);
/*
var frame;
frame = createElement("iframe");
frame.attribute("src","https://noticias.uol.com.br/colunas/leonardo-sakamoto/2020/07/27/saude-de-bolsonaro-mostrou-que-cloroquina-nao-e-eficaz-diz-infectologista.htm")
frame.attribute("frameborder","0");
frame.position(windowWidth*0.25, windowHeight*0.65);
frame.size(570, height*0.3);
frame.show();
*/
}

function draw() {
//  background(0);

  d  = map(mouseX, 0, windowWidth, 0.2, 5);
  ambientLight(255, 255, 255);
  //directionalLight(255, 0, 255, 0, 0, 1);
// counter++;
//translate(windowWidth/2, windowHeight/2,0);
let use = map(mouseX, 0, windowHeight, -200,-10);

let use2 = map(mouseY, 0, windowHeight, 500,900);
//camera(use, use2, (height/2) / tan(PI/6)+use, 0, 0, 0, 0, 1, 0);
fov = PI/3;
//trans = map(mouseX, 0, windowWidth, 0, 90);
cameraZ = (height/2.0) / tan(fov/2.0);
//perspective(fov, windowWidth/windowHeight, cameraZ/10.0+use*10, cameraZ*40.0+use2*10);

rotateX(90);
//rotateY(90);
translate(-20, 350,300);
if(mouseIsPressed){background(0)};
imageMode('CENTER');
   //rotateX(angle*TWO_PI/360);
  //rotateY(angle * 1.3);
  rotateZ(angle * 0.7);
  noStroke();
  scale(4.5);
  tint(255,angle%255,angle%255)
  texture(cam);
  //box(100);

  let telaX = window.screenX;
  let telaY = window.screenY+1;
  let telaDentroX = window.innerWidth;
  let telaDentroY = window.innerHeight;

  Pd.send("telaDentroX", [telaDentroX]);
  Pd.send("telaDentroY", [telaDentroY]);

  angle += map(telaX, 0, windowWidth, 0.001, 2);
  let speed = map(telaY, 0.001, windowHeight, 0.3,4);
  cam.speed(abs(speed));
  if(telaX <= 200){Pd.send('windowX1', [1])}else{Pd.send('windowX1', [0])};
  if(telaX >= 201 && telaX <= 400 ){Pd.send('windowX2', [1])}else{Pd.send('windowX2', [0])};;
  if(telaX >= 201 && telaX <= 400 ){Pd.send('windowX3', [1])}else{Pd.send('windowX3', [0])};;
  if(telaX >= 401 && telaX <= 600 ){Pd.send('windowX4', [1])}else{Pd.send('windowX4', [0])};;
  if(telaX >= 601 && telaX <= 800 ){Pd.send('windowX5', [1])}else{Pd.send('windowX5', [0])};;
  if(telaX >= 801 && telaX <= 1000 ){Pd.send('windowX6', [1])}else{Pd.send('windowX6', [0])};;
  if(telaX >= 1001 && telaX <= 1200 ){Pd.send('windowX7', [1])}else{Pd.send('windowX7', [0])};;
  if(telaX >= 1201 && telaX <= 1400 ){Pd.send('windowX8', [1])}else{Pd.send('windowX8', [0])};;
  if(telaX >= 1401 && telaX <= 1600 ){Pd.send('windowX9', [1])}else{Pd.send('windowX9', [0])};;
  if(telaX >= 1601){Pd.send('windowX10', [1])}else{Pd.send('windowX10', [0])};;
  Pd.send("telaY", [telaY]);
  Pd.send("telaX", [telaX]);

  if(telaY <= 200){Pd.send('windowY1', [1])}else{Pd.send('windowX1', [0])};
  let volY = map(telaY, 0 , windowHeight, 0, 1);
  Pd.send("volY", [volY]);
  let vol = 0;
    if(angle%30 >= 12){
      background(0);
       Pd.send('clear', [1]);
       texture(geno);
       box(1000);
       text("GENOCÍDA", windowWidth/2, windowHeight/2);
       text("GENOCÍDA", windowWidth/2, windowHeight/2);
       text("GENOCÍDA", mouseX, mouseY);
       Pd.send("camada2", [1]);
       if(telaX<=windowHeight/2){

       guit1.setVolume(0.6);
       guit.setVolume(0.6);
     }
       cam.volume(0);

     }else{
       Pd.send('clear', [0])
       guit.setVolume(0);
       guit1.setVolume(0.2);
       vol = (angle % 3); //map(mouseX,0,360,0,1);
       cam.volume(abs(vol/3));
       Pd.send("camada2", [0]);
     };

  model(train);
//if(telaX >= 1000){window.moveTo(0, 0)};
  //print(angle);

//if(mouseIsPressed){cam.volume(0.7)}else{cam.volume(0);}
//rect(200,200,mouseX,mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
//function window(){ innerX = window.InnerWidth;}
