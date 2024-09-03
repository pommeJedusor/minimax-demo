# setup
```bash
npm install
```

## 1. classical minimax version
```bash
git checkout b107dd9
```
the maximizer and the minimizer play turn by turn,

the goal of the maximizer is to maximize the score of its position which is to say get the best position he can.

the goal of the minimizer is to minimize the score of the other's position which is to say get him the worst position he can.

## 2. negamax version
```bash
git checkout 8a0b959
```
this version understands that both player seek to accomplish the same goal so instead of having one that maximizes and the others minimizes,

this version just make them optimize the position for them inversing the value of the position at each level because if it's good for one player it's bad for the other.

## 3. transposition table
```bash
git checkout 1d915cb
```
this version implements the transposition table

which will each time a position has been solved store its score in a hashtable

and each time that we get a position we'll look in the hashtable if the position has already been solved and if it's the case then just return the score.

the big advantage of the hashtable is that it allows us to get the result in an O(1) time which is to say it will be really fast wether there is a lot of position in it or not.

## 4. alpha-beta pruning (without transposition table)
```bash
git checkout 33a55f2
```
this version can be a bit harder to get his head around.

its goal is to not explore some moves that we can know for sure won't influence the score in anyway

let's say that a player has two moves a and b, if he plays a then player 2 can player either a¹ or a² which would give a score of respectively 3 and 4
then we examine the move b and we see that if player 2 plays b¹ we get a score of 2 therefor we can deduce that the best move for player 1 is a because it will get him score of 3 with perfect play whereas b will get him a score of max 2 with perfect play. alpha beta will store those values to avoid computing unnecessary moves.

## 5. alpha-beta pruning with transposition table
```bash
git checkout 6cc16bd
```
when we try to mix alpha-beta and transposition tables it can be a bit tricky because as we saw with the alpha-beta pruning algorithm we don't always solve positions in an absolute way but relativly to a context so a position might be solve in a given context but not another.

So we'll still store the score that we get when we solve a position because it will be a score that we can get for sure (even if sometimes we will be able to get a better one) and instead of returning it we will use it as the alpha, that will allows us to prune moves that we can know for sure aren't gonna be better that the one we got from the transposition table.
