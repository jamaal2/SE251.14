// Define Box class
class Box {
    constructor() {
        // Initialize properties
        this.x = c.width / 2;
        this.y = c.height / 2;
        this.w = 100;
        this.h = 100;
        this.color = `gray`;
        this.vx = 0;
        this.vy = 0;
        this.force = 1;
    }

    // Draw the box
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fillRect(0 - this.w / 2, 0 - this.h / 2, this.w, this.h);
        ctx.restore();
    }

    // Move the box
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    // Box edges
    left() {
        return this.x - this.w / 2;
    }

    right() {
        return this.x + this.w / 2;
    }

    top() {
        return this.y - this.h / 2;
    }

    bottom() {
        return this.y + this.h / 2;
    }

    // Check collision with another object
    collide(obj) {
        if (
            this.right() > obj.left() &&
            this.left() < obj.right() &&
            this.bottom() > obj.top() &&
            this.top() < obj.bottom()
        ) {
            return true;
        }
        return false;
    }
}