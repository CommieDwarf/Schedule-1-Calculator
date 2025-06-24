import { Component, signal } from '@angular/core';
import { HeaderComponent } from '@core/components/header/header.component';
import { MobileMenuComponent } from '@core/components/mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, MobileMenuComponent],
  templateUrl: './layout.component.html',
  styleUrl: 'layout.component.scss',
})
export class LayoutComponent {
  readonly isMobileMenuOpen = signal<boolean>(false);

  constructor() {}

  protected openMobileMenu() {
    this.isMobileMenuOpen.set(true);
  }
  protected closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  protected toggleMobileMenu() {
    this.isMobileMenuOpen.update((prev) => !prev);
  }
}
