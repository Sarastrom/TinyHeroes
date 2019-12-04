/**
* Cookies
*   Usage:
*   Get Cookie
*   handleCookies.get("name")
*   
*   Set Cookie
*   handleCookies.set("name","value","days");
*   
*   remove Cookie
*   handleCookies.remove("name");
*/

var CookiePolicy = (function(){

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        var cookie = null;
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                cookie = c.substring(nameEQ.length,c.length);
            }
        }
        return cookie;        
    }

    function removeCookie(name) {
        setCookie(name,"",-1);
    }

    return {
        init: function() {

            if (getCookie('cookieCompliance')) {
                //this is the old compliance cookie and needs to be deleted
                removeCookie('cookieCompliance');
            }

            if (getCookie('complianceCookie')) {
                $('#cookiePolicy').hide();
            } else {
                $('#cookiePolicy').show();
            }

            if(getCookie('gdprPurposesCookie')){ 
            //set variable on every page according to previous acceptance choice
                window.__rmcp = JSON.parse(getCookie('gdprPurposesCookie'));
            }

            $('#cookiePolicy').on('click', '.cookiePolicy_inner-link', function(event){
                event.preventDefault();
                $('#cookiePolicy').hide();
                setCookie('complianceCookie',true,365);
                //set variable for Rakuten
                if($(event.currentTarget).hasClass('accept')){
                   window.__rmcp = [1,2,3,4,5];
                   //cookie for persisting complianceCookie acceptance
                   setCookie('gdprPurposesCookie',JSON.stringify([1,2,3,4,5]),365);
               } else {
                window.__rmcp = [];
                $('#cookiePolicy').append('<img src="https://ads.avocet.io/s?add=5d67c71d2c736f3b00a39fe7" style="display: none !important;">');
                setCookie('gdprPurposesCookie',JSON.stringify([]),365);
               }
            });
        }
    }

})();

$(document).ready(function() {
  CookiePolicy.init();
});
