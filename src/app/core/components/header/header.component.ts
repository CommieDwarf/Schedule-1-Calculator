import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  private container = viewChild<ElementRef<HTMLDivElement>>('container');
  constructor() {}
  private _height = signal(0);
  mobileMenuOpen = input(false);
  mobileMenuButtonClicked = output();

  get height() {
    return this._height;
  }

  onMobileMenuButtonClick() {
    this.mobileMenuButtonClicked.emit();
  }

  ngAfterViewInit() {
    this._height.set(
      this.container()?.nativeElement.getBoundingClientRect().height || 0,
    );
  }
}
