(function($) {
  var RequireValidator = function() {
      this.init = function(input) {
        this.$input = $(input);
      };

      this.validate = function() {
        var $input = this.$input;
        var type = $input.attr('type');
        var valid = false;
        if (type == 'checkbox' || type == 'radio') {
          valid = $input.is(':checked');
        } else {
          valid = $.trim($input.val());
        }

        $input.trigger('validate', valid);
        return valid;
      };
  };

  var validation = {
     validators : {},

     init : function(form) {
       if (!form || $(form).data('validation_initialized')) return;

       var $inputs = getInputs(form);
       $.each($inputs, function(idx, input) {
         var validator = validation.validators[$(input).data('validation')];
         if (validator) {
           var inst = new validator();
           $(input).data('validator', inst);
           inst.init(input);           
         }
       });
       $(form).data('validation_initialized', true);
     },

     validate : function(form) {
       var $inputs = getInputs(form);
       var valid = true;
       
       if ($inputs.length) {
         $.each($inputs, function(idx, input) {
           var $input = $(input);
           var validator = $input.data('validator');
           if (validator && !validator.validate()) {
             valid = false;
           }
         });
         
         $inputs.closest('form').trigger('formValidate', valid);
       }
       return valid;         
     },
     
     addValidator : function(type, validator) {
       this.validators[type] = validator;
     }
  };

  function getInputs(form) {
    var $form = $(form);
    if ($form) {
      return $(form).find('[data-validation]');
    }
    return [];
  }
  
  $.fn.initValidate = function() {
    validation.init(this);
  }
  
  $.fn.validate = function() {
    validation.init(this);
    validation.validate(this);
  }

  //default
  validation.addValidator('require', RequireValidator);
  return validation;
})($);