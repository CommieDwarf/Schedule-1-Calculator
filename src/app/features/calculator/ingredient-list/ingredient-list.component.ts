import { Component, input, output } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  CdkDragEnter,
  CdkDragStart,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Ingredient as IngredientModel } from '@core/models/ingredient.model';
import { Ingredient } from '@features/calculator/ingredient-list/ingredient/ingredient.component';

@Component({
  selector: 'app-ingredient-list',
  imports: [CdkDropList, Ingredient, CdkDrag],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list-component.scss',
})
export class IngredientList {
  readonly ingredients = input.required<IngredientModel[]>();
  listId = input<string>('');
  connectedTo = input<string>('');
  sortingDisabled = input<boolean>(false);
  dropDisabled = input<boolean>(false);
  dragStarted = output<CdkDragStart>();
  dragEnded = output<CdkDragEnd>();
  dragEntered = output<IngredientModel>();

  drop = output<CdkDragDrop<IngredientModel[]>>();

  constructor() {}

  onDrop(event: CdkDragDrop<IngredientModel[]>) {
    this.drop.emit(event);
  }

  onDragStarted(event: CdkDragStart) {
    document.body.classList.add('dragging');
    this.dragStarted.emit(event);
  }
  onDragEnded(event: CdkDragEnd) {
    document.body.classList.remove('dragging');
    this.dragEnded.emit(event);
  }

  onDragEntered(event: CdkDragEnter<IngredientModel>) {
    this.dragEntered.emit(event.item.data);
  }

  enterPredicate() {
    return !this.dropDisabled();
  }
}
