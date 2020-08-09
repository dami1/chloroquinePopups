// in this sketch we're going to create a feedback effect by repeatedly sending the same image back to the shader and performing a slight modification
// click the mouse to get things started

// the shader variable
let camShader;

// the camera variable
let cam;
let bozo;
// we will need at least two layers for this effect
let shaderLayer;
let copyLayer;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
  cam = createVideo('bozo1.mp4');
}

const btn = document.querySelector('button'),
  chunks = [];

function record() {
  chunks.length = 0;
  let stream = document.querySelector('canvas').captureStream(30),
    recorder = new MediaRecorder(stream);
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = exportVideo;
  btn.onclick = e => {
    recorder.stop();
    btn.textContent = 'start recording';
    btn.onclick = record;
  };
  recorder.start();
  btn.textContent = 'stop recording';
}

function exportVideo(e) {
  var blob = new Blob(chunks);
  var vid = document.createElement('video');
  vid.id = 'recorded'
  vid.controls = true;
  vid.src = URL.createObjectURL(blob);
  document.body.appendChild(vid);
  vid.play();
}

btn.onclick = record;



function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight);
  noStroke();
  Pd.start();
  // initialize the webcam at the window size
  //cam = createVideo('bozo1.mp4');
  cam.size(windowWidth, windowHeight);
  cam.loop();
  // hide the html element that createCapture adds to the screen
  cam.hide();

  // this layer will use webgl with our shader
  shaderLayer = createGraphics(windowWidth, windowHeight, WEBGL);

  // this layer will just be a copy of what we just did with the shader
  copyLayer = createGraphics(windowWidth, windowHeight);

}

function draw() {
  // shader() sets the active shader with our shader
  shaderLayer.shader(camShader);

  // lets just send the cam to our shader as a uniform
  camShader.setUniform('tex0', cam);

  // also send the copy layer to the shader as a uniform
  camShader.setUniform('tex1', copyLayer);

  // send mouseIsPressed to the shader as a int (either 0 or 1)
  camShader.setUniform('mouseDown', int(mouseIsPressed));

  camShader.setUniform('time', frameCount * 0.01);

  // rect gives us some geometry on the screen
  shaderLayer.rect(0,0,width, height);

  // draw the shaderlayer into the copy layer
  copyLayer.image(shaderLayer, 0,0,mouseX, height);
///  tint(255,255,255,120);
  // render the shaderlayer to the screen
  image(shaderLayer, 0,0,width, height);
  filter(THRESHOLD);
  //filter(BLUR,3);
  textSize(24);
  text("Click to bring in new frames", 50,50);

  let telaX = window.screenX;
  let telaY = window.screenY;
  let telaDentroX = window.innerWidth;
  let telaDentroY = window.innerHeight;
  let oscPD1 = map(telaX,0, windowWidth,80,1700);
  let oscPD2 = map(telaY,0, windowHeight,1,70);
  Pd.send("telaDentroY", [oscPD1]);
  Pd.send("telaDentroX", [oscPD2]);

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


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
