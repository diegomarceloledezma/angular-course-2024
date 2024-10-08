import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'person',
  standalone: true,
  imports: [],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  @Input() person: any;
  @Output() deletePersonWithDiscount = new EventEmitter<void>();

  get discount(): number {
    return this.person.age > 18 ? 2 : 0;
  }

  delete() {
    if (this.discount > 0) {
      this.deletePersonWithDiscount.emit();
    }
  }
}
