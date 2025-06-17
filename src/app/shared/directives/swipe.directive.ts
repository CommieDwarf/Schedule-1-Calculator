import {
  Directive,
  HostListener,
  input,
  output,
  OutputEmitterRef,
} from '@angular/core';

export interface TouchMoveSingleAxisEvent {
  delta: number;
}

@Directive({
  selector: '[appSwipe]',
})
export class SwipeDirective {
  readonly swipeThreshold = input<number>(20);
  readonly swipedLeft = output();
  readonly swipedRight = output();
  readonly swipedUp = output();
  readonly swipedDown = output();
  readonly touchMoved = output<TouchEvent>();
  readonly touchMovedHorizontally = output<TouchMoveSingleAxisEvent>();
  readonly touchMovedVertically = output<TouchMoveSingleAxisEvent>();
  readonly touchStarted = output();
  readonly touchEnded = output();

  private touchStartY = 0;
  private touchStartX = 0;

  @HostListener('touchmove', ['$event'])
  protected onTouchMove(event: TouchEvent) {
    this.touchMovedHorizontally.emit({
      delta: this.touchStartX - event.changedTouches[0].screenX,
    });
    this.touchMovedVertically.emit({
      delta: this.touchStartY - event.changedTouches[0].screenY,
    });
    this.touchMoved.emit(event);
  }

  @HostListener('touchstart', ['$event'])
  protected onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches.item(0)?.screenX ?? 0;
    this.touchStartY = event.changedTouches.item(0)?.screenY ?? 0;
    this.touchStarted.emit();
  }

  @HostListener('touchend', ['$event'])
  protected onTouchEnd(event: TouchEvent) {
    const touch = event.changedTouches[0];
    if (!touch) return;
    this.detectDirection({
      start: this.touchStartX,
      end: touch.screenX,
      emitNegative: this.swipedLeft,
      emitPositive: this.swipedRight,
    });
    this.detectDirection({
      start: this.touchStartY,
      end: touch.screenY,
      emitNegative: this.swipedUp,
      emitPositive: this.swipedDown,
    });
    this.resetSwipeStart();
    this.touchEnded.emit();
  }

  private resetSwipeStart() {
    this.touchStartX = 0;
    this.touchStartY = 0;
  }

  private detectDirection({
    start,
    end,
    emitNegative,
    emitPositive,
  }: {
    start: number;
    end: number;
    emitNegative: OutputEmitterRef<void>;
    emitPositive: OutputEmitterRef<void>;
  }) {
    const delta = start - end;
    if (delta < -this.swipeThreshold()) emitPositive.emit();
    else if (delta > this.swipeThreshold()) emitNegative.emit();
  }
}
