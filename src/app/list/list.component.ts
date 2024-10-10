import { Component } from '@angular/core';
import { data } from '../data';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'list',
  standalone: true,
  imports: [ItemComponent, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  people = data;

  deletePerson(id: string) {
    this.people = this.people.filter(person => person.id !== id);
  }
}
