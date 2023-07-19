export default class View {
	//оттенки фигур, закрепленный за каждой
	static colors = {
		'1' : '#20b2aa',
		'2' : '#4169e1',
		'3' : '#ff4500',
		'4' : '#ffff00',
		'5' : '#00fa9a',
		'6' : '#4b0082',
		'7' : '#900020'
	};
	//создание холста путем js с размерами и отображением всех элементов интерфейса и игры
	constructor(element, width, height, rows, columns) {
		this.element = element;
		this.width = width;
		this.height = height;
		
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');
		
		this.boardBorderWidth = 4;
		this.boardX = this.boardBorderWidth;
		this.boardY = this.boardBorderWidth;
		this.boardWidth = this.width / 2;
		this.boardHeight = this.height;
		this.boardInnerWidth = this.boardWidth - this.boardBorderWidth * 2;
		this.boardInnerHeight = this.boardHeight - this.boardBorderWidth * 2;
		
		this.tetrominoWidth = this.boardInnerWidth / columns;
		this.tetrominoHeight = this.boardInnerHeight / rows;
		
		this.infoTabX = this.boardWidth + 20;
		this.infoTabY = 0;
		this.infoTabWidth = this.width / 2;
		this.infoTabHeight = this.height;
		
		this.element.appendChild(this.canvas);
	}
	
	
	
	//Основное меню игры в ее процессе
	displayMainMenu(stat) {
		this.clearPast();
		this.displayBoard(stat);
		this.displayInfoTab(stat);
	}
	//Стартовое меню игры
	displayStartMenu() {
	
		this.context.fillStyle = '#f2f3f4';
		this.context.font = '50px "Play"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillText('Press "Enter" to', this.width / 2, this.height / 2);
		this.context.fillText('start', this.width / 2, this.height / 2 + 50);
	}
	//Меню паузы с затемнением
	displayPauseMenu() {
		
		this.context.fillStyle = 'rgba(0,0,0,0.75)';
		this.context.fillRect(0, 0, this.width / 2 + 2, this.height);
		
		this.context.fillStyle = '#f2f3f4';
		this.context.font = '50px "Play"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillText('Press "Space" to', this.width / 2, this.height / 2);
		this.context.fillText('resume', this.width / 2, this.height / 2 + 50);
	}
	//Меню конца игры с предложением переиграть
	displayGameOverMenu({ score }) {
		this.clearPast();

		this.context.fillStyle = '#f2f3f4';
		this.context.font = '50px "Play"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 50);
		this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
		this.context.font = '25px "Play"';
		this.context.fillText('Press "R" to restart', this.width / 2, this.height / 2 + 48);
	}
	//Очистка
	clearPast() {
		this.context.clearRect(0, 0, this.width, this.height);
	}
	//Основа отображения фигур
	displayBoard({ board }) {
		for (let y = 0; y < board.length; y++) {
			const line = board[y];
			
			for (let x = 0; x < line.length; x++) {
				const tetromino = line[x];
				
				if(tetromino) {
					this.displayTetromino(
						this.boardX + (x * this.tetrominoWidth), 
						this.boardY + (y * this.tetrominoHeight), 
						this.tetrominoWidth, 
						this.tetrominoHeight, 
						View.colors[tetromino]
						);
				}
			}
		}
		//Игровая рамка
		this.context.strokeStyle = '#f2f3f4';
		this.context.lineWidth = this.boardBorderWidth;
		this.context.strokeRect(0, 0, this.boardWidth, this.boardHeight);
	}
	//Отображение меню справа
	displayInfoTab({level, score, lines, nextPiece}) {
		
		
	//Настройки отображения текста	
		this.context.textAlign = 'start';
		this.context.textBaseline = 'top';
		this.context.fillStyle = '#f2f3f4';
		this.context.font = '30px "Play"';
	//Отображение боковой панели с информацией	
		this.context.fillText(`Score: ${score}`, this.infoTabX, this.infoTabY + 0);
		this.context.fillText(`Level: ${level}`, this.infoTabX, this.infoTabY + 24);
		this.context.fillText(`Lines: ${lines}`, this.infoTabX, this.infoTabY + 48);
		this.context.fillText('Next is:', this.infoTabX, this.infoTabY + 96);
	//Отображение следующей фигуры	
		for (let y = 0; y < nextPiece.tetromino.length; y++) {
			for (let x = 0; x < nextPiece.tetromino[y].length; x++) {
				const tetromino = nextPiece.tetromino[y][x];
				
				if(tetromino) {
					this.displayTetromino(
						this.infoTabX + (x * this.tetrominoWidth),
						this.infoTabY + 100 + (y * this.tetrominoHeight),
						this.tetrominoWidth,
						this.tetrominoHeight,
						View.colors[tetromino]
					);
				}
			}
		}
	}
	//Отображение фигуры
	displayTetromino(x, y, width, height, color) {
		this.context.fillStyle = color;
		this.context.strokeStyle = 'black';
		this.context.lineWidth = 2;
					
		this.context.fillRect(x, y, width, height);
		this.context.strokeRect(x, y, width, height);
	}
}