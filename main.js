var cubeRotation = 0.0;

main();

//
// Start here
//

var c;
var c1;

var texture_char;
var texture_chess;
var texture_train;
var texture_trainfront;
var texture_bg;
var texture_rby;
var texture_dphd;
var texture_ychs;
var texture_coin;
var texture_msn;

var points;
var stareq;
var gameover;
var boot_cnt;
var boost_cnt;
var showdog;
var lcnt;

var myMusic;
var grey_cnt;

function main() {


  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  myMusic = new sound("music.mp3");
  myMusic.play();

  jump = 0;
  points = 0;
  stareq = 0;
  gameover = 0;
  boot_cnt = 500;
  boost_cnt = 1000;
  showdog = -1;
  grey_cnt = 1500;
  lcnt = 1500;

  hd = new cube(gl, [0,2.6,0], 0.675, 0.75, 0.5);
  c = new cube(gl, [0,1.5,0], 0.5, 0.25, 0.5);
  lh = new cube(gl, [-0.7,1.65,0], 0.8, 0.4, 0.8);
  rh = new cube(gl, [ 0.7,1.65,0], 0.8, 0.4, 0.8);
  ll = new cube(gl, [-0.3,1.0,-0.52], 0.8, 0, 0.8);
  rl = new cube(gl, [ 0.3,1.0,-0.52], 0.8, 0, 0.8);

  phd = new cube(gl, [0,2.6,5], 0.675, 0.75, 0.5);
  pc = new cube(gl, [0,1.5,5], 0.5, 0.25, 0.5);
  plh = new cube(gl, [-0.7,1.65,5], 0.8, 0.4, 0.8);
  prh = new cube(gl, [ 0.7,1.65,5], 0.8, 0.4, 0.8);
  pll = new cube(gl, [-0.3,1.0,4.48], 0.8, 0, 0.8);
  prl = new cube(gl, [ 0.3,1.0,4.48], 0.8, 0, 0.8);

  winlef = new cylinder(gl, [-3.0, 4, -185], black, brown, 0.1, 4, 0.2);
  winrgt = new cylinder(gl, [ 3.0, 4, -185], black, brown, 0.1, 4, 0.2);
  sign = new train(gl, [0 , 6.5 , -185], -2.2,-0.2,99.8);


  track0 = new track(gl, [-3.0, 0.1, 0.0], corn , tangerine , 0.0);
  track1 = new track(gl, [0.0, 0.1, 0.0], corn, tangerine, 0.0);
  track2 = new track(gl, [3.0, 0.1, 0.0], corn, tangerine, 0.0);

  midway0 = new track(gl, [-1.5, -0.2, 0.0], cornsilk , black , 0.5);
  midway1 = new track(gl, [ 1.5, -0.2, 0.0], black , cornsilk , 0.5);

  trackrod00 = new trackrod(gl, [-3.6, 0.11, 0.0]);
  trackrod01 = new trackrod(gl, [-2.4, 0.11, 0.0]);

  trackrod10 = new trackrod(gl, [-0.6, 0.11, 0.0]);
  trackrod11 = new trackrod(gl, [ 0.6, 0.11, 0.0]);

  trackrod20 = new trackrod(gl, [ 2.4, 0.11, 0.0]);
  trackrod21 = new trackrod(gl, [ 3.6, 0.11, 0.0]);

  planks = [];

  for(var i = 0; i < 100; ++i)
  {
      planks.push(new plank(gl, [-3.0, 0.12, -2*(i-10)], black, brown, 0.2, 0.85, 99.8));
      planks.push(new plank(gl, [ 0.0, 0.12, -2*(i-10)], black, brown, 0.2, 0.85, 99.8));
      planks.push(new plank(gl, [ 3.0, 0.12, -2*(i-10)], black, brown, 0.2, 0.85, 99.8));
  }

  obstacles = [];
  rods = [];

  for(var i = 0; i < 100; ++i)
  {
    var v = 3.0*(Math.floor(Math.random() * 3) - 1);
    obstacles.push(new plank(gl, [v , 1.12, -50*(i+1)], brown, tangerine, 0.2, 0.875, 99.85));
    rods.push(new cylinder(gl, [v-0.8, 0.65, -50*(i+1)], black, brown, 0.1, 0.65, 0.2));
    rods.push(new cylinder(gl, [v+0.8, 0.65, -50*(i+1)], black, brown, 0.1, 0.65, 0.2));
  }

  trains = [];
  trainfronts = [];
  randomarr = [-2.7,0.0,2.7];

  for(var i = 0;i < 30; ++i)
  {
      var v = Math.floor(Math.random() * 3);
      trains.push(new train(gl, [randomarr[v], 2, -100*(i+1)], -0.2,-0.2,97));
      trainfronts.push(new train(gl, [randomarr[v], 2, -100*(i+1)+3.3], -0.2,-0.2,99.7));
  }

  bcg = [];

  for(var i = 0; i < 100; ++i)
  {
    bcg.push(new train(gl, [-6, 3, -10*(i-2)], 0.99,-2.0,95));
    bcg.push(new train(gl, [ 6, 3, -10*(i-2)], 0.99,-2.0,95));
  }

  coinvec = [];
  posrand = [-3.0, 0.0, 3.0];

  for(var i = 0; i < 25; ++i)
  {
    var y = 1 + Math.floor(Math.random() * 3);
    var v = Math.floor(Math.random() * 3);
    for(var j = 0; j < 4; ++j)
      coinvec.push(new coin(gl, [ posrand[v] , y, -20*i-j], tangerine , gold, 0.09, 0.025, 1.0));
  }

  conevec = []; 

  for(var i = 0; i < 10; ++i)
  {
    var v = Math.floor(Math.random() * 3);
    conevec.push(new cone(gl, [ posrand[v] , 0.45, -40*i-10], red, gold, 0.2, 0.45, 0.2));
  }

  shoes = [];
  shoebody = [];

  for(var i = 0; i < 10; ++i)
  {
    var v = Math.floor(Math.random() * 3);
    shoes.push(new cylinder(gl, [ posrand[v] - 0.25, 0.55, -20*i-15], black, red, 0.05, 0.55, 0.05));
    shoebody.push(new plank(gl, [ posrand[v] , 0.25, -20*i-15], black, red, 0.75, 0.75, 99.95))
  }

  pilevec = [];

  for(var i = 0; i < 30; ++i)
  {
    var v = Math.floor(Math.random() * 3);
    // pilevec.push(new pile(gl, [ posrand[v], 0.5, -20*i+3], pinegreen, lawngreen, 0.2,0.5,0.1));
    // pilevec.push(new pile(gl, [ posrand[v], 0.5, -20*i+3.3], pinegreen, lawngreen, 0.2,0.5,0.1));
    // pilevec.push(new pile(gl, [ posrand[v], 0.75, -20*i+3.15], pinegreen, lawngreen, 0.2,0.5,0.1));
    pilevec.push(new pile(gl, [ posrand[v] - 0.3, 0.5, -20*i+3], black, gold, 0.1,0.5,0.2));
    pilevec.push(new pile(gl, [ posrand[v] + 0.3, 0.5, -20*i+3], black, gold, 0.1,0.5,0.2));
    pilevec.push(new pile(gl, [ posrand[v], 0.75, -20*i+3], black, gold, 0.1,0.5,0.2));
  }

  starvec = [];

  for(var i = 0; i < 30; ++i)
  {
    var v = Math.floor(Math.random() * 3);
    starvec.push(new star(gl, [ posrand[v] , 1, -20*i+12], gold, gold, 0.2, 0.2, 0.2));
  }

  dface = new dogface(gl, [ c.pos[0] , 0.5, c.pos[2]+8], black, cornsilk, 0.2, 0.2, 0.5);
  dbd = new pile(gl, [ c.pos[0] , 0.5, c.pos[2]+8], black, cornsilk, 0.2,0.2,0.75);
  dbk = new plank(gl, [ c.pos[0] , 0.5, c.pos[2]+8.9], black, cornsilk, 0.7, 0.7, 99.85);
  //dl1 = new plank(gl, [ c.pos[0]- , 0.5, c.pos[2]+5.5], black, cornsilk, 0.7, 0.7, 99.85)


  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  const vsSource2 = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.65, 0.6, 0.65));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

  // Fragment shader program

  const fsSource2 = `
    varying highp vec2 vTextureCoord;
    uniform sampler2D uSampler;
    void main(void) {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

  const fsSource5 = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

  const shaderProgram2 = initShaderProgram(gl, vsSource2, fsSource2);
  const shaderProgram5 = initShaderProgram(gl, vsSource2, fsSource5);

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const fsSourcebw = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying lowp vec4 vColor;
    void main(void) {
        float gray = (vColor.r + vColor.g + vColor.b) / 3.0;
        vec3 grayscale = vec3(gray);
        gl_FragColor = vec4(grayscale, vColor.a);
    }
  `;

  const fsSourceTexbw = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;
  uniform sampler2D uSampler;
  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    
    vec3 color = texelColor.rgb;
    float gray = (color.r + color.g + color.b) / 3.0;
    vec3 grayscale = vec3(gray);
    gl_FragColor = vec4(grayscale , texelColor.a);
  }
`;

  const shaderProgram3 = initShaderProgram(gl, vsSource, fsSourcebw);
  const shaderProgram4 = initShaderProgram(gl, vsSource2, fsSourceTexbw);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const programInfo2 = {
    program: shaderProgram2,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram2, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram2, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram2, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram2, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram2, 'uSampler'),
    },
  };

  const programInfo3 = {
    program: shaderProgram3,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram3, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram3, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram3, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram3, 'uModelViewMatrix'),
    },
  };

  const programInfo4 = {
  program: shaderProgram4,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram4, 'aVertexPosition'),
    vertexNormal: gl.getAttribLocation(shaderProgram4, 'aVertexNormal'),
    textureCoord: gl.getAttribLocation(shaderProgram4, 'aTextureCoord'),
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram4, 'uProjectionMatrix'),
    modelViewMatrix: gl.getUniformLocation(shaderProgram4, 'uModelViewMatrix'),
    normalMatrix: gl.getUniformLocation(shaderProgram4, 'uNormalMatrix'),
    uSampler: gl.getUniformLocation(shaderProgram4, 'uSampler'),
  },
};

  const programInfo5 = {
  program: shaderProgram5,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram5, 'aVertexPosition'),
    vertexNormal: gl.getAttribLocation(shaderProgram5, 'aVertexNormal'),
    textureCoord: gl.getAttribLocation(shaderProgram5, 'aTextureCoord'),
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram5, 'uProjectionMatrix'),
    modelViewMatrix: gl.getUniformLocation(shaderProgram5, 'uModelViewMatrix'),
    normalMatrix: gl.getUniformLocation(shaderProgram5, 'uNormalMatrix'),
    uSampler: gl.getUniformLocation(shaderProgram5, 'uSampler'),
  },
};  

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  //const buffers

  texture_char = loadTexture(gl,'./chess2.jpg');
  texture_chess = loadTexture(gl,'./chess.jpg');
  texture_train = loadTexture(gl,'./train.jpeg');
  texture_trainfront = loadTexture(gl,'./trainfront.jpeg');
  texture_bg = loadTexture(gl,'./bg.jpg');
  texture_rby = loadTexture(gl,'./rby.jpg');
  texture_dphd = loadTexture(gl,'./dp.jpeg');
  texture_ychs = loadTexture(gl,'./yellowchess.png');
  texture_coin = loadTexture(gl,'./coin.jpg');
  texture_msn = loadTexture(gl,'./abc.jpg');

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    if(gameover == 1)
      return;
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    boot_cnt++;
    boost_cnt++;
    grey_cnt++;
    lcnt++;

    if(lcnt > 300)
    {
      for(var i = 0; i < 200; ++i)
        bcg[i].lighton = 0;
    }

    document.getElementById("pointsdiv").innerHTML = "Score :" + points;
    // document.getElementById("message").innerHTML = "";

    tickall();
    userinput();
    collisionchecker();
    if(grey_cnt > 300)
    {
      if(lcnt > 300 || lcnt%16 > 8)
        drawScene(gl, programInfo, programInfo2, deltaTime);
      else
        drawScene(gl, programInfo, programInfo5, deltaTime);
    }
    else
      drawScene(gl, programInfo3, programInfo4, deltaTime);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
//
// collision checker
//
function collisionchecker()
{

  // collision with coins

  for(var i = 0; i < 100 ; ++i)
  {
    if(distance(c.pos,coinvec[i].pos) < 1.0)
    {
      document.getElementById("message").innerHTML = "Last activity : Coin collected";
      coinvec[i].pos[1] -= 100;
      points += (stareq+1);  
    }
  }

  // collision with stars

  for(var i = 0; i < 30 ; ++i)
  {
    if(distance(c.pos,starvec[i].pos) < 1.0)
    {
      document.getElementById("message").innerHTML = "Last activity : Star collected";
      starvec[i].pos[1] -= 100;
      stareq++;  
    }
  }

  // collision with bushes

  for(var i = 0; i < 90 ; ++i)
  {
    if(distance(c.pos,pilevec[i].pos) < 1.0)
    {
      pilevec[i].pos[1] -= 100;
      if(pc.pos[2] <= 8)
      {
        document.getElementById("message").innerHTML = "Gameover : Caught by Police !!!";
        gameover = 1;
        var ppos = 0;
        pc.pos[2] = ppos;
        plh.pos[2] = ppos;
        prh.pos[2] = ppos;
        phd.pos[2] = ppos;
        pll.pos[2] = ppos;
        prl.pos[2] = ppos;
      }
      else
      {
        document.getElementById("message").innerHTML = "Last activity : Collision against bush";
        var ppos = 5;
        pc.pos[2] = ppos;
        plh.pos[2] = ppos;
        prh.pos[2] = ppos;
        phd.pos[2] = ppos;
        pll.pos[2] = ppos;
        prl.pos[2] = ppos;
      }
    }
  }

  // boot collection

  for(var i = 0; i < 10; ++i)
  {
    if(distance(c.pos,shoes[i].pos) < 1.0)
    {
      document.getElementById("message").innerHTML = "Last activity : Collected Boots";
      boot_cnt = 0;
      shoes[i].pos[1] -= 100;
      shoebody[i].pos[1] -= 100;
      posac = 0.0005;
      c.accelerationy = posac;
      hd.accelerationy = posac;
      lh.accelerationy = posac;
      rh.accelerationy = posac;
      ll.accelerationy = posac;
      rl.accelerationy = posac;
    }
  }

  // cone collection

  for(var i = 0; i < 10; ++i)
  {
    if(distance(c.pos,conevec[i].pos) < 2.0)
    {
      conevec[i].pos -= 100;
      boost_cnt = 0;
      document.getElementById("message").innerHTML = "Last activity : Collected Boost";
      posd = 0.2;
      jump = 1;
      c.speedy = posd;
      hd.speedy = posd;
      lh.speedy = posd;
      rh.speedy = posd;
      ll.speedy = posd;
      rl.speedy = posd;
    }
  }

  // barrier collision

  for(var i = 0; i < 100; ++i)
  {
    if(distance(c.pos,obstacles[i].pos) < 1.0)
    {
      document.getElementById("message").innerHTML = "Gameover : Caught by Police !!!";
      gameover = 1;
      var ppos = 0;
      pc.pos[2] = ppos;
      plh.pos[2] = ppos;
      prh.pos[2] = ppos;
      phd.pos[2] = ppos;
      pll.pos[2] = ppos;
      prl.pos[2] = ppos;
    }
  }

  // train collision

  for(var i = 0; i < 30; ++i)
  {
    if(distance(c.pos,trainfronts[i].pos) < 1.0)
    {
      document.getElementById("message").innerHTML = "Gameover : Caught by Police !!!";
      gameover = 1;
      var ppos = 0;
      pc.pos[2] = ppos;
      plh.pos[2] = ppos;
      prh.pos[2] = ppos;
      phd.pos[2] = ppos;
      pll.pos[2] = ppos;
      prl.pos[2] = ppos;
    }
    if(distance(c.pos,trains[i].pos) < 1.0)
    {
      document.getElementById("message").innerHTML = "Gameover : Caught by Police !!!";
      gameover = 1;
      var ppos = 5;
      pc.pos[2] = ppos;
      plh.pos[2] = ppos;
      prh.pos[2] = ppos;
      phd.pos[2] = ppos;
      pll.pos[2] = ppos;
      prl.pos[2] = ppos;
    }
  }

  if(gameover == 1)
    myMusic.stop();

  return;
}
//
// distance between objects
//
function distance(p1,p2)
{
  return (p1[0]-p2[0])*(p1[0]-p2[0]) + (p1[1]-p2[1])*(p1[1]-p2[1]) + (p1[2]-p2[2])*(p1[2]-p2[2]);
}
//
// user input handling
//
function userinput()
{
  window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; 
    }

    switch (event.code) {
      case "ArrowLeft":
        if (c.pos[0] >= 0.0){
          c.pos[0] -= 3.0;
          lh.pos[0] -= 3.0;
          rh.pos[0] -= 3.0;
          hd.pos[0] -= 3.0;
          ll.pos[0] -= 3.0;
          rl.pos[0] -= 3.0;
        }
        break;
      case "ArrowRight":
        if (c.pos[0] <= 0.0){
          c.pos[0] += 3.0;
          lh.pos[0] += 3.0;
          rh.pos[0] += 3.0;
          hd.pos[0] += 3.0;
          ll.pos[0] += 3.0;
          rl.pos[0] += 3.0;
        }
        break;
      case "ArrowUp":
        // console.log(jump)
        if(c.speedy == 0 && c.pos[1] == c.stop){
          jump = 1;
          c.speedy = 0.045;
          lh.speedy = 0.045;
          rh.speedy = 0.045;
          hd.speedy = 0.045;
          ll.speedy = 0.045;
          rl.speedy = 0.045;
        }
        break;
      case "KeyD":
        showdog *= -1;
        break;
      case "KeyG":
        grey_cnt = 0;
        break;
      case "KeyL":
        lcnt = 0;
        for(var i = 0; i < 200; ++i)
          bcg[i].lighton = 0;
        break;
      default:
        return; 
    }

  event.preventDefault();
  }, true);
}

//
// Ticking all elements
//
function tickall() {
  // moving the entire scene

  // track's movement 

  let speed = 0.03;

  track0.pos[2] += speed;
  track1.pos[2] += speed;
  track2.pos[2] += speed;

  midway0.pos[2] += speed;
  midway1.pos[2] += speed;

  trackrod00.pos[2] += speed;
  trackrod01.pos[2] += speed;
  trackrod10.pos[2] += speed;
  trackrod11.pos[2] += speed;
  trackrod20.pos[2] += speed;
  trackrod21.pos[2] += speed;

  for(var i = 0; i < 300 ; ++i)
    planks[i].pos[2] += speed;

  // trains' movement

  for(var i = 0; i < 30 ; ++i)
    trains[i].pos[2] += 25*speed;

  for(var i = 0; i < 30 ; ++i)
    trainfronts[i].pos[2] += 25*speed;

  for(var i = 0; i < 200 ; ++i)
    bcg[i].pos[2] += speed;

  if(boost_cnt == 300)
  {
    posd = 0;
    jump = 1;
    c.speedy = posd;
    hd.speedy = posd;
    lh.speedy = posd;
    rh.speedy = posd;
    ll.speedy = posd;
    rl.speedy = posd;
  }

  if(c.pos[1] <= 5 || boost_cnt > 300)
  {
    c.tick(jump);
    lh.tick(jump);
    rh.tick(jump);
    hd.tick(jump);
    ll.tick(jump);
    rl.tick(jump);
  }

  pspeed = speed;

  pc.pos[2] += pspeed;
  plh.pos[2] += pspeed;
  prh.pos[2] += pspeed;
  phd.pos[2] += pspeed;
  pll.pos[2] += pspeed;
  prl.pos[2] += pspeed;

  for(var i = 0; i < 100; ++i)
  {
    obstacles[i].pos[2] += speed;
    rods[2*i].pos[2] += speed;
    rods[2*i+1].pos[2] += speed;
  }

  for(var i = 0; i < 100; ++i)
    coinvec[i].pos[2] += speed;

  for(var i = 0; i < 10; ++i)
    conevec[i].pos[2] += speed;

  for(var i = 0; i < 10; ++i)
  {
    shoes[i].pos[2] += speed;
    shoebody[i].pos[2] += speed;
  }

  for(var i = 0; i < 90; ++i)
    pilevec[i].pos[2] += speed;

  for(var i = 0; i < 30; ++i)
    starvec[i].pos[2] += speed;

  if(boot_cnt > 300)
  {
    posac = 0.001;
    c.accelerationy = posac;
    hd.accelerationy = posac;
    lh.accelerationy = posac;
    rh.accelerationy = posac;
    ll.accelerationy = posac;
    rl.accelerationy = posac;
  }

  winlef.pos[2] += speed;
  winrgt.pos[2] += speed;
  sign.pos[2] += speed;

  dface.pos[0] = c.pos[0];
  dface.pos[1] = 0.5;
  dface.pos[2] = c.pos[2]+5;

  dbd.pos[0] = c.pos[0];
  dbd.pos[1] = 0.5;
  dbd.pos[2] = c.pos[2]+6;

  dbk.pos[0] = c.pos[0];
  dbk.pos[1] = 0.5;
  dbk.pos[2] = c.pos[2]+6.9;

  if(winlef.pos[2] >= -2)
  {
    document.getElementById("message").innerHTML = "Gameover : Mission Accomplished";
    gameover = 1;
  }

  if(gameover == 1)
    myMusic.stop();

  return;
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, programInfo2, deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 75 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
    var cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, [0.0 , c.pos[1] + 2.0, c.pos[2] + 10.0]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];

    mat4.lookAt(cameraMatrix, cameraPosition, [0,0,0], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);

  c.drawCube(gl, viewProjectionMatrix, programInfo2, texture_char, deltaTime, 0, 0, 0);
  lh.drawCube(gl, viewProjectionMatrix, programInfo2, texture_rby, deltaTime, 0, 0, 0);
  rh.drawCube(gl, viewProjectionMatrix, programInfo2, texture_rby, deltaTime, 0, 0, 0);
  hd.drawCube(gl, viewProjectionMatrix, programInfo2, texture_ychs, deltaTime, 0, 0, 0);
  ll.drawCube(gl, viewProjectionMatrix, programInfo2, texture_rby, deltaTime, 1, 0, 0);
  rl.drawCube(gl, viewProjectionMatrix, programInfo2, texture_rby, deltaTime,-1, 0, 0);

  if(pc.pos[2] <= 8)
  {
    pc.drawCube(gl, viewProjectionMatrix, programInfo2, texture_chess, deltaTime, 0, 0, 0);
    plh.drawCube(gl, viewProjectionMatrix, programInfo2, texture_chess, deltaTime, 0, 0, 0);
    prh.drawCube(gl, viewProjectionMatrix, programInfo2, texture_chess, deltaTime, 0, 0, 0);
    phd.drawCube(gl, viewProjectionMatrix, programInfo2, texture_chess, deltaTime, 0, 0, 0);
    pll.drawCube(gl, viewProjectionMatrix, programInfo2, texture_chess, deltaTime, 1, 0, 0);
    prl.drawCube(gl, viewProjectionMatrix, programInfo2, texture_chess, deltaTime,-1, 0, 0);
  }

  track0.drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime);
  track1.drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime);
  track2.drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime);
  
  midway0.drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime);
  midway1.drawTrack(gl, viewProjectionMatrix, programInfo, deltaTime);

  trackrod00.drawTrackrod(gl, viewProjectionMatrix, programInfo, deltaTime);
  trackrod01.drawTrackrod(gl, viewProjectionMatrix, programInfo, deltaTime);
  trackrod10.drawTrackrod(gl, viewProjectionMatrix, programInfo, deltaTime);
  trackrod11.drawTrackrod(gl, viewProjectionMatrix, programInfo, deltaTime);
  trackrod20.drawTrackrod(gl, viewProjectionMatrix, programInfo, deltaTime);
  trackrod21.drawTrackrod(gl, viewProjectionMatrix, programInfo, deltaTime);

  for(var i = 0; i < 300 ; ++i)
    planks[i].drawPlank(gl, viewProjectionMatrix, programInfo, deltaTime);

  for(var i = 0; i < 30; ++i)
    if(trains[i].pos[2] <=7)
      trains[i].drawTrain(gl, viewProjectionMatrix, programInfo2, texture_train, deltaTime);

  for(var i = 0; i < 30; ++i)
    if(trainfronts[i].pos[2] <=7)
      trainfronts[i].drawTrain(gl, viewProjectionMatrix, programInfo2, texture_trainfront, deltaTime);

  for(var i = 0; i < 200; ++i)
    bcg[i].drawTrain(gl, viewProjectionMatrix, programInfo2, texture_bg, deltaTime);

  for(var i = 0; i < 100; ++i)
  {
    obstacles[i].drawPlank(gl, viewProjectionMatrix, programInfo, deltaTime);
    rods[2*i].drawCylinder(gl, viewProjectionMatrix, programInfo, deltaTime);
    rods[2*i+1].drawCylinder(gl, viewProjectionMatrix, programInfo, deltaTime);
  }

  for(var i = 0; i < 100; ++i)
    if(coinvec[i].pos[2] < c.pos[2])
      coinvec[i].drawCoin(gl, viewProjectionMatrix, programInfo, deltaTime);

  for(var i = 0;i < 10; ++i)
    conevec[i].drawCone(gl, viewProjectionMatrix, programInfo, deltaTime);

  for(var i = 0;i < 10; ++i)
  {
    shoes[i].drawCylinder(gl, viewProjectionMatrix, programInfo, deltaTime);
    shoebody[i].drawPlank(gl, viewProjectionMatrix, programInfo, deltaTime);
  }

  for(var i = 0; i < 90; ++i)
    pilevec[i].drawPile(gl, viewProjectionMatrix, programInfo, deltaTime);

  for(var i = 0; i < 30; ++i)
    starvec[i].drawStar(gl, viewProjectionMatrix, programInfo, deltaTime);

  if(showdog == 1)
  {
    dface.drawDogface(gl, viewProjectionMatrix, programInfo, deltaTime);
    dbd.drawPile(gl, viewProjectionMatrix, programInfo, deltaTime);
    dbk.drawPlank(gl, viewProjectionMatrix, programInfo, deltaTime);
  }

  winlef.drawCylinder(gl, viewProjectionMatrix, programInfo, deltaTime);
  winrgt.drawCylinder(gl, viewProjectionMatrix, programInfo, deltaTime);
  sign.drawTrain(gl, viewProjectionMatrix, programInfo2, texture_msn, deltaTime);

  //c1.drawCube(gl, projectionMatrix, programInfo, deltaTime);

}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);

    const image = new Image();
    image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    srcFormat, srcType, image);

      // WebGL1 has different requirements for power of 2 images
      // vs non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        // No, it's not a power of 2. Turn of mips and set
        // wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;

    return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

