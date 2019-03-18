
function createImg(){
  var img = document.createElement('img');
  img.setAttribute("src", "/gfx/road/road_lanes_side.png");
  img.setAttribute("alt","road");
  document.getElementById('container').appendChild(img);
}

function createImg180Deg(){
  var img = document.createElement('img');
  img.setAttribute("src", "/gfx/road/road_lanes_side.png");
  img.setAttribute("alt","road");
  img.setAttribute("class", "roadLamesSideUpsidedown")
  document.getElementById('container2').appendChild(img);
}

function createRow(){
  for (i=0; i<=9 ; i++){
    createImg()
    createImg180Deg()
  }
}


createRow();