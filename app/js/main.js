function toggler() {
	document.querySelector(".popup").classList.toggle('active');
	document.querySelector(".catalog-item__button").classList.toggle('hidden');
}

document.querySelector(".catalog-item__button").addEventListener('click', function(){
	toggler();
});

document.querySelector(".popup__close").addEventListener('click', function(){
	toggler();
});

/*

for jQuery using

(function($){
	"use strict";	

	$('.catalog-item__button, .popup__close').on('click', function(){
		$('.popup').toggleClass('active');
		$('.catalog-item__button').toggleClass('hidden');
	});

})(jQuery);

*/