class Game {
  constructor() {
    this.ceils = document.querySelectorAll(".ceils");
    this.turn = "x";
    this.victory = null;
    this.movesX = [];
    this.movesO = [];
    this.delayEnd = 150;
  }

  getImageX() {
    const imgX = new Image();
    imgX.setAttribute("class", "img-x");
    imgX.src = "./img/x.png";
    return imgX;
  }

  getImageO() {
    const imgO = new Image();
    imgO.setAttribute("class", "img-o");
    imgO.src = "./img/o.png";
    return imgO;
  }

  getImageTie() {
    const imgO = new Image();
    imgO.setAttribute("class", "img-tie");
    imgO.src = "./img/tie.png";
    return imgO;
  }

  turnX(ceil, indexCeil) {
    this.movesX.push(indexCeil);
    ceil.appendChild(this.getImageX());
  }

  turnO(ceil, indexCeil) {
    this.movesO.push(indexCeil);
    ceil.appendChild(this.getImageO());
  }

  playing(ceil) {
    const indexCeil = +ceil.dataset.index;

    if (this.ceils[indexCeil].firstChild !== null) {
      return;
    }

    if (this.turn === "x") {
      this.turnX(ceil, indexCeil);
      this.turn = "o";
    } else {
      this.turnO(ceil, indexCeil);
      this.turn = "x";
    }

    this.check();
  }

  check() {
    const victories = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    this.checkWinX(victories);
    this.checkWinO(victories);
    this.checkTie();

    if (this.victory !== null) {
      this.screenEnd();
    }
  }

  checkWinX(victories) {
    if (this.movesX.length >= 3) {
      victories.forEach(victory => {
        const win = victory.every(check => this.movesX.includes(check));

        if (win) {
          this.victory = "x";
        }
      });
    }
  }

  checkWinO(victories) {
    if (this.movesO.length >= 3) {
      victories.forEach(victory => {
        const win = victory.every(check => this.movesO.includes(check));

        if (win) {
          this.victory = "o";
        }
      });
    }
  }

  checkTie() {
    if (this.movesO.length + this.movesX.length >= 9 && this.victory === null) {
      this.victory = "tie";
    }
  }

  screenEnd() {
    const screen = document.querySelector(".screen-end");
    const table = document.querySelector(".table");
    const span = document.createElement("span");

    if (this.victory === "x") {
      screen.appendChild(this.getImageX());
      span.innerHTML = "VITORIA!";
      screen.appendChild(span);
    } else if (this.victory === "o") {
      screen.appendChild(this.getImageO());
      span.innerHTML = "VITORIA!";
      screen.appendChild(span);
    } else {
      screen.appendChild(this.getImageTie());
      span.innerHTML = "EMPATE!";
      screen.appendChild(span);
    }

    setTimeout(() => {
      table.classList.add("active");
      screen.classList.add("active");
    }, this.delayEnd);
  }

  init() {
    this.ceils.forEach(ceil => {
      ceil.addEventListener("click", () => this.playing(ceil));
    });
  }
}

const game = new Game();
game.init();
