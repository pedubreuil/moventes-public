
$(document).ready(function () {
    console.log('document ready');
    fixNavLayout();

    $.cookieCuttr({
        cookieAnalytics: true,
        cookieNotificationLocationBottom:true,
        //        cookieDiscreetLink: true,
        cookieDeclineButton: true,
        //        cookiePolicyLink: "/privacy-policy/",

        cookieAnalyticsMessage: "Ce site web fait des mesures anonymes d'audience pour en améliorer l'expérience. Acceptez-vous d'y participer ?",
        cookieAcceptButtonText:"J'accepte",
        cookieDeclineButtonText:"Je refuse",
        cookieResetButtonText:"Je supprime les cookies",
        //        cookieDiscreetLinkText:"Cookies",
        //        cookieDiscreetPosition:"topright",
        cookieWhatAreLinkText:"Qu'est ce c'est ?",
        cookieWhatAreTheyLink: 'http://www.cnil.fr/vos-droits/vos-traces/les-cookies/',
        cookieDomain: "moventes.com",
        reloadOnAccept: false
        //

    });
    if( ! $.cookieDeclined() ) {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-62586585-1', 'auto');
        ga('send', 'pageview');
    }



    console.log('form',$('#contactForm'));
    $('#contactForm').bootstrapValidator({
        message: 'Ce champ n\'est pas valide',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        submitButtons: 'button[type="submit"]',
        fields: {
            firstname: {
                validators: {
                    notEmpty: {
                        message:'Veuillez saisir votre prénom'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message:'Votre prénom doit être d\'au moins 2 caractères'
                    }
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        message:'Veuillez saisir votre nom'
                    },
                    stringLength: {
                        min: 2,
                        max: 30,
                        message:'Votre nom doit être d\'au moins 2 caractères'
                    }
                }
            },
            company: {
                validators: {
                    stringLength: {
                        min: 2,
                        max: 40,
                        message:'Le nom de votre entreprise doit être d\'au moins 2 caractères'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message:'Veuillez saisir votre adresse email'
                    },
                    emailAddress: {
                        message:'Votre adresse email n\'est pas valide'                                           }
                }
            },
            phone:{
                validators: {
                    phone: {
                        country: 'FR',
                        message:'Votre numéro de téléphone n\'est pas valide'
                    }
                }
            },
            message: {
                validators: {
                    notEmpty: {
                        message:'Veuillez rédiger ici votre message'
                    },
                    stringLength: {
                        min: 5,
                        message:'Votre message est trop court !'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();
        e.stopImmediatePropagation();

        var $form        = $(e.target),
            validator    = $form.data('bootstrapValidator'),
            submitButton = validator.getSubmitButton();

        submitButton.prop("disabled", true);
        $form.find(':input').prop('disabled',true)


        var posting = $.post($form.attr('action'), $form.serialize(), function(result) {console.log(result);});
        posting.done(function( data ) {
            var response = jQuery.parseJSON(data);
            console.log(response.success);
            if(response.success){
                $("#contact-block").empty().append('<div class="alert alert-success"  role="alert">'+response.message+'</div>');
                if(goog_report_conversion){console.log('goog_report_conversion');goog_report_conversion();}
            }
            else {
                $("#contact-block").empty().append('<div class="alert alert-danger"  role="alert">'+response.message+'<br/>Nous nous excusons pour cet incident technique.<br/> Merci de nous contacter par email : <a href="mailto:contact@moventes.com">contact@moventes.com</a></div>');
            }
        }).fail(function() {
                $("#contact-block").empty().append('<div class="alert alert-danger"  role="alert">La requête a échoué. <br/>Nous nous excusons pour cet incident technique.<br/> Merci de nous contacter par email : <a href="mailto:contact@moventes.com">contact@moventes.com</a></div>');
        });

    });



    $('[data-toggle="tooltip"]').tooltip();
});


//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    fixNavLayout();
});


var fixNavLayout = function(){
    if ($(".navbar").offset().top > 50 ) {
        $(".navbar-fixed-top").removeClass("nav-over-header");
    } else if($("header").length) {
        $(".navbar-fixed-top").addClass("nav-over-header");
    }
};

// for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        console.log('click for page-scroll ',$(this));
        var $anchor = $(this);
        console.log( $($anchor.attr('href')).offset().top);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});



function initMapSiegeSocial() {
    var mapCanvas = document.getElementById('map-canvas');
    var positionNantes = new google.maps.LatLng(47.2256583,-1.5462325);
    var positionToulouse = new google.maps.LatLng(43.5963286,1.4621036);
    var positionFrance = new google.maps.LatLng(47.0000, 2.0000);

    var mapOptions = {
        zoom: 5,
        maxZoom:12,
        minZoom:4,
        center: positionFrance,
        mapTypeId:google.maps.MapTypeId.TERRAIN
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    var imageSize = new google.maps.Size(40, 40);

    var markerNantes = new google.maps.Marker({
        position: positionNantes,
        map: map,
        icon:{
            url:'img/mapicon.png',
            scaledSize:imageSize
        },
        animation: google.maps.Animation.DROP,
        title: 'Siège social de Moventes',
        attribution :{
            source:'Moventes',
            webUrl:'http://www.moventes.com/about.html'
        },
        optimized:true
    });

    var markerToulouse = new google.maps.Marker({
        position: positionToulouse,
        map: map,
        icon:{
            url:'img/mapicon2.png',
            scaledSize:imageSize
        },
        animation: google.maps.Animation.DROP,
        title: 'Antenne commerciale de Moventes',
        attribution :{
            source:'Moventes',
            webUrl:'http://www.moventes.com/about.html'
        },
        optimized:true
    });

    //        function toggleBounce() {
    //
    //            if (markerNantes.getAnimation() != null) {
    //                markerNantes.setAnimation(null);
    //            } else {
    //                markerNantes.setAnimation(google.maps.Animation.BOUNCE);
    //            }
    //        }
    //        google.maps.event.addListener(markerNantes, 'click', toggleBounce);
}


// https://developers.google.com/maps/documentation/javascript/examples/icon-simple
// https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyleFeatureType

