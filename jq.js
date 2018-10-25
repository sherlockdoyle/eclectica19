(function ($) {
  $(document).ready(function(){
    
	


	$(".bg-text").hide();
	


	
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('.bg-text').fadeIn();
			} else {
				$('.bg-text').fadeOut();
			}
		});

	
	});
window.onscroll = function() {myFunction()};


var navbar = document.getElementById("navu");

var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


});
  }(jQuery));
