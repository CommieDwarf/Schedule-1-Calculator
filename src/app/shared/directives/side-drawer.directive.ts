import {
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  HostBinding,
  inject,
  input,
  model,
  OnInit,
  output,
  OutputRefSubscription,
  Renderer2,
  signal,
} from '@angular/core';
import { SwipeDirective } from '@shared/directives/swipe.directive';
import { AxisTrackData } from '@shared/directives/touchTracker';

const DEFAULT_D_THRESHOLD_WIDTH_FACTOR = 0.4;
const DEFAULT_V_THRESHOLD = 600;

@Directive({
  selector: '[appSideDrawer]',
  hostDirectives: [
    {
      directive: SwipeDirective,
    },
  ],
})
export class SideDrawerDirective implements OnInit {
  private swipeDirective = inject(SwipeDirective);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  readonly destroyRef = inject(DestroyRef);

  readonly dThreshold = input<number>();
  readonly vThreshold = input<number>();
  readonly vCloseDisabled = input<boolean>(false);
  readonly dCloseDisabled = input<boolean>(false);

  readonly maxCloseDuration = input(300);
  readonly openCloseDuration = input(300);
  readonly minCloseDuration = input(100);
  readonly side = input<'left' | 'right'>('left');

  readonly isOpen = model<boolean>(false);
  readonly closed = output<void>();

  readonly isTouching = signal(false);
  readonly touchMoveDistance = signal(0);

  readonly hostWidth = computed(() => {
    return this.elementRef?.nativeElement.clientWidth;
  });
  readonly openTranslateX = computed<number>(() => {
    return this.side() === 'left' ? this.hostWidth() : -this.hostWidth();
  });

  readonly baseTranslateX = computed<number>(() => {
    return this.isOpen() ? this.openTranslateX() : 0;
  });
  readonly translateX = computed<number>(() => {
    const base = this.baseTranslateX();
    const distance = this.touchMoveDistance();
    const limit = this.hostWidth();
    const value = distance + base;

    if (!this.isTouching()) return base;

    return this.side() === 'left'
      ? Math.min(value, limit)
      : Math.max(value, -limit);
  });

  constructor() {
    effect(() => {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'transform',
        `translateX(${this.translateX()}px)`,
      );
    });
  }

  ngOnInit() {
    this.manageSubscriptions(); // sets subscriptions and cleanup
    this.setDefaultStyle(); // sets default transition styles
    this.configSwipe(); // passes input thresholds to swipe directive or sets
    // default if not provided.
  }

  protected close(): void {
    this.closed.emit();
    this.isOpen.set(false);
  }

  protected startTouch(): void {
    this.isTouching.set(true);
    this.setTouchingStyle();
  }

  protected endTouch(): void {
    this.isTouching.set(false);
    this.touchMoveDistance.set(0);
  }

  protected updateTouchDistance(distance: number): void {
    this.touchMoveDistance.set(distance);
  }

  private manageSubscriptions(): void {
    const subscriptions = this.setSubscriptions();
    this.destroyRef.onDestroy(() =>
      subscriptions.forEach((subscription) => subscription.unsubscribe()),
    );
  }

  private setSubscriptions(): OutputRefSubscription[] {
    const swipe = this.swipeDirective;
    const closeSwipe =
      this.side() === 'left' ? swipe.swipedLeft : swipe.swipedRight;

    return [
      swipe.touchStarted.subscribe(() => this.startTouch()),
      swipe.touchEnded.subscribe(() => this.endTouch()),
      swipe.touchMoved.subscribe((event) => {
        this.updateTouchDistance(event.trackers.x.distance);
      }),
      closeSwipe.subscribe((event) => {
        this.handleCloseSwipe(event.trackData);
      }),
    ];
  }

  private handleCloseSwipe(trackData: AxisTrackData) {
    this.close();
    const transMs = this.calcTransMs(trackData.velocity);
    this.setInertionStyle(transMs);
    const timeout = setTimeout(() => {
      this.setDefaultStyle();
    }, transMs);
    this.destroyRef.onDestroy(() => {
      clearTimeout(timeout);
    });
  }

  private calcTransMs(velocity: number): number {
    const drawerWidth = this.elementRef.nativeElement.clientWidth;
    const currentX = this.getTranslateX(this.elementRef.nativeElement);
    const remainingDistance = drawerWidth - Math.abs(currentX);

    const friction = 1.25;
    const durationMs = Math.min(
      (remainingDistance / velocity) * 1000 * friction,
      this.maxCloseDuration(),
    );
    return Math.max(durationMs, this.minCloseDuration());
  }

  private setInertionStyle(transDuration: number): void {
    this.setTransStyles(transDuration, 'ease');
  }

  private setDefaultStyle(): void {
    this.setTransStyles(this.openCloseDuration(), 'ease');
  }

  private setTouchingStyle(): void {
    this.setTransStyles(100, 'linear');
  }

  private setTransStyles(durationMs: number, timingFn: string): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transition-duration',
      `${durationMs}ms`,
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transition-timing-function',
      timingFn,
    );
  }

  private getTranslateX(el: HTMLElement): number {
    const style = getComputedStyle(el);
    const transform = style.transform;

    if (transform && transform !== 'none') {
      const matrix = new DOMMatrixReadOnly(transform);
      return matrix.m41;
    }
    return 0;
  }

  private configSwipe() {
    this.setDThreshold();
    this.setVThreshold();
  }

  private setDThreshold() {
    if (this.dCloseDisabled()) {
      return;
    }
    if (this.dThreshold()) {
      this.swipeDirective.internalDThreshold.set(this.dThreshold());
    } else {
      this.swipeDirective.internalDThreshold.set(
        this.hostWidth() * DEFAULT_D_THRESHOLD_WIDTH_FACTOR,
      );
    }
  }

  private setVThreshold() {
    if (this.vCloseDisabled()) {
      return;
    }

    if (this.vThreshold()) {
      this.swipeDirective.internalVThreshold.set(this.vThreshold());
    } else {
      this.swipeDirective.internalVThreshold.set(DEFAULT_V_THRESHOLD);
    }
  }

  @HostBinding('style.position')
  position = `fixed`;

  @HostBinding('style.left')
  get left() {
    return this.side() === 'left' ? `${-this.hostWidth()}px` : null;
  }

  @HostBinding('style.right')
  get right() {
    return this.side() === 'right' ? `${-this.hostWidth()}px` : null;
  }
}
