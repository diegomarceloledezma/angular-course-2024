import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { data } from './data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchComponent,
    ItemComponent,
    ListComponent,
    CardComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-course-2024';

  people = data;

  filteredPeople = [...this.people];

  onSearch(searchText: string) {
    this.filteredPeople = this.people.filter(person =>
      person.name.toLowerCase().includes(searchText.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      person.type.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
