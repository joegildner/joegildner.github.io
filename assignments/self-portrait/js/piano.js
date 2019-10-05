var whitekeys = ["c3","d3","e3","f3","g3","a4","b4","c4","d4","e4","f4","g4","a5","b5","c5","d5","e5","f5","g5","a6","b6"];
var blackkeys = ["c-3","d-3","f-3","g-3","a-3","c-4","d-4","f-4","g-4","a-4","c-5","d-5","f-5","g-5","a-5"];

var playnote = function(id){
    notes[id].play();
}

var notes = new Object();

$(function(){
    whitekeys.forEach((id) =>{
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

