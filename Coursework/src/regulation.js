export default class Regulation {
	constructor(game, view) {
		this.game = game;
		this.view = view;
		this.intervalId = null;
		this.isRunning = false;
		this.check = null;
	 
		
		document.addEventListener('keydown', this.copeKeyDown.bind(this));
		document.addEventListener('keyup', this.copeKeyUp.bind(this));
		
		this.view.displayStartMenu();
		
	}
	
	update() {
		this.game.movePieceDown();
		this.updateView();
	}
	
	play() {
		this.isRunning = true;
		this.timerStart();
		this.updateView();
		this.disableSpace = null;
	}
	
	pause() {
		this.isRunning = false;
		this.timerStop();
		this.updateView();
		
	}
	
	restart() {
		this.game.restart();
		this.play();
	}
	
	updateView() {
		const stat = this.game.recStat();
		if (stat.isGameOver) {
			this.view.displayGameOverMenu(stat);
			this.disableSpace = 1;
			
		} else if (!this.isRunning) {
			this.view.displayPauseMenu();
			
		} else {
			this.view.displayMainMenu(stat);
			
		}
		
	}
	
	

	timerStart() {
		const speed = 1000 - this.game.recStat().level * 100;
		
		if (!this.intervalId) {
			this.intervalId = setInterval(() => {
				this.update();
			}, speed > 0 ? speed : 100);
		}
	}
	
	timerStop () {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}
	
	copeKeyDown(event) {
		const stat = this.game.recStat();
		
		switch (event.keyCode) {
		case 13: //Enter
			if(!this.isRunning && this.check === null) {
				this.play();
			}
			this.check = 1;
			break;
		case 32: //Space
			if (this.disableSpace === null) {
				if(this.isRunning) {
					this.pause();
				} else {
					if(!this.isRunning && this.check === 1) {
						this.play();
					}
				}
			}
			break;
		case 37: // Left arrow
			if(this.isRunning) {
				this.game.movePieceLeft();
				this.updateView();
			}
			break;
		case 38: //Up arrow
			if(this.isRunning) {
				this.game.rotatePiece();
				this.updateView();
			}
			break;
		case 39: //Right arrow
			if(this.isRunning) {
				this.game.movePieceRight();
				this.updateView();
			}
			break;
		case 40: //Down arrow
				
				if(this.isRunning ) {
					//this.timerStop();
					this.game.movePieceDown();
					this.updateView();
				}
			
			break;
		case 82: //R
			if(this.isRunning) {
				if (stat.isGameOver) {
					this.restart();
				}
			}
			break;
		}
	}
	
	copeKeyUp(event) {
		switch (event.keyCode) {
			case 40: //Down arrow
					this.timerStart();
				break;
		}
	}
}