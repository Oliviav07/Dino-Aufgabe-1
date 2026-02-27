const eagle = document.getElementById("eagle");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
let isGameOver = false;

// Funktion fuer den Sprung
function jump() {
  if (isGameOver) return; // Verhindert Springen nach Spielende
  
  if (!eagle.classList.contains("jump-animation")) {
    eagle.classList.add("jump-animation");
    // Passend zur CSS Zeit (1.0s = 1000ms)
    setTimeout(() => {
      eagle.classList.remove("jump-animation");
    }, 1000);
  }
}

// Steuerung: Springen bei Tastendruck
document.addEventListener("keydown", () => {
  jump();
});

// Haupt-Loop des Spiels
const gameLoop = setInterval(() => {
  if (isGameOver) return;

  const eagleTop = parseInt(window.getComputedStyle(eagle).getPropertyValue("top"));
  const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));

  // Aufgabe: Score zaehlt doppelt so schnell (+2)
  let currentScore = parseInt(score.innerText);
  score.innerText = currentScore + 2;

  // Kollisionsabfrage
  // Wenn der Stein nah am Adler ist (links < 50) 
  // UND der Adler nicht hoch genug gesprungen ist (top > 150)
  if (rockLeft < 50 && rockLeft > 0 && eagleTop > 150) {
    isGameOver = true;

    // Spiel anhalten
    rock.style.animation = "none"; // Stein bleibt stehen
    rock.style.left = rockLeft + "px"; // Stein fixieren an Position
    
    // Problem geloest: Score Reset / Ende-Anzeige
    const finalScore = score.innerText;
    score.innerText = "GAME OVER! Score: " + finalScore;
    
    // Intervall beenden
    clearInterval(gameLoop);

    // Kurze Verzoegerung fuer das Alert, damit man das Bild noch sieht
    setTimeout(() => {
        alert("Kollision! Dein Endstand: " + finalScore);
    }, 10);
  }
}, 50);
