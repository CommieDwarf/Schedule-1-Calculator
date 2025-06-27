export interface AxisTrackData {
  distance: number;
  velocity: number;
}

export class TouchTracker {
  private startCoord = 0;
  private last = 0;
  private prev = 0;
  private lastTime = 0;
  private prevTime = 0;
  private lastVelocity = 0;

  public start(coord: number) {
    this.startCoord = coord;
    this.last = coord;
    this.prev = coord;
    this.lastTime = performance.now();
    this.prevTime = this.lastTime;
  }

  public update(coord: number): AxisTrackData {
    const now = performance.now();
    this.prev = this.last;
    this.prevTime = this.lastTime;
    this.last = coord;
    this.lastTime = now;
    const delta = this.calcDelta(this.last, this.startCoord);
    const dx = this.last - this.prev;
    const dt = this.lastTime - this.prevTime;
    let velocity = 0;
    if (dt > 0) {
      velocity = Math.abs((dx / dt) * 1000);
    }
    this.lastVelocity = velocity;
    return {
      velocity,
      distance: delta,
    };
  }
  public end(): AxisTrackData {
    const velocity = this.lastVelocity;
    const delta = this.calcDelta(this.last, this.startCoord);
    this.reset();

    return {
      velocity,
      distance: delta,
    };
  }

  private calcDelta(current: number, startCoord: number) {
    return current - startCoord;
  }

  private reset() {
    this.startCoord = 0;
    this.last = 0;
    this.prev = 0;
    this.lastTime = 0;
    this.prevTime = 0;
    this.lastVelocity = 0;
  }
}
