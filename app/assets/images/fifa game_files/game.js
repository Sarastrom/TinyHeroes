// JavaScript Document
// Game JS

$(window).ready(function() {
if ($('body').attr('id') == 'pgProductDetails') {
    setTimeout(function(){
        $('.IORecsSliderNew a.addToBasket').each(function(){
            $(this).attr('href', $(this).attr('href') + 'cm_vc=Prod_2');  
        });
    }, 1500)
}
});

// Adjusting below code for testing - COLEY 16-03-2018
//$(document).ready(function(){
//    if ($('.boughtTogether .perfectPartnerProducts > div').length > 0 && $('body').hasClass('bundle')) { 
//        var mainImage = $('.mainItem img').attr('src');
//        $('.boughtTogether .perfectPartnerProducts > div').eq(0).find('img').attr('src', mainImage);
//    }
    
//})

// https://jira.salmon.com/browse/GAME-5330 - duplicate tnc for digital  or others //
$(window).on('load',function(){
  var $termsElems = $('.tandcContainer label[for="terms"]');

  if ($termsElems.length) {

    $termsElems.hide();
    $termsElems.first().show();
  };
});



//Updated code as above - COLEY 16-03-20158
if (window.location.hostname === 'www.game.co.uk') {
  $(document).ready(function(){
    if ($('.boughtTogether .perfectPartnerProducts > div').length > 0 && $('body').hasClass('bundle')) {
      var mainImage = $('.mainItem img').attr('src');
      $('.boughtTogether .perfectPartnerProducts > div').eq(0).find('img').attr('src', mainImage);
    }
  })
};


// Darren Test
$(document).ready(function(){
if ($('body').hasClass('checkout') && $('body').hasClass('anon')) {
    $('.warrantiesContainer .warrantyContainer > a.warranty').each(function(){
        var $link = $(this);
        var text = $link.text();
        if ($link.parent().hasClass('disccare')) {
           text = text.replace('-', ' Disc Care warranty - ')
        } else {
           text = text.replace('-', ' Console Care - ');
        }

        $link.text(text);
    })
}
})

$(document).ready(function(){
	if ($('body').attr('id') == 'pgProductLister'){
	$('.categoryTitleEspot').insertBefore('.paginationTop');}
})

$(document).ready(function(){
	if ($('body').attr('id') == 'pgProductDetails'){
$('.checkstock').text('Want it today? Check your local store for stock then pop in');}
})

//$(window).on('load',function(){
// if ($('body').attr('id') == 'pgProductDetails'){
//$('.checkstock').text('Want it today? Check your local store for stock then pop in');}
//})

//$('#GAMEStockChecker .stockCheckWidget .checkstock').text('Want it today? Check your local store for stock then pop in');


// Banner Freeze Code
//$(document).ready(function(){
// if ($('body').attr('id') == 'pgHome') {
//   setTimeout(function(){
//     $('#HomeCarousel1 .pager li').eq(0).trigger('click'); 
//       }, 1000) 
//   }
//   });

/* Takeover Gutter Clickable */
//$(window).on('load',function(){
//	if ($('body').attr('id') == 'pgHome') {
//	var backgroundLink = $("a.takeoverLink").attr("href");
//	$("body#pgHome").click(function(e){if (e.target === this) {window.location = backgroundLink;}});
//	}
//})


//$(document).ready(function(){
//	if ($('body').attr('id') == 'pgProductDetails'){
//	$('.buyingOptions').insertBefore('#ProductAsideTop1');}
//})

//$(document).ready(function(){
//	if ($('body').attr('id') == 'pgProductDetails'){
//	$('.buyingOptions').insertBefore('#BundleAsideTop1');}
//})

$(document).ready(function(){
	if ($('body').attr('id') == 'pgProductDetails'){
	$('#GameEliteEspot').insertAfter('.deliveryInfo');}
})
$(document).ready(function(){
	if ($('body').attr('id') == 'pgProductDetails'){
	$('#PDPDeliveryMsg').insertBefore('.section.mpDelivery');}
})
$(document).ready(function(){
	if ($('body').attr('id') == 'pgProductDetails'){
	$('#PDPDeliveryMsg').insertAfter('.buyingOptions');}
})
//$(document).ready(function(){
//	if ($('body').attr('id') == 'pgProductDetails'){
//	$('.rewardPoints').insertBefore('.buyingOptions');}
//})
//$(document).ready(function(){
//	if ($('body').attr('id') == 'pgProductDetails'){
//	$('.rewardPoints').insertBefore('#BundleAsideTop1');}
//})
$(document).ready(function(){
	if ($('body').attr('id') == 'pgProductDetails'){
	$('#ProductAsideTop1').insertAfter('.deliveryInfo');}
})
$(document).ready(function(){
	if ($('body').attr('id') == 'pgProductDetails'){
	$('#PreorderBuyTabEspot').insertBefore('#paypalcreditbasket');}
})
$(document).ready(function(){
	if ($('body').attr('id') == 'pgProductDetails'){
	$('#PreorderBuyTabEspot').insertBefore('.deliveryInfo');}
})
$(document).ready(function(){
	if ($('body').attr('id') == 'pgProductDetails'){
	$('.xblTC').appendTo('aside');}
})




// Fix to assign correct css class to pre-owned kits and download sku's
$(document).ready(function(){
$("a.mintPrice.row:contains('Pre-owned')").addClass("preownedPrice");
})

$(document).ready(function(){
$("a.preownedPrice.row:contains('Download')").addClass("downloadPrice");
})

// Hide trade-in button except for the listed formats below

var HideTradeInButton = (function(){

  var excludeItems = [
    "Laptops",
    "PS Vita",
	"PSVita",
    "Phones",
    "DVD",
    "Tablet",
    "Accessories",
    "Electronics",
    "Xbox One",
    "XboxOne",
    "PlayStation 4",
	"PlayStation4",
    "Xbox 360",
	"Xbox360",
    "PlayStation 3",
	"PlayStation3",
    "Wii",
    "2DS/3DS",
    "Wii-U",
    "Switch"
  ];

  var testForExclusions = function(platformName) {
    
    var hideTradeInButton = true;
    $.each(excludeItems, function(index, value){
      if (value.toLowerCase() === platformName.toLowerCase()) {
        hideTradeInButton = false;
      };
    });
    if (hideTradeInButton) {
      $('.btnTrade').remove();
    };
  };

  var hasPriceButtons = false;
  var checkHasPriceButtons = setInterval(function(){ 

    if ($('#mainPDPButtons').length) {
      hasPriceButtons = true;
    };
  
    if (hasPriceButtons) {
      
      clearInterval(checkHasPriceButtons);
      var platformName;

      if ($('#pdpFormatsEditions .console').length) {

        platformName = $('#pdpFormatsEditions .console').text().trim();
        testForExclusions(platformName);

      } else if ($('.product .format .platformLogo').length) {

        platformName = $('.product .format .platformLogo').attr('class').replace('platformLogo', '').replace('selected', '').trim();
        testForExclusions(platformName);
      };

    };
  }, 100);
})();


$(window).on('load', function(){

  $('.optimisedImg').each(function(index){

    if ($(this).closest('#plp').length) {

      var imageHeight = $(this).height();
      var imageWidth = $(this).width();

      $(this).css({"width": "","height": ""});

      if (imageHeight > imageWidth) {
          $(this).css({"width": "auto","height": "inherit"});
      } else if (imageHeight < imageWidth) {
          $(this).css({"height": "auto","width": "inherit"});
      };

    };

  });
  
});


// E3 Staging file loading script

$(document).ready(function () {
    // Landing Page
    $("#e3LandingContainer").load("//assets.game.net/features/e3/2019/LIVE/e3Landing.html");
    // Conference Pages
    $("#e3UbisoftContainer").load("//assets.game.net/features/e3/2019/LIVE/ubisoft_LIVE.html");
    $("#e3PCgamerContainer").load("//assets.game.net/features/e3/2019/LIVE/pcgamer_LIVE.html");
    $("#e3SquareEnixContainer").load("//assets.game.net/features/e3/2019/LIVE/squareEnix_LIVE.html");
    $("#e3SonyContainer").load("//assets.game.net/features/e3/2019/LIVE/sony_LIVE.html");
    $("#e3EAContainer").load("//assets.game.net/features/e3/2019/LIVE/ea_LIVE.html");
    $("#e3NintendoContainer").load("//assets.game.net/features/e3/2019/LIVE/nintendo_LIVE.html");
    $("#e3MicrosoftContainer").load("//assets.game.net/features/e3/2019/LIVE/microsoft_LIVE.html");
    $("#e3BethesdaContainer").load("//assets.game.net/features/e3/2019/LIVE/bethesda_LIVE.html");
    $("#e3AllGamesContainer").load("//assets.game.net/features/e3/2019/LIVE/allGames_STAGE.html");
});
