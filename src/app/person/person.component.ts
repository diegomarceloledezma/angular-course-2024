import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  @Input() person!: { name: string; gender: string; age: number; discount?: boolean };
  @Output() deletePersonWithDiscount = new EventEmitter<void>();

  get discount(): Boolean {
    return this.person.age >= 18 ? true : false;
  }

  delete() {
    if (this.discount) {
      this.deletePersonWithDiscount.emit();
    }
  }

  get hasDiscount(): boolean {
    return this.person.discount ? true : false;
  }
}
