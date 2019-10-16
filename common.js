// ------ CREATING COMMON ELEMENTS --------

//Cleaner to create these programatically, instead of worrying about n
//number of separate instances floating around.

var GV = {}; // Global Variable object, nicely wraps up all my js globals.

GV.logo = "Joe Gildner"

GV.nav = {  'Home':'/',
            'Experience':'/experience/index.html',
            'Code Samples':'/code/dynamic-webpages/index.html', 
            'About':'/about/index.html'};

$(function(){
    var pagetitle = $('meta[name=pagetitle]').attr('content');
    var navHTML = $('#navbar');

    var navLeft = document.createElement("div");
    navLeft.setAttribute("id","icons");

    var logo = document.createElement("a");
    logo.setAttribute("href",GV.nav.Home);
    logo.setAttribute("id","logo");
    logo.innerText = GV.logo;

    var gitIcon = document.createElement("a");
    gitIcon.setAttribute("href","https://github.com/joegildner/");
    gitIcon.setAttribute("target","_blank");
    var gitPic = document.createElement("img");
    gitPic.setAttribute("src","img/git_dark.png");
    gitIcon.append(gitPic);

    var linkedIcon = document.createElement("a");
    linkedIcon.setAttribute("href","https://www.linkedin.com/in/joegildner/");
    linkedIcon.setAttribute("target","_blank");
    var linkedPic = document.createElement("img");
    linkedPic.setAttribute("src","img/linkedin_dark.png");
    linkedIcon.append(linkedPic);

    navLeft.append(logo,gitIcon,linkedIcon);

    var navRight = document.createElement("div");
    navRight.setAttribute("id","navbar-right");

    Object.keys(GV.nav).forEach((key, i) =>{
        var elem = document.createElement("a");
        if(key == pagetitle) elem.setAttribute("class","active");
        elem.setAttribute("href",GV.nav[key]);
        elem.innerHTML = ""+i+".&thinsp;"+key;

        navRight.append(elem);
    })


    navHTML.append(navLeft,navRight);

})

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    $("#navbar").css("padding", "10px 10px");
    $("#logo").css("fontsize", "25px");
    $("#icons img").css("width", "25px");
  } else {
    $("#navbar").css("padding", "60px 10px");
    $("#logo").css("fontsize", "35px");
    $("#icons img").css("width", "35px");
  }
}


//$(":root").css('--color-primary', "#008080");
//$(":root").css('--color-secondary', "#808000");