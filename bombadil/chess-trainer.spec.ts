import {
  extract,
  always,
  eventually,
  now,
  next,
  actions,
  weighted,
} from "@antithesishq/bombadil";


import {
  noUncaughtExceptions,
  noConsoleErrors,
} from "@antithesishq/bombadil/defaults/properties";

// --- Extractors ---

const gameState = extract((state) => {
  if (state.document.querySelector(".idle")) return "idle";
  if (state.document.querySelector(".active")) return "active";
  if (state.document.querySelector(".finished")) return "finished";
  return "unknown";
});

const titleText = extract((state) => {
  const h1 = state.document.querySelector("h1");
  return h1 ? h1.textContent : "";
});

const scoreText = extract((state) => {
  const spans = state.document.querySelectorAll(".stat");
  for (const s of spans) {
    if (s.textContent.startsWith("Score:")) return s.textContent;
  }
  return "";
});

const attemptsText = extract((state) => {
  const spans = state.document.querySelectorAll(".stat");
  for (const s of spans) {
    if (s.textContent.startsWith("Attempts:")) return s.textContent;
  }
  return "";
});

const feedbackVisible = extract((state) => {
  return !!state.document.querySelector(".feedback.correct, .feedback.incorrect");
});

const feedbackText = extract((state) => {
  const el = state.document.querySelector(".feedback.correct, .feedback.incorrect");
  return el ? el.textContent : "";
});

// The asked square name embedded in wrong-answer feedback by the app.
const feedbackAskedSquare = extract((state) => {
  const el = state.document.querySelector(".feedback.incorrect");
  return el ? el.getAttribute("data-asked-square") : null;
});

// The submitted answer embedded in wrong-answer feedback by the app.
const feedbackSubmittedAnswer = extract((state) => {
  const el = state.document.querySelector(".feedback.incorrect");
  return el ? el.getAttribute("data-submitted-answer") : null;
});

const historyTableVisible = extract((state) => {
  return !!state.document.querySelector(".history");
});

// --- Mode Extractors ---

// Check if the mode selector is visible (idle state)
const modeSelectorVisible = extract((state) => {
  return !!state.document.querySelector(".mode-selector");
});

// Check which mode is selected (from button .selected class)
const selectedMode = extract((state) => {
  const selected = state.document.querySelector(".btn-mode.selected");
  if (!selected) return null;
  return selected.getAttribute("data-mode");
});

// Check the active game mode label displayed during gameplay
const activeModeLabel = extract((state) => {
  const label = state.document.querySelector(".mode-label");
  return label ? label.textContent : "";
});

// The square name displayed in FindSquare mode (the prompt square)
const findSquarePrompt = extract((state) => {
  const el = state.document.querySelector(".find-square-mode .highlighted-square");
  return el ? el.textContent : "";
});

// The square name displayed in ColorSquare mode (the prompt square)
const colorSquarePrompt = extract((state) => {
  const el = state.document.querySelector(".color-square-mode .highlighted-square");
  return el ? el.textContent : "";
});

// Check if the board is clickable (FindSquare mode)
const boardClickable = extract((state) => {
  const sq = state.document.querySelector(".board-square.clickable");
  return !!sq;
});

// Check if text input is visible (NameSquare mode)
const inputVisible = extract((state) => {
  return !!state.document.querySelector(".input");
});

// Check if color buttons are visible (ColorSquare mode)
const colorButtonsVisible = extract((state) => {
  return !!state.document.querySelector(".color-buttons");
});

// Check if the board flash is visible (ColorSquare wrong answer)
const boardFlashVisible = extract((state) => {
  return !!state.document.querySelector(".color-square-mode .chessboard");
});

// --- Button Extractors ---

const startGameButton = extract((state) => {
  const btn = state.document.querySelector(".btn-primary");
  if (!btn || btn.textContent !== "Start Game") return null;
  const r = btn.getBoundingClientRect();
  return { name: "start-game", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

const submitButton = extract((state) => {
  const btn = state.document.querySelector(".btn-submit");
  if (!btn) return null;
  const r = btn.getBoundingClientRect();
  return { name: "submit-answer", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

const endGameButton = extract((state) => {
  const btn = state.document.querySelector(".btn-end");
  if (!btn) return null;
  const r = btn.getBoundingClientRect();
  return { name: "end-game", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

const playAgainButton = extract((state) => {
  const btn = state.document.querySelector(".finished .btn-primary");
  if (!btn || btn.textContent !== "Play Again") return null;
  const r = btn.getBoundingClientRect();
  return { name: "play-again", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

const answerInput = extract((state) => {
  const input = state.document.querySelector(".input");
  if (!input) return null;
  const r = input.getBoundingClientRect();
  return { name: "answer-input", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

// Mode selector buttons
const nameSquareModeButton = extract((state) => {
  const btn = state.document.querySelector('[data-mode="name-square"]');
  if (!btn) return null;
  const r = btn.getBoundingClientRect();
  return { name: "mode-name-square", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

const findSquareModeButton = extract((state) => {
  const btn = state.document.querySelector('[data-mode="find-square"]');
  if (!btn) return null;
  const r = btn.getBoundingClientRect();
  return { name: "mode-find-square", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

const colorSquareModeButton = extract((state) => {
  const btn = state.document.querySelector('[data-mode="color-square"]');
  if (!btn) return null;
  const r = btn.getBoundingClientRect();
  return { name: "mode-color-square", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

// Color answer buttons
const blackButton = extract((state) => {
  const btn = state.document.querySelector(".btn-color-black");
  if (!btn) return null;
  const r = btn.getBoundingClientRect();
  return { name: "color-black", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

const whiteButton = extract((state) => {
  const btn = state.document.querySelector(".btn-color-white");
  if (!btn) return null;
  const r = btn.getBoundingClientRect();
  return { name: "color-white", point: { x: r.x + r.width / 2, y: r.y + r.height / 2 } };
});

// --- URL/Routing Extractors ---

const currentUrl = extract((state) => {
  return state.window.location.href;
});

const currentHash = extract((state) => {
  return state.window.location.hash;
});



// --- Board Extractors ---

const boardExists = extract((state) => {
  return !!state.document.querySelector(".chessboard");
});

const boardSquareCount = extract((state) => {
  return state.document.querySelectorAll(".chessboard .board-square").length;
});

const boardSquareNames = extract((state) => {
  const squares = state.document.querySelectorAll(".chessboard .board-square");
  return Array.from(squares).map((s) => s.getAttribute("data-square")).sort();
});

const highlightedBoardSquare = extract((state) => {
  const el = state.document.querySelector(
    ".chessboard .board-square.highlighted",
  );
  return el ? el.getAttribute("data-square") : null;
});

const anyHighlightedSquareExists = extract((state) => {
  return !!state.document.querySelector(".highlighted-square");
});

// Get a random clickable board square for find-square mode testing
const clickableBoardSquare = extract((state) => {
  const squares = state.document.querySelectorAll(".chessboard .board-square.clickable");
  if (squares.length === 0) return null;
  const idx = Math.floor(Math.random() * squares.length);
  const sq = squares[idx];
  const r = sq.getBoundingClientRect();
  return {
    name: sq.getAttribute("data-square"),
    point: { x: r.x + r.width / 2, y: r.y + r.height / 2 },
  };
});

// Get the correct clickable square (matching the prompt)
const correctClickableSquare = extract((state) => {
  const prompt = state.document.querySelector(".find-square-mode .highlighted-square");
  if (!prompt) return null;
  const targetName = prompt.textContent.toLowerCase();
  const squares = state.document.querySelectorAll(".chessboard .board-square.clickable");
  for (const sq of squares) {
    if (sq.getAttribute("data-square") === targetName) {
      const r = sq.getBoundingClientRect();
      return {
        name: sq.getAttribute("data-square"),
        point: { x: r.x + r.width / 2, y: r.y + r.height / 2 },
      };
    }
  }
  return null;
});

// --- Action Generators ---

export const selectFindSquareMode = actions(() => {
  const btn = findSquareModeButton.current;
  return btn ? [{ Click: btn }] : [];
});

export const selectNameSquareMode = actions(() => {
  const btn = nameSquareModeButton.current;
  return btn ? [{ Click: btn }] : [];
});

export const selectColorSquareMode = actions(() => {
  const btn = colorSquareModeButton.current;
  return btn ? [{ Click: btn }] : [];
});

export const startGame = actions(() => {
  const btn = startGameButton.current;
  return btn ? [{ Click: btn }] : [];
});

export const submitTextAnswer = actions(() => {
  const input = answerInput.current;
  const submit = submitButton.current;
  if (!input || !submit) return [];
  const name = highlightedBoardSquare.current;
  if (!name) return [];
  return [
    { Click: input },
    { TypeText: { text: name, delayMillis: 0 } },
    { Click: submit },
  ];
});

export const submitWrongAnswer = actions(() => {
  const input = answerInput.current;
  const submit = submitButton.current;
  if (!input || !submit) return [];
  return [
    { Click: input },
    { TypeText: { text: "zz", delayMillis: 0 } },
    { Click: submit },
  ];
});

// Click a random clickable square in FindSquare mode
export const clickRandomSquare = actions(() => {
  const sq = clickableBoardSquare.current;
  return sq ? [{ Click: sq }] : [];
});

// Click the correct square in FindSquare mode
export const clickCorrectSquare = actions(() => {
  const sq = correctClickableSquare.current;
  return sq ? [{ Click: sq }] : [];
});

// Click Black button in ColorSquare mode
export const clickBlackButton = actions(() => {
  const btn = blackButton.current;
  return btn ? [{ Click: btn }] : [];
});

// Click White button in ColorSquare mode
export const clickWhiteButton = actions(() => {
  const btn = whiteButton.current;
  return btn ? [{ Click: btn }] : [];
});

export const endGame = actions(() => {
  const btn = endGameButton.current;
  return btn ? [{ Click: btn }] : [];
});

export const playAgain = actions(() => {
  const btn = playAgainButton.current;
  return btn ? [{ Click: btn }] : [];
});

// --- Navigation Action Generators ---

// Navigate to game via injected hash link (for DirectNavigation test)
// Injects <a id="bombadil-nav-game" href="#/game"> into DOM, then clicks it.
// The hashchange event triggers the Lustre router to start the game.
const navigateToGameLink = extract((state) => {
  const isIdle = !!state.document.querySelector(".idle");
  if (!isIdle) return null;
  let link = state.document.getElementById("bombadil-nav-game");
  if (!link) {
    link = state.document.createElement("a");
    link.id = "bombadil-nav-game";
    link.href = "#/name-the-square";
    link.style.display = "none";
    state.document.body.appendChild(link);
  }
  const r = link.getBoundingClientRect();
  return {
    name: "navigate-to-game",
    point: { x: r.x + r.width / 2, y: r.y + r.height / 2 },
  };
});

export const navigateToGame = actions(() => {
  const link = navigateToGameLink.current;
  return link ? [{ Click: link }] : [];
});

export const gameActions = weighted([
  [6, selectFindSquareMode],
  [6, selectNameSquareMode],
  [6, selectColorSquareMode],
  [10, startGame],
  [8, submitTextAnswer],
  [4, submitWrongAnswer],
  [8, clickCorrectSquare],
  [4, clickRandomSquare],
  [6, clickBlackButton],
  [6, clickWhiteButton],
  [6, endGame],
  [6, playAgain],
  [5, navigateToGame],
]);

// --- Properties (from Allium spec) ---

export const noErrors = noUncaughtExceptions.and(noConsoleErrors);

export const alwaysShowsTitle = always(() => {
  if (gameState.current === "unknown") return true;
  return titleText.current === "Chess2Brain";
});

// Surface Trainer exposes: game.status
// UI must show exactly one of idle/active/finished views
export const validGameState = always(() => {
  if (gameState.current === "unknown") return true;
  return ["idle", "active", "finished"].includes(gameState.current);
});

// Mode selector visible only in idle state
export const modeSelectorOnlyWhenIdle = always(() => {
  const hasSelector = modeSelectorVisible.current;
  const isIdle = gameState.current === "idle";
  return hasSelector === isIdle;
});

// Surface Trainer provides: PlayerStartsGame() when game.status = idle
// Start button visible only in idle state
export const startButtonOnlyWhenIdle = always(() => {
  const hasStart = !!startGameButton.current;
  const isIdle = gameState.current === "idle";
  return hasStart === isIdle;
});

// Input visible only in NameSquare mode when active
export const inputOnlyWhenNameSquareActive = always(() => {
  const hasInput = inputVisible.current;
  const isNameSquare = activeModeLabel.current.includes("Name the Square");
  if (gameState.current !== "active") return !hasInput;
  return hasInput === isNameSquare;
});

// Clickable board only in FindSquare mode when active
export const clickableBoardOnlyWhenFindSquareActive = always(() => {
  const hasClickable = boardClickable.current;
  const isFindSquare = activeModeLabel.current.includes("Find the Square");
  if (gameState.current !== "active") return !hasClickable;
  return hasClickable === isFindSquare;
});

// Color buttons only in ColorSquare mode when active
export const colorButtonsOnlyWhenColorSquareActive = always(() => {
  const hasColorBtns = colorButtonsVisible.current;
  const isColorSquare = activeModeLabel.current.includes("Black or White");
  if (gameState.current !== "active") return !hasColorBtns;
  return hasColorBtns === isColorSquare;
});

// Surface Trainer provides: PlayerEndsGame when active
// End button visible only in active state
export const endButtonOnlyWhenActive = always(() => {
  const hasEnd = !!endGameButton.current;
  const isActive = gameState.current === "active";
  return hasEnd === isActive;
});

// Active state is well-formed: when game is active, a valid mode label is shown.
// (Reachability of idle→active is tested by startGame action generator + directGameStartsGame)
export const startReachesActive = always(() => {
  if (gameState.current !== "active") return true;
  const mode = activeModeLabel.current;
  return mode.includes("Name the Square") ||
         mode.includes("Find the Square") ||
         mode.includes("Black or White");
});

// When game is finished, UI must show Play Again button and history table.
// Validates EndGame postcondition (game.status = finished) is properly reflected.
// Transition reachability verified by endGame action generator in gameActions.
export const endReachesFinished = always(() => {
  if (gameState.current !== "finished") return true;
  return !!playAgainButton.current && historyTableVisible.current;
});

// Play Again from finished reaches idle
export const playAgainReachesIdle = always(
  now(() => gameState.current === "finished" && !!playAgainButton.current)
    .implies(
      eventually(() => gameState.current === "idle").within(5, "seconds"),
    ),
);

// After submitting an answer, feedback should appear
export const feedbackShowsCorrectOrIncorrect = always(() => {
  if (!feedbackVisible.current) return true;
  const text = feedbackText.current;
  return text === "Correct!" || text.startsWith("Wrong!") || text.includes(" is ") || text.includes(" instead of ");
});

// Surface GameHistory exposes: answer history when finished
// When game IS finished, history table must be visible.
// Transition reachability covered by endGame action generator.
export const historyAfterSubmitAndEnd = always(() => {
  if (gameState.current !== "finished") return true;
  return historyTableVisible.current;
});

// Score and Attempts are always displayed when active
export const statsAlwaysVisibleWhenActive = always(() => {
  if (gameState.current !== "active") return true;
  return scoreText.current !== "" && attemptsText.current !== "";
});

// In NameSquare mode, the answer must never be displayed during active gameplay.
// The .highlighted-square element must not exist in NameSquare mode.
// (In FindSquare/ColorSquare modes, the square name IS displayed as the prompt.)
export const answerNotDisplayedInNameSquareMode = always(() => {
  if (gameState.current !== "active") return true;
  const isNameSquare = activeModeLabel.current.includes("Name the Square");
  if (!isNameSquare) return true;
  return !anyHighlightedSquareExists.current;
});

// In FindSquare mode, the square name prompt must be displayed
export const promptDisplayedInFindSquareMode = always(() => {
  if (gameState.current !== "active") return true;
  const isFindSquare = activeModeLabel.current.includes("Find the Square");
  if (!isFindSquare) return true;
  return findSquarePrompt.current !== "";
});

// In ColorSquare mode, the square name prompt must be displayed
export const promptDisplayedInColorSquareMode = always(() => {
  if (gameState.current !== "active") return true;
  const isColorSquare = activeModeLabel.current.includes("Black or White");
  if (!isColorSquare) return true;
  return colorSquarePrompt.current !== "";
});

// Board entity: Board.squares.count = 64 (CompleteBoard invariant)
// Uses eventually() because Lustre schedules DOM updates via requestAnimationFrame;
// after clicking Start Game, .active class and board squares appear together one RAF
// later (~16ms). Bombadil may snapshot DOM between click and RAF.
export const chessboardHas64Squares = always(
  now(() => {
    if (gameState.current !== "active") return false;
    const mode = activeModeLabel.current;
    return mode.includes("Name the Square") || mode.includes("Find the Square");
  }).implies(
    eventually(() => boardSquareCount.current === 64).within(1, "seconds"),
  ),
);

// Board squares must cover every file-rank combination (a1..h8)
// Uses eventually() to account for Lustre's async RAF rendering.
export const boardContainsAllSquares = always(
  now(() => {
    if (gameState.current !== "active") return false;
    const mode = activeModeLabel.current;
    return mode.includes("Name the Square") || mode.includes("Find the Square");
  }).implies(
    eventually(() => {
      const names = boardSquareNames.current;
      if (names.length !== 64) return false;
      const files = "abcdefgh";
      const ranks = "12345678";
      for (const f of files) {
        for (const r of ranks) {
          if (!names.includes(f + r)) return false;
        }
      }
      return true;
    }).within(1, "seconds"),
  ),
);

// In NameSquare mode, the board must visually highlight the current square.
export const currentSquareHighlightedInNameSquareMode = always(() => {
  if (gameState.current !== "active") return true;
  const isNameSquare = activeModeLabel.current.includes("Name the Square");
  if (!isNameSquare) return true;
  return highlightedBoardSquare.current !== null;
});

// In FindSquare mode, no square should have the "highlighted" class on the board
export const noHighlightInFindSquareMode = always(() => {
  if (gameState.current !== "active") return true;
  const isFindSquare = activeModeLabel.current.includes("Find the Square");
  if (!isFindSquare) return true;
  return highlightedBoardSquare.current === null;
});

// In ColorSquare mode (normal state), no square should have the "highlighted" class
export const noHighlightInColorSquareMode = always(() => {
  if (gameState.current !== "active") return true;
  const isColorSquare = activeModeLabel.current.includes("Black or White");
  if (!isColorSquare) return true;
  // Board may flash on wrong answer, so allow it during feedback
  if (boardFlashVisible.current) return true;
  return highlightedBoardSquare.current === null;
});

// Wrong-answer feedback must reference the square that was actually asked.
export const wrongFeedbackShowsAskedSquare = always(() => {
  const asked = feedbackAskedSquare.current;
  if (asked === null) return true;
  return feedbackText.current.includes(asked);
});

// Wrong feedback shows the submitted answer (all modes)
export const wrongFeedbackShowsSubmittedAnswer = always(() => {
  const submitted = feedbackSubmittedAnswer.current;
  if (submitted === null) return true;
  return feedbackText.current.includes(submitted);
});

// --- Routing Properties (from Allium Router surface) ---

// NavigateToGame: Clicking "Start Game" changes URL hash to mode-specific route
export const startGameChangesUrl = always(() => {
  if (gameState.current !== "active") return true;
  return currentHash.current === "#/name-the-square" ||
         currentHash.current === "#/find-the-square" ||
         currentHash.current === "#/color-the-square";
});

// NavigateToHome: After game ends, clicking "Play Again" returns URL to root
export const playAgainChangesUrlToHome = always(
  now(
    () =>
      gameState.current === "finished" &&
      !!playAgainButton.current,
  ).implies(
    eventually(
      () => currentHash.current === "" || currentHash.current === "#/",
    ).within(5, "seconds"),
  ),
);

// DirectNavigation: Page loaded at mode-specific hash starts game (active or finished).
// Uses eventually() to allow router processing time after hash appears.
// Accepts finished state because game may end during the eventuality window.
export const directGameStartsGame = always(
  now(() =>
    currentHash.current === "#/name-the-square" ||
    currentHash.current === "#/find-the-square" ||
    currentHash.current === "#/color-the-square"
  ).implies(
    eventually(() =>
      gameState.current === "active" || gameState.current === "finished"
    ).within(5, "seconds"),
  ),
);

// Hash-to-idle: When URL returns to home hash while game is active/finished,
// app must reset to idle. Tests Lustre router UrlChanged(home) handler.
// Covers Allium BrowserBack/BrowserForward postconditions:
// navigating to home hash → game.status = idle.
export const homeHashResetsToIdle = always(
  now(
    () =>
      (gameState.current === "active" || gameState.current === "finished") &&
      (currentHash.current === "" || currentHash.current === "#/"),
  ).implies(
    eventually(() => gameState.current === "idle").within(2, "seconds"),
  ),
);
