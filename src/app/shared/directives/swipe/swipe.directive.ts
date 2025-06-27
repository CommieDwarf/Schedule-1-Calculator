import {
  computed,
  Directive,
  HostListener,
  input,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import {
  TouchTracker,
  AxisTrackData,
} from '@shared/directives/swipe/touchTracker';

export interface CustomTouchEvent {
  native: TouchEvent;
  trackers: {
    x: AxisTrackData;
    y: AxisTrackData;
  };
}

export interface TrackData {
  x: AxisTrackData;
  y: AxisTrackData;
  diagonal: {
    distance: number;
    velocity: number;
  };
}

interface BaseSwipeEvent {
  native: TouchEvent;
  source: {
    velocity: boolean;
    distance: boolean;
  };
}

export interface SwipeEvent extends BaseSwipeEvent {
  trackData: TrackData;
  angle: number;
}

export interface DirectionalSwipeEvent extends BaseSwipeEvent {
  trackData: AxisTrackData;
}

/**
 * SwipeDirective — a versatile Angular directive to detect swipe gestures on touch devices.
 *
 * Tracks finger movement along X and Y axes and optionally along the diagonal.
 * Emits directional swipe events as well as a general swipe event containing detailed movement data.
 *
 * ---
 *
 * ### Features:
 * - Tracks touch movement separately on X and Y axes using internal trackers.
 * - Computes diagonal (vector) distance and velocity.
 * - Emits directional events: `swipedLeft`, `swipedRight`, `swipedUp`, `swipedDown`.
 * - Emits a general `swiped` event with full tracking data and optional diagonal
 * tracking.
 * - Supports configurable distance (`dThreshold`) and velocity (`vThreshold`) thresholds.
 * - Configurable mode to detect swipe either by axes or diagonal via `useDiagonal` input or programmatic override.
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
 * - `swipedLeft:  OutputEmitterRef<DirectionalSwipeEvent>` — Swipe detected towards left.
 * - `swipedRight:  OutputEmitterRef<DirectionalSwipeEvent>` — Swipe detected towards right.
 * - `swipedUp:  OutputEmitterRef<DirectionalSwipeEvent> — Swipe detected upwards.
 * - `swipedDown:  OutputEmitterRef<DirectionalSwipeEvent> — Swipe detected downwards.
 * - `swiped:  OutputEmitterRef<DirectionalSwipeEvent>` — General swipe event emitted when any swipe occurs (axes or diagonal).
 * - `touchStarted:  OutputEmitterRef<DirectionalSwipeEvent>` — Touch started event.
 * - `touchMoved:  OutputEmitterRef<DirectionalSwipeEvent>` — Emitted on every touch move with detailed trackers.
 * - `touchEnded: OutputEmitterRef<SwipeEvent>` — Emitted when touch ends.
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
 *   angle: number;           // Swipe angle in radians (0 = top, clockwise)
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
 * - Angle is normalized so that 0 radians points upwards (12 o'clock), increasing clockwise.
 * - Distance and velocity thresholds control sensitivity.
 * - Diagonal tracking allows detection of swipe speed and distance along the vector, useful for more advanced gestures.
 * - Internal signals allow programmatic override of inputs for flexible integration.
 *
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

@Directive({
  selector: '[appSwipe]',
})
export class SwipeDirective {
  readonly dThreshold = input<number>();
  readonly vThreshold = input<number>();
  readonly useDiagonal = input<boolean>(false);
  readonly swipedLeft = output<DirectionalSwipeEvent>();
  readonly swipedRight = output<DirectionalSwipeEvent>();
  readonly swipedUp = output<DirectionalSwipeEvent>();
  readonly swipedDown = output<DirectionalSwipeEvent>();
  readonly swiped = output<SwipeEvent>();
  readonly touchMoved = output<CustomTouchEvent>();
  readonly touchStarted = output();
  readonly touchEnded = output<CustomTouchEvent>();

  readonly internalDThreshold = signal<number | undefined>(undefined);
  readonly internalVThreshold = signal<number | undefined>(undefined);
  readonly internalUseDiagonal = signal<boolean | undefined>(undefined);

  private readonly effectiveDThreshold = computed(() => {
    if (this.internalDThreshold() !== undefined) {
      return this.internalDThreshold();
    }
    if (this.dThreshold()) {
      return this.dThreshold();
    }
    return undefined;
  });

  private readonly effectiveVThreshold = computed(() => {
    if (this.internalVThreshold()) {
      return this.internalVThreshold();
    }
    if (this.vThreshold()) {
      return this.vThreshold();
    }
    return undefined;
  });

  private effectiveUseDiagonal = computed(() => {
    return this.internalUseDiagonal() !== undefined
      ? this.internalUseDiagonal()
      : this.useDiagonal();
  });

  private xTracker = new TouchTracker();
  private yTracker = new TouchTracker();

  private detectDirection({
    axisTrackData,
    emitNegative,
    emitPositive,
    event,
  }: {
    axisTrackData: AxisTrackData;
    emitNegative: OutputEmitterRef<DirectionalSwipeEvent>;
    emitPositive: OutputEmitterRef<DirectionalSwipeEvent>;
    event: TouchEvent;
  }) {
    let fromVelocity = this.shouldEmitFromVelocity(axisTrackData.velocity);
    let fromDistance = this.shouldEmitFromDistance(axisTrackData.distance);

    if (!fromVelocity && !fromDistance) {
      return;
    }

    const swipeEvent: DirectionalSwipeEvent = {
      native: event,
      trackData: axisTrackData,
      source: {
        velocity: fromVelocity,
        distance: fromDistance,
      },
    };
    if (axisTrackData.distance > 0) {
      emitPositive.emit(swipeEvent);
    } else {
      emitNegative.emit(swipeEvent);
    }
  }

  private calcVectorLength(x: number, y: number) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  private shouldEmitFromVelocity(velocity: number) {
    const vThreshold = this.effectiveVThreshold();
    return vThreshold !== undefined && vThreshold < velocity && velocity !== 0;
  }

  private shouldEmitFromDistance(distance: number) {
    const dThreshold = this.effectiveDThreshold();
    if (dThreshold === undefined || distance === 0) {
      return false;
    }
    return distance > dThreshold || distance < -dThreshold;
  }

  private startTracking(touch: Touch) {
    this.xTracker.start(touch.clientX);
    this.yTracker.start(touch.clientY);
  }

  private updateTrackers(touch: Touch) {
    return {
      x: this.xTracker.update(touch.clientX),
      y: this.yTracker.update(touch.clientY),
    };
  }

  private endTracking() {
    return {
      x: this.xTracker.end(),
      y: this.yTracker.end(),
    };
  }

  private calcAngle(x: number, y: number) {
    const angle = Math.atan2(x, -y);
    return (angle + 2 * Math.PI) % (2 * Math.PI); // Normalization to [0, 2π)
  }

  private detectSwipe(x: AxisTrackData, y: AxisTrackData, event: TouchEvent) {
    const diagonalDistance = this.calcVectorLength(x.distance, y.distance);
    const distance = this.effectiveUseDiagonal()
      ? diagonalDistance
      : Math.max(x.distance, y.distance);
    const diagonalVelocity = this.calcVectorLength(x.velocity, y.velocity);
    const velocity = this.effectiveUseDiagonal()
      ? diagonalVelocity
      : Math.max(x.velocity, y.velocity);
    const fromDistance = this.shouldEmitFromDistance(distance);
    const fromVelocity = this.shouldEmitFromVelocity(velocity);

    if (fromDistance || fromVelocity) {
      this.swiped.emit({
        native: event,
        trackData: {
          x,
          y,
          diagonal: {
            distance: diagonalDistance,
            velocity: diagonalVelocity,
          },
        },
        angle: this.calcAngle(x.distance, y.distance),
        source: {
          velocity: fromVelocity,
          distance: fromDistance,
        },
      });
    }
  }

  @HostListener('touchstart', ['$event'])
  protected onTouchStart(event: TouchEvent) {
    event.preventDefault();
    const touch = event.changedTouches.item(0);
    if (!touch) return;
    this.startTracking(touch);
    this.touchStarted.emit();
  }

  @HostListener('touchmove', ['$event'])
  protected onTouchMove(event: TouchEvent) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    if (!touch) return;

    const trackers = this.updateTrackers(touch);

    this.touchMoved.emit({
      native: event,
      trackers,
    });
  }

  @HostListener('touchend', ['$event'])
  protected onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    if (!touch) return;
    const trackers = this.endTracking();

    this.detectDirection({
      axisTrackData: trackers.x,
      emitNegative: this.swipedLeft,
      emitPositive: this.swipedRight,
      event,
    });
    this.detectDirection({
      axisTrackData: trackers.y,
      emitNegative: this.swipedUp,
      emitPositive: this.swipedDown,
      event,
    });
    this.detectSwipe(trackers.x, trackers.y, event);
    this.touchEnded.emit({
      native: event,
      trackers,
    });
  }
}
