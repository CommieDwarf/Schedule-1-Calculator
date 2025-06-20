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

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  isMobileMenuOpen = input(false);
  toggleMobileMenu = output();
  private _height = signal(0);
  private container = viewChild<ElementRef<HTMLDivElement>>('container');

  constructor() {}

  get height() {
    return this._height;
  }

  ngAfterViewInit() {
    this._height.set(
      this.container()?.nativeElement.getBoundingClientRect().height || 0,
    );
  }

  protected requestMobileMenuToggle() {
    this.toggleMobileMenu.emit();
  }
}
