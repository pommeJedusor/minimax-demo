const Oxo = require("simple_tic_tac_toe_engine");

class Result{
  constructor(score, move){
    this.score = score;
    this.move = move;
  }
}

function get_hash(oxo){
  return oxo.getStringBoard();
}

function save_result(oxo, result){
  const hash = get_hash(oxo);
  transposition_table[hash] = result;
}

function get_result(oxo){
  const hash = get_hash(oxo);
  return transposition_table[hash];
}

function negamax(oxo, deep=1, alpha=-Infinity, beta=Infinity){
  // if current player just lost
  if (oxo.isWinning())return new Result(-(9-deep), null);
  // draw
  if (oxo.isFinished())return new Result(0, null);
  // transposition_table
  let transposition_table_result = get_result(oxo);
  if (transposition_table_result){
    // count the number of times we used the transposition table
    transposition_table_used_times++;
    alpha = Math.max(alpha, transposition_table_result.score);
  }

  let best_move = -1;
  let best_score = -Infinity;
  for (const move of oxo.getMoves()){
    oxo.makeMove(move);

    let result = negamax(oxo, deep+1, -beta, -alpha);
    let score = -result.score;

    if (score > best_score){
      best_score = score;
      best_move = move;
    }
    
    oxo.undoLastMove();

    // alpha-beta pruning
    alpha = Math.max(alpha, score);
    if (score >= beta){
      alpha_beta_usage++;
      break;
    }
  }

  let result = new Result(best_score, best_move);
  save_result(oxo, result);
  return result;
}

let oxo = new Oxo();
let transposition_table = {};
let transposition_table_used_times = 0;
let alpha_beta_usage = 0;
console.log(negamax(oxo));
console.log(`transposition table used ${transposition_table_used_times} times`);
console.log(`alpha-beta has been used ${alpha_beta_usage} times`);
