class Tile {
  constructor(position, frame, tileId, data) {
    this.position = position;
    this._frame = frame;
    this.tileId = tileId;
    this.data = data;
    this.on_walk = [];
    this.post_init();
  }

  post_init() { 
  }

  wasShot(time) {
    return this.cattable(time);
  }

  frame(time) {
    return this.default_frame;
  }

  get default_frame() {
    return this._frame;
  }

  wasLandedOnBy(walker, time) {
    for (var i = this.on_walk.length - 1; i >= 0; i--) {
      this.on_walk[i](walker, time);
    }

    return this.walkable(time);
  }

  walkable(time) {
    alert('All tiles should provide an implementation of walkable.');
  }
  
  cattable(time) {
    return this.walkable(time);
  }

  update(time) {
    this.sprite.x = absPosfor(this.position).x;
    this.sprite.y = absPosfor(this.position).y;
    this.sprite.width = tileSize;
    this.sprite.height = tileSize;
    this.sprite.frame = this.frame(time);
  }
}
