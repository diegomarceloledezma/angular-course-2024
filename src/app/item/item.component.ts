import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input() person: any;
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

  deletePerson(id: string) {
    this.onDelete.emit(id);
  }
}
