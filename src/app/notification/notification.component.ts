import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { socialNetworks, data } from '../data';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'], // Corregido 'styleUrls'
})
export class NotificationsComponent implements OnChanges {
  @Input() user: any; // Asegúrate de que user esté correctamente tipeado si es posible

  notifications$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      // Actualiza las notificaciones cuando el input 'user' cambie
      this.notifications$.next(this.user.notifications);
    }
  }

  addNotification(network: any) {
    // Verifica si el usuario puede agregar notificaciones para ciertas plataformas
    if (
      (network.platform === 'tiktok' || network.platform === 'whatsapp') &&
      this.user.subscriptionType !== 'premium'
    ) {
      return;
    }

    // Ajusta el 'amountAvailable' si el usuario es premium y se utiliza alguna de estas plataformas
    if (
      this.user.subscriptionType === 'premium' &&
      (network.platform === 'tiktok' || network.platform === 'whatsapp')
    ) {
      this.user.amountAvailable -= 5;
    }

    // Crea y agrega la nueva notificación
    const newNotification = `${network.platform} added a new ${network.type}`;
    this.user.notifications.push(newNotification);
    this.notifications$.next(this.user.notifications);
  }
}
