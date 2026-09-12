window.Portfolio = window.Portfolio || {};

window.Portfolio.initDragonJump = function initDragonJump() {
  const canvas = document.querySelector("[data-dragon-canvas]");
  const startButton = document.querySelector("[data-dragon-start]");
  const stopButton = document.querySelector("[data-dragon-stop]");
  const resetButton = document.querySelector("[data-dragon-reset]");
  const status = document.querySelector("[data-dragon-status]");
  const scoreNode = document.querySelector("[data-dragon-score]");
  const bestNode = document.querySelector("[data-dragon-best]");

  if (!canvas || !startButton || !stopButton || !resetButton || !status || !scoreNode || !bestNode) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const groundY = 182;
  const gravity = 0.65;
  const jumpPower = -11;

  const dragon = {
    x: 54,
    y: groundY - 30,
    width: 30,
    height: 30,
    velocityY: 0,
    onGround: true,
  };

  let obstacles = [];
  let fruits = [];
  let spawnTimer = 0;
  let fruitSpawnTimer = 0;
  let speed = 4.6;
  let running = false;
  let hasStarted = false;
  let gameOverState = false;
  let animationFrameId = 0;
  let score = 0;
  let nextSpeedMilestone = 100;
  let best = 0;
  try {
    best = Number(localStorage.getItem("dragon-jump-best") || 0);
  } catch (error) {
    best = 0;
  }
  bestNode.textContent = String(best);

  const randomSpawnGap = () => Math.floor(Math.random() * 55) + 62;
  const randomFruitGap = () => Math.floor(Math.random() * 80) + 88;

  const setStatus = (text) => {
    status.textContent = text;
  };

  const syncButtons = () => {
    startButton.textContent = running ? "Running" : hasStarted ? "Resume" : "Start";
    startButton.disabled = running;
    stopButton.disabled = !running;
  };

  const updateBest = () => {
    if (score > best) {
      best = score;
      bestNode.textContent = String(best);
      try {
        localStorage.setItem("dragon-jump-best", String(best));
      } catch (error) {
        // ignore storage errors
      }
    }
  };

  const drawBackground = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#12213d";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#1b315d";
    for (let i = 0; i < canvas.width; i += 48) {
      context.fillRect((i - (score % 48)), 24, 22, 3);
    }

    context.strokeStyle = "#7b94cf";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, groundY + 1);
    context.lineTo(canvas.width, groundY + 1);
    context.stroke();
  };

  const drawDragon = () => {
    context.fillStyle = "#2ad0b8";
    context.fillRect(dragon.x, dragon.y, dragon.width, dragon.height);

    context.fillStyle = "#0f1a33";
    context.fillRect(dragon.x + 20, dragon.y + 8, 6, 6);
  };

  const drawObstacles = () => {
    context.fillStyle = "#ef6c8c";
    obstacles.forEach((obstacle) => {
      context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
  };

  const drawFruits = () => {
    fruits.forEach((fruit) => {
      context.fillStyle = "#ffaf3b";
      context.beginPath();
      context.arc(fruit.x + fruit.radius, fruit.y + fruit.radius, fruit.radius, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = "#276a46";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(fruit.x + fruit.radius, fruit.y - 2);
      context.lineTo(fruit.x + fruit.radius + 5, fruit.y - 8);
      context.stroke();
    });
  };

  const intersects = (first, second) =>
    first.x < second.x + second.width &&
    first.x + first.width > second.x &&
    first.y < second.y + second.height &&
    first.y + first.height > second.y;

  const gameOver = () => {
    running = false;
    gameOverState = true;
    cancelAnimationFrame(animationFrameId);
    setStatus("Crashed! Press Start to play again.");
    updateBest();
    syncButtons();
  };

  const update = () => {
    if (!running) {
      return;
    }

    spawnTimer -= 1;
    if (spawnTimer <= 0) {
      const obstacleHeight = Math.floor(Math.random() * 22) + 24;
      obstacles.push({
        x: canvas.width + 10,
        y: groundY - obstacleHeight,
        width: 16,
        height: obstacleHeight,
      });
      spawnTimer = randomSpawnGap();
    }

    fruitSpawnTimer -= 1;
    if (fruitSpawnTimer <= 0) {
      const fruitRadius = 7;
      const fruitY = Math.floor(Math.random() * 68) + 82;
      fruits.push({
        x: canvas.width + 10,
        y: fruitY,
        radius: fruitRadius,
        width: fruitRadius * 2,
        height: fruitRadius * 2,
      });
      fruitSpawnTimer = randomFruitGap();
    }

    dragon.velocityY += gravity;
    dragon.y += dragon.velocityY;
    if (dragon.y >= groundY - dragon.height) {
      dragon.y = groundY - dragon.height;
      dragon.velocityY = 0;
      dragon.onGround = true;
    }

    obstacles = obstacles
      .map((obstacle) => ({ ...obstacle, x: obstacle.x - speed }))
      .filter((obstacle) => obstacle.x + obstacle.width > -4);

    fruits = fruits
      .map((fruit) => ({ ...fruit, x: fruit.x - speed }))
      .filter((fruit) => fruit.x + fruit.width > -4);

    if (obstacles.some((obstacle) => intersects(dragon, obstacle))) {
      drawBackground();
      drawDragon();
      drawObstacles();
      drawFruits();
      gameOver();
      return;
    }

    let collected = 0;
    fruits = fruits.filter((fruit) => {
      if (intersects(dragon, fruit)) {
        collected += 1;
        return false;
      }
      return true;
    });

    if (collected > 0) {
      score += collected * 10;
      scoreNode.textContent = String(score);
      setStatus(`Great! You collected ${collected} fruit${collected > 1 ? "s" : ""}.`);
    }

    if (score >= nextSpeedMilestone) {
      speed += 0.25;
      nextSpeedMilestone += 100;
    }

    drawBackground();
    drawDragon();
    drawObstacles();
    drawFruits();

    context.fillStyle = "#ecf3ff";
    context.font = "600 14px Inter, sans-serif";
    context.fillText(`Score: ${score}`, 12, 20);

    animationFrameId = requestAnimationFrame(update);
  };

  const jump = () => {
    if (!running || !dragon.onGround) {
      return;
    }

    dragon.velocityY = jumpPower;
    dragon.onGround = false;
  };

  const resetState = () => {
    dragon.y = groundY - dragon.height;
    dragon.velocityY = 0;
    dragon.onGround = true;
    obstacles = [];
    fruits = [];
    score = 0;
    speed = 4.6;
    nextSpeedMilestone = 100;
    spawnTimer = randomSpawnGap();
    fruitSpawnTimer = randomFruitGap();
    scoreNode.textContent = "0";
    gameOverState = false;
  };

  const startGame = () => {
    if (running) {
      return;
    }

    if (!hasStarted || gameOverState) {
      resetState();
    }

    hasStarted = true;
    running = true;
    setStatus("Running... Collect fruits and avoid obstacles.");
    syncButtons();
    update();
  };

  const stopGame = () => {
    if (!running) {
      return;
    }

    running = false;
    cancelAnimationFrame(animationFrameId);
    setStatus("Paused. Press Start to resume.");
    updateBest();
    syncButtons();
  };

  const resetGame = () => {
    running = false;
    hasStarted = false;
    cancelAnimationFrame(animationFrameId);
    updateBest();
    resetState();
    setStatus("Game reset. Press Start and collect fruits.");
    drawBackground();
    drawDragon();
    drawObstacles();
    drawFruits();
    syncButtons();
  };

  startButton.addEventListener("click", startGame);
  stopButton.addEventListener("click", stopGame);
  resetButton.addEventListener("click", resetGame);
  canvas.addEventListener("pointerdown", jump);

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
      event.preventDefault();
      jump();
    }
  });

  drawBackground();
  drawDragon();
  drawFruits();
  syncButtons();
};

window.Portfolio.initReactionGame = function initReactionGame() {
  const panel = document.querySelector("[data-reaction-panel]");
  const start = document.querySelector("[data-reaction-start]");
  const status = document.querySelector("[data-reaction-status]");
  const bestTime = document.querySelector("[data-best-time]");

  if (!panel || !start || !status || !bestTime) {
    return;
  }

  let timeoutId = null;
  let startTime = 0;
  let waiting = false;
  let ready = false;
  let best = null;
  let started = false;

  const resetPanel = () => {
    panel.classList.remove("ready");
    panel.textContent = "Press start";
  };

  const beginRound = () => {
    waiting = true;
    ready = false;
    started = true;
    panel.classList.remove("ready");
    panel.textContent = "Wait for green...";
    status.textContent = "Get ready...";

    const delay = Math.floor(Math.random() * 2500) + 1000;
    timeoutId = setTimeout(() => {
      waiting = false;
      ready = true;
      startTime = performance.now();
      panel.classList.add("ready");
      panel.textContent = "Tap now!";
      status.textContent = "GO!";
    }, delay);
  };

  const finishRound = (reactionMs) => {
    clearTimeout(timeoutId);
    timeoutId = null;
    waiting = false;
    ready = false;
    panel.classList.remove("ready");
    panel.textContent = "Press start";
    status.textContent = `Reaction: ${reactionMs}ms`;

    if (best === null || reactionMs < best) {
      best = reactionMs;
      bestTime.textContent = `${best}ms`;
    }
  };

  start.addEventListener("click", () => {
    clearTimeout(timeoutId);
    beginRound();
  });

  panel.addEventListener("click", () => {
    if (!started) {
      status.textContent = "Click start first.";
      return;
    }

    if (waiting) {
      clearTimeout(timeoutId);
      timeoutId = null;
      waiting = false;
      status.textContent = "Too early! Try again.";
      panel.textContent = "Pressed too soon";
      return;
    }

    if (!ready) {
      return;
    }

    const reactionMs = Math.round(performance.now() - startTime);
    finishRound(reactionMs);
  });
  resetPanel();
};
