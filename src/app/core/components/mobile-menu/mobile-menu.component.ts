import {
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NavigationComponent } from '@core/components/navigation/navigation.component';
import {
  SwipeDirective,
  TouchMoveSingleAxisEvent,
} from '@shared/directives/swipe.directive';

@Component({
  selector: 'app-mobile-menu',
  imports: [NavigationComponent, SwipeDirective],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  readonly isOpen = input<boolean>(false);
  readonly close = output<void>();

  readonly isTouching = signal(false);
  readonly touchMoveDelta = signal(0);
  readonly baseTranslateX = computed<number>(() => {
    return this.isOpen()
      ? 0
      : -(this.container()?.nativeElement.clientWidth ?? 0);
  });
  readonly translateX = computed<number>(() => {
    return this.isTouching()
      ? Math.min(this.baseTranslateX() - this.touchMoveDelta(), 0)
      : this.baseTranslateX();
  });
  readonly container = viewChild<ElementRef<HTMLDivElement>>('container');

  protected requestClose() {
    this.close.emit();
  }

  protected startTouch() {
    this.isTouching.set(true);
  }

  protected endTouch() {
    this.isTouching.set(false);
    this.touchMoveDelta.set(0);
  }

  protected updateTouchDelta(event: TouchMoveSingleAxisEvent) {
    this.touchMoveDelta.set(event.delta);
  }
}
