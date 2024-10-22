import { CommonModule } from '@angular/common';
import { socialNetworks, data } from './data';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from './notification/notification.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NotificationsComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-course-2024';

  socialNetworks = socialNetworks;
  users = data;
  activeTab = 'user';

  getPlatformColor(platform: string): string {
    switch(platform) {
      case 'youtube': return 'lightcoral';
      case 'tiktok': return 'rebeccapurple';
      case 'instagram': return 'lightgoldenrodyellow';
      case 'facebook': return 'lightblue';
      case 'whatsapp': return 'lightgreen';
      default: return 'lightgray';
    }
  }

}
