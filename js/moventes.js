$(document).ready(function () {
    console.log('document ready');
    console.log('form',$('#contactForm'));
    $('#contactForm')
        .bootstrapValidator({
        message: 'Ce champ n\'est pas valide',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        submitHandler: function(validator, form, submitButton) {
            $.post(form.attr('action'), form.serialize(), function(result) {
                // The result is a JSON formatted by your back-end
                // I assume the format is as following:
                //  {
                //      valid: true,          // false if the account is not found
                //      message: 'message'
                //  }
                if (result.success == true || result.success == 'true') {
                    $('#form_submit_success').html(result.message).removeClass('hide');
                } else {
                    // The account is not found
                    // Show the errors
                    $('#form_submit_error').html(result.message).removeClass('hide');

                    // Enable the submit buttons
                    $('#contactForm').bootstrapValidator('disableSubmitButtons', false);
                }
            }, 'json');
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
                        max: 30
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
                        max: 30
                    }
                }
            },
            company: {
                validators: {
                    stringLength: {
                        min: 2,
                        max: 40
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message:'Veuillez saisir votre adresse email'
                    },
                    emailAddress: {
                    }
                }
            },
            phone:{
                validators: {
                    phone: {
                        country: 'FR'
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
    });
});
