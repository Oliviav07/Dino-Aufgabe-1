const eagle = document.getElementById("eagle");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const explosion = document.getElementById("explosion");
const startMenu = document.getElementById("start-menu");
const startButton = document.getElementById("start-button");
const gameBox = document.getElementById("game");

let isGameOver = false;
let gameStarted = false;
let gameLoop;

// "Start" Button Event Handler
startButton.addEventListener("click", () => {
    console.log("Start Button wurde geklickt!"); // Konsolen-Meldung laut Anforderung
    startGame();
});

function startGame() {
    gameStarted = true;
    isGameOver = false;
    
    // UI anpassen
    startMenu.style.display = "none";
    score.innerText = "0";
    eagle.style.display = "block";
    
    // Animationen einschalten
    rock.classList.add("rock-moving");
    gameBox.classList.add("background-moving");

    // Game Loop starten
    runGameLoop();
}

function jump() {
    if (isGameOver || !gameStarted) return; 
    
    if (!eagle.classList.contains("jump-animation")) {
        eagle.classList.add("jump-animation");
        setTimeout(() => {
            eagle.classList.remove("jump-animation");
        }, 700);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.key === "ArrowUp") {
        jump();
    }
});

function runGameLoop() {
    gameLoop = setInterval(() => {
        if (isGameOver) return;

        const eagleTop = parseInt(window.getComputedStyle(eagle).getPropertyValue("top"));
        const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));

        // Score zählt erst jetzt hoch
        let currentScore = parseInt(score.innerText);
        score.innerText = currentScore + 1;

        // Kollisionsprüfung
        if (rockLeft < 80 && rockLeft > 20 && eagleTop > 160) {
            gameOver(rockLeft, eagleTop);
        }
    }, 50);
}

function gameOver(rockLeft, eagleTop) {
    isGameOver = true;
    gameStarted = false;

    // Animationen stoppen
    rock.classList.remove("rock-moving");
    gameBox.classList.remove("background-moving");
    rock.style.left = rockLeft + "px";

    // Explosion
    explosion.style.left = "50px"; 
    explosion.style.top = eagleTop + "px";
    explosion.classList.add("boom-animation");
    eagle.style.display = "none";

    const finalScore = score.innerText;
    clearInterval(gameLoop);

    setTimeout(() => {
        alert("GAME OVER! Score: " + finalScore);
        // Zurück zum Start-Menü anstatt kompletten Reload (eleganter)
        explosion.classList.remove("boom-animation");
        startMenu.style.display = "flex";
        rock.style.left = "650px"; 
    }, 700);
}
