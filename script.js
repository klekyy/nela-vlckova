// Mobile menu

const hamburgerMenu = document.querySelector("#mobile-menu");
const mobileNavigation = document.querySelector("#mobile-nav");

hamburgerMenu.addEventListener("click", function(e) {
  e.preventDefault();
  hamburgerMenu.classList.toggle("close");
  if (mobileNav.style.display === "block") {
    mobileNavigation.style.display = "none";
  } else {
    mobileNavigation.style.display = "block";
  }
});

// If you click on mobile navigation href, mobile menu disappear

const mobileHref = document.querySelectorAll(".mobile-href");
const mobileNav = document.getElementById("mobile-nav");

for(let oneHref of mobileHref){
  oneHref.addEventListener("click", function(){
    mobileNav.style.display = "none";
    hamburgerMenu.classList.remove("close")
  })
}

// Recaptcha

window.onload = function() { 
  var el = document.getElementById('g-recaptcha-response'); 
  if (el) { 
    el.setAttribute('required', 'required'); 
  } 
}