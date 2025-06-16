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
  private touchStartY = 0;
  private touchStartX = 0;

  swipeThreshold = input<number>(20);

  swipeLeft = output();
  swipeRight = output();
  swipeUp = output();
  swipeDown = output();
  touchMove = output<TouchEvent>();
  touchMoveHorizontally = output<TouchMoveSingleAxisEvent>();
  touchMoveVertically = output<TouchMoveSingleAxisEvent>();
  touchStart = output();
  touchEnd = output();

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    this.touchMoveHorizontally.emit({
      delta: this.touchStartX - event.changedTouches[0].screenX,
    });
    this.touchMoveVertically.emit({
      delta: this.touchStartY - event.changedTouches[0].screenY,
    });
    this.touchMove.emit(event);
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches.item(0)?.screenX ?? 0;
    this.touchStartY = event.changedTouches.item(0)?.screenY ?? 0;
    this.touchStart.emit();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touch = event.changedTouches[0];
    this.detectDirection({
      start: this.touchStartX,
      end: touch.screenX,
      emitNegative: this.swipeLeft,
      emitPositive: this.swipeRight,
    });
    this.detectDirection({
      start: this.touchStartY,
      end: touch.screenY,
      emitNegative: this.swipeUp,
      emitPositive: this.swipeDown,
    });
    this.resetSwipeStart();
    this.touchEnd.emit();
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
