import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { socialNetworks, data } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user: any;

  socialNetworks = socialNetworks;
  subscriptions$: BehaviorSubject<number[]>;
  isAccountClosed = false;

  constructor() {
    this.subscriptions$ = new BehaviorSubject<number[]>([]);
  }

  ngOnInit() {
    this.subscriptions$.next(this.user.subscriptions);
  }

  toggleSubscriptionType(type: string) {
    this.user.subscriptionType = type;
  }

  subscribeToNetwork(networkId: number) {
    this.user.subscriptions.push(networkId);
    this.subscriptions$.next(this.user.subscriptions);
  }

  unsubscribeFromNetwork(networkId: number) {
    this.user.subscriptions = this.user.subscriptions.filter(
      (id: number) => id !== networkId
    );
    this.subscriptions$.next(this.user.subscriptions);
  }

  closeAccount() {
    this.user.status = 'inactive';
    this.isAccountClosed = true;
  }

  isSubscribed(networkId: number): boolean {
    return this.user.subscriptions.includes(networkId);
  }

  getPlatformNameById(subscriptionId: number): string {
    const network = socialNetworks.find((n) => n.id === subscriptionId);
    return network ? network.platform : 'Unknown platform';
    
  }

  removeSubscription(subscriptionId: number) {
    this.unsubscribeFromNetwork(subscriptionId);
  }
  
}
