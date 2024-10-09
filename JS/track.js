class Track {
  constructor(y, speed) {
      this.y = y;
      this.speed = speed;
  }

  move() {
      this.y += this.speed;
  }
}

export default Track;