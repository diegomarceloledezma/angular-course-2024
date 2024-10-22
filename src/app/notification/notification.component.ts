import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { socialNetworks, data } from '../data';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationsComponent {
  @Input() user: any;

  notifications$: BehaviorSubject<string[]>;

  constructor() {
    this.notifications$ = new BehaviorSubject<string[]>(
      this.user.notifications
    );
  }

  addNotification(network: any) {
    // Verificar si el usuario es premium para tiktok o whatsapp
    if (
      (network.platform === 'tiktok' || network.platform === 'whatsapp') &&
      this.user.subscriptionType !== 'premium'
    ) {
      return;
    }

    // Descontar $5 si es premium y recibe notificación de tiktok o whatsapp
    if (
      this.user.subscriptionType === 'premium' &&
      (network.platform === 'tiktok' || network.platform === 'whatsapp')
    ) {
      this.user.amountAvailable -= 5;
    }

    // Agregar la notificación
    const newNotification = `${network.platform} added a new ${network.type}`;
    this.user.notifications.push(newNotification);
    this.notifications$.next(this.user.notifications);
  }
}
