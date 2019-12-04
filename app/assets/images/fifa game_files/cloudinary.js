/*
* Cloudinary image replacement
**/
var GameCloudinary = (function(){

  function getImages() {

  	var height;
  	var width;
  	var imgSrc;
  	var useWidthOrHeight;
  	var cssClass = 'optimisedImg';
  	
  	$('.cloudinaryImg').each(function(){

			imgSrc = $(this).attr('data-src').trim();
			imgSrc = imgSrc.replace('https://img.game.co.uk', 'game_img');
			imgSrc = imgSrc.replace('http://img.game.co.uk', 'game_img');
			imgSrc = imgSrc.replace('//img.game.co.uk', 'game_img');
			imgSrc = imgSrc.replace('_b.png', '_a.png');
			imgSrc = imgSrc.replace('_c.png', '_a.png');
			imgSrc = imgSrc.replace('_d.png', '_a.png');
			imgSrc = imgSrc.replace('_e.png', '_a.png');
			imgSrc = imgSrc.replace('game_img/ml2///img.game.co.uk/ml2', 'game_img/ml2');

			if ($(this).closest('.addedToBasketOverlay').length) {

				useWidthOrHeight = 'height';
				height = 120;

			} else if ($(this).closest('.slides').length && !$(this).closest('#pdpSlider').length) {

				useWidthOrHeight = 'height';
				height = 125;

			} else if ($(this).closest('#header-basket').length) {

				useWidthOrHeight = 'width';
				width = 60;

			} else if ($(this).closest('.checkout-items').length) {

				useWidthOrHeight = 'width';
				width = 70;

			} else if ($(this).closest('#rightSection').length) {

				if ($(this).closest('#plpProducts.stacked').length) {
					useWidthOrHeight = 'height';
					height = 200;
				} else {
					useWidthOrHeight = 'width';
					width = 80;
				}

			} else if ($(this).closest('#plpProducts').length) {

				useWidthOrHeight = 'width';
				width = 105;

			} else if ($(this).closest('.card-panel').length) {

				useWidthOrHeight = 'height';
				height = $(this).closest('.item-img').height() || $(this).height();

			} else if ($(this).closest('.imgContainer').length) {

				useWidthOrHeight = 'height';
				height = $(this).closest('.imgContainer').height();

			} else if ($(this).closest('.modalContent').length) {

				useWidthOrHeight = 'width';
				width = $(this).closest('.imageContainer').width();

			} else if ($(this).closest('.perfectPartnerProducts').length) {

				useWidthOrHeight = 'height';
				height = 100;

			} else if ($(this).closest('.frequently-bought_container--image').length) {

				useWidthOrHeight = 'height';
				height = 85;

			} else if ($(this).closest('.IORecsSlider').length) {

				useWidthOrHeight = 'width';
				width = $(this).closest('.image').width();

			} else if ($(this).closest('.productHeader').length) {

				useWidthOrHeight = 'height';
				height = $(this).closest('a').height();

			} else if ($(this).closest('.basketSummary').length) {

				useWidthOrHeight = 'width';
				width = 125;

			} else if ($(this).closest('.basketItems').length || $(this).closest('#basketItems').length) {

				useWidthOrHeight = 'width';
				width = $(this).closest('.imageHolder').width();

			} else if ($(this).closest('.deliveryGroup').length || $(this).closest('#addedToBasketItem').length) {

				useWidthOrHeight = 'width';
				width = 61;

			} else if ($(this).closest('.orderDetailsItems').length || $(this).closest('.dropdownCart.basket').length) {

				useWidthOrHeight = 'width';
				width = 50;

			} else if ($(this).closest('#pdpSlider').length) {

				useWidthOrHeight = 'height';
				height = 210;

			} else if ($(this).closest('.productRecsContainer').length && !$(this).closest('#productRecs.collapsible').length) {

				useWidthOrHeight = 'height';
				height = 210;

			} else if ($(this).closest('#productRecs.collapsible').length) {

				useWidthOrHeight = 'width';
				width = 85;

			} else if ($(this).closest('.panel-top.imageAndDesc').length) {

				useWidthOrHeight = 'width';
				width = 80;

			} else if ($(this).closest('.confirmation').length) {

				useWidthOrHeight = 'width';
				width = $(this).closest('.itemImage').width();

			} else if ($(this).closest('.bundledItems').length) {

				useWidthOrHeight = 'height';
				height = 130;

			} else if ($(this).closest('.panelContainer.bundle').find('.mainItem').length) {

				useWidthOrHeight = 'height';
				height = 350;

			} else if ($(this).closest('.overlay-how-about__image').length) {

				useWidthOrHeight = 'height';
				height = 150;

			} else {

				useWidthOrHeight = 'width';
				width = 50;
				cssClass = 'optimisedUsingDefaultVals-CHECK';

			};

			if (useWidthOrHeight === 'height') {

				$(this).replaceWith(
					$.cloudinary.image(imgSrc, { dpr: "auto", quality: "auto", fetch_format: "auto", height: height.toFixed(0), crop: 'fill', class: cssClass, style: 'visibility:visible'})
				);

			} else {

				$(this).replaceWith(
					$.cloudinary.image(imgSrc, { dpr: "auto", quality: "auto", fetch_format: "auto", width: width.toFixed(0), crop: 'fill', class: cssClass, style: 'visibility:visible'})
				);
				
			};

  	});
  };

  function doDelayedCloudinaryInit() {

		var areCloudinaryImagesLoaded = false;
		var checkGameCloudinaryLoaded = setInterval(function(){ 

			if (typeof $.cloudinary !== 'undefined') {
				areCloudinaryImagesLoaded = true;
			};

			if (areCloudinaryImagesLoaded) {
				clearInterval(checkGameCloudinaryLoaded);
				GameCloudinary.init();
			};

		}, 100);

  };

  function fixImageDimensions() {

	  $('.optimisedImg').each(function(index){

	    if ($(this).closest('.product-mainImage').length && !$(this).closest('.multiple').length) {

	      var imageHeight = $(this).height();
	      var imageWidth = $(this).width();

	      $(this).css({'width': '','height': ''});

	      if (imageHeight >= imageWidth) {
	          $(this).css({'width': 'auto','height': '120px'});
	      } else {
	          $(this).css({'width': '120px','height': 'auto'});
	      };

	    };

	  });

  };

  return {
    init: function() {

      try {
        getImages();
      }
      catch(error) {
        console.log('ERROR in GameCloudinary(): ' + error);
      };

    },
    doDelayedCloudinaryInit: doDelayedCloudinaryInit,
    fixImageDimensions: fixImageDimensions
  }
})();

$(document).ready(function() {
  GameCloudinary.init();
});
