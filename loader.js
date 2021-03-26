// VARIABLES
const DEFAULT_PARAM = [
  '16-16-000000000000000000000000018003C003C00180000000000000000000000000-135-120-136'.split('-'),
  '16-16-0000000000000000000000C003C0018003C003C0030000000000000000000000-120.135-102.153-166'.split('-'),
  '16-16-00000000000000000000000003C0024002400FF00A500E700000000000000000-102-153-150'.split('-'),
  '16-16-000000000000000000000C000F700F700FF0030003C003C00000000000000000-104.105.122.133.134-70.86.132.170.171-72'.split('-')
];

let SETTINGS = {
  'width' : 16,
  'height': 16
};
let PARAMS = [];


// FUNCTIONS
function loadParams(){
  SETTINGS = {
    'width' : parseInt(PARAMS[0]),
    'height': parseInt(PARAMS[1]),
    'map'   : hexToBinary(PARAMS[2]).split('').reverse(),
    'boxes' : PARAMS[3].split('.'),
    'goals' : PARAMS[4].split('.'),
    'person': PARAMS[5]
  }
}

function fillMap(){
  let squares = $(".phph-square");
  for(let s in SETTINGS.map){
    if(SETTINGS.map[s] == "1") $(squares[s]).addClass("phph-floor");
  }
  for(let s=0; s < squares.length; s++){
    let square = $(squares[s]);
    if(SETTINGS.boxes.includes(String(s))){
      square.find('.phph-item').addClass('phph-box');
    }
    if(SETTINGS.goals.includes(String(s))){
      square.find('.phph-item').addClass('phph-goal');
    }
    if(SETTINGS.person == s){
      square.find('.phph-item').addClass('phph-person');
    }
  }
}


// WAKE UP
$(window).ready(function(){
  PARAMS = window.location.href.split('?').slice(-1)[0].split('-');
  if(PARAMS.length != 6){
    PARAMS = DEFAULT_PARAM[Math.floor(Math.random() * DEFAULT_PARAM.length)];
  }
  
  loadParams();

  fillEmptyMap(SETTINGS.width, SETTINGS.height);

  fillMap();
  canMove();
});