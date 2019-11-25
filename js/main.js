Barba.Pjax.start();

var transitionAnimation = Barba.BaseTransition.extend({
    start: function() {

      Promise
        .all([this.newContainerLoading, this.startTransition()])
        .then(this.fadeIn.bind(this));
    },

    startTransition: function() {
        var transitionPromise = new Promise(function(resolve){

          var outTransition = new TimelineMax();
          outTransition
          .to(".title",1, {y:-50, autoAlpha:0})
          .set(".color-wipe", {display:"block", y:"100%"}, "-=0.7")
          .staggerFromTo(".color-wipe", 1, {y:"100%"},{y:"-100%", ease: Expo.easeOut}, 0.2, "-=0.7")//cargamos los wipe-color hacia arriba
          

          //para cargar y quitar el loader
          .to(".loader", 1, {autoAlpha:1, onComplete: function(){resolve(); }})//cargamos el loader title
          .staggerFromTo(".color-wipe",  1, {y:"-100%"}, {y:"-200%", ease: Expo.easeOut},0.2)//quitamos  wipe-color
          .set(".color-wipe",{display:"none"})
        }); 

        return transitionPromise;

    },
    //fade in = aparecer
    // desaparecemos el loader desaparecemos
    //remove old container and bring new in
    fadeIn: function() {
   
      var _this = this;
      var $el = $(this.newContainer);
  
      /*$(this.oldContainer).hide();
  
      $el.css({
        visibility : 'visible',
        opacity : 0
      });
  
      $el.animate({ opacity: 1 }, 400, function() {
  
        _this.done();
      });*/
      TweenMax.set($(this.oldContainer), {display:"none"});
      TweenMax.fromTo(".loader", 1, {autoAlpha:1, y:-50}, {y:0, autoAlpha:0})
      TweenMax.fromTo(".title", 1.5, {autoAlpha:0, y:30}, {y:0, autoAlpha:1})
      TweenMax.to($el, 0.1, {opacity:1, onComplete:function(){_this.done(); }})
    }
  });
  Barba.Pjax.getTransition = function() {
    return transitionAnimation;
  };
  
  