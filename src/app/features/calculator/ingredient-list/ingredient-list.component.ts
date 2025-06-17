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
  readonly listId = input<string>('');
  readonly connectedTo = input<string>('');
  readonly sortingDisabled = input<boolean>(false);
  readonly dropDisabled = input<boolean>(false);
  readonly dragStarted = output<CdkDragStart>();
  readonly dragEnded = output<CdkDragEnd>();
  readonly dragEntered = output<IngredientModel>();

  readonly drop = output<CdkDragDrop<IngredientModel[]>>();

  constructor() {}

  protected emitDrop(event: CdkDragDrop<IngredientModel[]>) {
    this.drop.emit(event);
  }

  protected onDragStarted(event: CdkDragStart) {
    document.body.classList.add('dragging');
    this.dragStarted.emit(event);
  }
  protected onDragEnded(event: CdkDragEnd) {
    document.body.classList.remove('dragging');
    this.dragEnded.emit(event);
  }

  protected emitDragEntered(event: CdkDragEnter<IngredientModel>) {
    this.dragEntered.emit(event.item.data);
  }

  protected enterPredicate() {
    return !this.dropDisabled();
  }
}
