
//players: first = x, val = 5;
		 //second = o, val 3
//board: len = 9, board[i] = 0 if empty, 
                           //= 5 if first,
                           //= 3 IF second;

let vectors = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let board = [0,0,0,0,0,0,0,0,0];
let isFirstMove = true;
// let log = [{player: 5, firstMove: 0, moves: []}, {player: 5, firstMove: 0, moves: []}];


//vector's value = sum of 0||3||5||'s 
let findVectorValue = (vector) => {
	let sum = 0;
	for(let i = 0; i < vector.length; i++){
		let e = board[vector[i]];
		sum += e;
	};
	return sum;
};

//returns 0 if not, 1 if first won, 2 if second won, 3 if draw
let checkIfFinish = () => {
	let numberOfAviableVectors = 0;
	for (let i = 0; i < vectors.length; i++){
		let v = vectors[i];
		let value = findVectorValue(v);
		let isAviable = !((value === 6 && isFirstMove) || (value === 10 && !isFirstMove) || value === 8 || value === 13 || value === 11);

		numberOfAviableVectors += isAviable ? 1 : 0;
		if(value === 15){
			return 1;
		}
		if(value === 9){
			return 2;
		}
	}
	if( !numberOfAviableVectors){
		return 3;
	}
	return 0;
};


//returns an array of empty cells
let getAviableCells = () => {
	let result = [];
	for (let i = 0; i < board.length; i++){
		board[i] || result.push(i);
	}
	console.log(result);
	return result;
};

//chooses random cell
let getRandomCellIndex = () => {
	let cells = getAviableCells();
	console.log(cells[Math.floor(Math.random() * cells.length)]);
	return cells[Math.floor(Math.random() * cells.length)];
};


let finishGame = () => {
	board = [0,0,0,0,0,0,0,0,0];

};

//recursive function that triggers automatic moves
let move = (isFirstMove) => {
	let isFinish = checkIfFinish();
	if(isFinish){
		finishGame();
		return isFinish;
	}

	let currentPlayerVal = isFirstMove ? 3 : 5;
	

	let index = getRandomCellIndex();
	board[index] = currentPlayerVal;
	return move(isFirstMove ? false : true);
};