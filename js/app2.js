'use strict'
let getTemplate = $('#temp').html();
let templateRender = Handlebars.compile(getTemplate);

$.ajax('data/page-2.json', {method: 'GET', dataType: 'JSON'})
  .then(data => {
    data.forEach(animal => {
      let newAnimal = new Animal(animal);
      newAnimal.renderTemplate();
      filter();
    });
    renderKeyword();
  })

let animalArray = [];

function Animal(obj){
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.horns = obj.horns;
  this.keyword = obj.keyword;
  animalArray.push(this);
}


Animal.prototype.renderTemplate= function(){
  $('#photo-template').append(templateRender(this));
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
  const sect = $('div');
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