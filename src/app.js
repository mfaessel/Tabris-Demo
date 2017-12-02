// Create a collection view, initialize its cells and fill it with items
const {CollectionView, Button, Composite, ImageView, TextView, Video, ui} = require('tabris');
const IMAGE_PATH = 'images/';

let button = new Button({
  centerX: 0, top: 100,
  text: 'Show message'
}).appendTo(ui.contentView);

let textView = new TextView({
  centerX: 0, top: [button, 50],
  font: '24px'
}).appendTo(ui.contentView);




button.on('select', () => {
  textView.text = 'Tabris.js ça rocks!';
});

// Load a JSON file 
const data = require('./my.json');


let people = [
  ['Holger', 'Staudacher', 'holger.jpg'],
  ['Ian', 'Bull', 'ian.jpg'],
  ['Jochen', 'Krause', 'jochen.jpg'],
  ['Jordi', 'Böhme López', 'jordi.jpg'],
  ['Markus', 'Knauer', 'markus.jpg'],
  ['Moritz', 'Post', 'moritz.jpg'],
  ['Ralf', 'Sternberg', 'ralf.jpg'],
  ['Tim', 'Buschtöns', 'tim.jpg']
].map(([firstName, lastName, image]) => ({firstName, lastName, image: IMAGE_PATH + image}));

new CollectionView({
  left: 0, top: 0, right: 0, bottom: 0,
  itemCount: people.length,
  cellHeight: 256,
  background: 'red',
  createCell: () => {
    let cell = new Composite();
    new ImageView({
      top: 16, centerX: 0, width: 200, height: 100
    }).appendTo(cell);
    new TextView({
      left: 30, top: 'prev() 16', right: 30,

      alignment: 'center'
    }).appendTo(cell);
    return cell;
  },
  updateCell: (cell, index) => {
    let person = people[index];
    cell.apply({
      ImageView: {image: person.image},
      TextView: {text: person.firstName + data.name }
    });
  }
}).on('select', ({index}) => console.log('selected', people[index].firstName))
  .appendTo(ui.contentView);

  let video = new Video({
  left: 0, top: 0, right: 0, bottom: '#button 16',
  url: 'file:///sdcard/CIP/FR.mp4',
  autoPlay: true,
  controlsVisible: false
}).on('stateChanged', event => button.text = event.value !== 'pause' ? '❚❚' : '▶')
  .appendTo(ui.contentView);