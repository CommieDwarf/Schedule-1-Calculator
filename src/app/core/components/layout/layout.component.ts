import { AfterViewChecked, Component, signal } from '@angular/core';
import { HeaderComponent } from '@core/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { MobileMenuComponent } from '@core/components/mobile-menu/mobile-menu.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, MobileMenuComponent],
  templateUrl: './layout.component.html',
  styleUrl: 'layout.component.scss',
})
export class LayoutComponent implements AfterViewChecked {
  mobileMenuOpen = signal<boolean>(false);

  constructor() {}

  openMobileMenu() {
    this.mobileMenuOpen.set(true);
  }
  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((prev) => !prev);
  }

  ngAfterViewChecked() {}
}
