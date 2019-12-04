var CloudinaryGallery = (function(){

	var isMobile;
	var isIE = false;
	var isKit;

	function init() {
		isMobile = GameRepack.isMobile;
		isKit = $('#PDPCloudinaryGallery').attr('data-iskit') == 'true' ? true : false;
		checkForIE();
		PDPGallerySetup();
		addEvents();			
	};

	function checkForIE(){
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older
        isIE = true;
    }
    if (trident > 0) {
        // IE 11
        isIE = true;
    }
	};

	function PDPGallerySetup(){
		var PDPGallery= cloudinary.galleryWidget({
		  container: "#PDPCloudinaryGallery",
		  cloudName: "gameretail",
		  cname: 'cdn.game.net',
		  privateCdn: true,
		  secureDistribution: 'cdn.game.net',
		  secure: 'true',
		  carouselStyle: isMobile ? 'indicators' : 'thumbnails',
		  carouselLocation: 'bottom',
		  carouselOffset: 20,
		  aspectRatio: '7:5',
		  navigationPosition: 'offset',
		  navigationOffset: -30,
		  indicatorProps: {
        shape: 'round',
        color: '#e5e5e5',
        size: 12,
        spacing: 6,
        selectedColor: '#2e2e2e'
    	},
		  thumbnailProps: {
		  	selectedBorderPosition: 'bottom',
		  	selectedBorderColor: '#2e2e2e'
		  },
		  /*videoProps: {
			  controls: true,
			  autoplay: false
		  },*/
		  zoomProps: {
		  	type: (isIE || isMobile) ? 'inline' : 'flyout',
		  	showTip: 'all',
		  	viewerOffset: 20
		  },
		  transformation: {
		  	dpr: 'auto',
		  	fetch_format: 'auto',
		  	quality: 'auto'
		  },
		  mediaAssets: isKit ? getKitAssets() : getProductAssets()
		});

		PDPGallery.render();

		PDPGallery.on('zoomin', function(data){
		  isIE ? false : $('#productPanel .rightCol').addClass('zoomActive');
		});		

		PDPGallery.on('zoomout', function(data){
		  $('#productPanel .rightCol').removeClass('zoomActive');
		});

		PDPGallery.on('thumbclick', function(data){
		  $('#productPanel .rightCol').removeClass('zoomActive');
		});	
	};

	function getProductAssets(){
		var sku = $('#PDPCloudinaryGallery').attr('data-sku');
		var assets = createAssetGroup(sku);

		return assets;
	};

	function getKitAssets(){
		var assets = [];
		var sku = $('#PDPCloudinaryGallery').attr('data-sku').slice(0, -4);		
		var componentAssets = [];

		assets.push({ 'tag': sku + '_packshot' , 'mediaType': 'image' });

		componentAssets = componentAssets.concat(createKitAssetGroup());
		assets = assets.concat(componentAssets);

		return assets;
	};

	function createAssetGroup(sku){
		var assetGroup = [];
		assetGroup.push({ 'tag': sku + '_packshot' , 'mediaType': 'image' });
		assetGroup.push({ 'tag': sku + '_other' , 'mediaType': 'image' });

		return assetGroup;
	};

	function createKitAssetGroup(){
		var components = $('#PDPCloudinaryGallery').attr('data-components').split(',');
		var assetGroup = [];
		$(components).each(function(i, sku){
			assetGroup.push({ 'tag': sku + '_packshot' , 'mediaType': 'image' });
		});

		$(components).each(function(i, sku){
			assetGroup.push({ 'tag': sku + '_other' , 'mediaType': 'image' });
		});

		return assetGroup;
	};

	function openVideo(ele){
		var target,
	    	isList,
	    	frameDimensions,
	    	html;
		if (typeof ele != 'undefined' && (ele.hasClass('youtube') || ele.hasClass('youtubelist'))) {
	    target = ele.attr('data-youtubeid');
	    isList = ele.hasClass('list');
	    frameDimensions = isMobile ? setIframeDimensions() : '';
	    if (!isList) {
	      html = '<iframe ' + frameDimensions + ' src="//www.youtube.com/embed/' + target + '" allowfullscreen></iframe>';
	    } else {
	      html = '<iframe ' + frameDimensions + ' src="//www.youtube.com/embed/videoseries?list=' + target + '"  frameborder="0" allowfullscreen></iframe>';
	    }
	    showVideo(html);
	  } else {
	  	target = $('#productVideo').attr('data-videoid');
	    frameDimensions = isMobile ? setIframeDimensions() : '';
	  	html = '<iframe ' + frameDimensions + ' src="//www.youtube.com/embed/' + target + '" allowfullscreen></iframe>';
	  	showVideo(html);
	  }
	};

	function getIframeDimensions(){
		var youtubeRatio = 16 / 9;
  	var screenHeight = $(window).height();
  	var width = $(window).width() - 20;
  	var height = parseInt((width / youtubeRatio),10);

  	if(width > screenHeight){
  		height = screenHeight - 70;
  		width = parseInt((height * youtubeRatio),10);  		
  	}
    
    return {width:width, height:height};
	};

	function setIframeDimensions(){
		var dims = getIframeDimensions();
		return 'width="' + dims.width + '" height="' + dims.height + '"';
	};

	function resizeIframe(){
		var dims = getIframeDimensions();
		$('#productVideo iframe').attr('width', dims.width);
		$('#productVideo iframe').attr('height', dims.height);
	};

	function showVideo(html){
		var parentElement = isMobile ? $('#pdpSlider') : $('.product.panelContainer');
		$(parentElement).addClass('videoActive');
		$('#productVideo').show();
		$('.videoPanel').html(html);
	};

	function hideVideo(){
		var parentElement = isMobile ? $('#pdpSlider') : $('.product.panelContainer');
		$('#productVideo').hide();
		$(parentElement).removeClass('videoActive');
		$('.videoPanel').html('');
	};

	function addEvents(){
		$('.videoLinks a').on('click', function(){
			openVideo($(this));
		});

		$('#closeVideo').on('click', function(){
			hideVideo();
		});

		$(window).on('orientationchange', function(){
			if($('#pdpSlider').hasClass('videoActive')){
				setTimeout(function(){
	        isMobile ? resizeIframe() : false;
	      },200);
			}					
		});
	};

	return {		
		init: init
	}
})();

$(document).ready(function() {
	if($('#PDPCloudinaryGallery').length){
		CloudinaryGallery.init();
	}	
});