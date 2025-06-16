import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  orientation = input<'vertical' | 'horizontal'>('horizontal');
}
