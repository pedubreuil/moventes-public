$(document).ready(function () {

    console.log('document ready');
    $('[data-toggle="tooltip"]').tooltip();

    var bLazy = new Blazy({
        breakpoints: [{
            width: 768,
            src: 'data-src-small'
	     }, {
            width: 1200, // max-width
            src: 'data-src-medium'
	   }],
        success: function () {
            console.log('lazy loading of images finished');
        },
        error : function(ele, msg){
            console.error(msg);
            console.log(ele);
        }
    });
    new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: true, // default
        live: true // default
    }).init();



    //--------------------------------------
    //---- COOKIES REMOVED IF ASKED      ---

    $.cookieCuttr({
        cookieAnalytics: true,
        cookieNotificationLocationBottom: true,
        //        cookieDiscreetLink: true,
        cookieDeclineButton: true,
        //        cookiePolicyLink: "/privacy-policy/",

        cookieAnalyticsMessage: "Ce site web fait des mesures anonymes d'audience pour en améliorer l'expérience. Acceptez-vous d'y participer ?",
        cookieAcceptButtonText: "J'accepte",
        cookieDeclineButtonText: "Je refuse",
        cookieResetButtonText: "Je supprime les cookies",
        //        cookieDiscreetLinkText:"Cookies",
        //        cookieDiscreetPosition:"topright",
        cookieWhatAreLinkText: "Qu'est ce c'est ?",
        cookieWhatAreTheyLink: 'http://www.cnil.fr/vos-droits/vos-traces/les-cookies/',
        cookieDomain: "moventes.com",
        reloadOnAccept: false
            //

    });
    if (!$.cookieDeclined()) {

        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-62586585-1', 'auto');
        ga('send', 'pageview');


        //--------------------------------------
        //---- MODAL displayed after timeout ---

        if (!($.cookie('modal_timeout')) && !$.cookie('modal_completed')) {
            //first time
            console.debug('init cookie modal_timeout');
            $.cookie("modal_timeout", 0, {
                expires: 3,
                path: '/'
            });
        }
        window.setTimeout(modalTimeoutFn, refreshFrequency);
    }

});


refreshFrequency = 2000;
modalTimeoutFn = function () {
    if (!$.cookieDeclined() && !$.cookie('modal_completed')) {
        var lastValue = parseInt($.cookie('modal_timeout'));
        lastValue += refreshFrequency;

        console.debug('modal timeout', lastValue);
        $.cookie('modal_timeout', lastValue, {
            expires: 3,
            path: '/'
        });

        if (lastValue < 20000) {
            console.debug('wait again', refreshFrequency);
            window.setTimeout(modalTimeoutFn, refreshFrequency);
        } else if (lastValue == 20000) {
            // here since 20 sec
            //open modal
            console.debug('open modal', $('#timeoutModal'));
            $('#timeoutModal').modal('toggle');
            $('#timeoutModal').modal('show');
        } else {
            //do nothing
        }
    }
};
