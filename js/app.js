'use strict'


function Gallery (obj){
    this.image = obj.image_url;
    this.title = obj.title;
    this.description = obj.description;
    this.keyword = obj.keyword;
    this.horns = obj.horns;
}


Gallery.prototype.render = function () {
   //#photo-template is the id in the section in html. ".html()" will get the html within the photo-template section
    let template = $('#photo-template').html()

    //make a new section. "$section" is just a way to name, the $ doesn't trigger jQuery
    let $section = $('<section></section>');

    // will put the html structure defined in the template variable into a new $section html code
    $section.html(template);

    //find the header in the html and assign it the title from the constructor
    $section.find('h2').text(this.title);
    $section.find('p').text(this.description);
    $section.find('img').attr('src', this.image);

    // append section to the main section in index.html
    $('main').append($section);
}


  // $.ajax to get the information from the page-1.json file
  $.ajax('./data/page-1.json', {METHOD: 'GET', DATATYPE: 'JSON'})
  .then(data => {
    //   console.log(data);
    data.forEach(animal => {
        new Gallery(animal).render();
    })
  })


