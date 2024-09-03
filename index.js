const Oxo = require("simple_tic_tac_toe_engine");

class Result{
  constructor(score, move){
    this.score = score;
    this.move = move;
  }
}

function negamax(oxo, deep=1){
  // if current player just lost
  if (oxo.isWinning())return new Result(-(9-deep), null);
  // draw
  if (oxo.isFinished())return new Result(0, null);

  let best_move = -1;
  let best_score = -Infinity;
  for (const move of oxo.getMoves()){
    oxo.makeMove(move);

    let result = negamax(oxo, deep+1);
    result.score = -result.score;

    if (result.score > best_score){
      best_score = result.score;
      best_move = move;
    }
    
    oxo.undoLastMove();
  }

  return new Result(best_score, best_move);
}

let oxo = new Oxo();
console.log(negamax(oxo));
