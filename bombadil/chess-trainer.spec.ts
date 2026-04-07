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

const highlightedSquareName = extract((state) => {
  const el = state.document.querySelector(".highlighted-square");
  return el ? el.textContent : "";
});

const feedbackVisible = extract((state) => {
  return !!state.document.querySelector(".feedback.correct, .feedback.incorrect");
});

const feedbackText = extract((state) => {
  const el = state.document.querySelector(".feedback.correct, .feedback.incorrect");
  return el ? el.textContent : "";
});

// The asked square name embedded in wrong-answer feedback by the app.
// When a wrong answer is submitted, the app sets data-asked-square on the
// feedback element to the square that was actually asked.
const feedbackAskedSquare = extract((state) => {
  const el = state.document.querySelector(".feedback.incorrect");
  return el ? el.getAttribute("data-asked-square") : null;
});

// The submitted answer embedded in wrong-answer feedback by the app.
// When a wrong answer is submitted, the app sets data-submitted-answer on the
// feedback element to the answer the player actually gave.
const feedbackSubmittedAnswer = extract((state) => {
  const el = state.document.querySelector(".feedback.incorrect");
  return el ? el.getAttribute("data-submitted-answer") : null;
});

const historyTableVisible = extract((state) => {
  return !!state.document.querySelector(".history");
});

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

// --- Action Generators ---

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

export const endGame = actions(() => {
  const btn = endGameButton.current;
  return btn ? [{ Click: btn }] : [];
});

export const playAgain = actions(() => {
  const btn = playAgainButton.current;
  return btn ? [{ Click: btn }] : [];
});

export const gameActions = weighted([
  [10, startGame],
  [10, submitTextAnswer],
  [5, submitWrongAnswer],
  [8, endGame],
  [8, playAgain],
]);

// --- Properties (from Allium spec) ---

export const noErrors = noUncaughtExceptions.and(noConsoleErrors);

export const alwaysShowsTitle = always(() =>
  titleText.current === "Chess Square Trainer",
);

// Surface Trainer exposes: game.status
// UI must show exactly one of idle/active/finished views
export const validGameState = always(() =>
  ["idle", "active", "finished"].includes(gameState.current),
);

// Surface Trainer provides: PlayerStartsGame() when game.status = idle
// Start button visible only in idle state
export const startButtonOnlyWhenIdle = always(() => {
  const hasStart = !!startGameButton.current;
  const isIdle = gameState.current === "idle";
  return hasStart === isIdle;
});

// Surface Trainer provides: PlayerSubmitsAnswer when active and current_square != null
// Input visible only in active state
export const inputOnlyWhenActive = always(() => {
  const hasInput = !!answerInput.current;
  const isActive = gameState.current === "active";
  return hasInput === isActive;
});

// Surface Trainer provides: PlayerEndsGame when active
// End button visible only in active state
export const endButtonOnlyWhenActive = always(() => {
  const hasEnd = !!endGameButton.current;
  const isActive = gameState.current === "active";
  return hasEnd === isActive;
});

// State transitions are reachable: clicking Start goes from idle to active.
// We express this as: when in idle and start is clicked, eventually active.
// (Relies on fuzzer picking startGame action; weighted higher for reliability.)
export const startReachesActive = always(
  now(() => gameState.current === "idle" && !!startGameButton.current)
    .implies(
      eventually(() => gameState.current === "active").within(15, "seconds"),
    ),
);

// Ending game from active state reaches finished (relies on fuzzer picking endGame)
export const endReachesFinished = always(
  now(() => gameState.current === "active" && !!endGameButton.current)
    .implies(
      eventually(() => gameState.current === "finished").within(15, "seconds"),
    ),
);

// Play Again from finished reaches idle (relies on fuzzer picking playAgain)
export const playAgainReachesIdle = always(
  now(() => gameState.current === "finished" && !!playAgainButton.current)
    .implies(
      eventually(() => gameState.current === "idle").within(15, "seconds"),
    ),
);

// After submitting an answer, feedback should appear within 5 seconds.
// We detect "just submitted" by checking: input is empty AND we're active AND
// feedback is not yet visible AND score/attempts changed (stats are present).
// Simplified: if feedback appeared, it should have correct text.
export const feedbackShowsCorrectOrIncorrect = always(() => {
  if (!feedbackVisible.current) return true;
  const text = feedbackText.current;
  return text === "Correct!" || text.startsWith("Wrong!");
});

// Surface GameHistory exposes: answer history when finished
// After submitting an answer and then ending the game, history table must appear.
// Expresses the chain: active -> (submit) -> active with feedback -> (end) -> finished with history
export const historyAfterSubmitAndEnd = always(
  now(() => feedbackVisible.current && gameState.current === "active")
    .implies(
      eventually(() => gameState.current === "finished" && historyTableVisible.current)
        .within(15, "seconds"),
    ),
);

// Score and Attempts are always displayed when active
export const statsAlwaysVisibleWhenActive = always(() => {
  if (gameState.current !== "active") return true;
  return scoreText.current !== "" && attemptsText.current !== "";
});

// The answer must never be displayed to the user during active gameplay.
// The .highlighted-square element must not exist when the game is active.
export const answerNeverDisplayed = always(() => {
  if (gameState.current !== "active") return true;
  return highlightedSquareName.current === "";
});

// Board entity: Board.squares.count = 64 (CompleteBoard invariant)
// Surface Trainer exposes: game.board.squares
// The chessboard must be rendered with exactly 64 squares
export const chessboardHas64Squares = always(() => {
  if (gameState.current !== "active") return true;
  return boardSquareCount.current === 64;
});

// Board squares must cover every file-rank combination (a1..h8)
export const boardContainsAllSquares = always(() => {
  if (gameState.current !== "active") return true;
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
});

// Rule HighlightNextSquare sets game.current_square to a random board square.
// The board must visually highlight the current square.
// One square on the board grid must carry the "highlighted" class when active.
export const currentSquareHighlightedOnBoard = always(() => {
  if (gameState.current !== "active") return true;
  return highlightedBoardSquare.current !== null;
});

// Wrong-answer feedback must reference both the answer the player submitted
// and the square that was actually asked.
// The app embeds both values in data attributes on the feedback element.
export const wrongFeedbackShowsSubmittedAnswer = always(() => {
  const submitted = feedbackSubmittedAnswer.current;
  if (submitted === null) return true;
  const asked = feedbackAskedSquare.current;
  return feedbackText.current.includes(submitted)
    && (asked === null || feedbackText.current.includes(asked));
});
