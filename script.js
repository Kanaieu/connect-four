// Game state
let board, arrowRow, previewRow;
let boardState = Array(6).fill(null).map(() => Array(7).fill(null));
let currentPlayer = 'player';
let gameOver = false;
let playerScore = 0;
let computerScore = 0;
let difficulty = 'easy';

// DOM elements
const turnIndicator = document.getElementById('turn-indicator');
const scoreboardPlayer = document.getElementById('player-score');
const scoreboardComputer = document.getElementById('computer-score');
const resetScoreBtn = document.getElementById('reset-score');
const modal = document.getElementById('modal');
const winnerMsg = document.getElementById('winner');
const playAgainBtn = document.getElementById('play-again');
const newGameBtn = document.getElementById('new-game');

// Custom dropdown elements
const difficultyButton = document.getElementById('difficulty-button');
const difficultyDropdown = document.getElementById('difficulty-dropdown');
const difficultyOptions = document.querySelectorAll('.select-option');

// Confirmation modal elements
const confirmModal = document.getElementById('confirm-modal');
const confirmTitle = document.getElementById('confirm-title');
const confirmMessage = document.getElementById('confirm-message');
const confirmYes = document.getElementById('confirm-yes');
const confirmNo = document.getElementById('confirm-no');

function createBoard() {
  board = document.getElementById('board');
  arrowRow = document.getElementById('arrow-row');
  previewRow = document.getElementById('preview-row');
  
  // Create arrow row
  for (let col = 0; col < 7; col++) {
    const arrow = document.createElement('div');
    arrow.classList.add('column-arrow');
    arrow.id = `arrow-${col}`;
    arrow.innerHTML = '↓';
    arrowRow.appendChild(arrow);
  }
  
  // Create preview row
  for (let col = 0; col < 7; col++) {
    const previewCell = document.createElement('div');
    previewCell.classList.add('preview-cell');
    previewCell.addEventListener('mouseenter', () => showColumnIndicators(col));
    previewCell.addEventListener('mouseleave', () => hideColumnIndicators(col));
    previewCell.addEventListener('click', () => dropToken(col));
    
    const previewCoin = document.createElement('div');
    previewCoin.classList.add('preview-coin', 'player');
    previewCoin.id = `preview-${col}`;
    
    previewCell.appendChild(previewCoin);
    previewRow.appendChild(previewCell);
  }
  
  // Create main board
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.createElement('div');
      cell.classList.add('token');
      cell.dataset.row = row;
      cell.dataset.col = col;
      board.appendChild(cell);
    }
  }
}

function showColumnIndicators(col) {
  if (gameOver || currentPlayer !== 'player') return;
  
  // Check if column is full
  const arrow = document.getElementById(`arrow-${col}`);
  const previewCoin = document.getElementById(`preview-${col}`);
  
  if (boardState[0][col] !== null) {
    // Column is full - show disabled state
    if (arrow) {
      arrow.classList.add('disabled');
      arrow.innerHTML = '✕';
    }
    return;
  }
  
  // Column is available - show active indicators
  if (arrow) {
    arrow.classList.add('show');
    arrow.classList.remove('disabled');
    arrow.innerHTML = '↓';
  }
  
  if (previewCoin) {
    previewCoin.classList.add('show');
  }
}

function hideColumnIndicators(col) {
  const arrow = document.getElementById(`arrow-${col}`);
  const previewCoin = document.getElementById(`preview-${col}`);
  
  if (arrow) {
    arrow.classList.remove('show', 'disabled');
  }
  
  if (previewCoin) {
    previewCoin.classList.remove('show');
  }
}

function hideAllIndicators() {
  for (let col = 0; col < 7; col++) {
    hideColumnIndicators(col);
  }
}

function dropToken(col) {
  if (gameOver || currentPlayer !== 'player') return;
  
  // Find the lowest available row in the column
  for (let row = 5; row >= 0; row--) {
    if (boardState[row][col] === null) {
      boardState[row][col] = currentPlayer;
      
      // Update the visual board
      const cellIndex = row * 7 + col;
      const cell = board.children[cellIndex];
      cell.classList.add(`${currentPlayer}-token`);
      
      hideAllIndicators();
      
      if (checkWin(row, col)) {
        if (currentPlayer === 'player') {
          playerScore++;
        } else {
          computerScore++;
        }
        updateScoreboard();
        showWinner('Player');
        return;
      }
      
      if (checkDraw()) {
        showWinner('Draw');
        return;
      }
      
      currentPlayer = 'computer';
      updateTurnIndicator();
      
      setTimeout(() => {
        computerMove();
      }, 1000);
      
      return;
    }
  }
}

function computerMove() {
  if (gameOver) return;
  
  updateTurnIndicator('thinking');
  
  setTimeout(() => {
    let col;
    
    if (difficulty === 'medium') {
      col = getBestMove();
    } else {
      // Easy difficulty - random move
      const availableCols = [];
      for (let c = 0; c < 7; c++) {
        if (boardState[0][c] === null) {
          availableCols.push(c);
        }
      }
      col = availableCols[Math.floor(Math.random() * availableCols.length)];
    }
    
    if (col !== undefined) {
      // Find the lowest available row in the column
      for (let row = 5; row >= 0; row--) {
        if (boardState[row][col] === null) {
          boardState[row][col] = currentPlayer;
          
          // Update the visual board
          const cellIndex = row * 7 + col;
          const cell = board.children[cellIndex];
          cell.classList.add(`${currentPlayer}-token`);
          
          if (checkWin(row, col)) {
            computerScore++;
            updateScoreboard();
            showWinner('Computer');
            return;
          }
          
          if (checkDraw()) {
            showWinner('Draw');
            return;
          }
          
          currentPlayer = 'player';
          updateTurnIndicator();
          break;
        }
      }
    }
  }, 1000);
}

function getBestMove() {
  // Check for winning move
  for (let col = 0; col < 7; col++) {
    if (boardState[0][col] === null) {
      const row = getLowestRow(col);
      if (row !== -1) {
        boardState[row][col] = 'computer';
        if (checkWin(row, col)) {
          boardState[row][col] = null;
          return col;
        }
        boardState[row][col] = null;
      }
    }
  }
  
  // Check for blocking player's winning move
  for (let col = 0; col < 7; col++) {
    if (boardState[0][col] === null) {
      const row = getLowestRow(col);
      if (row !== -1) {
        boardState[row][col] = 'player';
        if (checkWin(row, col)) {
          boardState[row][col] = null;
          return col;
        }
        boardState[row][col] = null;
      }
    }
  }
  
  // Otherwise, choose center columns preferentially
  const preferredCols = [3, 2, 4, 1, 5, 0, 6];
  for (let col of preferredCols) {
    if (boardState[0][col] === null) {
      return col;
    }
  }
  
  return 0;
}

function getLowestRow(col) {
  for (let row = 5; row >= 0; row--) {
    if (boardState[row][col] === null) {
      return row;
    }
  }
  return -1;
}

function checkWin(row, col) {
  const player = boardState[row][col];
  
  // Check horizontal
  let count = 1;
  // Check left
  for (let c = col - 1; c >= 0 && boardState[row][c] === player; c--) {
    count++;
  }
  // Check right
  for (let c = col + 1; c < 7 && boardState[row][c] === player; c++) {
    count++;
  }
  if (count >= 4) return true;
  
  // Check vertical
  count = 1;
  // Check down
  for (let r = row + 1; r < 6 && boardState[r][col] === player; r++) {
    count++;
  }
  if (count >= 4) return true;
  
  // Check diagonal (top-left to bottom-right)
  count = 1;
  // Check up-left
  for (let r = row - 1, c = col - 1; r >= 0 && c >= 0 && boardState[r][c] === player; r--, c--) {
    count++;
  }
  // Check down-right
  for (let r = row + 1, c = col + 1; r < 6 && c < 7 && boardState[r][c] === player; r++, c++) {
    count++;
  }
  if (count >= 4) return true;
  
  // Check diagonal (top-right to bottom-left)
  count = 1;
  // Check up-right
  for (let r = row - 1, c = col + 1; r >= 0 && c < 7 && boardState[r][c] === player; r--, c++) {
    count++;
  }
  // Check down-left
  for (let r = row + 1, c = col - 1; r < 6 && c >= 0 && boardState[r][c] === player; r++, c--) {
    count++;
  }
  if (count >= 4) return true;
  
  return false;
}

function checkDraw() {
  for (let col = 0; col < 7; col++) {
    if (boardState[0][col] === null) {
      return false;
    }
  }
  return true;
}

function updateTurnIndicator(state = null) {
  if (gameOver) {
    turnIndicator.textContent = 'Game Over';
    turnIndicator.className = '';
    return;
  }
  
  if (state === 'thinking') {
    turnIndicator.textContent = 'Computer Thinking...';
    turnIndicator.className = 'computer-turn thinking';
    return;
  }
  
  if (currentPlayer === 'player') {
    turnIndicator.textContent = 'Player Move';
    turnIndicator.className = 'player-turn';
  } else {
    turnIndicator.textContent = 'Computer Move';
    turnIndicator.className = 'computer-turn';
  }
}

function updateScoreboard() {
  scoreboardPlayer.textContent = `Player: ${playerScore}`;
  scoreboardComputer.textContent = `Computer: ${computerScore}`;
}

function showWinner(winner) {
  gameOver = true;
  updateTurnIndicator();
  if (winner === 'Draw') {
    winnerMsg.textContent = "It's a Draw!";
  } else {
    winnerMsg.textContent = `Winner: ${winner}`;
  }
  modal.style.display = 'flex';
}

function resetGame() {
  boardState = Array(6).fill(null).map(() => Array(7).fill(null));
  currentPlayer = 'player';
  gameOver = false;
  modal.style.display = 'none';
  
  // Reset all board cells to default token state
  const cells = board.children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].className = 'token'; // Reset to default token class only
    cells[i].style.transform = ''; // Clear any transform
  }
  
  hideAllIndicators();
  updateTurnIndicator();
}

function resetScore() {
  showConfirmDialog(
    'Reset Score',
    'Are you sure you want to reset the score? This will start a new game.',
    () => {
      playerScore = 0;
      computerScore = 0;
      updateScoreboard();
      resetGame();
    }
  );
}

function startNewGame() {
  playerScore = 0;
  computerScore = 0;
  updateScoreboard();
  resetGame();
  modal.style.display = 'none';
}

function changeDifficulty() {
  // This function is now handled by the custom dropdown
  // Keep it for compatibility but it won't be used
}

function showConfirmDialog(title, message, onConfirm) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  confirmModal.style.display = 'flex';
  
  // Remove previous event listeners to avoid duplicates
  const newConfirmYes = confirmYes.cloneNode(true);
  const newConfirmNo = confirmNo.cloneNode(true);
  confirmYes.parentNode.replaceChild(newConfirmYes, confirmYes);
  confirmNo.parentNode.replaceChild(newConfirmNo, confirmNo);
  
  // Add new event listeners
  newConfirmYes.addEventListener('click', () => {
    confirmModal.style.display = 'none';
    onConfirm();
  });
  
  newConfirmNo.addEventListener('click', () => {
    confirmModal.style.display = 'none';
  });
}

// Initialize the game
createBoard();
updateTurnIndicator();
updateScoreboard();

// Custom dropdown functionality
difficultyButton.addEventListener('click', (e) => {
  e.stopPropagation();
  difficultyDropdown.classList.toggle('show');
  difficultyButton.classList.toggle('open');
});

difficultyOptions.forEach(option => {
  option.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Remove selected class from all options
    difficultyOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    option.classList.add('selected');
    
    // Update button text and difficulty
    difficultyButton.textContent = option.textContent;
    difficulty = option.dataset.value;
    
    // Close dropdown
    difficultyDropdown.classList.remove('show');
    difficultyButton.classList.remove('open');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-select')) {
    difficultyDropdown.classList.remove('show');
    difficultyButton.classList.remove('open');
  }
});

// Event listeners
playAgainBtn.addEventListener('click', () => {
  resetGame();
});
newGameBtn.addEventListener('click', () => {
  startNewGame();
});
resetScoreBtn.addEventListener('click', resetScore);

// Prevent modal from closing on outside click during game over
window.onclick = function(event) {
  // Only allow closing confirm modal by clicking outside
  if (event.target === confirmModal) {
    confirmModal.style.display = 'none';
  }
}
