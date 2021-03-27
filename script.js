var quadro = document.getElementById("quadro");
var texto = document.getElementById("txtdiv");
var box = document.getElementById("box");
var radio = document.getElementById("radinho");
var day_title = document.getElementById("day_title");
var ext_link = document.getElementById("ext_link");

var day = document.getElementById("day");
var page = document.getElementById("page");
var page_count = {1:24, 2:29, 3:38, 4:57, 5:36};


fillOptions();
spawnRadio();

function twitterlink() {
 window.location.href = "https://twitter.com/aesland3";
}

document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            voltar_pagina();
            break;
        case 39:
            avancar_pagina();
            break;
    }
});

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

  if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}


function spawnRadio() {
 if (parseInt(page.value) === 1 && parseInt(day.value) === 1)
 {
    radio.src = "";
    day_title.src = "";
 }
 else
 {
    radio.src = "./resources/radinho_pica.gif"; 
    radio.draggable = false;
 } 
}

function setWidth() {

var setWindowSize = quadro.width;
box.style.width = setWindowSize + "px";

}

function define_img() {
  
  quadro.src=`./resources/comic/comiccap${day.value}/cumic ${page.value}.gif`;
  quadro.onerror = function() { quadro.src=`./resources/comic/comiccap${day.value}/cumic ${page.value}.png`;}
  
  quadro.onload = function(){ 
    setWidth();
    spawnRadio();
    
    if ((parseInt(page.value) === 1) &&  (parseInt(day.value) === 1))
    {
    day_title.src = "";
    ext_link.src = "./resources/buttons/twitter-128.png";
    }
    else
    {
    day_title.src = `./resources/days/day${day.value}.png`;
    ext_link.src = "";
    }
  }
}

function fillOptions() {    
  array_pages = [...Array(page_count[day.value])].map((_,i) => i+1);
  
  while (page.options.length > 0) {                
        page.remove(0);
    } 
    
  for (var n = 0; n < array_pages.length; n++)
  {
  var option = document.createElement("option");  
    
  option.text = array_pages[n];
  option.value = array_pages[n];
  page.appendChild(option);
  }

}


document.getElementById("day").onchange = function() {
  chooseChap();
  choosePage();
};

function getPage() {
  
  box.style.backgroundColor = "black";
  radio.src = "";
  day_title.src = "";
  
  var client = new XMLHttpRequest();
  client.open('GET', `./resources/comic/comictext${day.value}/cumic pag${page.value}.txt`);
    client.onreadystatechange = function() {
    var val = client.responseText;
		document.getElementById('txtdiv').innerHTML = val;
  };
  
  client.send();
  
  client.onload = function() 
  {    
  cont = texto.textContent.length
  size = 5/(cont/100);
  if (size >= 2.5) { size = 2.5 }
  else if (size <= 1.8) {size = 1.8 }
  texto.style.fontSize = `${size}vmax`;
    
    if( (texto.textContent) === "")
  {
    box.style.backgroundColor = "white";
  }  
}
  
  
}

function chooseChap() {
  page.value = 1;
  fillOptions();
  define_img();
  getPage();
}
function choosePage() {
  define_img();
  getPage();
}

function avancar_pagina() {
  var keys = [];

  for (var key in page_count) {
      if (page_count.hasOwnProperty(key)) {
          keys.push(key);
      }
  }
  keys = keys.map(function (x) { 
  return parseInt(x, 10); 
  });
  
  if ( (parseInt(page.value) === page_count[day.value]) && (parseInt(day.value) === Math.max.apply(null, keys) ))
  { page.value--;  }  
  
  if(parseInt(page.value) === page_count[day.value]) {
    day.value = parseInt(day.value) + 1;
    fillOptions();
    page.value = 0;
  }
  
  page.value++;
  define_img();
  getPage();
}

function voltar_pagina() {
  
  if((parseInt(page.value) === 1) &&  (parseInt(day.value) > 1) )
  { 
    day.value = parseInt(day.value) - 1; 
    fillOptions();
    page.value = page_count[day.value];
  }
  else
  {
    if ((parseInt(page.value) === 1) &&  (parseInt(day.value) === 1))
    {  } 
    else 
    {page.value--; } 
  }
  
  define_img();
  getPage(); 
}