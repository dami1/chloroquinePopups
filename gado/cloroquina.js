// fetch("https://pomber.github.io/covid19/timeseries.json")
//   .then(response => response.json())
//   .then(data => {
//     data["Brazil"].forEach(({ date, confirmed, recovered, deaths }) =>
//       console.log(` , ${confirmed - recovered - deaths}`)
//     );
//   });
function realityIsData(){
realidadeDado = window.open('https://editor.p5js.org/dami1bandeira/present/PdfnnVNqk', "_blank", "toolbar=no,scrollbars=yes,resizable=no,top=500,left=500,width=400,height=400");
console.log("abre");
}

function fRealityIsData(){
  realidadeDado.focus();
  //realidadeDado.moveBy(250, 250);                                                 // Sets focus to the new window
  realidadeDado.close();
  console.log("fecha");
}

// function setup(){
// createCanvas(500,500);
// setTimeout(realityIsData,3000);
// setTimeout(fRealityIsData,12000);
// }

const data = [0 , 1  , 2  , 4 , 13, 20, 25 , 31, 38, 52, 151 , 162, 199 , 318, 367, 613, 780, 1004, 1519, 1888, 2199 , 2493, 2902
 , 3319, 3787, 4114, 4300, 5389, 6469, 7593, 8570 , 9788, 10517, 11470, 13221, 15224, 16969, 18408, 19430, 20796, 21929, 20684
 , 12558, 14475, 17515, 20278, 14062, 16026, 17347, 17533, 20132, 22684, 26107, 28662, 31701, 35608, 40040, 45246, 47751, 49402
 , 51784, 55438, 59296, 66653, 71233, 77580, 83720, 86619, 90557, 93156, 98473, 109687, 120359, 128177, 130840, 138056, 147108
 , 156037, 164080, 174412, 182798, 190634, 197592, 208117, 219576, 233880, 247812, 268714, 278980, 285430, 300546, 312851, 325957
 , 343805, 359767, 371351, 292021, 304360, 318820, 331944, 341859, 348358, 355151, 366603, 387943, 387821, 395814, 432328, 440824
 , 444632 , 453468 , 465298, 474332, 493619, 516614, 528882, 540503, 552070, 554129, 570479, 477282, 491292, 522008, 509143
 , 495255, 494836, 505352, 515148, 513068, 524293, 527738, 520883, 529266, 541284, 537932, 539957, 548680, 559829, 524226, 522828
 , 552768, 583080, 564914, 522705, 519174, 508116, 525903, 539329, 562032, 561156, 576332, 576697, 556677, 548618, 571456, 583177
 , 590571, 590398, 577390, 564888, 557266, 554356, 598313, 552016, 586986, 577328, 551954, 546220, 543621, 545353, 563414, 554146];

let on = false;
let index = 0;
let intervalo=0;
let cam;
let graph;
let videoPos = 0;
let addX =0 ;
let addY = 0;
let rectS = 25;
let video_snd;
let wX;
let wY;
let iwX;
let iwY;
let gadoAudio;
let difY = 10;
let difX = 400;
function preload(){
getAudioContext().suspend();
cam = createVideo('assets/gadoR_1_1.mp4');
cam.hide();
// img0 = loadImage('assets/gado0.png');
// img1 = loadImage('assets/gado1.png');
// img2 = loadImage('assets/gado2.png');
gadoAudio = loadSound("assets/gado.mp3");
}
function setup() {
  //tAudioContext().suspend();
  //Pd.start();
  cnv = createCanvas(windowWidth, windowHeight);
  // cnv.mouseOver(start);
  intervalo = setInterval(sum,100);
  setInterval(videoM,100);
  //video = createCapture(VIDEO);
//  video.size(height,width);
  // osc = new p5.TriOsc(); // set frequency and type
  // osc1 = new p5.TriOsc();
   cam.show();
   cam.size(600,600);
   cam.loop();
  // // hide the html element that createCapture adds to the screen
   cam.hide();
  graph = createGraphics(windowWidth,windowHeight);
  cam.time(40);
//  var context = Pd.getAudio().context;
  //video_snd = context.createMediaElementSource(document.getElementsByTagName("VIDEO")[0]);
  delay = new p5.Delay();
  delay.setType('pingPong');
  // mfilter = new p5.BandPass();
  // gadoAudio.connect(mfilter);
  gadoAudio.play();
  gadoAudio.loop();
}

function draw() {

//varáveis da janela

  iwX = window.InnerWidth;
  iwY = window.innerHeight;
  wX = window.screenX;
  wY = window.screenY;
  difX = map(wX,-20,screen.width,300,800);
  difY = map(wY,0,screen.height,5,200);

//imagem vídeo

  pop();
  tint(255,100);
  let demo = image(cam,addX,addY);
  noTint();
  cam.speed(map(index,0,data.length,0.1,4));
  filter(THRESHOLD);

//som

  gadoAudio.rate(map(index,0,data.length,0.8,1.2));
  gadoAudio.setVolume(map(index,0,data.length,0,1.3));
  delay.process(gadoAudio, constrain(map(wX,-20,screen.width,0,0.8),0,0.8), 0.5,map(wY,screen.height,0,200,5000));
  // let freq = map(wX, 0, screen.width, 20, 10000);
  // freq = constrain(freq, 0, 22050);
  // mfilter.freq(freq);
  // mfilter.res(50);

//imagem gráfico

  push();
  graph.rectMode(CENTER);
  graph.fill(200);
  graph.textSize(12);
  graph.fill(0);
  graph.text(data[index], map(index, 0, data.length, 0, width-200), map(data[index], 0, 554146, height, 100)-50);
  graph.rect(map(index, 0, data.length, 0, width-200), map(data[index], 0, 554146, height-20, 100),5,rectS);
  pop();
  graph.beginShape();
  graph.strokeWeight(5);
  graph.noFill();
  for (let i = 0; i < data.length; i++) {
   // map(i, 0, 554146, 0,255);
    graph.stroke(155,0,0,127);
    let x = map(i, 0, data.length, 0, (width)-200);
    let y = map(data[i], 0, 554146, height-20, 100);
   graph.vertex(x, y);
   }
   graph.endShape();
   graph.noStroke();
push();
  image(graph,0,0);
  ///console.log(index);
  }


// movimento do vídeo

function videoM(){
addY = addY + random(1,difY);
if(addY > height-300){
  addY = 0;
  addX = addX + difX;
}
if (addX > width-100){
  addX=0;
}

}


//leitura do array com os dados COVID19 no brasil

function sum(){
  index = index+ 1;
  if (index> data.length){
   index=data.length-30;//[data.length-random(50)];
   graph.translate(random(20),0);
    //graph.background(255);
     for (let i = 0; i < data.length; i++) {

    stroke(0);
    let x = map(i, 0, data.length, 0, width-200);
    let y = map(data[i], 0, 554146, height, 100);
   graph.vertex(x, y);
   }
    rectS = rectS + random(30,50);
   cam.time(random(0,90));
   videoPos = random(100);
   //clearInterval(intervalo);
  }

}

function myFunction() {
  var myWindow = window.open("myTable", "", "toolbar=no,scrollbars=yes,resizable=yes,top=1200,left=500,width=400,height=400");
}

// function start() {
//
//   userStartAudio();
// }

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

// function mousePressed() {
//  myFunction();
// }

function start(){

  // osc.amp(0.1);
  // osc.start();
  // osc1.amp(0.1);
  // osc1.start();

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
