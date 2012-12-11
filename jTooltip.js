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
  popTopArrow : 30,
  popTopArrowBottom : 105,
  limitScrollTop : 345,
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
        var objElement = jQuery(this);
        objTooltip.idElement = objElement.attr('data-tooltip-pop');
        objTooltip.listElements = jQuery('.tooltip-pop-'+this.popName);
        if(objTooltip.idElement){
          objTooltip.timer = setTimeout(function () {
            
          objTooltip.topElement = parseInt(objElement.offset().top);
          objTooltip.leftElement = parseInt(objElement.offset().left);
          objTooltip.scrollTop = jQuery(window).scrollTop();

          objTooltip.popElement = jQuery('#tooltip-pop-'+objTooltip.popName+'-'+objTooltip.idElement);
          objTooltip.popElementArrow = objTooltip.popElement.find('.extra-info-arrow');
          objTooltip.popElement.css('left', objTooltip.leftElement + 'px');
          objTooltip.popElement.fadeIn(300);
          objTooltip.popElement.addClass('active');
          objTooltip.popElement.removeClass('off');

          if( objTooltip.scrollTop >= objTooltip.limitScrollTop ){
            objTooltip.popElementArrow.removeClass('bottom-arrow');
            objTooltip.popElementArrow.addClass('top-arrow');
            objTooltip.popElementArrow.attr('src','/img/top-arrow.png');
            objTooltip.popElement.css('top', parseInt(objTooltip.topElement + objTooltip.popTopArrowBottom) + 'px');
          }else{
            objTooltip.popElementArrow.removeClass('top-arrow');
            objTooltip.popElementArrow.addClass('bottom-arrow');
            objTooltip.popElementArrow.attr('src','/img/bottom-arrow.png');
            objTooltip.popElement.css('top', parseInt(objTooltip.topElement - objTooltip.popElement.height() - objTooltip.popTopArrow) + 'px');
          }
          
          }, 200);
      }
    }).live('mouseleave', function() {
      clearTimeout(objTooltip.timer);
      var auxMouseenter = false;
      if(objTooltip.popElement){
        objTooltip.popElement.live('mouseenter mouseleave', function(event) {
          if(event.type == 'mouseleave'){
            objTooltip.clearListColaborators();
          }else{
            auxMouseenter = true;
          }
        });
      }
      setTimeout(function () {
        if(auxMouseenter == false){
          objTooltip.clearListColaborators();
        }
      }, 200);
    });
  };

  this.clearListColaborators = function(){
    objTooltip.listElements.fadeOut(300);
    objTooltip.listElements.removeClass('active');
    objTooltip.listElements.addClass('off');
    objTooltip.listElements.css('left','0');
    objTooltip.listElements.css('top','0');
  }


};