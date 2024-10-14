import { Component, EventEmitter, Output } from '@angular/core';
import { data } from '../data';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'list',
  standalone: true,
  imports: [ItemComponent, CommonModule, SearchComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  people = data;
  filteredPeople = [...this.people];
  @Output() onSelectPerson: EventEmitter<any> = new EventEmitter<any>();

  onSearch(searchText: string) {
    this.filteredPeople = this.people.filter(
      (person) =>
        person.name.toLowerCase().includes(searchText.toLowerCase()) ||
        person.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        person.type.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  deletePerson(id: string) {
    this.filteredPeople = this.filteredPeople.filter(
      (person) => person.id !== id
    );
  }

  selectPerson(person: any) {
    this.onSelectPerson.emit(person);
  }
}
