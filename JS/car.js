class Car {
  constructor(x, y, width, height, speed) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
  }

  move() {
      this.y += this.speed;
  }
}

export default Car;