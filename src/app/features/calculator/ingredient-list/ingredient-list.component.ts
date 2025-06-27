import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  CdkDragEnter,
  CdkDragMove,
  CdkDragPreview,
  CdkDragStart,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Ingredient as IngredientModel } from '@core/models/ingredient.model';
import { Ingredient } from '@features/calculator/ingredient-list/ingredient/ingredient.component';

@Component({
  selector: 'app-ingredient-list',
  imports: [CdkDropList, Ingredient, CdkDrag, CdkDragPreview],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list-component.scss',
})
export class IngredientList {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  readonly ingredients = input.required<IngredientModel[]>();
  readonly listId = input<string>('');
  readonly connectedTo = input<string>('');
  readonly sortingDisabled = input<boolean>(false);
  readonly dropDisabled = input<boolean>(false);
  readonly changeRedOnExit = input<boolean>(false);

  readonly dragStarted = output<CdkDragStart>();
  readonly dragEnded = output<CdkDragEnd>();
  readonly dragEntered = output<IngredientModel>();
  readonly drop = output<CdkDragDrop<IngredientModel[]>>();

  protected readonly dragOutOfContainer = signal(false);

  constructor() {}

  protected emitDrop(event: CdkDragDrop<IngredientModel[]>) {
    this.drop.emit(event);
  }

  protected onDragStarted(event: CdkDragStart) {
    document.body.classList.add('dragging');
    this.dragStarted.emit(event);
    this.dragOutOfContainer.set(false);
  }

  protected onDragEnded(event: CdkDragEnd) {
    document.body.classList.remove('dragging');
    this.dragEnded.emit(event);
  }

  protected emitDragEntered(event: CdkDragEnter<IngredientModel>) {
    this.dragEntered.emit(event.item.data);
  }

  protected checkBoundary(event: CdkDragMove<IngredientModel>) {
    const pointerPosition = event.pointerPosition;
    const clientRect = this.container.nativeElement.getBoundingClientRect();
    const isWithinXBounds = this.withinBounds(
      clientRect.left,
      clientRect.right,
      pointerPosition.x,
    );
    const isWithinYBounds = this.withinBounds(
      clientRect.top,
      clientRect.bottom,
      pointerPosition.y,
    );
    const isWithingBounds = isWithinXBounds && isWithinYBounds;
    if (this.dragOutOfContainer() === isWithingBounds) {
      this.dragOutOfContainer.set(!isWithingBounds);
    }
  }

  // calculates one axis
  private withinBounds(
    elementStart: number,
    elementEnd: number,
    pointerPosition: number,
  ) {
    return elementStart < pointerPosition && elementEnd > pointerPosition;
  }

  protected enterPredicate() {
    return !this.dropDisabled();
  }
}
