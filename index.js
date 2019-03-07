function stop() {
  return false;
}
document.onmousewheel = stop;


var button = document.querySelector("button");

button.addEventListener("click", scrollDown);

function scrollDown() {
  document.querySelector('.end').scrollIntoView({
    behavior: 'smooth'
  });
}

