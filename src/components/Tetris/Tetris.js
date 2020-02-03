import React, { useState } from "react";

import { createStage, checkCollision } from "../../gameHelpers";

// Custom hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";

// Components
import Stage from "../Stage/Stage.js";
import Display from "../Display/Display.js";
import StartButton from "../StartButton/StartButton.js";

// Styled components
import { StyledTetrisWrapper, StyledTetris } from "./Tetris.styles";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayerHorizontal = dir => {
    if(!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0})
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, {x: 0, y: 1})) {
      updatePlayerPos({ x: 0, y: 1, collided: false})
    } else {
      // Game over
      if (player.pos.y < 1) {
        console.log("Game over");
        setGameOver(true);
        setDropTime(null);
      }
      
      updatePlayerPos({ x: 0, y: 0, collided: true})
    }
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      switch (keyCode) {
        case 37:
          movePlayerHorizontal(-1)
          break;
        case 39:
          movePlayerHorizontal(1);
          break;
        case 40:
          dropPlayer();
      }
    }
  };

  console.log("re-render");
  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton clickHandle={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
