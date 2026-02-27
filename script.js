const eagle = document.getElementById("eagle");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
let isGameOver = false;


function jump() {
  if (isGameOver) return; 
  
  if (!eagle.classList.contains("jump-animation")) {
    eagle.classList.add("jump-animation");

    setTimeout(() => {
      eagle.classList.remove("jump-animation");
    }, 1000);
  }
}


document.addEventListener("keydown", () => {
  jump();
});


const gameLoop = setInterval(() => {
  if (isGameOver) return;

  const eagleTop = parseInt(window.getComputedStyle(eagle).getPropertyValue("top"));
  const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));


  let currentScore = parseInt(score.innerText);
  score.innerText = currentScore + 2;


  if (rockLeft < 50 && rockLeft > 0 && eagleTop > 150) {
    isGameOver = true;


    rock.style.animation = "none"; 
    rock.style.left = rockLeft + "px";
    

    const finalScore = score.innerText;
    score.innerText = "GAME OVER! Score: " + finalScore;
    

    clearInterval(gameLoop);

    setTimeout(() => {
        alert("Kollision! Dein Endstand: " + finalScore);
    }, 10);
  }
}, 50);
