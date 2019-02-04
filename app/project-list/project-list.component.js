'use strict';

angular
  .module("projectList")
  .component('projectList', {
    replace: true,
    templateUrl: 'app/project-list/project-list.template.html',
    controller: function projectListController($http){
      var self = this;
      $http.get('app/projects/projects.json').then(function(response){
        self.projects = response.data;
      });

      this.slickProjectsConfig = {
        slidesToShow: 1,
        variableWidth: true,
        centerMode: true,
        centerPadding: '30px',
        dots: true,
        appendDots: ".slick-dots-container",
        arrows: true,
        appendArrows: ".slick-arrows-container",
        prevArrow: '<div class="slick-arrow-prev"><</div>',
        nextArrow: '<div class="slick-arrow-next">></div>',
        responsive: [
          {
            breakpoint: 1921,
            settings: {
              slidesToShow: 1,
            }
          },
          {
            breakpoint: 1025,
            settings: {
              centerMode: false,
              centerPadding: 0,
              variableWidth: false,
              slidesToShow: 1,
            }
          },
        ]
      }

      this.slickProjectsConfigLoaded = true;

    },
  })