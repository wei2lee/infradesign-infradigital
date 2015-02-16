$(document).ready(function(){
    if($('.fancybox').length){
        $('.fancybox').fancybox();   
    }
    
    if($('.banner-page').length){
        $('.banner-page').on('click', function(){
            var href = $(this).attr('href'); 
            if(href){
                var isExternalLink = href.indexOf('http://') >= 0;
                win = window.open(href, isExternalLink ? '_blank' : '_self');
                
                $(this).css('cursor', 'pointer');
            }
        });
    }
        
        
    if($('.portfolio-container').length){
        $container = $('.portfolio-container');
        $container.find('.devices .slider').portfolioSlider();
        
    }
    
    if($('.contact-container').length){
        $container = $('.contact-container');
        $form = $container.find('.contact-form');
        
        $form.bootstrapValidator({
            framework: 'bootstrap',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'contact-name': {
                    validators: {
                        notEmpty: {
                            message: 'The name is required'
                        }
                    }
                },
                'contact-email': {
                    validators: {
                        notEmpty: {
                            message: 'The email is required'
                        }
                    }
                },
                'contact-subject': {
                    validators: {
                        notEmpty: {
                            message: 'The subject is required'
                        }
                    }
                },
                'contact-services[]': {
                    validators: {
                        choice: {
                            min: 1,
                            message: 'Please choose at one service'
                        }
                    }
                },
            }
        }).on('success.form.fv', function(e) { 
            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('formValidation');
            var contact_services = [];
            $form.find('contact-services input[type=checkbox]').each(function(ind, ele){
                if($this.is(":checked"))
                    contact_services.push($this.val());
            });
            //contact-service-feedback
            console.log(contact_services);
            
            $data = {
                name:$form.find('[name="contact-name"]').val(),
                email:$form.find('[name="contact-email"]').val(),
                subject:$form.find('[name="contact-subject"]').val(),
                message:$form.find('[name="contact-message"]').val(),
                services:contact_services.join(', ')
            };
            $.post($form.attr('action'), $data, function(result) {
                // ... Process the result ...
                if(!result.error_exist){
                    bootbox.alert('Fail to submit : ' + result.error_message);
                }else{
                    var bb = bootbox.cofirm('Successfully sumbitted.');
                    setTimeout(function(){ bb.hide(); }, 5000);
                }
            }, 'json').fail(function(jqXHR, textStatus, errorThrown){
                bootbox.alert('Fail to submit : ' + errorThrown);
            });
        });
    }
});