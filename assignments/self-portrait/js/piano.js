var whitekeys = ["C3","D3","E3","F3","G3","A3","B3","C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5","A5","B5"];
var blackkeys = ["C-3","D-3","F-3","G-3","A-3","C-4","D-4","F-4","G-4","A-4","C-5","D-5","F-5","G-5","A-5"];

var playnote = function(id){
    notes[id].play();
    setTimeout(function(){
        notes[id].pause();
        notes[id].currentTime = 0;
    }, 500);
    
}

var notes = new Object();

$(function(){
    whitekeys.forEach((id) =>{
        notes[id] = new Audio("keys/"+id+".mp3");
    })
    blackkeys.forEach((id) =>{
        notes[id] = new Audio("keys/"+id+".mp3");
    })
});

$(function() {
    var div = $('.keygrid');
    var width = div.width();
    
    div.css('height', width*.3);
});

//Build white keys
$(function(){
    whitekeys.forEach((id, i) => {
      $("#"+id).css({"grid-column":i+1,"grid-row":1}).click(function(){playnote(id)});
    })
})

//Build black keys
$(function(){
    var place = 0;
    var i=0;
    blackkeys.forEach((id) => {
      $("#"+id).css({"grid-column":i+1,"grid-row":1}).click(function(){playnote(id)});
      i++;
      if((i+5)%7 == 0 || (i+1)%7 == 0) i++;
    })
})


$(function() {
    var div = $('.roomgrid');
    var width = div.width();
    div.css('height', width*.5);
});

//Randomize Colors
$(function(){
    var floor = $("#floor");
    var wall1 = $("#wall");
    var wall2 = $("#wall2");

    var redVal = Math.floor(Math.random() * 256);

    var color1 = "rgb("+redVal+",0,0)"
    var color2 = "rgb(0,"+((redVal+191)%255)+","+((redVal+64)%255)+")"
    var color3 = "rgb(0,"+((redVal+64)%255)+","+((redVal+191)%255)+")"

    floor.css("background-color",color1);
    wall1.css("background-color",color2);
    wall2.css("background-color",color3);
})