// VARIABLES
const MAP  = $("#content"); // where be plot the game
let CONFIG = {
  'width' :0,
  'height':0
};

let square_size = 48 + (2*3); // 40px width + 5px both margin and border


// FUNCTIONS
function fillEmptyMap(width, height){
  MAP.css({
    'width' : `${square_size * width}px`,
    'height': `${square_size * height}px`
  });
  CONFIG.width  = width;
  CONFIG.height = height;

  let square = `<div class="phph-square" oncontextmenu="return false" pos="|x|,|y|"><div class="phph-item"></div></div>`;
  for(let h=0; h < height; h++){
    let line = `<div class="phph-line">`;
    for(let w=0; w < width; w++){
      line += square.replace('|x|', w).replace('|y|', h);
    }
    MAP.append(`${line}</div>`);
  }
}

function generateParams(){
  let floor   = "";
  let boxes   = [];
  let goals   = [];
  let person  = "";
  let squares = $(".phph-square");
  for(let s=0; s<squares.length; s++){
    let square = $(squares[s]);
    floor += square.hasClass("phph-floor")? 1: 0;
    if(square.find(".phph-item").hasClass('phph-box')){
      boxes.push(s);
    }
    if(square.find(".phph-item").hasClass('phph-goal')){
      goals.push(s);
    }
    if(square.find(".phph-item").hasClass('phph-person')){
      person = s;
    }
  }
  floor = binaryToHex(floor.split('').reverse().join(''));
  boxes = boxes.join('.');
  goals = goals.join('.');

  let genlink = window.location.href.split("/editor.html")[0] + `/index.html?${SETTINGS.width}-${SETTINGS.height}-${floor}-${boxes}-${goals}-${person}`;
  window.open(genlink, "blank");

  return genlink;
}

function movePerson(addx, addy){
  let [px, py] = personPosition();
  let movx = px + addx;
  let movy = py + addy;

  if(hasFloor(movx, movy)){
    if(!hasBox(movx, movy) || moveBox(movx, movy, addx, addy)){
      $(`.phph-square[pos="${px},${py}"] .phph-item`).removeClass("phph-person");
      $(`.phph-square[pos="${movx},${movy}"] .phph-item`).addClass("phph-person");
    }
  }
}

function moveBox(bx, by, addx, addy){
  let movx = bx + addx;
  let movy = by + addy;

  if(hasFloor(movx, movy) && !hasBox(movx, movy)){
    $(`.phph-square[pos="${bx},${by}"] .phph-item`).removeClass("phph-box");
    $(`.phph-square[pos="${movx},${movy}"] .phph-item`).addClass("phph-box");

    return true;
  }

  return false;
}

function personPosition(){
  return $(".phph-person").parent().attr("pos").split(',').map(_ => parseInt(_));
}

function hasFloor(x, y){
  let on_map = (x >= 0 && x < CONFIG.width) && (y >= 0 && y < CONFIG.height);
  if(!on_map) return false;

  return Boolean($(`.phph-floor[pos="${x},${y}"]`).length);
}

function getTile(x, y){
  return $(`.phph-square[pos="${x},${y}"]`);
}

function hasBox(x, y){
  return Boolean($(`.phph-floor[pos="${x},${y}"] .phph-item.phph-box`).length);
}

function canMove(){
  $(window).keydown(function(e){
    let key = e.which || e.keyCode;
    
    switch(key){
      case 87:
      case 38:
        try{movePerson(0, -1)}
        catch{};
        break;
      case 65:
      case 37:
        try{movePerson(-1, 0)}
        catch{};
        break;
      case 83:
      case 40:
        try{movePerson(0, 1)}
        catch{};
        break;
      case 68:
      case 39:
        try{movePerson(1, 0)}
        catch{};
        break;
    }
  });  
}


// WAKE UP
$(window).ready(function(){
});