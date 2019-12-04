/*! Copyright 2012, Ben Lin (http://dreamerslab.com/)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 1.0.17
 *
 * Requires: jQuery >= 1.2.3
 */
;( function ( factory ) {
if ( typeof define === 'function' && define.amd ) {
    // AMD. Register module depending on jQuery using requirejs define.
    define( ['jquery'], factory );
} else {
    // No AMD.
    factory( jQuery );
}
}( function ( $ ){
  $.fn.addBack = $.fn.addBack || $.fn.andSelf;

  $.fn.extend({

    actual : function ( method, options ){
      // check if the jQuery method exist
      if( !this[ method ]){
        throw '$.actual => The jQuery method "' + method + '" you called does not exist';
      }

      var defaults = {
        absolute      : false,
        clone         : false,
        includeMargin : false,
        display       : 'block'
      };

      var configs = $.extend( defaults, options );

      var $target = this.eq( 0 );
      var fix, restore;

      if( configs.clone === true ){
        fix = function (){
          var style = 'position: absolute !important; top: -1000 !important; ';

          // this is useful with css3pie
          $target = $target.
            clone().
            attr( 'style', style ).
            appendTo( 'body' );
        };

        restore = function (){
          // remove DOM element after getting the width
          $target.remove();
        };
      }else{
        var tmp   = [];
        var style = '';
        var $hidden;

        fix = function (){
          // get all hidden parents
          $hidden = $target.parents().addBack().filter( ':hidden' );
          style   += 'visibility: hidden !important; display: ' + configs.display + ' !important; ';

          if( configs.absolute === true ) style += 'position: absolute !important; ';

          // save the origin style props
          // set the hidden el css to be got the actual value later
          $hidden.each( function (){
            // Save original style. If no style was set, attr() returns undefined
            var $this     = $( this );
            var thisStyle = $this.attr( 'style' );

            tmp.push( thisStyle );
            // Retain as much of the original style as possible, if there is one
            $this.attr( 'style', thisStyle ? thisStyle + ';' + style : style );
          });
        };

        restore = function (){
          // restore origin style values
          $hidden.each( function ( i ){
            var $this = $( this );
            var _tmp  = tmp[ i ];

            if( _tmp === undefined ){
              $this.removeAttr( 'style' );
            }else{
              $this.attr( 'style', _tmp );
            }
          });
        };
      }

      fix();
      // get the actual value with user specific methed
      // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
      // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
      var actual = /(outer)/.test( method ) ?
        $target[ method ]( configs.includeMargin ) :
        $target[ method ]();

      restore();
      // IMPORTANT, this plugin only return the value of the first element
      return actual;
    }
  });
}));
/*!
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.18
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.rampinteractive.co.uk/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 * @license
 * Copyright (c) 2010-2015 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
!function(factory){"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],factory):factory("undefined"!=typeof module&&module.exports?require("jquery"):jQuery)}(function($){"use strict";function init(options){return!options||void 0!==options.allowPageScroll||void 0===options.swipe&&void 0===options.swipeStatus||(options.allowPageScroll=NONE),void 0!==options.click&&void 0===options.tap&&(options.tap=options.click),options||(options={}),options=$.extend({},$.fn.swipe.defaults,options),this.each(function(){var $this=$(this),plugin=$this.data(PLUGIN_NS);plugin||(plugin=new TouchSwipe(this,options),$this.data(PLUGIN_NS,plugin))})}function TouchSwipe(element,options){function touchStart(jqEvent){if(!(getTouchInProgress()||$(jqEvent.target).closest(options.excludedElements,$element).length>0)){var event=jqEvent.originalEvent?jqEvent.originalEvent:jqEvent;if(!event.pointerType||"mouse"!=event.pointerType||0!=options.fallbackToMouseEvents){var ret,touches=event.touches,evt=touches?touches[0]:event;return phase=PHASE_START,touches?fingerCount=touches.length:options.preventDefaultEvents!==!1&&jqEvent.preventDefault(),distance=0,direction=null,currentDirection=null,pinchDirection=null,duration=0,startTouchesDistance=0,endTouchesDistance=0,pinchZoom=1,pinchDistance=0,maximumsMap=createMaximumsData(),cancelMultiFingerRelease(),createFingerData(0,evt),!touches||fingerCount===options.fingers||options.fingers===ALL_FINGERS||hasPinches()?(startTime=getTimeStamp(),2==fingerCount&&(createFingerData(1,touches[1]),startTouchesDistance=endTouchesDistance=calculateTouchesDistance(fingerData[0].start,fingerData[1].start)),(options.swipeStatus||options.pinchStatus)&&(ret=triggerHandler(event,phase))):ret=!1,ret===!1?(phase=PHASE_CANCEL,triggerHandler(event,phase),ret):(options.hold&&(holdTimeout=setTimeout($.proxy(function(){$element.trigger("hold",[event.target]),options.hold&&(ret=options.hold.call($element,event,event.target))},this),options.longTapThreshold)),setTouchInProgress(!0),null)}}}function touchMove(jqEvent){var event=jqEvent.originalEvent?jqEvent.originalEvent:jqEvent;if(phase!==PHASE_END&&phase!==PHASE_CANCEL&&!inMultiFingerRelease()){var ret,touches=event.touches,evt=touches?touches[0]:event,currentFinger=updateFingerData(evt);if(endTime=getTimeStamp(),touches&&(fingerCount=touches.length),options.hold&&clearTimeout(holdTimeout),phase=PHASE_MOVE,2==fingerCount&&(0==startTouchesDistance?(createFingerData(1,touches[1]),startTouchesDistance=endTouchesDistance=calculateTouchesDistance(fingerData[0].start,fingerData[1].start)):(updateFingerData(touches[1]),endTouchesDistance=calculateTouchesDistance(fingerData[0].end,fingerData[1].end),pinchDirection=calculatePinchDirection(fingerData[0].end,fingerData[1].end)),pinchZoom=calculatePinchZoom(startTouchesDistance,endTouchesDistance),pinchDistance=Math.abs(startTouchesDistance-endTouchesDistance)),fingerCount===options.fingers||options.fingers===ALL_FINGERS||!touches||hasPinches()){if(direction=calculateDirection(currentFinger.start,currentFinger.end),currentDirection=calculateDirection(currentFinger.last,currentFinger.end),validateDefaultEvent(jqEvent,currentDirection),distance=calculateDistance(currentFinger.start,currentFinger.end),duration=calculateDuration(),setMaxDistance(direction,distance),ret=triggerHandler(event,phase),!options.triggerOnTouchEnd||options.triggerOnTouchLeave){var inBounds=!0;if(options.triggerOnTouchLeave){var bounds=getbounds(this);inBounds=isInBounds(currentFinger.end,bounds)}!options.triggerOnTouchEnd&&inBounds?phase=getNextPhase(PHASE_MOVE):options.triggerOnTouchLeave&&!inBounds&&(phase=getNextPhase(PHASE_END)),phase!=PHASE_CANCEL&&phase!=PHASE_END||triggerHandler(event,phase)}}else phase=PHASE_CANCEL,triggerHandler(event,phase);ret===!1&&(phase=PHASE_CANCEL,triggerHandler(event,phase))}}function touchEnd(jqEvent){var event=jqEvent.originalEvent?jqEvent.originalEvent:jqEvent,touches=event.touches;if(touches){if(touches.length&&!inMultiFingerRelease())return startMultiFingerRelease(event),!0;if(touches.length&&inMultiFingerRelease())return!0}return inMultiFingerRelease()&&(fingerCount=fingerCountAtRelease),endTime=getTimeStamp(),duration=calculateDuration(),didSwipeBackToCancel()||!validateSwipeDistance()?(phase=PHASE_CANCEL,triggerHandler(event,phase)):options.triggerOnTouchEnd||options.triggerOnTouchEnd===!1&&phase===PHASE_MOVE?(options.preventDefaultEvents!==!1&&jqEvent.cancelable!==!1&&jqEvent.preventDefault(),phase=PHASE_END,triggerHandler(event,phase)):!options.triggerOnTouchEnd&&hasTap()?(phase=PHASE_END,triggerHandlerForGesture(event,phase,TAP)):phase===PHASE_MOVE&&(phase=PHASE_CANCEL,triggerHandler(event,phase)),setTouchInProgress(!1),null}function touchCancel(){fingerCount=0,endTime=0,startTime=0,startTouchesDistance=0,endTouchesDistance=0,pinchZoom=1,cancelMultiFingerRelease(),setTouchInProgress(!1)}function touchLeave(jqEvent){var event=jqEvent.originalEvent?jqEvent.originalEvent:jqEvent;options.triggerOnTouchLeave&&(phase=getNextPhase(PHASE_END),triggerHandler(event,phase))}function removeListeners(){$element.unbind(START_EV,touchStart),$element.unbind(CANCEL_EV,touchCancel),$element.unbind(MOVE_EV,touchMove),$element.unbind(END_EV,touchEnd),LEAVE_EV&&$element.unbind(LEAVE_EV,touchLeave),setTouchInProgress(!1)}function getNextPhase(currentPhase){var nextPhase=currentPhase,validTime=validateSwipeTime(),validDistance=validateSwipeDistance(),didCancel=didSwipeBackToCancel();return!validTime||didCancel?nextPhase=PHASE_CANCEL:!validDistance||currentPhase!=PHASE_MOVE||options.triggerOnTouchEnd&&!options.triggerOnTouchLeave?!validDistance&&currentPhase==PHASE_END&&options.triggerOnTouchLeave&&(nextPhase=PHASE_CANCEL):nextPhase=PHASE_END,nextPhase}function triggerHandler(event,phase){var ret,touches=event.touches;return(didSwipe()||hasSwipes())&&(ret=triggerHandlerForGesture(event,phase,SWIPE)),(didPinch()||hasPinches())&&ret!==!1&&(ret=triggerHandlerForGesture(event,phase,PINCH)),didDoubleTap()&&ret!==!1?ret=triggerHandlerForGesture(event,phase,DOUBLE_TAP):didLongTap()&&ret!==!1?ret=triggerHandlerForGesture(event,phase,LONG_TAP):didTap()&&ret!==!1&&(ret=triggerHandlerForGesture(event,phase,TAP)),phase===PHASE_CANCEL&&touchCancel(event),phase===PHASE_END&&(touches?touches.length||touchCancel(event):touchCancel(event)),ret}function triggerHandlerForGesture(event,phase,gesture){var ret;if(gesture==SWIPE){if($element.trigger("swipeStatus",[phase,direction||null,distance||0,duration||0,fingerCount,fingerData,currentDirection]),options.swipeStatus&&(ret=options.swipeStatus.call($element,event,phase,direction||null,distance||0,duration||0,fingerCount,fingerData,currentDirection),ret===!1))return!1;if(phase==PHASE_END&&validateSwipe()){if(clearTimeout(singleTapTimeout),clearTimeout(holdTimeout),$element.trigger("swipe",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipe&&(ret=options.swipe.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection),ret===!1))return!1;switch(direction){case LEFT:$element.trigger("swipeLeft",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipeLeft&&(ret=options.swipeLeft.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection));break;case RIGHT:$element.trigger("swipeRight",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipeRight&&(ret=options.swipeRight.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection));break;case UP:$element.trigger("swipeUp",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipeUp&&(ret=options.swipeUp.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection));break;case DOWN:$element.trigger("swipeDown",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipeDown&&(ret=options.swipeDown.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection))}}}if(gesture==PINCH){if($element.trigger("pinchStatus",[phase,pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData]),options.pinchStatus&&(ret=options.pinchStatus.call($element,event,phase,pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData),ret===!1))return!1;if(phase==PHASE_END&&validatePinch())switch(pinchDirection){case IN:$element.trigger("pinchIn",[pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData]),options.pinchIn&&(ret=options.pinchIn.call($element,event,pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData));break;case OUT:$element.trigger("pinchOut",[pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData]),options.pinchOut&&(ret=options.pinchOut.call($element,event,pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData))}}return gesture==TAP?phase!==PHASE_CANCEL&&phase!==PHASE_END||(clearTimeout(singleTapTimeout),clearTimeout(holdTimeout),hasDoubleTap()&&!inDoubleTap()?(doubleTapStartTime=getTimeStamp(),singleTapTimeout=setTimeout($.proxy(function(){doubleTapStartTime=null,$element.trigger("tap",[event.target]),options.tap&&(ret=options.tap.call($element,event,event.target))},this),options.doubleTapThreshold)):(doubleTapStartTime=null,$element.trigger("tap",[event.target]),options.tap&&(ret=options.tap.call($element,event,event.target)))):gesture==DOUBLE_TAP?phase!==PHASE_CANCEL&&phase!==PHASE_END||(clearTimeout(singleTapTimeout),clearTimeout(holdTimeout),doubleTapStartTime=null,$element.trigger("doubletap",[event.target]),options.doubleTap&&(ret=options.doubleTap.call($element,event,event.target))):gesture==LONG_TAP&&(phase!==PHASE_CANCEL&&phase!==PHASE_END||(clearTimeout(singleTapTimeout),doubleTapStartTime=null,$element.trigger("longtap",[event.target]),options.longTap&&(ret=options.longTap.call($element,event,event.target)))),ret}function validateSwipeDistance(){var valid=!0;return null!==options.threshold&&(valid=distance>=options.threshold),valid}function didSwipeBackToCancel(){var cancelled=!1;return null!==options.cancelThreshold&&null!==direction&&(cancelled=getMaxDistance(direction)-distance>=options.cancelThreshold),cancelled}function validatePinchDistance(){return null===options.pinchThreshold||pinchDistance>=options.pinchThreshold}function validateSwipeTime(){var result;return result=!options.maxTimeThreshold||!(duration>=options.maxTimeThreshold)}function validateDefaultEvent(jqEvent,direction){if(options.preventDefaultEvents!==!1)if(options.allowPageScroll===NONE)jqEvent.preventDefault();else{var auto=options.allowPageScroll===AUTO;switch(direction){case LEFT:(options.swipeLeft&&auto||!auto&&options.allowPageScroll!=HORIZONTAL)&&jqEvent.preventDefault();break;case RIGHT:(options.swipeRight&&auto||!auto&&options.allowPageScroll!=HORIZONTAL)&&jqEvent.preventDefault();break;case UP:(options.swipeUp&&auto||!auto&&options.allowPageScroll!=VERTICAL)&&jqEvent.preventDefault();break;case DOWN:(options.swipeDown&&auto||!auto&&options.allowPageScroll!=VERTICAL)&&jqEvent.preventDefault();break;case NONE:}}}function validatePinch(){var hasCorrectFingerCount=validateFingers(),hasEndPoint=validateEndPoint(),hasCorrectDistance=validatePinchDistance();return hasCorrectFingerCount&&hasEndPoint&&hasCorrectDistance}function hasPinches(){return!!(options.pinchStatus||options.pinchIn||options.pinchOut)}function didPinch(){return!(!validatePinch()||!hasPinches())}function validateSwipe(){var hasValidTime=validateSwipeTime(),hasValidDistance=validateSwipeDistance(),hasCorrectFingerCount=validateFingers(),hasEndPoint=validateEndPoint(),didCancel=didSwipeBackToCancel(),valid=!didCancel&&hasEndPoint&&hasCorrectFingerCount&&hasValidDistance&&hasValidTime;return valid}function hasSwipes(){return!!(options.swipe||options.swipeStatus||options.swipeLeft||options.swipeRight||options.swipeUp||options.swipeDown)}function didSwipe(){return!(!validateSwipe()||!hasSwipes())}function validateFingers(){return fingerCount===options.fingers||options.fingers===ALL_FINGERS||!SUPPORTS_TOUCH}function validateEndPoint(){return 0!==fingerData[0].end.x}function hasTap(){return!!options.tap}function hasDoubleTap(){return!!options.doubleTap}function hasLongTap(){return!!options.longTap}function validateDoubleTap(){if(null==doubleTapStartTime)return!1;var now=getTimeStamp();return hasDoubleTap()&&now-doubleTapStartTime<=options.doubleTapThreshold}function inDoubleTap(){return validateDoubleTap()}function validateTap(){return(1===fingerCount||!SUPPORTS_TOUCH)&&(isNaN(distance)||distance<options.threshold)}function validateLongTap(){return duration>options.longTapThreshold&&distance<DOUBLE_TAP_THRESHOLD}function didTap(){return!(!validateTap()||!hasTap())}function didDoubleTap(){return!(!validateDoubleTap()||!hasDoubleTap())}function didLongTap(){return!(!validateLongTap()||!hasLongTap())}function startMultiFingerRelease(event){previousTouchEndTime=getTimeStamp(),fingerCountAtRelease=event.touches.length+1}function cancelMultiFingerRelease(){previousTouchEndTime=0,fingerCountAtRelease=0}function inMultiFingerRelease(){var withinThreshold=!1;if(previousTouchEndTime){var diff=getTimeStamp()-previousTouchEndTime;diff<=options.fingerReleaseThreshold&&(withinThreshold=!0)}return withinThreshold}function getTouchInProgress(){return!($element.data(PLUGIN_NS+"_intouch")!==!0)}function setTouchInProgress(val){$element&&(val===!0?($element.bind(MOVE_EV,touchMove),$element.bind(END_EV,touchEnd),LEAVE_EV&&$element.bind(LEAVE_EV,touchLeave)):($element.unbind(MOVE_EV,touchMove,!1),$element.unbind(END_EV,touchEnd,!1),LEAVE_EV&&$element.unbind(LEAVE_EV,touchLeave,!1)),$element.data(PLUGIN_NS+"_intouch",val===!0))}function createFingerData(id,evt){var f={start:{x:0,y:0},last:{x:0,y:0},end:{x:0,y:0}};return f.start.x=f.last.x=f.end.x=evt.pageX||evt.clientX,f.start.y=f.last.y=f.end.y=evt.pageY||evt.clientY,fingerData[id]=f,f}function updateFingerData(evt){var id=void 0!==evt.identifier?evt.identifier:0,f=getFingerData(id);return null===f&&(f=createFingerData(id,evt)),f.last.x=f.end.x,f.last.y=f.end.y,f.end.x=evt.pageX||evt.clientX,f.end.y=evt.pageY||evt.clientY,f}function getFingerData(id){return fingerData[id]||null}function setMaxDistance(direction,distance){direction!=NONE&&(distance=Math.max(distance,getMaxDistance(direction)),maximumsMap[direction].distance=distance)}function getMaxDistance(direction){if(maximumsMap[direction])return maximumsMap[direction].distance}function createMaximumsData(){var maxData={};return maxData[LEFT]=createMaximumVO(LEFT),maxData[RIGHT]=createMaximumVO(RIGHT),maxData[UP]=createMaximumVO(UP),maxData[DOWN]=createMaximumVO(DOWN),maxData}function createMaximumVO(dir){return{direction:dir,distance:0}}function calculateDuration(){return endTime-startTime}function calculateTouchesDistance(startPoint,endPoint){var diffX=Math.abs(startPoint.x-endPoint.x),diffY=Math.abs(startPoint.y-endPoint.y);return Math.round(Math.sqrt(diffX*diffX+diffY*diffY))}function calculatePinchZoom(startDistance,endDistance){var percent=endDistance/startDistance*1;return percent.toFixed(2)}function calculatePinchDirection(){return pinchZoom<1?OUT:IN}function calculateDistance(startPoint,endPoint){return Math.round(Math.sqrt(Math.pow(endPoint.x-startPoint.x,2)+Math.pow(endPoint.y-startPoint.y,2)))}function calculateAngle(startPoint,endPoint){var x=startPoint.x-endPoint.x,y=endPoint.y-startPoint.y,r=Math.atan2(y,x),angle=Math.round(180*r/Math.PI);return angle<0&&(angle=360-Math.abs(angle)),angle}function calculateDirection(startPoint,endPoint){if(comparePoints(startPoint,endPoint))return NONE;var angle=calculateAngle(startPoint,endPoint);return angle<=45&&angle>=0?LEFT:angle<=360&&angle>=315?LEFT:angle>=135&&angle<=225?RIGHT:angle>45&&angle<135?DOWN:UP}function getTimeStamp(){var now=new Date;return now.getTime()}function getbounds(el){el=$(el);var offset=el.offset(),bounds={left:offset.left,right:offset.left+el.outerWidth(),top:offset.top,bottom:offset.top+el.outerHeight()};return bounds}function isInBounds(point,bounds){return point.x>bounds.left&&point.x<bounds.right&&point.y>bounds.top&&point.y<bounds.bottom}function comparePoints(pointA,pointB){return pointA.x==pointB.x&&pointA.y==pointB.y}var options=$.extend({},options),useTouchEvents=SUPPORTS_TOUCH||SUPPORTS_POINTER||!options.fallbackToMouseEvents,START_EV=useTouchEvents?SUPPORTS_POINTER?SUPPORTS_POINTER_IE10?"MSPointerDown":"pointerdown":"touchstart":"mousedown",MOVE_EV=useTouchEvents?SUPPORTS_POINTER?SUPPORTS_POINTER_IE10?"MSPointerMove":"pointermove":"touchmove":"mousemove",END_EV=useTouchEvents?SUPPORTS_POINTER?SUPPORTS_POINTER_IE10?"MSPointerUp":"pointerup":"touchend":"mouseup",LEAVE_EV=useTouchEvents?SUPPORTS_POINTER?"mouseleave":null:"mouseleave",CANCEL_EV=SUPPORTS_POINTER?SUPPORTS_POINTER_IE10?"MSPointerCancel":"pointercancel":"touchcancel",distance=0,direction=null,currentDirection=null,duration=0,startTouchesDistance=0,endTouchesDistance=0,pinchZoom=1,pinchDistance=0,pinchDirection=0,maximumsMap=null,$element=$(element),phase="start",fingerCount=0,fingerData={},startTime=0,endTime=0,previousTouchEndTime=0,fingerCountAtRelease=0,doubleTapStartTime=0,singleTapTimeout=null,holdTimeout=null;try{$element.bind(START_EV,touchStart),$element.bind(CANCEL_EV,touchCancel)}catch(e){$.error("events not supported "+START_EV+","+CANCEL_EV+" on jQuery.swipe")}this.enable=function(){return this.disable(),$element.bind(START_EV,touchStart),$element.bind(CANCEL_EV,touchCancel),$element},this.disable=function(){return removeListeners(),$element},this.destroy=function(){removeListeners(),$element.data(PLUGIN_NS,null),$element=null},this.option=function(property,value){if("object"==typeof property)options=$.extend(options,property);else if(void 0!==options[property]){if(void 0===value)return options[property];options[property]=value}else{if(!property)return options;$.error("Option "+property+" does not exist on jQuery.swipe.options")}return null}}var VERSION="1.6.18",LEFT="left",RIGHT="right",UP="up",DOWN="down",IN="in",OUT="out",NONE="none",AUTO="auto",SWIPE="swipe",PINCH="pinch",TAP="tap",DOUBLE_TAP="doubletap",LONG_TAP="longtap",HORIZONTAL="horizontal",VERTICAL="vertical",ALL_FINGERS="all",DOUBLE_TAP_THRESHOLD=10,PHASE_START="start",PHASE_MOVE="move",PHASE_END="end",PHASE_CANCEL="cancel",SUPPORTS_TOUCH="ontouchstart"in window,SUPPORTS_POINTER_IE10=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled&&!SUPPORTS_TOUCH,SUPPORTS_POINTER=(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&!SUPPORTS_TOUCH,PLUGIN_NS="TouchSwipe",defaults={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:".noSwipe",preventDefaultEvents:!0};$.fn.swipe=function(method){var $this=$(this),plugin=$this.data(PLUGIN_NS);if(plugin&&"string"==typeof method){if(plugin[method])return plugin[method].apply(plugin,Array.prototype.slice.call(arguments,1));$.error("Method "+method+" does not exist on jQuery.swipe")}else if(plugin&&"object"==typeof method)plugin.option.apply(plugin,arguments);else if(!(plugin||"object"!=typeof method&&method))return init.apply(this,arguments);return $this},$.fn.swipe.version=VERSION,$.fn.swipe.defaults=defaults,$.fn.swipe.phases={PHASE_START:PHASE_START,PHASE_MOVE:PHASE_MOVE,PHASE_END:PHASE_END,PHASE_CANCEL:PHASE_CANCEL},$.fn.swipe.directions={LEFT:LEFT,RIGHT:RIGHT,UP:UP,DOWN:DOWN,IN:IN,OUT:OUT},$.fn.swipe.pageScroll={NONE:NONE,HORIZONTAL:HORIZONTAL,VERTICAL:VERTICAL,AUTO:AUTO},$.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:ALL_FINGERS}});
/*
* Fix links with mobileFlag=true
**/

var FixMobileFlagHref = (function(){

  var pageTopOffset;

  function getHeaderHeight() {

    if ($('body').hasClass('new-mobile-header')) {
      pageTopOffset = $('header').height();
    } else if ($('body').hasClass('legacy-mobile-header')) {

      if ($('#searchPanel.opened').length) {
        pageTopOffset = $('header').height() + $('#searchPanel.opened').height(); 
      } else {
        pageTopOffset = $('header').height();
      }

    } else {
      pageTopOffset = $('header').height() + $('#TopNavEspot').height();
    }

  };

  function findAndUpdateHrefsWithMobileFlagSet() {

    $('#articleContent a').each(function(){
      var currentHref = $(this).attr('href');
      var cleanedHref = '';

      if (currentHref.slice(0,1) === '#' && currentHref.indexOf('?mobileFlag=true') > -1) {

        cleanedHref = currentHref.replace('?mobileFlag=true', '');
        $(this).attr('href', cleanedHref);

      };
    });

  };

  function listenForClicksOnInternalAnchors() {

    $('#articleContent a[href^="#"]').off('click');
    $('#articleContent a[href^="#"]').on('click', function(event){

      event.preventDefault();

      var idToFind = $(this).attr('href').replace('#', '');
      var scrollThisToTop = $('#' + idToFind).offset().top.toFixed(0);
      var windowYPosition = parseInt(scrollThisToTop - pageTopOffset) - 10;

      window.scrollTo(0, windowYPosition);
    });
  };

  return {
    init: function() {

      $.when(getHeaderHeight())
      .then(findAndUpdateHrefsWithMobileFlagSet())
      .then(listenForClicksOnInternalAnchors())

    }
  }
})();

$(window).on('load', function() {

    setTimeout(function(){
        FixMobileFlagHref.init();
    }, 500);
  
});
/* =====================================================================
*   A responsive tab/accordian component
** =====================================================================*/
var accordianAndTabCombined = (function(){  
  
  var componentArray = [];
  var viewportWidth = window.innerWidth;
  var currentWidth = window.innerWidth;
  var desktopMinWidth = 320;
  var windowResizeDelay = 100;

  var componentDisplayType;

  function doTimeout(fn,delay) {
    var timer = null;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  };

  function returnHash(){
    return window.location.hash.replace('#', '');
  };

  function returnFilename() {
    var fileName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    
    var endOfFileName;

    if (fileName.lastIndexOf('?') > -1) {
      endOfFileName = fileName.lastIndexOf('?');
    } else if (fileName.lastIndexOf('.') > -1) {
      endOfFileName = fileName.lastIndexOf('.');
    };

    fileName = fileName.substring(0, endOfFileName);
    return fileName;
  };

  function findComponents(){   
    var currentComponentId = '';
    
    $('.tabAccordian').each(function(index){

      if ((typeof $(this).attr('id') == 'undefined') || ($(this).attr('id') == '')) {
        currentComponentId = returnFilename() + '-accordianTabs0' + (parseInt(index, 10) + 1);
        $(this).attr('id', currentComponentId);
      } else {
        currentComponentId = $(this).attr('id');
      }
      
      componentArray.push(currentComponentId);
    });
  };

  function setcomponentDisplayType(){
    if (currentWidth < desktopMinWidth) {
      componentDisplayType = 'accordian';
    } else {
      componentDisplayType = 'tabs';
    }

/*
* Reset previously added styles
**/
    $.each(componentArray, function(index, componentId) {
      var $element = $('#' + componentId);
      $element.css('height', '').removeAttr('data-maxTitleHeight').removeAttr('data-maxcombinedheight');

      $element.find('.tabAccordianHeader').each(function(index){
        $(this).css('height', '').css('top', '');
      });

      $element.find('.tabAccordianContent').each(function(index){
        $(this).css('height', '').css('top', '');
      });

    });
  };

  function setUpComponents(){

    setcomponentDisplayType();

    $.each(componentArray, function(index, componentId) {

      var $element = $('#' + componentId);
      var contentHeight = 0;
      var contentTopBorderHeight = 0;
      var normaliseTitleHeights = $element.attr('data-normaliseTitleHeights');

      $element.attr('data-componentDisplayType', componentDisplayType);

/*
* Find section title heights
**/
      var titleHeight = 0;
      var maxTitleHeight = 0;
      var allMaxCombinedHeight = 0;

      $element.find('.tabAccordianHeader').each(function(index){
        
        var thisTitleHeight = $(this).actual('outerHeight');

        if (thisTitleHeight > maxTitleHeight) {
          $element.attr('data-maxTitleHeight', thisTitleHeight);
          maxTitleHeight = thisTitleHeight;
        };

        $(this)
          .attr('data-thisTitleHeight', thisTitleHeight)
          .css('height', maxTitleHeight + 'px');
/*
* Now find related content element to get measurements
**/
        var $currentContentElem = $(this).next('.tabAccordianContent');
        contentHeight = $currentContentElem.actual('outerHeight');
        contentTopBorderHeight = Math.floor($currentContentElem.css('border-top-width').replace('px',''));
        var currentContentElemMaxHeight = Math.floor(contentHeight + contentTopBorderHeight);

        if (currentContentElemMaxHeight > allMaxCombinedHeight) {
          allMaxCombinedHeight =  Math.floor(currentContentElemMaxHeight + (maxTitleHeight));
        }

/*
* Save to DOM
**/
        $element.attr('data-maxcombinedheight', allMaxCombinedHeight);
        $currentContentElem.attr('data-height', currentContentElemMaxHeight);

        if (componentDisplayType === 'tabs') {
          $currentContentElem.css('top', maxTitleHeight  + 'px');
        }
      });

      if (componentDisplayType === 'tabs') {
        $element.css('height', allMaxCombinedHeight + 'px');
      } else {
        $element.css('height', 'inherit');
      }

    });
  };

  function saveTabOptions(componentId, tabSelected){

    if (window.sessionStorage) {
      var tabGroupOptions = [];
      tabGroupOptions.push(
        {
          'tabSelected': tabSelected
        }
      );
      sessionStorage.setItem(componentId, JSON.stringify(tabGroupOptions));
    };

  };

  function openInitialTab(){

    $.each(componentArray, function(index, componentId) {

      var $element = $('#' + componentId);
      var selectTabHash = returnHash();

      if (selectTabHash.length && $element.find('.tabAccordianHeader[data-tabName="' + selectTabHash + '"]').length) {
        
        $element.find('.tabAccordianHeader').removeClass('active');
        $element.find('.tabAccordianHeader[data-tabName="' + selectTabHash + '"]').addClass('active');

        var cleanedUrl = window.location.href.substr(0, window.location.href.indexOf('#'));
        history.pushState({}, '', cleanedUrl);

        saveTabOptions(componentId, selectTabHash);

      } else if (window.sessionStorage && sessionStorage.getItem(componentId)) {

        var tabGroupOptions = JSON.parse(sessionStorage.getItem(componentId));
        var tabSelected = tabGroupOptions[0].tabSelected;

        $element.find('.tabAccordianHeader[data-tabName="' + tabSelected + '"]').addClass('active');
        
      } else {
        
        var firstHeaderElem = $element.find('.tabAccordianHeader').first();
        firstHeaderElem.addClass('active');

      };

      $element.find('.tabAccordianHeader').each(function(index){
        
        var componentContent = $(this).closest('.tabAccordianHeader').next('.tabAccordianContent');
        var thisContentHeight = componentContent.attr('data-height');

        if ($(this).hasClass('active')) {
          $(componentContent)
            .addClass('active')
            .css('height', thisContentHeight + 'px');
        } else {
          if (componentDisplayType === 'accordian') {
            $(componentContent).css('height', 0);
          }
        };
      });
    });
  };

  function runtabs(){

    $.each(componentArray, function(index, componentId) {
      
      var $element = $('#' + componentId);

      $element.on('click', '.tabAccordianHeader a', function(event) {
        event.stopImmediatePropagation();
        event.preventDefault();

        var $currentComponent = $(this).closest('.tabAccordian');
        $currentComponent.find('.tabAccordianHeader').each(function(){
          $(this).removeClass('active');
        });

        $currentComponent.find('.tabAccordianContent').each(function(){
          $(this).removeClass('active');

          if (componentDisplayType === 'accordian') {
            $(this).css('height', '0');
          }
        });  

        $(this).closest('.tabAccordianHeader').addClass('active');

        var selectTabHash = $(this).closest('.tabAccordianHeader').attr('data-tabName');
        saveTabOptions(componentId, selectTabHash);

        var tabContent = $(this).closest('.tabAccordianHeader').next('.tabAccordianContent');
        var tabContentHeight = tabContent.attr('data-height');

        $(tabContent).addClass('active');

        if (componentDisplayType === 'accordian') {
          $(tabContent).css('height', tabContentHeight + 'px');
        }
      });
    });
  };

  function updateLayout() {
    viewportWidth = window.innerWidth;
    if (viewportWidth !== currentWidth) {
      currentWidth = viewportWidth;
      $.when(
        setUpComponents()
      )
      .then(
        openInitialTab()
      )
      .then(
        runtabs()
      )
      .then(
        fixes()
      );
    }
  };

  function fixes() {

    if ($('#NonAjaxTrackOrderStatus-accordianTabs01').length > 0 && window.sessionStorage && !sessionStorage.getItem('NonAjaxTrackOrderStatus-accordianTabs01')) {

      var $tabHeaderAlert = $('.tabAccordianHeader a.alert');
      if ($tabHeaderAlert.length > 0) {
        $tabHeaderAlert.trigger('click');
      };

    } else {

      sessionStorage.removeItem('NonAjaxTrackOrderStatus-accordianTabs01');

    };

  }

  return {
    init: function(){
      viewportWidth = window.innerWidth;

      $.when(
        findComponents()
      )
      .then(
        setUpComponents()
      )
      .then(
        openInitialTab()
      )
      .then(
        runtabs()
      )
      .then(
        fixes()
      );

      $(window).resize(doTimeout(function() {
        updateLayout();
      }, windowResizeDelay));
    }

  };

})();

$(document).ready(function(){
  accordianAndTabCombined.init();
});


/* =====================================================================
*   An expander component. This shows/hides an element based on the activator click
** =====================================================================*/
var Game = Game || {};
Game.Global = Game.Global || {};
Game.Global.Expander = (function(){  
  
  var componentArray = [];
  var desktopMinWidth = 900;
  var windowResizeDelay = 100;

  var viewportWidth = window.innerWidth;
  var currentWidth = window.innerWidth;

  function doTimeout(fn,delay) {
    var timer = null;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  };

  function resetComponents(){

    $.each(componentArray, function(index, componentId) {

      var $currentComponent = $('#' + componentId);
      var $expanderBody = $currentComponent.find('.expanderBody');
      
      $currentComponent.removeClass('closed').removeClass('opened');
      $expanderBody
        .attr('data-height', '0')
        .removeClass('open')
        .removeClass('closed');
      $currentComponent.find('.expanderActivator').removeClass('open').removeClass('close')
    });
    componentArray = [];

  };

  function findComponents(){   
    var currentComponentId = '';
    
    $('.expanderWrapper').each(function(index){

      if ((typeof $(this).attr('id') == 'undefined') || ($(this).attr('id') == '')) {
        currentComponentId = 'expander0' + (parseInt(index, 10) + 1);
        $(this).attr('id', currentComponentId);
      } else {
        currentComponentId = $(this).attr('id');
      }
      
      componentArray.push(currentComponentId);
    });
  };

  function setUpComponents(){

    $.each(componentArray, function(index, componentId) {

      var $currentComponent = $('#' + componentId);
      var $expanderBody = $currentComponent.find('.expanderBody');
      var expanderBodyHeight = Math.floor($expanderBody.find('.inner').actual('outerHeight'));
      
      if (expanderBodyHeight === 0) {

        $currentComponent.find('.expanderActivator').hide();
        $expanderBody.hide();

      } else {

        $currentComponent.addClass('closed');
        $expanderBody
          .attr('data-height', expanderBodyHeight)
          .addClass('closed');

      };

    });
  };

  function runComponent(){

    $.each(componentArray, function(index, componentId) {
      
      var $currentComponent = $('#' + componentId);

      if (!$currentComponent.find('.expanderActivator').hasClass('open')) {
        $currentComponent.find('.expanderActivator').addClass('open');
      };

      $currentComponent.on('click', '.expanderActivator', function(event) {
        event.stopImmediatePropagation();
        event.preventDefault();

        var $expanderBody = $currentComponent.find('.expanderBody');
        var expanderBodyHeight = $expanderBody.attr('data-height');
        
        if ($currentComponent.hasClass('closed')) {

          $currentComponent.removeClass('closed').addClass('opened');
          $(this).removeClass('open').addClass('close');
          $expanderBody.css('height', expanderBodyHeight + 'px');

        } else {

          $currentComponent.removeClass('opened').addClass('closed');
          $(this).removeClass('close').addClass('open');
          $expanderBody.css('height', '0px');

        }

      });
    });
  };

  function updateLayout() {
    viewportWidth = window.innerWidth;
    if (viewportWidth !== currentWidth) {
      currentWidth = viewportWidth;
      $.when(
        resetComponents()
      ).then(
        setUpComponents()
      )
      .then(
        runComponent()
      );
    }
  };

  return {
    init: function(){
      viewportWidth = window.innerWidth;

      componentArray = [];
      
      $.when(
        findComponents()
      )
      .then(
        setUpComponents()
      )
      .then(
        runComponent()
      );

      $(window).resize(doTimeout(function() {
        updateLayout();
      }, windowResizeDelay));
    }

  };

})();


var Salmon = Salmon || {}
Salmon.Global = Salmon.Global || {}
Salmon.Global.IORecSliders = (function() {

  var IOSliderParams = ['ZoneID', 'ProductID', 'CategoryID', 'Randomize', 'SearchTerm', 'AttributeValue'],

	IOSlider = function($container, isLast, predefinedArgs, callback) {
	  this.$container = $container;
	  this.predefinedArgs = predefinedArgs;
	  this.callback = callback;
	  this.ioArgs = [];
	  // For some recs websphere calls callback function twice, to avoid it we need to check if it was called before
	  this.populated = false;
	  this.style = this.$container.data('displaystyle');
	  this.init(isLast);
	},
	verticalHTML = '<a class="rec" href="%Url%" data-condition="%Condition%"> <div class="image"> <img src="%Packshot%"> </div> <div> <h3>%Title%</h3> <span class="platformLogo %Category%"></span> <div class="rating rating%Rating%">&nbsp;</div> <span class="price">&pound;%Price%</span> </div> </a>',
	horizontalHTML = '<li class="slide"><div class="image"><a class="rec" href="%Url%" data-condition="%Condition%"> <img src="%Packshot%"></a></div> <div> <a class="rec" href="%Url%"><h3>%Title%</h3></a> <span class="platformLogo %Category%"></span> <div class="rating rating%Rating%">&nbsp;</div> <span class="price">&pound;%Price%</span><a class="buy btn primary addToBasket" href="%BuyUrl%">ADD TO BASKET</a></div> </li>',
	verticalHTMLCloudinary = '<a class="rec" href="%Url%" data-condition="%Condition%"> <div class="image"> <img data-src="%Packshot%" class="cloudinaryImg"> </div> <div> <h3>%Title%</h3> <span class="platformLogo %Category%"></span> <div class="rating rating%Rating%">&nbsp;</div> <span class="price">&pound;%Price%</span> </div> </a>',
	horizontalHTMLCloudinary = '<li class="slide"><div class="image"><a class="rec" href="%Url%" data-condition="%Condition%"> <img data-src="%Packshot%" class="cloudinaryImg"></a></div> <div> <a class="rec" href="%Url%"><h3>%Title%</h3></a> <span class="platformLogo %Category%"></span> <div class="rating rating%Rating%">&nbsp;</div> <span class="price">&pound;%Price%</span><a class="buy btn primary addToBasket" href="%BuyUrl%">ADD TO BASKET</a></div> </li>',


	$sliders = $('.IORecsSlider'),
	constructBuyUrl = function(catEntryId, partNumber){
		var buyParams = {
				'base' : '/webapp/wcs/stores/servlet/OrderChangeServiceItemAdd?',
				'queryParams': {
					storeId: '10151',
					langId: '44',
					quantity: 1,
					errorViewName: 'AjaxActionErrorResponse',
					URL: 'AjaxMiniShoppingBagView',
					catEntryId_1: catEntryId,
					partNumber: partNumber

				}
		}
		var buyUrl = buyParams.base;

	 	for (var key in buyParams.queryParams) {
	 		buyUrl += key + '=' + buyParams.queryParams[key] + '&';
	 	}

	 	return buyUrl;


	},
	IOProto = IOSlider.prototype;

  IOProto.init = function(isLast) {
	var self = this;
	self.generateArgs();
	Salmon.Global.uiBlocker.insertLoader(self.$container);
	//Setup function in a global scope based on zone Id, which will be used as callback for cmDisplayRecs
	window[this.ioArgs[0] + "_zp"] = function(recommendedIds, zoneId, symbolic, targetId, targetCat, recAttributes, targetAttr, zoneHeader) {
	  //adding SKU's into main attribute array. we need to check if ratings are setup at position 17 first
	  for (var i in recAttributes ) {
	  	if (recAttributes[i].length == 17)
	  		recAttributes[i][17] = recommendedIds[i];
	  	else
	  		recAttributes[i][18] = recommendedIds[i];
	  }
	  var ioZoneCountReturnName = 'IOCountReturn_' + zoneId,
		ioZonePopulateName = 'IOPopulate_' + zoneId + '_';

	  if (typeof window[ioZoneCountReturnName] != 'undefined')
		window[ioZoneCountReturnName]++;
	  else
		window[ioZoneCountReturnName] = 1;

	  ioZonePopulateName = ioZonePopulateName + window[ioZoneCountReturnName].toString();

	  if (typeof window[ioZonePopulateName] == 'function') window[ioZonePopulateName](recommendedIds, zoneId, symbolic, targetId, targetCat, recAttributes, targetAttr, zoneHeader);
	};

	var _zoneId = this.ioArgs[0],
	  ioZoneCountName = 'IOCount_' + _zoneId,
	  // ioZoneCountReturnName = 'IOCountReturn_' + _zoneId,
	  ioZonePopulateName = 'IOPopulate_' + _zoneId + '_';

	if (typeof window[ioZoneCountName] != 'undefined')
	  window[ioZoneCountName]++;
	else
	  window[ioZoneCountName] = 1;

	window[ioZonePopulateName + window[ioZoneCountName].toString()] = function(recommendedIds, zoneId, symbolic, targetId, targetCat, recAttributes, targetAttr, zoneHeader) {
	  if (!self.populated) {
		self.targetAttributes = targetAttr;
		self.generateProductRecs(recAttributes);
		Salmon.Global.uiBlocker.removeLoader(self.$container);
		self.populated = true;

		if (typeof self.$container.data('usetitle') != 'undefined' && zoneHeader.length > 0) self.$container.parent().find('h2').text(zoneHeader);
	  }
	};

	if (self.ioArgs.length > 0) {
	  cmRecRequest.apply(window, self.ioArgs);
	  if (isLast) cmDisplayRecs();
	} else {
	  self.$container.hide();
	}
  };
  IOProto.generateArgs = function() {
	if (typeof this.predefinedArgs == 'undefined') {
	  for (var i in IOSliderParams) {
	  	var dataName = IOSliderParams[i].toLowerCase();
		if (typeof this.$container.data(dataName) != 'undefined') {
			if (IOSliderParams[i].toLowerCase() == 'productid' && this.$container.data(IOSliderParams[i].toLowerCase()) == 'currentProductId')
				this.ioArgs.push(Game.CurrentPage.PageInfo.ProductMediaID)
			else
				this.ioArgs.push(this.$container.data(IOSliderParams[i].toLowerCase()));
		}
	  }
	} else {
	  for (var i in IOSliderParams) {
		if (typeof this.predefinedArgs[IOSliderParams[i]] != 'undefined') this.ioArgs.push(this.predefinedArgs[IOSliderParams[i]]);
	  }
	}
  };

  IOProto.generateProductRecObject = function(params) {
	var obj = {
	  Title: (params[0].length > 30) ? params[0].slice(0, 29) + '...' : params[0],
	  Url: (params[3].indexOf('?') == -1) ? params[3] + '?cm_vc=' + this.ioArgs[0] : params[3] + '&cm_vc=' + this.ioArgs[0],
	  Packshot: params[4],
	  Category: params[6].replace(/ /g, ''),
	  Condition: (params[13] == 'PreOwned') ? 'Pre-owned' : 'New',
	  Price: parseFloat(params[10]).toFixed(2),
	  isExclusive: (params[8] == "Y"),
	  isFranchise: (params[11].replace(/[^a-zA-Z0-9]/g, '') == this.targetAttributes[11].replace(/[^a-zA-Z0-9]/g, '')),
	  BuyUrl: constructBuyUrl(params[15], (params.length == 19) ? params[18] : params[17])
	};

	if (params.length == 19)
	  obj.Rating = params[17];
	else
	  obj.Rating = 'Hide';

	return obj;
  };

  IOProto.generateProductRecs = function(recsParams) {
	var recObjectsExclusive = [],
	  recObjectsNotExclusive = [];


	//Business logic: if exclusive goes in first array, otherwise if same franchise goes in the back if not - in front of second array
	if (recsParams.length === 0) {
	  if (this.$container.parent().parent().hasClass('recs')) {
		  if ($('.section.perfectPartners .perfectPartnerProducts ').length > 0 ) {
		  	$('.section.perfectPartners .recs').hide();
		  } else {
		  	$('.section.perfectPartners').hide();
		  }
	  } else {
	  	this.$container.hide();
	  }

	  // Hide whole sidebar section on PDP

	  if (!$('body').hasClass('basketOverlayOpen')) {
			if (this.$container.parent().hasClass('freqBought')) this.$container.parent().hide();
			if (this.$container.parent().hasClass('recommendation')) this.$container.parent().hide();
	  };


	}
  for (var i in recsParams) {
    // var recParams = recsParams[i],
    // isExclusive = (recParams[8] == "Y"),
    // isFranchise = (recParams[11].replace(/[^a-zA-Z0-9]/g, '') == this.targetAttributes[11].replace(/[^a-zA-Z0-9]/g, '')),
    // recObject = this.generateProductRecObject(recParams);

    recObjectsExclusive.push(this.generateProductRecObject(recsParams[i]));

    // if (isExclusive) {
    // recObjectsExclusive.unshift(recObject);
    // } else {
    // if (isFranchise)
    //   recObjectsNotExclusive.push(recObject);
    // else
    //   recObjectsNotExclusive.unshift(recObject);
    // }
  }

	this.generateProductRecsHtml(recObjectsExclusive.concat(recObjectsNotExclusive));
  };
  IOProto.generateProductRec = function(recObject) {

  var html;
  if (typeof GameCloudinary === 'undefined') {
  	html = (this.style == 'vertical') ? verticalHTML : horizontalHTML;
  } else {
  	html = (this.style == 'vertical') ? verticalHTMLCloudinary : horizontalHTMLCloudinary;
  };

	for (var i in recObject) {
	  var find = '%' + i + '%';
	  var re = new RegExp(find, 'g');

	  html = html.replace(re, recObject[i]);
	  html = html.replace('%' + i + '%', recObject[i]);
	}

	return html;
  };

  IOProto.generateProductRecsHtml = function(recsArray) {
	for (var i in recsArray) {
	  this.$container.append(this.generateProductRec(recsArray[i]));
	}

	if (this.style == 'slider') {
	  this.$container.html('<div class="carouselPrev icon sliderControl"><span>Prev</span></div><div class="carouselNext icon sliderControl"><span>Next</span></div><div class="slidesWindow"><ul class="slides">' + this.$container.html() + '</ul></div>');
	  this.$container.addClass('IOsliderContainer');
	  var sliderOptions = {
		fullWidth: false,
		elements: {
		  sliderContainer: this.$container
		}
	  }

	  if (typeof Game.CurrentPage != 'undefined' && (Game.CurrentPage.PageName == 'pdp' || Game.CurrentPage.PageName == 'pdpPackage')) {
	  	sliderOptions.slidesToFit = ($(window).width() < 1025) ? ($(window).width() < 800 ? 2 : 3) : 5;
	  }
	  var packSliderSlider = new Salmon.Global.SimpleSlider.newSlider(sliderOptions);
	}
	if (typeof this.$container.data('addtobasket') == 'undefined' || this.$container.data('addtobasket') == 'false') {
		this.$container.addClass('noAddToBasket');

    if ($('.cloudinaryImg').length) {
        var isGameCloudinaryLoaded = false;
        var checkGameCloudinaryLoaded = setInterval(function(){

            if (typeof GameCloudinary === 'object') {
                isGameCloudinaryLoaded = true;
            };

            if (isGameCloudinaryLoaded) {
                clearInterval(checkGameCloudinaryLoaded);
                GameCloudinary.doDelayedCloudinaryInit();
            };

        }, 100);
    };

	};
	if (typeof this.callback == 'function') {
		this.callback();
	};


  };

  $sliders.each(function(index) {
		var slider = new IOSlider($(this), (index == $sliders.length - 1));
  });


  return {
	IOSlider: IOSlider
  };
})();



Salmon.Global.IORecsDoubleSlider = (function() {

  $(document).on('click', '.ioContainer.double h2 span', function() {
	var index = $.inArray(this, $(this).parent().find('span'));
	$(this).parent().find('.active').removeClass('active');
	$(this).parent().parent().find('.IOsliderContainer.active').removeClass('active');
	$(this).addClass('active');
	$(this).parent().parent().find('.IOsliderContainer').eq(index).addClass('active');
  });

})();

/*Here is some of Game's code which needed adding here re: GAME-3202*/
$(function() {
	if ($( '#pgProductDetails').length) {
		setTimeout(function(){
			$('.IORecsSliderNew a.addToBasket').each(function(){
				$(this).attr('href', $(this).attr('href') + 'cm_vc=Prod_2');
			});
		}, 1500);
	}
});

var Salmon = Salmon || {}
Salmon.Global = Salmon.Global || {}
Salmon.Global.uiBlocker = (function() {

    var config = {
            loaderClass: 'loader'
        },
        timer;

    var init = function(options) {
        config = $.extend(true, config, options);
    };
    var generateUiLoader = function(text) {

        return $('<span />', {
            class: config.loaderClass,
            html: (typeof text != 'undefined') ? text : 'LOADING'
        });
    };
    var blockUI = function(timeoutCallback, timeoutSeconds) {

        var $uiBlocker = $('<div id="uiBlocker"></div>');
        $uiBlocker.append(generateUiLoader());
        $('body').append($uiBlocker);

        if (typeof timeoutCallback === "function") {

            timeoutSeconds = (typeof timeoutSeconds === 'number') ? timeoutSeconds : config.UIBlocker.DefaultTimeoutSeconds;
            timeoutSeconds = timeoutSeconds * 1000;

            timer = setTimeout(timeoutCallback, timeoutSeconds);

        }

    };

    var unblockUI = function() {
        clearTimeout(timer);
        $('#uiBlocker').remove();
    };

    var insertLoader = function($element, text) {
        $element.append(generateUiLoader(text));
    };

    var removeLoader = function($element) {
        if ($element.find('.' + config.loaderClass).length > 0) $element.find('.' + config.loaderClass).remove();
    };

    return {
        init: init,
        blockUI: blockUI,
        unblockUI: unblockUI,
        insertLoader: insertLoader,
        removeLoader: removeLoader
    };
})();

/* =====================================================================
*   Set up carousel
** =====================================================================*/
var carousel = (function(){

  var carouselArray = [];
  var carouselDataArray = [];

  function hideFrame(carouselId){
    var transitionDuration = carouselDataArray[carouselId][0].transitionDuration;
    var currentActiveFrame = $('#' + carouselId).find('.frame.activate');
    $.when(
      setTimeout(function() {
        currentActiveFrame.removeClass('reveal');
      }, transitionDuration)
    )
    .then(
      currentActiveFrame.removeClass('activate')
    )
  }

  function showFrame(carouselId){
    var currentActiveFrame = carouselDataArray[carouselId][0].activeFrame + 1;
    var transitionDuration = carouselDataArray[carouselId][0].transitionDuration;
    var currentCarouselElem = $('#' + carouselId);
    currentCarouselElem.find('.frame:nth-child(' + currentActiveFrame + ')').addClass('activate').addClass('reveal')
  }

  function updateFramePosition(carouselId){
    var currentActiveFrame = carouselDataArray[carouselId][0].activeFrame;
    var frameWidth = carouselDataArray[carouselId][0].frameWidth;
    var carouselInnerOffset = currentActiveFrame * frameWidth;
    var carouselInnerWidth = carouselDataArray[carouselId][0].carouselInnerWidth;
    var totalFrameWidth = carouselDataArray[carouselId][0].totalFrameWidth;
    var breakScrollAt = totalFrameWidth - carouselInnerWidth;

    if (carouselInnerOffset > breakScrollAt) {
      carouselInnerOffset = breakScrollAt;
      carouselDataArray[carouselId][0].activeFrame --;

      var nextControl = $('#' + carouselId).find('.control.next');
      nextControl.addClass('disabled');
    }

    $('#' + carouselId).find('.items').css('margin-left', '-' + carouselInnerOffset + 'px');
  }

  function decorateControls(carouselId){

    var carouselElem = $('#' + carouselId);
    var totalFrames = carouselDataArray[carouselId][0].totalFrames;
    var frameToDisplay = carouselDataArray[carouselId][0].activeFrame;
    var previousControl = carouselElem.find('.control.previous');
    var nextControl = carouselElem.find('.control.next');
    var totalFrames = carouselDataArray[carouselId][0].totalFrames;

    if (frameToDisplay === 0) {
      previousControl.addClass('disabled');
    }

    if (frameToDisplay > 0) {
      previousControl.removeClass('disabled');
    }

    if (frameToDisplay === totalFrames - 1) {
      nextControl.addClass('disabled');
    }

    if (frameToDisplay < totalFrames - 1) {
      nextControl.removeClass('disabled');
    }

/*
* Decorate frame index links
**/
    var indicatorItems = carouselElem.find('.indicatorItems');
    indicatorItems.find('li').removeClass('active');
    var indicatorToHighlight = frameToDisplay + 1;
    indicatorItems.find('li:nth-child(' + indicatorToHighlight + ')').addClass('active');

  }

  function buildIndicators(carouselId){
    var carouselElem = $('#' + carouselId);
    var totalFrames = carouselDataArray[carouselId][0].totalFrames;
    var indicatorHtml = '<div class="indicators"><div class="canvas"></div><ul class="indicatorItems"></ul></div>';
    carouselElem.append(indicatorHtml);

    var currentIndex;
    for (i = 0; i < totalFrames; i++) {
      currentIndex = i + 1;
      carouselElem.find('.indicatorItems').append('<li><a href="' + currentIndex + '">View carousel item ' + currentIndex + '</a></li>');
    }
  }

  function findCarousels(){
    var currentCarouselId = '';
    $('[carousel]').each(function(index){
      if ((typeof $(this).attr('id') == 'undefined') || ($(this).attr('id') == '')) {
        currentCarouselId = 'carousel0' + (parseInt(index, 10) + 1);
        $(this).attr('id',currentCarouselId);
      } else {
        currentCarouselId = $(this).attr('id');
      }
      carouselArray.push(currentCarouselId);
    });
  };

  function playCarousel(carouselId){

    var currentCarouselElem = $('#' + carouselId);
    var delay = carouselDataArray[carouselId][0].delay;
    var nextControl = currentCarouselElem.find('.control.next');

    var currentActiveFrame = carouselDataArray[carouselId][0].activeFrame;
    var frameToDisplay = currentActiveFrame;
    var transition = carouselDataArray[carouselId][0].transition;

    var runFrames = setInterval(function(){

      if (!nextControl.closest('.control').hasClass('disabled')) {
        frameToDisplay++;
        carouselDataArray[carouselId][0].activeFrame = frameToDisplay;

        decorateControls(carouselId);

        if (transition === 'slide') {
          updateFramePosition(carouselId);
        } else if (transition === 'fade') {
          hideFrame(carouselId);
          showFrame(carouselId);
        }

      } else {
        clearInterval(runFrames);
      }

    }, delay);

  }

  function setUp(){
    $.each(carouselArray, function(index, value) {
/*
* Get settings from data attributes on component
**/
      var currentCarouselConfig = [];
      var currentCarouselElem = $('#' + value);
      var autorun = currentCarouselElem.attr('data-autorun');
      var transition = currentCarouselElem.attr('data-transition');
      var transitionDuration = (currentCarouselElem.attr('data-transitionDuration')) ? currentCarouselElem.attr('data-transitionDuration') : 250;
      var delay = (currentCarouselElem.attr('data-delay')) ? currentCarouselElem.attr('data-delay') : 10;
      var controlPosition = currentCarouselElem.attr('data-controlPosition');
      var showIndicators = (currentCarouselElem.attr('data-showIndicators')) ? currentCarouselElem.attr('data-showIndicators') : false;

      var totalFrames = currentCarouselElem.find('.frame').length;
      var frameHeight = currentCarouselElem.find('.frame').outerHeight();
      var controlHeight = currentCarouselElem.find('.control a').outerHeight();
      var controlTopMargin = Math.floor((frameHeight - controlHeight) / 2);
      var frameWidth = currentCarouselElem.find('.frame').outerWidth();
      var totalFrameWidth = totalFrames * frameWidth;
      var carouselInnerWidth = currentCarouselElem.innerWidth();

      currentCarouselConfig.push({
        'autorun': autorun,
        'transition': transition,
        'transitionDuration': transitionDuration,
        'delay': delay,
        'controlPosition': controlPosition,
        'controlTopMargin': controlTopMargin,
        'showIndicators': showIndicators,
        'totalFrames': totalFrames,
        'frameHeight': frameHeight,
        'frameWidth': frameWidth,
        'totalFrameWidth': totalFrameWidth,
        'carouselInnerWidth': carouselInnerWidth,
        'activeFrame': 0
      });

      carouselDataArray[value] = currentCarouselConfig;
/*
* Apply settings necessary to set up carousel
**/
      currentCarouselElem.addClass(transition);
      currentCarouselElem.find('.items').css('width', totalFrameWidth + 'px');

      if (transition === 'fade') {
        currentCarouselElem.find('.inner').css('height', frameHeight + 'px');
        currentCarouselElem.find('.items').find('.frame:first-child').addClass('activate').addClass('reveal');
      }
      currentCarouselElem.find('.control.previous').addClass('disabled');

      totalFrameWidth = (totalFrames === 0) ? 0 : totalFrameWidth;
      if (totalFrameWidth <= carouselInnerWidth) {

        currentCarouselElem.find('.control.next').addClass('disabled');

      };

      currentCarouselElem.find('.control a').css('margin-top', controlTopMargin + 'px');
/*
* Now set up indicatorItems
**/
      if (showIndicators === 'true') {
        buildIndicators(value);
      }

      var indicatorItemsWidth = currentCarouselElem.find('.indicatorItems').outerWidth(true);
      var currentCarouselElemWidth = currentCarouselElem.outerWidth();
      var indicatorLeftPosition = currentCarouselElemWidth - indicatorItemsWidth;
      currentCarouselElem.find('.indicators').css('width', indicatorItemsWidth + 'px').css('left', indicatorLeftPosition / 2 + 'px');
      currentCarouselElem.find('.indicators li:first-child').addClass('active');

      if (autorun === 'true') {
        playCarousel(value)
      }

      if (typeof Game.Global.BasketModal !== 'undefined' && typeof Game.Global.BasketModal.runCarouselUpdates !== 'undefined') {
        Game.Global.BasketModal.runCarouselUpdates();
      };

    });
  };

  function listenToCarouselControls(){

    $('[carousel] .control a').click(function(event){
      event.preventDefault();
      event.stopImmediatePropagation();

      if (!$(this).closest('.control').hasClass('disabled')) {
        var carouselId = $(this).closest('[carousel]').attr('id');
        var transition = carouselDataArray[carouselId][0].transition;
        var currentActiveFrame = carouselDataArray[carouselId][0].activeFrame;
        var previousControl = $(this).closest('[carousel]').find('.control.previous');
        var nextControl = $(this).closest('[carousel]').find('.control.next');
        var totalFrames = carouselDataArray[carouselId][0].totalFrames;
        var controlElementClicked = $(this).closest('.control');
        var frameToDisplay = currentActiveFrame;

        if (!controlElementClicked.hasClass('disabled')) {
          if (controlElementClicked.hasClass('previous')) {
            frameToDisplay--;
          } else {
            frameToDisplay++;
          }
        };

        carouselDataArray[carouselId][0].activeFrame = frameToDisplay;

        decorateControls(carouselId);

        if (transition === 'slide') {
          updateFramePosition(carouselId);
        } else if (transition === 'fade') {
          hideFrame(carouselId);
          showFrame(carouselId);
        }
      };

    });

  }

  function listenForTouchAction(){

    $('[carousel] .frame').swipe({

      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        
        if (direction === 'left') {
            $( '.icon-right-open' ).trigger('click');
            console.log("left swipe");
        };

        if (direction === 'right') {
            $( '.icon-left-open' ).trigger('click');
            console.log("right swipe");
        };

      },

      threshold:0

    });

  };

  function listenToIndicatorClicks(){

    $('[carousel] .indicators a').click(function(event){
      event.preventDefault();

      if (!$(this).closest('li').hasClass('active')) {
        var carouselId = $(this).closest('[carousel]').attr('id');
        var transition = carouselDataArray[carouselId][0].transition;
        var frameToDisplay = $(this).attr('href') - 1;
        var previousControl = $(this).closest('[carousel]').find('.control.previous');
        var nextControl = $(this).closest('[carousel]').find('.control.next');
        var totalFrames = carouselDataArray[carouselId][0].totalFrames;
        carouselDataArray[carouselId][0].activeFrame = frameToDisplay;

        decorateControls(carouselId)

        $(this).closest('ul').find('li').removeClass('active');
        $(this).closest('li').addClass('active');

        if (transition === 'slide') {
          updateFramePosition(carouselId);
        } else if (transition === 'fade') {
          hideFrame(carouselId);
          showFrame(carouselId);
        }
      }
    });
  }

  return {
    init: function(){
      $.when(
        findCarousels()
      )
      .then(
        setUp()
      )
      .then(
        listenToCarouselControls()
      )
      .then(
        listenToIndicatorClicks()
      )
      .then(
        listenForTouchAction()
      )
    }
  };

})();
/*
$(document).ready(function(){
    carousel.init();
});
*/
