let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevTouchX = 0;
  prevTouchY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    // Touch start
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();

      this.holdingPaper = true;
      highestZ += 1;
      paper.style.zIndex = highestZ;

      this.prevTouchX = e.touches[0].clientX;
      this.prevTouchY = e.touches[0].clientY;
    });

    // Touch move
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();

      if (this.holdingPaper) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        const velX = touchX - this.prevTouchX;
        const velY = touchY - this.prevTouchY;

        this.currentPaperX += velX;
        this.currentPaperY += velY;

        this.prevTouchX = touchX;
        this.prevTouchY = touchY;

        paper.style.transform =
          `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    // Touch end
    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
