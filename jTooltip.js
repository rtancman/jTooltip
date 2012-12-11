var jTooltipOptions = {
  timer : 0,
  idElement : 0,
  topElement : 0,
  leftElement : 0,
  objTooltip : null,
  popElement : null,
  popElementArrow : null,
  scrollTop : null,
  popName : '',
  popTopArrow : 0,
  popTopArrowBottom : 0,
  limitScrollTop : 0,
  listElements : null
}, target = {};

var jTooltip = function(options){

  target = jQuery.extend( jTooltipOptions, options );

  this.timer = target.timer;
  this.idElement = target.idElement;
  this.topElement = target.topElement;
  this.leftElement = target.leftElement;
  this.objTooltip = target.objTooltip;
  this.popElement = target.popElement;
  this.popElementArrow = target.popElementArrow;
  this.scrollTop = target.scrollTop;
  this.popName = target.popName;
  this.popTopArrow = target.popTopArrow;
  this.popTopArrowBottom = target.popTopArrowBottom;
  this.limitScrollTop = target.limitScrollTop;
  this.listElements = target.listElements;

  this.init = function(element){
    var objTooltip = this;
    jQuery(element).live('mouseenter', function() {
        objTooltip.objElement = jQuery(this);
        objTooltip.idElement = objTooltip.objElement.attr('data-tooltip-pop');
        
        if(objTooltip.idElement){
          objTooltip.timer = setTimeout(function () {
            
            objTooltip.topElement = parseInt(objTooltip.objElement.offset().top);
            objTooltip.leftElement = parseInt(objTooltip.objElement.offset().left);
            objTooltip.scrollTop = jQuery(window).scrollTop();

            objTooltip.popElement = jQuery('#tooltip-pop-'+objTooltip.popName+'-'+objTooltip.idElement);
            objTooltip.popElementArrow = objTooltip.popElement.find('.arrow');
            objTooltip.popElement.css('left', objTooltip.leftElement + 'px');
            objTooltip.popElement.fadeIn(300);
            objTooltip.popElement.addClass('active');
            objTooltip.popElement.removeClass('off');

            if( objTooltip.scrollTop >= objTooltip.limitScrollTop ){
              objTooltip.popElementArrow.removeClass('bottom');
              objTooltip.popElementArrow.addClass('top');
              objTooltip.popElement.css('top', parseInt(objTooltip.topElement + objTooltip.popTopArrowBottom) + 'px');
            }else{
              objTooltip.popElementArrow.removeClass('top');
              objTooltip.popElementArrow.addClass('bottom');
              objTooltip.popElement.css('top', parseInt(objTooltip.topElement - objTooltip.popElement.height() - objTooltip.popTopArrow) + 'px');
            }
          
          }, 200);
      }
    }).live('mouseleave', function() {
      clearTimeout(objTooltip.timer);
      var auxMouseenter = false,
      elementIframe = false;
      if(objTooltip.popElement){
        elementIframe = objTooltip.popElement.find('iframe');
        if(elementIframe.length > 0 ){
            auxMouseenter = true;
            jQuery('.tooltip-btn-close-'+objTooltip.popName).live('click', function() {
              objTooltip.clear();
            });  
        }else{
          objTooltip.popElement.live('mouseenter mouseleave', function(event) {
            if(event.type == 'mouseleave'){
              objTooltip.clear();
            }else{
              auxMouseenter = true;
            }
          });
        }
      }
      setTimeout(function () {
        if(auxMouseenter == false){
          objTooltip.clear();
        }
      }, 300);
    });
  };

  this.clear = function(){
    jQuery('.tooltip-pop-'+this.popName).fadeOut(200, function() {
      jQuery(this).removeClass('active');
      jQuery(this).addClass('off');
      jQuery(this).css('left','0');
      jQuery(this).css('top','0');
    });
  }


};
