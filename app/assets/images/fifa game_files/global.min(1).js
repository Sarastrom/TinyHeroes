/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  /*
    Add a product to the basket via ajax
    @param requestUrl {string} endpoint uri and params for the requestUrl
    @param callback {function} method to callback to
    returns {object} response payload
  */
  addProduct: function addProduct(requestUrl, callback) {
    $.ajax({
      url: requestUrl,

      success: function success(response) {
        /*
          TODO: Remove non explictally declared dependany
        */
        try {
          $(document).trigger(Salmon.Global.CustomEvents.productAddedToBasket, response);
        } catch (e) {}

        callback(response);
      },
      error: function error(err) {
        console.warn('add to basket failed: ', err);
        callback(err);
      }
    });
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, name) {
  if (!url || !name) {
    return null;
  } else {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if (!results) {
      return null;
    };
    if (!results[2]) {
      return '';
    };
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
};

;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseQueryString = __webpack_require__(2);

var _parseQueryString2 = _interopRequireDefault(_parseQueryString);

var _addToBasket = __webpack_require__(1);

var _addToBasket2 = _interopRequireDefault(_addToBasket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Add a warranty
*/
exports.default = {
  init: function init() {
    this.warrantyStates = {
      'error': 'error',
      'default': 'Add Cover',
      'success': 'Cover Added',
      'cancel': 'No Thanks'
    };
    this.warrantyCurrentState = 'default';

    this.bindEvents();
  },
  addWarranty: function addWarranty(e, DOMContext) {
    var self = this;
    var success = false;
    var warrantyAgreementContainer = $(e.currentTarget).parent().siblings('.warranty-terms-and-conditions');
    var secureCheckoutButton = $(e.currentTarget).parents('.modal-content').find('.basket-actions .secure-checkout');
    var contButton = $(e.currentTarget).parents('.modal-content').find('.basket-actions .continue-shopping');

    if (self.isBasket) {
      warrantyAgreementContainer = $(e.currentTarget).siblings('.warranty-terms-and-conditions');
      var target = $(e.currentTarget).parents('.warrantySection').find('.warrantyAddButton');
      var addWarrantyUrl = $(e.currentTarget).data('addurl');
    } else {
      var target = $(e.currentTarget);
      var addWarrantyUrl = $(target).attr('data-productid');
      var checkbox = $(target).parent().siblings('.warranty-terms-and-conditions').find('input[type=checkbox]');
    }
    if (!self.isBasket && $(checkbox)[0].checked && !$(target).hasClass('disabled') || self.isBasket && !$(target).hasClass('disabled')) {
      var pid = (0, _parseQueryString2.default)(addWarrantyUrl, 'partNumber');
      $(target).addClass('loading').addClass('disabled').html('adding ...');
      secureCheckoutButton.addClass('disabled');
      contButton.addClass('disabled');
      if (!self.isBasket) {
        $(warrantyAgreementContainer).addClass('success');
      }

      _addToBasket2.default.addProduct(addWarrantyUrl, function (response) {

        success = typeof response.newItemsAdded != 'undefined' && response.newItemsAdded.itemAddSuccess || typeof response == 'string';

        if (success) {
          self.warrantyCurrentState = 'success';

          var node = document.createElement('div');
          node.innerHTML = response.basketOverlayHtml;

          var topSummary = $(node).find('.top-summary').html();
          var bottomSummary = $('.modal-content-bottom', node).find('.basket-summary').html();

          $('.top-summary', DOMContext).html(topSummary);
          $('.modal-content-bottom .basket-summary', DOMContext).html(bottomSummary);
          $('#tandc').attr('disabled', 'disabled');

          // trigger coremetrics tagging for mobile
          // extra check needed for desktop on the basket page
          var isDesktop = $('html').hasClass('desktopHeader');
          if (!isDesktop && GameRepack.isMobile && typeof response.coremetrics !== 'undefined' && response.coremetrics.length) {
            self.callCoremetrics(response.coremetrics);
          }
          if (Game.CurrentPage.PageName == 'basket') {
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }
        } else {
          if (typeof response.errorMessage == 'undefined') {
            alert('Something went wrong, please try again later');
          } else {
            alert(response.errorMessage);
          }

          warrantyAgreementContainer.removeClass('active');
          $(target).removeClass('loading').removeClass('error-button');
        }

        var className = self.warrantyCurrentState === 'success' ? 'success-button' : 'error-button';
        var text = self.warrantyCurrentState === 'success' ? self.warrantyStates['success'] : self.warrantyStates['error'];
        $(target).removeClass('loading').removeClass('error-button').removeClass('disabled').addClass(className).html(text);
        secureCheckoutButton.removeClass('disabled');
        contButton.removeClass('disabled');
      });
    }
  },
  callCoremetrics: function callCoremetrics(script) {
    var $script = $(script);
    for (var i = 0; i < $script.length; i++) {
      if ($script[i].nodeName === 'SCRIPT' && $script[i].innerHTML.indexOf("cmSet") !== 0) {
        $(document.body).append($script.eq(i));
      }
    }
  },
  checkboxToggle: function checkboxToggle(e) {
    var $ele = $(e.currentTarget);
    var $parent = $ele.parent();
    var $button = this.isBasket ? $parent.siblings('.warrantyAddButton') : $parent.siblings('.warranty-actions').find('.add-product');

    if ($ele[0].checked) {
      $button.removeClass('disabled');
      $parent.removeClass('active').addClass('success');
    } else {
      $button.addClass('disabled');
      $parent.removeClass('success').addClass('active');
    }
  },
  initModal: function initModal(trigger) {
    var targetModal = trigger.parent().find(".modal");
    //prevent triggering modal('open') multiple times
    if (targetModal.hasClass('open')) {
      return false;
    }
    //reset modal when opened to remove error condition
    targetModal.find('input[type="checkbox"]').prop('checked', false);
    targetModal.find('.warranty-terms-and-conditions').removeClass('success').addClass('active');
    targetModal.find('.warrantyAddButton').removeClass('error-button').addClass('disabled').html(this.warrantyStates['default']);
    targetModal.modal('open');
  },
  bindEvents: function bindEvents() {

    var self = this;
    self.isBasket = $('body').hasClass('basket');
    var DOMContext = self.isBasket ? $('body') : $('body').find('.purchase-confirmation-modal');
    var throttled = false;

    if (self.isBasket) {
      $(DOMContext).on('click', '.warrantyContainer .warranty-terms-and-conditions input[type="checkbox"]', function (e) {
        self.checkboxToggle(e);
      });
      $(DOMContext).on('click', '.warrantyContainer .warrantyAddButton', function (e) {
        self.addWarranty(e, DOMContext);
      });
      $(DOMContext).on('click', '.warrantyContainer .warrantyModalTrigger', function (e) {
        e.preventDefault();
        self.initModal($(this));
      });
    } else {
      $(DOMContext).on('click', '.warranty input[type=checkbox]', function (e) {
        self.checkboxToggle(e);
      });
      $(DOMContext).on('click', '.warranty .add-product', function (e) {
        e.preventDefault();
        self.addWarranty(e, DOMContext);
      });
      $(DOMContext).on('click', '.modal-content .baskeyOverlayButtons a', function (e) {
        if ($(this).hasClass('disabled')) {
          e.preventDefault();
          return false;
        }
      });
    }
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  var element = document.getElementById(options.elem || 'carousel'),
      interval = options.interval || 3000,
      items = options.items || 1,
      btnPlayText = options.btnPlayText || 'Play',
      btnStopText = options.btnStopText || 'Stop',
      arrNextText = options.arrNextText || '&rsaquo;',
      arrPrevText = options.arrPrevText || '&lsaquo;',
      crslClass = 'js-Carousel',
      crslArrowPrevClass = 'js-Carousel-arrowPrev',
      crslArrowNextClass = 'js-Carousel-arrowNext',
      crslDotsClass = 'js-Carousel-dots',
      crslButtonStopClass = 'js-Carousel-btnStop',
      crslButtonPlayClass = 'js-Carousel-btnPlay',
      count = element.querySelectorAll('li').length,
      current = 0,
      cycle = null;

  /**
   * Render the carousel if more than one slide.
   * Otherwise just show the single item.
   */
  if (count > 1) {
    render();
  }

  /**
   * Render the carousel and all the navigation elements (arrows, dots,
   * play/stop buttons) if needed. Start with a particular slide, if set.
   * If infinite - move the last item to the very beginning and off the display area.
   */
  function render() {
    var actions = {
      dots: function dots() {
        return showDots();
      },
      arrows: function arrows() {
        return showArrows();
      },
      buttons: function buttons() {
        return showButtons();
      },
      autoplay: function autoplay() {
        return play();
      },
      infinite: function infinite() {
        return moveItem(count - 1, -element.offsetWidth + 'px', 'afterBegin');
      },
      initial: function initial() {
        var initial = 0 || options.initial >= count ? count : options.initial;
        return show(initial);
      },
      setupSwipe: function setupSwipe() {
        return _setupSwipe();
      }
    };

    for (var key in actions) {
      if (options.hasOwnProperty(key) && options[key]) {
        actions[key]();
      }
    }
  }

  /**
   * Helper for moving items - last to be first or first to be the last. Needed
   * for infinite rotation of the carousel.
   *
   * @param {number} i - Position of the list item to move (either first or last).
   * @param {number} marginLeft - Left margin to position the item off-screen
   *        at the beginning or no margin at the end.
   * @param {string} position - Where to insert the item. One of the following -
   *        'afterBegin' or 'beforeEnd'.
   */
  function moveItem(i, marginLeft, position) {
    var itemToMove = element.querySelectorAll('.' + crslClass + ' > ul li')[i];
    itemToMove.style.marginLeft = marginLeft;

    element.querySelector('.' + crslClass + ' > ul').removeChild(itemToMove);

    element.querySelector('.' + crslClass + ' > ul').insertAdjacentHTML(position, itemToMove.outerHTML);
  }

  /**
   * Create the navigation dots and attach to carousel.
   */
  function showDots() {
    var dotContainer = document.createElement('ul');
    dotContainer.classList.add(crslDotsClass);
    dotContainer.addEventListener('click', scrollToImage.bind(this));

    for (var i = 0; i < count; i++) {
      var dotElement = document.createElement('li');
      dotElement.setAttribute('data-position', i);

      dotContainer.appendChild(dotElement);
    }

    element.appendChild(dotContainer);
    currentDot();
  }

  function _setupSwipe() {
    var touchsurface = element.querySelector('.' + crslClass + ' > ul'),
        swipedir,
        startX,
        startY,
        dist,
        distX,
        distY,
        threshold = 100,
        restraint = 100,
        allowedTime = 300,
        elapsedTime,
        startTime;

    touchsurface.addEventListener('touchstart', function (e) {
      var touchobj = e.changedTouches[0];
      swipedir = 'none';
      dist = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
    }, false);

    // touchsurface.addEventListener('touchmove', function(e){
    //     e.preventDefault() // prevent scrolling when inside DIV
    // }, false)

    touchsurface.addEventListener('touchend', function (e) {
      var touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX;
      distY = touchobj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          swipedir = distX < 0 ? 'left' : 'right';
          e.preventDefault();
        }
      }
      if (swipedir == 'left') {
        showNext();
      } else if (swipedir == 'right') {
        showPrev();
      }
    }, false);
  }

  /**
   * Highlight the corresponding dot of the currently visible carousel item.
   */
  function currentDot() {
    [].forEach.call(element.querySelectorAll('.' + crslDotsClass + ' li'), function (item) {
      item.classList.remove('is-active');
    });

    element.querySelectorAll('.' + crslDotsClass + ' li')[current].classList.add('is-active');
  }

  /**
   * Moves the carousel to the desired slide on a navigation dot click.
   *
   * @param {object} e - The clicked dot element.
   */
  function scrollToImage(e) {
    if (e.target.tagName === 'LI') {
      show(e.target.getAttribute('data-position'));

      resetInterval();
    }
  }

  /**
   * Create the navigation arrows (prev/next) and attach to carousel.
   */
  function showArrows() {
    var buttonPrev = document.createElement('button');
    buttonPrev.innerHTML = arrPrevText;
    buttonPrev.classList.add(crslArrowPrevClass);

    var buttonNext = document.createElement('button');
    buttonNext.innerHTML = arrNextText;
    buttonNext.classList.add(crslArrowNextClass);

    buttonPrev.addEventListener('click', showPrev);
    buttonNext.addEventListener('click', showNext);

    element.appendChild(buttonPrev);
    element.appendChild(buttonNext);
  }

  /**
   * Create the navigation buttons (play/stop) and attach to carousel.
   */
  function showButtons() {
    var buttonPlay = document.createElement('button');
    buttonPlay.innerHTML = btnPlayText;
    buttonPlay.classList.add(crslButtonPlayClass);
    buttonPlay.addEventListener('click', play);

    var buttonStop = document.createElement('button');
    buttonStop.innerHTML = btnStopText;
    buttonStop.classList.add(crslButtonStopClass);
    buttonStop.addEventListener('click', stop);

    element.appendChild(buttonPlay);
    element.appendChild(buttonStop);
  }

  /**
   * Animate the carousel to go back 1 slide. Moves the very first (off-screen)
   * item to the visible area.
   *
   * @param {object} item - The element to move into view.
   */
  function animatePrev(item) {
    item.style.marginLeft = '';
  }

  /**
   * Animate the carousel to go forward 1 slide.
   *
   * @param {object} item - The element to move into view.
   */
  function animateNext(item) {
    item.style.marginLeft = -element.offsetWidth + 'px';
  }

  /**
   * Move the carousel to the desired slide.
   *
   * @param {number} slide - The index of the item.
   * @public
   */
  function show(slide) {
    var delta = current - slide;

    if (delta < 0) {
      moveByDelta(-delta, showNext);
    } else {
      moveByDelta(delta, showPrev);
    }
  }

  /**
   * Helper to move the slides by index.
   *
   * @param {number} delta - how many slides to move.
   * @param {function} direction - function to move forward or back.
   */
  function moveByDelta(delta, direction) {
    for (var i = 0; i < delta; i++) {
      direction();
    }
  }

  /**
   * Move the carousel back.
   *
   * @public
   */
  function showPrev() {
    if (options.infinite) {
      showPrevInfinite();
    } else {
      showPrevLinear();
    }

    resetInterval();
  }

  /**
   * Helper function to show the previous slide for INFINITE carousel.
   * Do the sliding, move the last item to the very beginning.
   */
  function showPrevInfinite() {
    animatePrev(element.querySelectorAll('.' + crslClass + ' > ul li')[0]);
    moveItem(count - 1, -element.offsetWidth + 'px', 'afterBegin');

    adjustCurrent(-1);
  }

  /**
   * Helper function to show the previous slide for LINEAR carousel.
   * Stop the autoplay if user goes back. If on the first slide - do nothing.
   */
  function showPrevLinear() {
    stop();
    if (current === 0) {
      return;
    }
    animatePrev(element.querySelectorAll('.' + crslClass + ' > ul li')[current - 1]);

    adjustCurrent(-1);
  }

  /**
   * Move the carousel forward.
   *
   * @public
   */
  function showNext() {
    if (options.infinite) {
      showNextInfinite();
    } else {
      showNextLinear();
    }

    resetInterval();
  }

  /**
   * Helper function to show the next slide for INFINITE carousel.
   * Do the sliding, move the second item to the very end.
   */
  function showNextInfinite() {
    animateNext(element.querySelectorAll('.' + crslClass + ' > ul li')[1]);
    moveItem(0, '', 'beforeEnd');

    adjustCurrent(1);
  }

  /**
   * Helper function to show the next slide for LINEAR carousel.
   * If on the last slide - stop the play and do nothing else.
   */
  function showNextLinear() {
    if (current === count - 1) {
      stop();
      return;
    }
    animateNext(element.querySelectorAll('.' + crslClass + ' > ul li')[current]);

    adjustCurrent(1);
  }

  /**
   * Adjust _current_ and highlight the respective dot.
   *
   * @param {number} val - defines which way current should be corrected.
   */
  function adjustCurrent(val) {
    current += val;

    switch (current) {
      case -1:
        current = count - 1;
        break;
      case count:
        current = 0;
        break;
      default:
        current = current;
    }

    if (options.dots) {
      currentDot();
    }
  }

  /**
   * Reset the autoplay interval.
   */
  function resetInterval() {
    if (cycle) {
      stop();
      play();
    }
  }

  /**
   * Start the auto play.
   * If already playing do nothing.
   *
   * @public
   */
  function play() {
    if (cycle) {
      return;
    }
    cycle = setInterval(showNext.bind(this), interval);
  }

  /**
   * Stop the auto play.
   *
   * @public
   */
  function stop() {
    clearInterval(cycle);
    cycle = null;
  }

  /**
   * Returns the current slide index.
   *
   * @public
   */
  function live() {
    return current;
  }

  return {
    'live': live,
    'show': show,
    'prev': showPrev,
    'next': showNext,
    'play': play,
    'stop': stop
  };
};

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
module.exports = __webpack_require__(41);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _SalmonGlobal = __webpack_require__(35);

var _SalmonGlobal2 = _interopRequireDefault(_SalmonGlobal);

var _GameGlobal = __webpack_require__(36);

var _GameGlobal2 = _interopRequireDefault(_GameGlobal);

var _basketOverlay = __webpack_require__(37);

var _basketOverlay2 = _interopRequireDefault(_basketOverlay);

var _modalHelper = __webpack_require__(40);

var _modalHelper2 = _interopRequireDefault(_modalHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import espotCarousels from './components/espot-carousel';

/*
  Import new components
*/
/**
  Global includes this is the Site controller
  through which all sitewide scripts and data
  dependanices should be loaded
**/

/*
  Import legacy components
  */
var SiteController = {
  /*
    initialisation order
  */
  init: function init() {
    if (typeof GameRepack === 'undefined') {
      throw new Error('GameRepack obect was not found');
    }

    this.setupLegacy();
    // espotCarousels.init();
    _modalHelper2.default.init();

    if (GameRepack.features) {
      this.checkFeatures(GameRepack.features);
    } else {
      throw new Error('Feature check object is missing');
    }
  },

  /*
    Legacy Migration container:
    TODO: after moving all code in figure out whats deprecated
    TODO: move the code and datamodels of the grunt fe code as is and wrap in
      export default {
      initLegacy() {
        // legacy code goes here
      }
    }
  */
  setupLegacy: function setupLegacy() {
    window.Salmon = window.Salmon || {};
    window.Salmon.Global = window.Salmon.Global || {};
    window.App = window.App || {};
  },

  /*
    Check add to Basket Overlay feature
    @param {object} GameRepack.features
  */
  checkFeatures: function checkFeatures(features) {
    if (features['ADDTOBASKET_OVERLAY_ON']) {
      _basketOverlay2.default.init();
    } else {
      if (!GameRepack.isMobile) {
        _SalmonGlobal2.default.initLegacy();
      }
      _GameGlobal2.default.initLegacy();
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  SiteController.init();
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  initLegacy: function initLegacy() {

    var App = App || {};
    App.PDP = App.PDP || {};
    App.PDP.AddToBasketNew = new function () {

      var partNumber;

      var determinePartNumber = function determinePartNumber(urlData) {

        var isKit = urlData.indexOf('componentsPartNumber=') !== -1 ? true : false;
        var param = isKit ? 'componentsPartNumber=' : 'partNumber=';
        var n = urlData.split(param)[1];
        var isMpItem = n.charAt(6) == '-' ? true : false;
        var pn = n.slice(0, 6);

        if (isMpItem) {
          pn = 'm' + pn;
        };

        return pn;
      };

      var addToBasketRequest = function addToBasketRequest(urlData) {

        partNumber = determinePartNumber(urlData);

        $.ajax({
          url: urlData,
          dataType: "json",
          success: productAdded,
          error: function error(res) {
            var parseResponse = res.responseText.substring(0, res.responseText.indexOf('/*')).trim();
            errorResponse(JSON.parse(parseResponse));
          }
        });
      },
          errorResponse = function errorResponse(res) {
        var msg = typeof res.errorMessage !== 'undefined' ? res.errorMessage : 'Either this product is out of stock or your basket is full.  Baskets are limited to a maximum of 10 items.';
        Salmon.Global.uiBlocker.unblockUI();
        Salmon.Global.Modal.openModal('<div class="error">' + msg + '</div>', 'basketOverlay');
      },
          productAdded = function productAdded(res) {

        Salmon.Global.uiBlocker.unblockUI();

        if (res) {
          try {
            $(document).trigger(Salmon.Global.CustomEvents.productAddedToBasket, res);
          } catch (e) {}
          if (typeof res.errorMessage != 'undefined') {
            Salmon.Global.Modal.openModal('<div class="error">' + res.errorMessage + '</div>', 'basketOverlay');
          } else {
            res.capLimit = parseInt(res.capLimit);
            res.addItemFailedByCap = res.addItemFailedByCap === 'true';

            if (!res.addItemFailedByCap) {

              Salmon.Global.Modal.openModal(res.recentlyAddedHtml, 'basketOverlay');

              $('#basketOverlay').find('.IORecsSlider').each(function () {
                new Salmon.Global.IORecSliders.IOSlider($(this), false, {
                  ZoneID: 'MBask_1',
                  ProductID: partNumber
                }, function () {

                  var modalContent = $('#basketOverlay').find('.modalContent');
                  modalContent.css('top', ($(window).height() - modalContent.height()) / 2);
                });
                cmDisplayRecs();
              });

              if (typeof ajaxInitialReponse !== 'undefined') {
                if ($('#basketOverlay .yourPriceOverlayEspot').length > 0 && ajaxInitialReponse.userInfo.isLoggedIn == "true") {
                  App.PDP.YourPrice.updatePriceOverlay(res.orderSum, $('#basketOverlay .basketReview').html());
                }
              }
            }

            var capMsg = null;
            var basketHref = $('body').find('.miniBasketContainer a.dropdownToggle').attr('href');

            if (!res.addItemFailedByCap && res.capLimit > 0) {
              if ($('body').find('#basketOverlay .CTAs .cap-error').length < 1) {
                capMsg = '<p class="cap-error">This is a very high demand item. We have a limit of ' + res.capLimit + ' per order to ensure as many customers as possible benefit.</p>';
                $('body').find('#basketOverlay .CTAs').append(capMsg);
              }
            } else if (res.addItemFailedByCap) {
              if ($('body').find('#pdpPriceContainers .cap-error').length < 1) {
                if (res.capLimit > 1) {
                  capMsg = '<p class="cap-error">This is a very high demand item. We have a limit of ' + res.capLimit + ' per order to ensure as many customers as possible benefit. Please go to basket to update quantity</p><p class="closeUpgradeModal"><a href="' + basketHref + '" class="btn primary">Go to Basket</a></p>';
                } else {
                  capMsg = '<p class="cap-error">This is a very high demand item. We have a limit of ' + res.capLimit + ' per order to ensure as many customers as possible benefit.</p>';
                }
                Salmon.Global.Modal.openModal(capMsg, 'capLimitModal');
              }
            }
          }
        }
      };

      $(document).ready(function () {
        $(document).on('click', '.modalContent .closeModal', function (event) {
          event.preventDefault();
          Salmon.Global.uiBlocker.unblockUI();
        });

        $(document).on('click', '.modalContent .CTAs a.btn.secondary', function (event) {
          event.preventDefault();
          Salmon.Global.Modal.closeModal();
        });

        $(document).on('click', 'a.addToBasket:not(.globalAddToBasketOverlay a.addToBasket), button.addToBasket:not(.globalAddToBasketOverlay button.addToBasket)', function (event) {
          event.preventDefault();
          console.log('Should not see this message if ADDTOBASKET_OVERLAY_ON is TRUE');
          Salmon.Global.uiBlocker.blockUI();
          var $button = $(this);
          var $form = $button.parent();
          var urlData;

          if ($form.length > 0 && $form.hasClass('addToBasketForm')) {
            urlData = $form.find('input[name="addToShoppingCartAJAXURL"]').val() + '&' + $form.serialize();
          } else {
            urlData = $button.attr('href');
            urlData = urlData.replace('mOrderChangeServiceItemAdd', 'OrderChangeServiceItemAdd');
            urlData = urlData.replace('errorViewName=mAddToBasketView', 'errorViewName=AjaxActionErrorResponse');
            urlData = urlData.replace('URL=mAddToBasketView', 'URL=AjaxMiniShoppingBagView');
            urlData = urlData.replace('&mobileFlag=true', '');
            addToBasketRequest(urlData);
          }
        });

        $(document).on('click', '.moreBuyingOptions .seeAll, .otherOffersStackedCTA', function (event) {
          event.preventDefault();
          $("html, body").animate({ scrollTop: $('.section.buyingChoices').offset().top - 45 });
        });
      });
    }();
  }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  initLegacy: function initLegacy() {

    var Game = Game || {};
    Game.Global = Game.Global || {};

    Game.Global.PerfectPartners = function () {
      var $section = $('.section.perfectPartners .boughtTogether');
      var $products = $section.find('.perfectPartnerProducts > div');
      var $priceSection = $section.find('.main .totals h3>span');
      var $buyButton;
      var $boughtTogetherCheckboxes;
      var addedCount = 0;
      var lastSuccessRes;
      var atLeastOneOutOfStock = false;
      var productsBuyUrls = [];

      var partNumber = null;
      var isMultiple = true;
      var loader = null;
      var refreshOverlayContent = true;
      var isProductRec = false;
      var updateBasketCount = true;

      var productData = {
        persistProduct: false,
        isWarranty: false,
        productImage: '',
        persistTitle: '',
        priceToDisplay: '',
        provenance: '',
        platformClassName: '',
        platform: '',
        soldBy: ''
      };

      function determinePartNumber(urlData) {

        var isKit = urlData.indexOf('componentsPartNumber=') !== -1 ? true : false;
        var param = isKit ? 'componentsPartNumber=' : 'partNumber=';
        var n = urlData.split(param)[1];
        var isMpItem = n.charAt(6) == '-' ? true : false;
        var pn = n.slice(0, 6);

        if (isMpItem) {
          pn = 'm' + pn;
        };

        return pn;
      };

      function generateProductsBuyUrls() {
        var urls = [];
        $products.each(function () {
          urls.push($(this).data('buyurl'));
        });
        productsBuyUrls = urls;
      };

      function callCoremetrics(script) {
        var $script = $(script);
        for (var i = 0; i < $script.length; i++) {
          if ($script[i].innerHTML) {
            var scriptHtml = $script[i].innerHTML.replace("<!--", "").replace("//-->", "").replace(/^\s*/, "").replace(/\s*$/, "");
            if (scriptHtml.indexOf("cmSet") !== 0) {
              eval(scriptHtml);
            }
          }
        }
      };

      function updateProducts(res) {
        if (typeof res.errorMessage == 'undefined') {
          $products.eq(addedCount).addClass('added');
          lastSuccessRes = res;
        } else {
          $products.eq(addedCount).addClass('outOfStock');
          atLeastOneOutOfStock = true;
        }
        callCoremetrics(res.coremetrics);
      };

      function updateMiniBasket() {
        var $amount = $('header .miniBasketContainer .text');
        var $dropdownCart = $('header .dropdownCart');

        $amount.text(parseInt(lastSuccessRes.orderQuantity));
        $dropdownCart.html(lastSuccessRes.itemsListHtml);
      };

      function setupFinalOverlay(res) {

        if (typeof lastSuccessRes != 'undefined') {

          updateMiniBasket();

          if ($('body').hasClass('basketOverlayOpen') && atLeastOneOutOfStock) {
            $('.product-inner .product-message').removeClass('sml-tick').text('Sorry, some of the products are out of stock now');
          };
        } else {

          Game.Global.BasketModal.openModal({
            "itemAddSuccess": "false",
            "errorMessage": "Sorry, products are out of stock now"
          }, 'addedToBasketOverlay', loader, partNumber, isMultiple, refreshOverlayContent, res, isProductRec);

          if ($('body').hasClass('basketOverlayOpen')) {
            $('.product-inner .product-message').removeClass('sml-tick').text('Sorry, products are out of stock now');
          };
        }
      };

      function responseSuccess(res) {

        if (typeof Salmon.Global.uiBlocker !== 'undefined') {
          Salmon.Global.uiBlocker.unblockUI();
        } else if (typeof uiBlocker !== 'undefined') {
          uiBlocker.unblockUI();
        };

        loader = true;

        if (typeof res.errorMessage !== 'undefined') {

          updateBasketCount = false;

          if ($('.opened.addedToBasketOverlay').length) {

            $('.addedToBasketOverlay .basket-warning-content').empty().text(res.errorMessage);
            $('.addedToBasketOverlay .basket-warning').show();
          } else {

            Game.Global.BasketModal.openModal({
              "itemAddSuccess": "false",
              "errorMessage": res.errorMessage
            }, 'addedToBasketOverlay', loader, partNumber, isMultiple, refreshOverlayContent, res, isProductRec);
          };
        } else if (res.addItemFailedByCap === 'true') {

          var capMsg = 'Failed by capLimit';
          updateBasketCount = false;
          loader = true;

          if (!$('.opened.addedToBasketOverlay .errorSummaryWrapper').length) {

            if ($('.opened.addedToBasketOverlay').length) {

              $('.addedToBasketOverlay .basketWarranty').remove();
              $('.addedToBasketOverlay .basket-warning-content').empty().text(capMsg);
              $('.addedToBasketOverlay .basket-warning').show();

              var basketExtrasTopPosition = $('.addedToBasketOverlay .basketProducts').height();
              $('.addedToBasketOverlay .basketExtras').css('top', basketExtrasTopPosition.toFixed(0) + 'px');
            } else {

              Game.Global.BasketModal.openModal({
                "itemAddSuccess": "false",
                "capLimit": res.capLimit,
                "errorMessage": capMsg
              }, 'addedToBasketOverlay', loader, partNumber, isMultiple, refreshOverlayContent, res, isProductRec);
            };
          };
        } else {

          updateProducts(res);

          if (typeof Salmon.Global.CustomEvents !== 'undefined' && typeof Salmon.Global.CustomEvents.productAddedToBasket !== 'undefined') {
            $(document).trigger(Salmon.Global.CustomEvents.productAddedToBasket, res);
          } else if ($('.globalAddToBasketOverlay #basketIcon').length) {
            $('.globalAddToBasketOverlay [new-mobile-header] .quantity').text(parseFloat(res.orderQuantity).toFixed(0));
          }

          if (addedCount == productsBuyUrls.length - 1) {

            addedCount = 0;
            productsBuyUrls = [];
            setTimeout(setupFinalOverlay(res), 1500);
            $('.product-inner .product-message').removeClass('error').addClass('sml-tick').html('<p>' + res.newItemsAdded.items.item.itemCount + ' items added to your basket:</p>');
            $('.orderTotals  .totalItems').empty().text('(' + res.newItemsAdded.basketReview.basketItemCount + ')');
            $('.orderTotals  .totalAmount').empty().text(res.newItemsAdded.basketReview.basketTotal.replace('&pound;', '£'));
          } else {

            isMultiple = true;
            loader = true;
            refreshOverlayContent = true;

            if (addedCount === 0) {
              Game.Global.BasketModal.openModal(res.newItemsAdded, 'addedToBasketOverlay', loader, partNumber, isMultiple, refreshOverlayContent, res, isProductRec);

              $('.addedToBasketOverlay').find('.productRecs').each(function () {
                new Salmon.Global.IORecSliders.IOSlider($(this), false, {
                  ZoneID: 'MBask_1',
                  ProductID: partNumber
                }, function () {

                  var carouselContent = $('#basketOverlayRecs').find('>li');
                  var carouselContainerString = ['<div class="carouselWrapper basketOverlay">', '<div carousel data-autorun="false" data-transition="slide" data-transitionDuration="250" data-delay="1000" data-controlPosition="outside" data-showIndicators="false">', '<div class="inner">', '<div class="control previous">', '<div class="canvas"></div>', '<div class="inner">', '<a href="" class="icon-left-open"><span>Previous</span></a>', '</div>', '</div>', '<div class="items">', '</div>', '<div class="control next">', '<div class="canvas"></div>', '<div class="inner">', '<a href="" class="icon-right-open"><span>Next</span></a>', '</div>', '</div>', '</div>', '</div>', '<div class="canvas"></div>', '</div>'].join('');
                  var $carouselContainer = $(carouselContainerString);

                  carouselContent.each(function () {
                    var $html = $(this).html();
                    $html = $html.replace('2DS/3DS', 'I3DS');

                    var $item = $('<div class="frame">' + $html + '</div>');
                    $carouselContainer.find('.items').append($item);
                  });

                  $('.basketOverlayContentInner .basketProductRecs').replaceWith($carouselContainer);

                  carousel.init();
                });
                cmDisplayRecs();
              });
            } else {

              if (updateBasketCount) {

                $('.orderTotals  .totalItems').empty().text('(' + res.newItemsAdded.basketReview.basketItemCount + ')');
                $('.orderTotals  .totalAmount').empty().text(res.newItemsAdded.basketReview.basketTotal.replace('&pound;', '£'));
              };
            };

            addedCount++;
            sendRequest(productsBuyUrls[addedCount]);
          }
        };
      };

      function sendRequest(url) {

        partNumber = determinePartNumber(url);

        if (addedCount == productsBuyUrls.length - 1) {
          url += '&lastPerfectPartner=true&perfectPartnersAmount=' + $products.length;
        };
        $.ajax({
          url: url + '',
          dataType: "json",
          success: responseSuccess
        });
      };

      return {
        init: function init() {

          $buyButton = $('.section.perfectPartners .totals .addAllToBasket, section#perfectPartners .totals .addAllToBasket');
          $boughtTogetherCheckboxes = $('.pp_checkBox>input');

          $buyButton.on('click', function (event) {
            event.preventDefault();

            if (typeof Salmon.Global.uiBlocker !== 'undefined') {
              Salmon.Global.uiBlocker.blockUI();
            } else if (typeof uiBlocker !== 'undefined') {
              uiBlocker.blockUI();
            };

            if (!$(this).hasClass('disabled')) {
              $products = $(this).closest('.main').find('.perfectPartnerProducts .pp_product.addItem');
              generateProductsBuyUrls();
              $section.append('<div class="loader"></div>');

              productData = {
                persistProduct: true,
                isWarranty: false,
                productImage: $('.perfectPartnerProducts div:first-child img').attr('src'),
                persistTitle: $('.perfectPartnerProducts div:first-child h3').text().trim(),
                priceToDisplay: $('.perfectPartnerProducts div:first-child .price').text().replace('£', '').trim(),
                provenance: $('.perfectPartnerProducts .provenance').text().trim(),
                platformClassName: '',
                platform: '',
                soldBy: ''
              };

              Game.Global.BasketModal.persistedProductData(productData);

              sendRequest(productsBuyUrls[addedCount]);
            }
          });

          $boughtTogetherCheckboxes.on('change', function () {
            $(this).closest('.pp_product').toggleClass('addItem');

            var thisPrice = parseFloat($(this).closest('.pp_product').find('.price').html().replace('£', ''));
            var totalPrice = parseFloat($priceSection.html().replace('£', ''));

            if ($(this).closest('.pp_product').hasClass('addItem')) {
              totalPrice = totalPrice + thisPrice;
            } else {
              totalPrice = totalPrice - thisPrice;
            }

            $priceSection.html('£' + totalPrice.toFixed(2));

            if (totalPrice == 0) {
              $buyButton.addClass('disabled');
            } else {
              $buyButton.removeClass('disabled');
            }
          });
        }
      };
    }();

    $(document).ready(function () {
      if ($('body').hasClass('globalAddToBasketOverlay')) {
        Game.Global.PerfectPartners.init();
      };
    });
  }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _warrantyAgreement = __webpack_require__(3);

var _warrantyAgreement2 = _interopRequireDefault(_warrantyAgreement);

var _parseQueryString = __webpack_require__(2);

var _parseQueryString2 = _interopRequireDefault(_parseQueryString);

var _addToBasket = __webpack_require__(1);

var _addToBasket2 = _interopRequireDefault(_addToBasket);

var _perfectPartnerHelper = __webpack_require__(38);

var _perfectPartnerHelper2 = _interopRequireDefault(_perfectPartnerHelper);

var _jsCarousel = __webpack_require__(4);

var _jsCarousel2 = _interopRequireDefault(_jsCarousel);

var _frequentlyBoughtWidget = __webpack_require__(39);

var _frequentlyBoughtWidget2 = _interopRequireDefault(_frequentlyBoughtWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addToBasketOverlay = {
  init: function init() {
    this.multipleAdded = false;
    this.carousels = [];

    this.retrivedRecs = false;
    this.carouselItems = '';

    this.bindEvents();
    _warrantyAgreement2.default.init();
    _frequentlyBoughtWidget2.default.init();
  },
  accordion: function accordion() {
    var DOMContext = $('body').find('.purchase-confirmation-modal')[0];
    var context = $('.overlay-accordion', DOMContext);
    var accordion = $('.accordion', context);
    var scroller = function scroller(scrollVal) {
      var viewport = $('.modal-content-middle', DOMContext);

      $('.modal-content-middle', DOMContext).animate({
        scrollTop: scrollVal
      }, 'slow');
    };

    $(accordion).each(function (index, element) {
      $('.section-top, .indicator', element).on('click', function (e) {
        var accordionContainer = $(e.currentTarget).parents('.accordion')[0];
        var panel = accordionContainer.nextElementSibling;

        accordionContainer.classList.toggle("active");

        if (panel.style.display === "block") {
          panel.style.display = "none";
          setTimeout(scroller($(accordionContainer).position().top), 100);
        } else {
          panel.style.display = "block";
          setTimeout(scroller($(panel).position().top), 100);
        }
      });
    });
  },
  getCarouselItems: function getCarouselItems(pID) {
    var self = this;
    var parseItems = '';
    var itemArray = [];

    setTimeout(function () {
      $('.carousel-loader').remove();
      if (typeof uiblocker != 'undefined') {
        uiBlocker.unblockUI();
      } else {
        Salmon.Global.uiBlocker.unblockUI();
      }
    }, 5000);

    /*
      for local testing
      pID = '233424';
    */

    new Salmon.Global.IORecSliders.IOSlider($('#tempRecs .IORecsSlider'), false, {
      ZoneID: 'MBask_1',
      ProductID: pID
    }, function () {
      $('#tempRecs .IORecsSlider').find('li').each(function (index, item) {
        var title = $('h3', item).text();
        var trimTitle = title.length > 53 ? title.substring(0, 53) + '...' : title;
        var parsePlatformLogoClass = $('.platformLogo', item).attr('class').replace('platformLogo', '').toUpperCase().trim();
        var imgSrc = $('.image img', item).attr('data-src');

        itemArray.push({
          'url': $('.image a.rec', item).attr('href'),
          'img': imgSrc,
          'title': title,
          'trimTitle': trimTitle,
          'platform': parsePlatformLogoClass,
          'condition': $('.image a.rec', item).attr('data-condition'),
          'price': $('.price', item).text(),
          'addToBasketUrl': $('a.addToBasket', item).attr('href')
        });
      });
      $('#tempRecs .IORecsSlider').html('');

      for (var i = 0; i < itemArray.length; i++) {
        if (i === 0 || i % 2 === 0 || itemArray.length < 4) {
          parseItems += '<li>';
        }
        parseItems += '<div class="recommendation-panel">\n            <div class="recomendation-image">\n              <a href="' + itemArray[i].url + '" title="' + itemArray[i].title + '">\n                <img src="' + itemArray[i].img + '" />\n              </a>\n            </div>\n            <div class="recommendation-content">\n              <h3>\n                <a href="' + itemArray[i].url + '" title="' + itemArray[i].title + '">\n                  ' + itemArray[i].trimTitle + '\n                </a>\n              </h3>\n              <div class="state">\n                <span class="platformLogo ' + itemArray[i].platform + '">' + itemArray[i].platform + '</span>\n                <strong class="product-condition">' + itemArray[i].condition + '</strong>\n              </div>\n              <div class="price">' + itemArray[i].price + '</div>\n                <a class="add-product addToBasket" href="' + itemArray[i].addToBasketUrl + '">Add to basket</a>\n              </div>\n          </div>';

        if (i === itemArray.length - 1 || !(i % 2 === 0) || itemArray.length < 4) {
          parseItems += '</li>';
        }
      }

      self.carouselItems = parseItems;
      self.retrivedRecs = self.carouselItems !== '';
    });

    cmDisplayRecs();
  },
  productCarousel: function productCarousel(carouselItems) {
    var self = this;
    var fragmentOutput = carouselItems;

    if (document.getElementById('productCarousel') && _jsCarousel2.default) {
      document.getElementById('productCarouselItems').innerHTML = fragmentOutput;

      var productCarousel = new _jsCarousel2.default({
        elem: 'productCarousel', // id of the carousel container
        autoplay: false, // starts the rotation automatically
        infinite: true, // enables infinite mode
        interval: 1500, // interval between slide changes
        initial: 0, // slide to start with
        dots: false, // show navigation dots
        arrows: true, // show navigation arrows
        buttons: false, // hide <play>/<stop> buttons,
        btnStopText: 'Pause', // <stop> button text
        items: 2, // number of items to display at one time
        resize: false, // turn on fluid (responsive) carousel,
        setupSwipe: true
      });

      setTimeout(function () {
        $('.carousel-wrapper').removeClass('loading');

        setTimeout(function () {
          $('.carousel-loader').remove();
        }, 50);
      }, 50);
    }
  },
  requestOverlay: function requestOverlay(response) {
    var self = this;
    var responseWrapper = document.createElement('div');
    responseWrapper.innerHTML = response;
    var responseHTML = $('.purchase-confirmation-modal', responseWrapper).html();
    $('.purchase-confirmation-modal', document).html(responseHTML);

    /* TODO: move uiblocker to webpack cosmponent */
    if (Salmon.Global.uiBlocker) {
      Salmon.Global.uiBlocker.unblockUI();
    }

    //Hack for secure checkout mobile link issue
    if (GameRepack.isMobile) {
      var $secureCheckoutButton = $('.purchase-confirmation-modal .secure-checkout');
      var secureUrl = $secureCheckoutButton.attr('href');

      if ($secureCheckoutButton.length > 0) {
        secureUrl = secureUrl.replace('&mobileFlag=false', '');
        $secureCheckoutButton.attr('href', secureUrl + '&mobileFlag=true');
      }
    }

    var DOMContext = $('body').find('.purchase-confirmation-modal')[0];
    var context = DOMContext.getElementsByClassName('overlay-accordion')[0];

    if (context) {
      this.accordion();
    }

    $('.main-loader').removeClass('hidden').removeClass('complete');
    $('.purchase-confirmation-modal').addClass('loading').addClass('ready');

    $('.purchase-confirmation-modal').removeClass('loading');

    if (this.multipleAdded) {
      $('.purchase-confirmation-modal', document).find('.product-image').addClass('multi-item');
    }

    self.waitForProductRecs();

    setTimeout(function () {
      $('.main-loader').addClass('complete');

      setTimeout(function () {
        $('.main-loader').addClass('hidden');
      }, 50);
    }, 50);
  },
  waitForProductRecs: function waitForProductRecs() {
    var handle,
        self = this,
        attempts = 0,
        limit = 20,
        delay = 100,
        throttled = false;

    function checkRecs() {
      attempts++;

      if (self.retrivedRecs) {
        clearInterval(handle);

        if (document.getElementById('productCarousel') && _jsCarousel2.default && self.carouselItems !== '') {
          self.carousels.push({
            element: document.getElementById('productCarousel'),
            items: 2
          });

          self.productCarousel(self.carouselItems);

          if (!throttled) {
            for (var i = 0; i < self.carousels.length; i++) {
              self.setCarouselWidth(i);
            }

            throttled = true;
            setTimeout(function () {
              throttled = false;
            }, 50);
          }
        }
      } else if (attempts >= limit) {
        clearInterval(handle);
      }
    }

    handle = setInterval(checkRecs, delay);
  },
  setCarouselWidth: function setCarouselWidth(i) {
    var setWidth = this.carousels[i].items;
    var setHeight = this.carousels[i].element.querySelector('ul:first-child').offsetHeight;

    if (window.innerWidth < 769 && this.carousels[i].items > 2) {
      setWidth = 2;
    }

    var itemWidth = this.carousels[i].element.offsetWidth / setWidth;
    itemWidth = itemWidth < 250 ? 250 : itemWidth;

    var elements = this.carousels[i].element.querySelectorAll('.js-Carousel > ul:first-child li');

    for (var j = 0; j < elements.length; j++) {
      elements[j].style.width = itemWidth + 'px';
    }
  },
  handleMultipleCoremetricsScripts: function handleMultipleCoremetricsScripts(cmScripts) {
    for (var script in cmScripts) {
      this.callCoremetrics(cmScripts[script]);
    }
  },
  callCoremetrics: function callCoremetrics(script) {
    var $script = $(script);
    for (var i = 0; i < $script.length; i++) {
      if ($script[i].nodeName === 'SCRIPT' && $script[i].src.indexOf("eluminate") === -1 && $script[i].innerHTML.indexOf("cmSet") !== 0) {
        $(document.body).append($script.eq(i));
      }
    }
  },
  bindEvents: function bindEvents() {
    var self = this;
    var DOMContext = $('body').find('.purchase-confirmation-modal');
    var throttled = false;

    /*
      dismiss the overlay
    */
    $('body').on('click', '.continue-shopping', function (e) {
      e.preventDefault();
      window.location.reload();
    });
    $('body').on('click', '.purchase-confirmation-modal', function (e) {
      if (e.target === e.currentTarget) {
        e.preventDefault();
        window.location.reload();
      }
    });

    /*
      Add to basket
    */
    $('body').on('click', '.addToBasket', function (e) {
      e.preventDefault();
      self.multipleAdded = false;
      var href = e.currentTarget.href;
      var marketplaceItem = (0, _parseQueryString2.default)(href, 'marketplaceItem');
      var pid = (0, _parseQueryString2.default)(href, 'partNumber');
      if (marketplaceItem) {
        pid = 'M' + pid.split('-')[0];
      }
      /*
        TODO: move uiblocker to webpack component
      */
      if (Salmon.Global.uiBlocker && !$('body').hasClass('purchase-confirmation-active')) {
        Salmon.Global.uiBlocker.blockUI();
      }

      $('body').addClass('purchase-confirmation-active');
      $('.purchase-confirmation-modal').addClass('opened');
      $('.main-loader').removeClass('complete').removeClass('hidden');

      self.getCarouselItems(pid);

      _addToBasket2.default.addProduct(e.currentTarget.href, function (response) {
        /*
          TODO:
          currently have to fetch carousel items first as IOslider
          is still brokering the coremedia request
        */
        self.requestOverlay(response.basketOverlayHtml);
        if (GameRepack.isMobile) {
          self.callCoremetrics(response.coremetrics);
        }
      });
    });

    /*
      Add Muliple to basket
      TODO: Check if off is still required
    */
    $('body').off('click', '.addAllToBasket');
    $('body').on('click', '.addAllToBasket', function (e) {
      e.preventDefault();
      self.multipleAdded = true;
      var productsToAdd = [];

      /* TODO: move uiblocker to webpack component */
      if (Salmon.Global.uiBlocker && !$('body').hasClass('purchase-confirmation-active')) {
        Salmon.Global.uiBlocker.blockUI();
      }

      $('body').addClass('purchase-confirmation-active');
      $('.purchase-confirmation-modal').addClass('opened');
      $('.main-loader').removeClass('complete').removeClass('hidden');

      var $productsToAddElements = $('.perfectPartnerProducts > div');
      if ($productsToAddElements.length === 0) {
        $productsToAddElements = $('.frequently-bought_container--products > li');
      }

      $productsToAddElements.each(function (index, element) {
        if ($('input[type=checkbox]', element)[0].checked) {
          productsToAdd.push(element);
        }
      });

      var mainProduct = (0, _parseQueryString2.default)($(productsToAdd[0]).attr('data-buyurl'), 'partNumber');
      self.getCarouselItems(mainProduct);

      (0, _perfectPartnerHelper2.default)(productsToAdd.reverse(), function (reponseHTML, pid, cmScripts) {
        /*
          TODO:
          currently have to fetch carousel items first as IOslider
          is still brokering the coremedia request
        */
        if (GameRepack.isMobile && typeof cmScripts !== 'undefined' && cmScripts.length) {
          self.handleMultipleCoremetricsScripts(cmScripts);
        }
        self.requestOverlay(reponseHTML);
      });
    });

    /*
      Adjust the carousel when the window is resized
    */
    window.addEventListener('resize', function () {
      if (!throttled) {
        for (var i = 0; i < self.carousels.length; i++) {
          self.setCarouselWidth(i);
        }

        throttled = true;
        setTimeout(function () {
          throttled = false;
        }, 50);
      }
    });
  }
};

exports.default = addToBasketOverlay;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (productsToAdd, callback) {
  var currentRequest = 0;
  var cmScripts = [];
  var maxRequests = productsToAdd.length;

  var request = function request(pid, element) {
    _addToBasket2.default.addProduct($(element).attr('data-buyurl'), function (response) {
      cmScripts.push(response.coremetrics);
      if (currentRequest === maxRequests) {
        callback(response.basketOverlayHtml, pid, cmScripts);
      } else {
        queueRequests(element, productsToAdd);
      }
    });
  };

  var queueRequests = function queueRequests() {
    var element = productsToAdd[currentRequest];
    var pid = (0, _parseQueryString2.default)($(element).attr('data-buyurl'), 'partNumber');
    request(pid, element);
    currentRequest++;
  };

  queueRequests();
};

var _parseQueryString = __webpack_require__(2);

var _parseQueryString2 = _interopRequireDefault(_parseQueryString);

var _addToBasket = __webpack_require__(1);

var _addToBasket2 = _interopRequireDefault(_addToBasket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  init: function init() {
    this.isMobile = $('body').hasClass('mobile');
    if ($('.frequently-bought_container').length) {
      this.elements = {
        $priceSection: $('.frequently-bought_container--totals span.totalPrice'),
        $triggerPriceSection: $('.frequently-bought_trigger > span'),
        $products: $('.frequently-bought_container--checkbox input')
      };
      this.calculatePriceAndUpdate();
      if (this.elements.$triggerPriceSection.length) {
        this.populateTriggerPrice();
      }
      this.bindEvents();
    }
  },
  bindEvents: function bindEvents() {
    var self = this;
    $('.pp_checkBox>input').on('change', function () {
      if ($(this).hasClass('mainProduct')) {
        return false;
      }
      self.calculatePriceAndUpdate();
    });
  },
  getTotalPrice: function getTotalPrice() {
    return parseFloat(this.elements.$priceSection.html().replace('£', ''));
  },
  calculatePriceAndUpdate: function calculatePriceAndUpdate() {
    var self = this;
    var newTotalPrice = 0;

    self.elements.$products.each(function (i, ele) {
      if ($(this).prop('checked')) {
        newTotalPrice = newTotalPrice + parseFloat($(this).attr('data-price'));
        self.updateImages($(this).attr('id'), 'add');
      } else {
        self.updateImages($(this).attr('id'), 'remove');
      }
    });
    self.elements.$priceSection.html('£' + newTotalPrice.toFixed(2));
  },
  updateImages: function updateImages(id, action) {
    var $parentEle = $("[data-productid='" + id + "']");
    var stateClass = this.isMobile ? 'hidden' : 'unselected';
    action === 'remove' ? $parentEle.addClass(stateClass) : $parentEle.removeClass(stateClass);
  },
  populateTriggerPrice: function populateTriggerPrice() {
    this.elements.$triggerPriceSection.html('£' + this.getTotalPrice().toFixed(2));
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// this module was created to stop the background from scrolling underneath modals in ios
// as overflow: hidden does not work on the body tag for ios!
exports.default = {
  init: function init() {
    this.modalHelperState = {
      scrollPos: 0,
      canScroll: true
    };

    this.bindEvents();
  },
  bindEvents: function bindEvents() {
    var self = this;
    // this is to trigger the 'closeModal' event in materialize.js
    $('.modal').on('click', '.modal-close', function (e) {
      $(this).modal('close');
    });
    $('body').on('openModal', function () {
      self.modalHelperState.scrollPos = window.pageYOffset || document.documentElement.scrollTop;
      self.modalHelperState.canScroll = false;
      self.toggleScrolling();
    });
    $('body').on('closeModal', function () {
      self.modalHelperState.canScroll = true;
      self.toggleScrolling();
    });
  },
  toggleScrolling: function toggleScrolling() {
    var self = this;
    $('body').css({
      overflow: self.modalHelperState.canScroll ? '' : 'hidden',
      position: self.modalHelperState.canScroll ? '' : 'fixed',
      top: self.modalHelperState.canScroll ? '' : -self.modalHelperState.scrollPos
    });
    // need both to work for chrome and ios
    $('body').scrollTop(self.modalHelperState.scrollPos);
    document.documentElement.scrollTop = self.modalHelperState.scrollPos;
  }
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=global.min.js.map