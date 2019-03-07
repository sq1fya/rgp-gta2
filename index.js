const scrollelement = window.document.scrollingElement || window.document.body || window.document.document

document.getElementById("sectionnumber").onclick = function() {
  downSection();
  changecolor();
}
  
 function changecolor(){
    var okno = document.getElementById("sectionnumber")
  okno.classList.add("spin");
}

// Sections are zero indexed to match array from getElementsByClassName
var scroll = {
  activesection: 0,
  totalsections: document.getElementsByClassName('section').length,
  throttled: false,
  throttledur: 500,
}

var downSection = () => {
  if (scroll.activesection < 3) {
    ++scroll.activesection
    updateSectionNumber(scroll.activesection)
    scrollToSection(scroll.activesection)
  }
}

var upSection = () => {
  if (scroll.activesection > 0) {
    --scroll.activesection
    updateSectionNumber(scroll.activesection)
    scrollToSection(scroll.activesection)
  }
}


var scrollToSection = (section) => {
  anime({
    targets: scrollelement,
    scrollTop: (section) * window.innerHeight,
    duration: scroll.throttledur,
    easing: 'linear'
  })
  
  scroll.activesection = section
}

var updateSectionNumber = (activesection) => {
  window.document.getElementById('sectionnumber').innerHTML = "Active Section: " + activesection
}

window.addEventListener("keydown", function(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
  
  if(!scroll.throttled) {
    scroll.throttled = true
    
    setTimeout(function() {
      scroll.throttled = false
    }, 1.5 * scroll.throttledur)
    if ([32, 40].indexOf(e.keyCode) > -1) {
      downSection()
    }
    if ([38].indexOf(e.keyCode) > -1) {
      upSection()
    }
  }
}, false)

window.addEventListener('scroll', function(e) {
  e.preventDefault()
}, false)

window.addEventListener('wheel', function(e) {
  e.preventDefault()
  
  if (!scroll.throttled) {
    scroll.throttled = true
    
    setTimeout(function() {
      scroll.throttled = false
    }, 1.5 * scroll.throttledur)
    
    if(e.deltaY < 0) {
      upSection()
    } else {
      downSection()
    }
  }
}, false)

var initialy = null

window.addEventListener('touchstart', function(e) {
  initialy = e.touches[0].clientY
}, false)

window.addEventListener('touchmove', function(e) {
  e.preventDefault()
  
  if (initialy === null) {
    return
  }
  
  var currenty = e.touches[0].clientY;
  
  var diffy = initialy - currenty;
  
  if(!scroll.throttled) {
    scroll.throttled = true
    
    setTimeout(function() {
      scroll.throttled = false
    }, 1.5 * scroll.throttledur)
    
    if (diffy > 0) {
      downSection()
    } else {
      upSection()
    }
  }
  
  initialy = null
  
}, {passive: false})


// Scroll back to correct section when resized.
window.addEventListener('resize', function(e) {
  scrollToSection(scroll.activesection)
}, false)

window.addEventListener("load", function(event) {
  scrollToSection(0);
  console.log("finished loading page!");
});
