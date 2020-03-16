'use strict'

//array with all instances of animals from the page-1.json file
let animalArray = [];

function Gallery (obj){
    this.image = obj.image_url;
    this.title = obj.title;
    this.description = obj.description;
    this.keyword = obj.keyword;
    this.horns = obj.horns;
    animalArray.push(this);
}


Gallery.prototype.renderAnimal = function () {
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
        new Gallery(animal).renderAnimal()
        filter();
    })
    renderKeyword();
    clickEvent();
  })



  // need an array of unique key words
  // use that array to generate the drop down list
  // when the user selects a name, filter the images that are displayed.


// create an array that stores keywords "unicorn, narwhal,..." without duplicates.
const newOptionArray = [];

//function will take in the animalArray that has all instances of animals and filter to only unique keywords into the newOptionArray
function filter (){
  animalArray.sort().forEach(keys => {
    if (!newOptionArray.includes(keys.keyword)){
      newOptionArray.push(keys.keyword);
    }
  })
}

//go through each keyword in the newOptionArray and append the keyword into the drop-down option in the html using jquery
function renderKeyword() {
  
  const $option = $('select')
  newOptionArray.forEach(keyword => {
    const $newOption = $(`<option value:"${keyword}">${keyword}</option>`);
    $option.append($newOption);
      });
}


// when the user clicks on a drop-down option
function clickEvent(event) {
  const sect = $('section');
  sect.each((index, value)=>{
    if( $(value).attr('keyword') === event.target.value){
      console.log(value);
      $(value).show();
    } else{
      $(value).hide();
    }
  }
  )
}
$('select').change(clickEvent);

$(function() {});