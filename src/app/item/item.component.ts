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
  @Output() onShow: EventEmitter<any> = new EventEmitter<any>();

  deletePerson(id: string) {
    this.onDelete.emit(id);
  }

  showPerson() {
    this.onShow.emit(this.person);
  }
}
