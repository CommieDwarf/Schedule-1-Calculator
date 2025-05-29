import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import { HeaderComponent } from '@core/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: 'layout.component.scss',
})
export class LayoutComponent implements AfterViewChecked {
  header = viewChild.required<HeaderComponent>('header');
  headerHeight = computed(() => this.header().el.nativeElement.offsetHeight);

  constructor() {}

  ngAfterViewChecked() {}
}
