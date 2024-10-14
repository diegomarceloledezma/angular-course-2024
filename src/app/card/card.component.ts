import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CommonModule, ItemComponent, SearchComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() selectedPerson: any;
  currentSection: string = 'personal';
  filteredMessages: string[] = [];

  ngOnChanges() {
    this.filteredMessages = this.selectedPerson?.messages || [];
  }

  showSection(section: string) {
    this.currentSection = section;
    if (section === 'messages') {
      this.filteredMessages = this.selectedPerson?.messages || [];
    }
  }

  filterMessages(searchText: string) {
    if (this.selectedPerson?.messages) {
      this.filteredMessages = this.selectedPerson.messages.filter(
        (message: string) =>
          message.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }

  getScore(): number {
    if (this.selectedPerson) {
      const { firstTestScore, secondTestScore, finalTestScore } =
        this.selectedPerson;
      return (firstTestScore + secondTestScore + finalTestScore) / 3;
    }
    return 0;
  }

  getCardClass() {
    return this.selectedPerson?.type === 'student' ? 'student' : 'professor';
  }
}
