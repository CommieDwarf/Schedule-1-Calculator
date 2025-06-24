import { Component, model } from '@angular/core';
import { NavigationComponent } from '@core/components/navigation/navigation.component';
import { SideDrawerDirective } from '@shared/directives/side-drawer.directive';

@Component({
  selector: 'app-mobile-menu',
  imports: [NavigationComponent, SideDrawerDirective],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  isOpen = model<boolean>(false);
}
