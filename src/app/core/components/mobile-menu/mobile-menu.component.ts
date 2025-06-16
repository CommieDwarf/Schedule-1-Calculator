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
import { NgClass } from '@angular/common';
import {
  SwipeDirective,
  TouchMoveSingleAxisEvent,
} from '@shared/directives/swipe.directive';

@Component({
  selector: 'app-mobile-menu',
  imports: [NavigationComponent, NgClass, SwipeDirective],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  containerRef = viewChild<ElementRef<HTMLDivElement>>('container');
  isOpen = input<boolean>(false);
  isTouching = signal(false);
  touchMoveDelta = signal(0);
  baseTranslateX = computed(() => {
    return this.isOpen()
      ? 0
      : -(this.containerRef()?.nativeElement.clientWidth ?? 0);
  });
  translateX = computed(() => {
    return this.isTouching()
      ? Math.min(this.baseTranslateX() - this.touchMoveDelta(), 0)
      : this.baseTranslateX();
  });

  swipeLeft = output();

  onSwipeLeft() {
    this.swipeLeft.emit();
  }

  onTouchStart() {
    this.isTouching.set(true);
  }

  onTouchEnd() {
    this.isTouching.set(false);
    this.touchMoveDelta.set(0);
  }

  onTouchMove(event: TouchMoveSingleAxisEvent) {
    this.touchMoveDelta.set(event.delta);
  }
}
