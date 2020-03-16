'use strict'

$.ajax('data/page-1.json', {method: 'GET', dataType: 'JSON'})
  .then(data => {
    data.forEach(animal => {
      new Animal(animal).render()
      filter();
    })
    renderKeyword();
  })


let animalArray = [];

function Animal(obj){
  this.title = obj.title;
  this.image_url=obj.image_url;
  this.description = obj.description;
  this.horns = obj.horns;
  this.keyword = obj.keyword;
  animalArray.push(this);
}

Animal.prototype.render = function(){
  // select all the html in the template
  const myTemplate = $('#photo-template').html();

  // make a new section
  const $newSection = $('<section></section>');
  $newSection.html(myTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('p').text(this.description);
  $newSection.attr('keyword', this.keyword);
  $('main').append($newSection);

}

//keyword options
const newOptionArray = [];

function filter (){
  animalArray.forEach(keys => {
    if (!newOptionArray.includes(keys.keyword)){
      newOptionArray.push(keys.keyword);
    }
  })
}

function renderKeyword() {
  const $option = $('select')
  newOptionArray.forEach(keyword => {
    const $newOption = $(`<option value:"${keyword}">${keyword}</option>`);
    $option.append($newOption);
  });
}

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