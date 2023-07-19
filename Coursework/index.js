
import Game from './src/game.js';
import View from './src/view.js';
import Regulation from './src/regulation.js';

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 640, 640, 20, 10);
const regulation = new Regulation(game, view); 

window.game = game;
window.view = view;
window.regulation = regulation;


