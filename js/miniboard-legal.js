(function($) {
  "use strict"; // Start of use strict

  var waypoint = $('#footer').waypoint(function(direction) {
    if(direction == "up"){
      $('#mainNav').addClass('white');
    } else {
      $('#mainNav').removeClass('white');
    }
  }, {
    offset: '80px'
  });

})(jQuery); // End of use strict
