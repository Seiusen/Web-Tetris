export default class Game {
	static points = {
		'1': 40,
		'2': 100,
		'3': 300,
		'4': 1200
	};
	
	
	constructor() {
		this.restart();
	}
	
	get level() {
		return Math.floor(this.lines * 0.1);
	}
	
	recStat() {
		const board = this.createBoard();
		const { y: pieceY, x: pieceX, tetromino } = this.currentPiece;
		
		for (let y = 0; y < this.board.length; y++) {
			board[y] = [];
			
			for (let x = 0; x < this.board[y].length; x++) {
				board[y][x] = this.board[y][x];
			}
		}	
		
		for (let y = 0; y < tetromino.length; y++) {
			for (let x = 0; x< tetromino[y].length; x++) {
				if (tetromino[y][x]) {
					board[pieceY + y][pieceX + x] = tetromino[y][x]
				}
			}
		}
		
		return {
			score: this.score,
			level: this.level,
			lines: this.lines,
			nextPiece: this.nextPiece,
			board,
			isGameOver: this.topOut
		};
	}
	
	restart() {
		this.score = 0;
		this.lines = 0;
		this.topOut = false;
		this.board = this.createBoard();
		this.currentPiece = this.createPiece();
		this.nextPiece = this.createPiece();
	}
	
	createBoard() {
		const board = [];
		
		for (let y = 0; y < 20; y++) {
			board[y] = [];
			
			for (let x = 0; x < 10; x++) {
				board[y][x] = 0;
			}
		}
		
		return board;
	}
	
	createPiece() {
		const index = Math.floor(Math.random() * 7);
		const type = 'IJLOSTZ'[index];
		const piece = { x: 0, y: 0};
		
		switch (type) {
			case 'I':
				piece.tetromino = [
					[0,0,0,0],
					[1,1,1,1],
					[0,0,0,0],
					[0,0,0,0]
				];
				break;
			case 'J':
				piece.tetromino = [
					[0,0,0],
					[2,2,2],
					[0,0,2]
				];
				break;
			case 'L':
				piece.tetromino = [
					[0,0,0],
					[3,3,3],
					[3,0,0]
				];
				break;
			case 'O':
				piece.tetromino = [
					[0,0,0,0],
					[0,4,4,0],
					[0,4,4,0],
					[0,0,0,0]
				];
				break;
			case 'S':
				piece.tetromino = [
					[0,0,0],
					[0,5,5],
					[5,5,0]
				];
				break;
			case 'T':
				piece.tetromino = [
					[0,0,0],
					[6,6,6],
					[0,6,0]
				];
				break;
			case 'Z':
				piece.tetromino = [
					[0,0,0],
					[7,7,0],
					[0,7,7]
				];
				break;
			default:
				throw new Error('Неизвестная фигура');
			
		}
		
		piece.x = Math.floor((10 - piece.tetromino[0].length) / 2);
		piece.y = -1;
		
		return piece;
	}
	
	movePieceLeft() {
		this.currentPiece.x -= 1;
		
		if (this.outOfBoardWithCollision()){
			this.currentPiece.x += 1;
		}
	}
	
	movePieceRight() {
		this.currentPiece.x += 1;
		
		if (this.outOfBoardWithCollision()){
			this.currentPiece.x -= 1;
		}
	}
	
	movePieceDown() {
		if (this.topOut) return;
		
		this.currentPiece.y += 1;
		
		if (this.outOfBoardWithCollision()){
			this.currentPiece.y -= 1;
			this.stopPiece();
			const fulledLines = this.fullLines();
			this.updateScore(fulledLines);
			this.updatePieces();
		}
		
		if (this.outOfBoardWithCollision()) {
			this.topOut = true;
		}
	}
	
	
	rotatePiece() {
		this.rotateTetromino();
		
		if (this.outOfBoardWithCollision()) {
			this.rotateTetromino(false);
		}
	}
	
	
	
	
	rotateTetromino(clockwise = true) {
		const tetromino = this.currentPiece.tetromino;
		const length = tetromino.length;
		const x = Math.floor(length / 2);
		const y = length - 1;
		
		for(let i = 0; i < x; i++){
			for(let j = i; j < y - i; j++){
				const temp = tetromino[i][j];
				
				if (clockwise){
					tetromino[i][j] = tetromino[y-j][i];
					tetromino[y-j][i] = tetromino[y-i][y-j];
					tetromino[y-i][y-j] = tetromino[j][y-i];
					tetromino[j][y-i] = temp;
				} else {
					tetromino[i][j] = tetromino[j][y-i];
					tetromino[j][y-i] = tetromino[y-i][y-j];
					tetromino[y-i][y-j] = tetromino[y-j][i];
					tetromino[y-j][i] = temp;
				}
			}
		}
	}
	
	
	
	
	
	
	outOfBoardWithCollision() {
		const { y: pieceY, x: pieceX, tetromino } = this.currentPiece;
		
		for (let y = 0; y < tetromino.length; y++)  {
			for (let x = 0; x < tetromino[y].length; x++){
				if (
					tetromino[y][x] && 
					((this.board[pieceY + y] === undefined || this.board[pieceY + y][pieceX + x] === undefined) ||
					this.board[pieceY + y][pieceX + x])
				) {
					return true;
				}
			}
			
		}
		
		return false;
		
	}
	
	stopPiece() {
		const { y: pieceY, x: pieceX, tetromino } = this.currentPiece;
		for (let y = 0; y < tetromino.length; y++)  {
			for (let x = 0; x < tetromino[y].length; x++){
					if(tetromino[y][x]) {
					this.board[pieceY + y][pieceX + x] = tetromino[y][x];
					}
			}
			
		}
	}
	
	fullLines() {
		const rows = 20;
		const columns = 10;
		let lines = [];
		
		for (let y = rows - 1; y >= 0 ; y--) {
			let numberOfTetromino = 0;
			
			for(let x = 0; x < columns; x++) {
				if(this.board[y][x]) {
					numberOfTetromino += 1;
				}
			}
			
			if(numberOfTetromino === 0) {
				break;
			} else if (numberOfTetromino < columns) {
					continue;
			} else if (numberOfTetromino === columns) {
				lines.unshift(y);
			}
		}
		
		for (let index of lines) {
			this.board.splice(index, 1);
			this.board.unshift(new Array(columns).fill(0));
		}
		
		return lines.length;
	}
	
	updateScore(fulledLines) {
		if (fulledLines > 0) {
			this.score += Game.points[fulledLines] * (this.level + 1);
			this.lines += fulledLines;
			
		}
	}
	
	updatePieces() {
		this.currentPiece = this.nextPiece;
		this.nextPiece = this.createPiece();
		
	}
}


