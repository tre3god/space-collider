export default class Star {
  constructor(name, width, height) {
    this.name = name;

    // Position
    this.x = Math.random() * width;
    this.y = Math.random() * height;

    // Velocity
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;

    // Size
    this.size = Math.random() * 2 + 1;

    // Mass (can be used later for gravity)
    this.mass = 10 + Math.random() * 20;
  }
}