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
/**
 * SwipeDirective — a versatile Angular directive to detect swipe gestures on touch devices.
 *
 * Tracks finger movement along X and Y axes and diagonal.
 * Emits directional swipe events as well as a general swipe event containing detailed movement data.
 *
 * ---
 *
 * ### Features:
 * - Tracks touch movement separately on X and Y axes using internal trackers.
 * - Computes diagonal (vector) distance, velocity and swipe angle.
 * - Emits directional events: `swipedLeft`, `swipedRight`, `swipedUp`, `swipedDown`.
 * - Emits a general `swiped` event with full tracking data.
 * - Supports configurable distance (`dThreshold`) and velocity (`vThreshold`)
 * thresholds for swipe detection.
 * - Configurable mode to detect swipe either by axes or diagonal via `useDiagonal` input.
 *
 *
 * ---
 *
 * ### Inputs:
 * - `dThreshold?: number` — Minimum distance in pixels to recognize a swipe.
 * - `vThreshold?: number` — Minimum velocity (px/ms) to recognize a swipe.
 * - `useDiagonal?: boolean` (default: false) — If true, swipe detection considers diagonal vector length and velocity.
 *
 * ---
 *
 * ### Outputs:
 * - `swipedLeft: EventEmitter<DirectionalSwipeEvent>` — Swipe detected towards left.
 * - `swipedRight: EventEmitter<DirectionalSwipeEvent>` — Swipe detected towards right.
 * - `swipedUp: EventEmitter<DirectionalSwipeEvent>` — Swipe detected upwards.
 * - `swipedDown: EventEmitter<DirectionalSwipeEvent>` — Swipe detected downwards.
 * - `swiped: EventEmitter<SwipeEvent>` — General swipe event emitted when any swipe occurs (axes or diagonal).
 * - `touchStarted: EventEmitter<void>` — Touch started event.
 * - `touchMoved: EventEmitter<CustomTouchEvent>` — Emitted on every touch move with detailed trackers.
 * - `touchEnded: EventEmitter<CustomTouchEvent>` — Emitted when touch ends.
 *
 * ---
 *
 * ### Event Interfaces:
 *
 * ```ts
 * interface AxisTrackData {
 *   distance: number;  // Movement distance along single axis (px)
 *   velocity: number;  // Velocity along axis (px/ms)
 * }
 *
 * interface TrackData {
 *   x: AxisTrackData;
 *   y: AxisTrackData;
 *   diagonal: { distance: number; velocity: number }; // Vector length and velocity
 * }
 *
 * interface BaseSwipeEvent {
 *   native: TouchEvent;      // Original DOM touch event
 *   angle: number;           // Swipe angle in radians (between -π to π)
 *   source: {
 *     velocity: boolean;     // Whether velocity threshold was met
 *     distance: boolean;     // Whether distance threshold was met
 *   };
 * }
 *
 * interface DirectionalSwipeEvent extends BaseSwipeEvent {
 *   trackData: AxisTrackData;  // Data for the single axis related to this directional swipe
 * }
 *
 * interface SwipeEvent extends BaseSwipeEvent {
 *   trackData: TrackData;      // Full tracking data including diagonal vector
 * }
 * ```
 *
 * ---
 *
 * ### Notes:
 * - Angle is computed using `Math.atan2(x, y)` and thus is in radians, ranging from -π to π.
 * - 0 radians corresponds roughly to .
 * - Angle increases counterclockwise (opposite to clock direction).
 * - Distance and velocity thresholds control sensitivity.
 * - Diagonal tracking allows detection of swipe speed and distance along the vector, useful for more advanced gestures.
 * - Internal signals allow programmatic override of inputs for flexible integration.
 * ---
 *
 * ### Example usage:
 * ```html
 * <div
 *   appSwipe
 *   [dThreshold]="40"
 *   [vThreshold]="0.5"
 *   [useDiagonal]="true"
 *   (swipedLeft)="onSwipeLeft($event)"
 *   (swiped)="onAnySwipe($event)"
 * ></div>
 * ```
 *
 * ---
 *
 * ### Author:
 * Your Name - optionally add GitHub or contact info
 */
