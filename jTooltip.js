var tooltipJCarouseltOptions = {
  timer : 0,
  id_collaborator_aux : 0,
  top_collaborator_aux : 0,
  left_collaborator_aux : 0,
  objTooltip : null,
  popCollaborator : null,
  popCollaboratorArrow : null,
  scrollTop : null,
  popName : '',
  popTopArrow : 30,
  popTopArrowBottom : 105,
  limitScrollTop : 345
}, target = {};

var TooltipJCarousel = function(options){

  target = jQuery.extend( tooltipJCarouseltOptions, options );

  this.timer = target.timer;
  this.id_collaborator_aux = target.id_collaborator_aux;
  this.top_collaborator_aux = target.top_collaborator_aux;
  this.left_collaborator_aux = target.left_collaborator_aux;
  this.objTooltip = target.objTooltip;
  this.popCollaborator = target.popCollaborator;
  this.popCollaboratorArrow = target.popCollaboratorArrow;
  this.scrollTop = target.scrollTop;
  this.popName = target.popName;
  this.popTopArrow = target.popTopArrow;
  this.popTopArrowBottom = target.popTopArrowBottom;
  this.limitScrollTop = target.limitScrollTop;

  this.init = function(element){
    var objTooltip = this;
    jQuery(element).live('mouseenter', function() {
        var objElement = jQuery(this);
        objTooltip.id_collaborator_aux = objElement.attr('data-tooltip-pop');
        if(objTooltip.id_collaborator_aux){
          objTooltip.timer = setTimeout(function () {
            
          objTooltip.top_collaborator_aux = parseInt(objElement.offset().top);
          objTooltip.left_collaborator_aux = parseInt(objElement.offset().left);
          objTooltip.scrollTop = jQuery(window).scrollTop();

          objTooltip.popCollaborator = jQuery('#tooltip-pop-'+objTooltip.popName+'-'+objTooltip.id_collaborator_aux);
          objTooltip.popCollaboratorArrow = objTooltip.popCollaborator.find('.extra-info-arrow');
          objTooltip.popCollaborator.css('left', objTooltip.left_collaborator_aux + 'px');
          objTooltip.popCollaborator.fadeIn(300);
          objTooltip.popCollaborator.addClass('active');
          objTooltip.popCollaborator.removeClass('off');

          if( objTooltip.scrollTop >= objTooltip.limitScrollTop ){
            objTooltip.popCollaboratorArrow.removeClass('bottom-arrow');
            objTooltip.popCollaboratorArrow.addClass('top-arrow');
            objTooltip.popCollaboratorArrow.attr('src','/img/modules/products/extra-info_top-arrow.png');
            objTooltip.popCollaborator.css('top', parseInt(objTooltip.top_collaborator_aux + objTooltip.popTopArrowBottom) + 'px');
          }else{
            objTooltip.popCollaboratorArrow.removeClass('top-arrow');
            objTooltip.popCollaboratorArrow.addClass('bottom-arrow');
            objTooltip.popCollaboratorArrow.attr('src','/img/modules/products/extra-info_bottom-arrow.png');
            objTooltip.popCollaborator.css('top', parseInt(objTooltip.top_collaborator_aux - objTooltip.popCollaborator.height() - objTooltip.popTopArrow) + 'px');
          }
          
          }, 200);
      }
    }).live('mouseleave', function() {
      clearTimeout(objTooltip.timer);
      var auxMouseenter = false;
      if(objTooltip.popCollaborator){
        objTooltip.popCollaborator.live('mouseenter mouseleave', function(event) {
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
    jQuery('.tooltip-pop-'+this.popName).fadeOut(300);
    jQuery('.tooltip-pop-'+this.popName).removeClass('active');
    jQuery('.tooltip-pop-'+this.popName).addClass('off');
    jQuery('.tooltip-pop-'+this.popName).css('left','0');
    jQuery('.tooltip-pop-'+this.popName).css('top','0');
  }


};