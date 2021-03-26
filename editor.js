// VARIABLES
const TOOLS = ['TILE', 'BOX', 'PERSON'];
const SETTINGS = {
  'width' : 16,
  'height': 16
};
let tool    = 0;


// FUNCTIONS
function bindSquares(){
  $(".phph-square").mousedown(function(e){
    e.preventDefault();

    switch(tool){
      case 0:
        $(this).toggleClass('phph-floor');
        if(!$(this).hasClass('phph-floor')) $(this).find('.phph-item').attr('class','phph-item');
        break;
      case 1:
        if(!$(this).hasClass("phph-floor")) return;
        var classes = $(this).find(".phph-item").attr("class");
        if(classes.includes('phph-box') && !classes.includes('phph-goal')){
          $(this).find(".phph-item").removeClass('phph-box');
          $(this).find(".phph-item").addClass('phph-goal');
        }
        else if(classes.includes('phph-goal')){
          if(!classes.includes('phph-box')){
          $(this).find(".phph-item").addClass('phph-box');
          }
          else {
          $(this).find(".phph-item").attr("class","phph-item");
          }
        }
        else {
          $(this).find(".phph-item").attr("class","phph-item phph-box");
        }
        break;
      case 2:
        if(!$(this).hasClass("phph-floor")) return;
        var classes = $(this).find(".phph-item").attr("class");
        if(classes.includes('phph-person')){
          $(this).find(".phph-item").removeClass("phph-person");
        }
        else {
          $(this).parent().parent().find(".phph-person").removeClass("phph-person");
          $(this).find(".phph-item").removeClass("phph-box");
          $(this).find(".phph-item").addClass("phph-person");
        }
        break;
    }
  });
}

function changeTool(){
  tool = tool + 1 >= TOOLS.length? 0: tool + 1;
  $("#tool-btn").text(TOOLS[tool]);
}


// WAKE UP
$(window).ready(function(){
  fillEmptyMap(SETTINGS.width, SETTINGS.height);
  bindSquares();
});