import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  AfterContentChecked,
  AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterViewInit,
    AfterContentChecked,
    AfterViewChecked
{
  @Input() name: string = '';
  @Input() email: string = '';

  @Output() sendData = new EventEmitter();

  @ViewChild('buttonTest', { static: true }) buttonTest!: ElementRef;
  @ViewChild('buttonShow', { static: true }) buttonShow!: ElementRef;

  password: string = '';
  showButton: boolean = true;

  subscription: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute) {
    console.log('user card constructor');

    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        console.log('PARAMS: ', params);
      })
    );

    console.log('Snapshot: ', this.activatedRoute.snapshot.params);
  }

  ngOnInit(): void {
    console.log('user card on init');

    this.buttonShow.nativeElement.textContent = 'button show in OnInit';
    // this.password = this.name + this.email + 'PASSWORD';
  }

  ngOnDestroy(): void {
    console.log('user card destroy');

    this.subscription.unsubscribe();
  }

  //PARA CUANDO CAMBIA ALGO EN ALGUN INPUT
  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGES:', changes);

    this.password =
      changes['name'].currentValue +
      ' ' +
      changes['email'].currentValue +
      'PASSWORD';
  }

  //CUANDO HAY CAMBIOS EN GENERAL
  ngDoCheck(): void {
    console.log('DO CHECK user card');
  }

  ngAfterContentInit(): void {
    console.log('NG AFTER CONTENT INIT');
  }

  ngAfterContentChecked(): void {
    console.log('AFTER CONTENT CHECKED');
  }

  ngAfterViewInit(): void {
    console.log('NG AFTER VIEW INIT');
    console.log('BUTTON TEST', this.buttonTest);

    if (this.buttonTest) {
      this.buttonTest.nativeElement.textContent = 'button test in OnInit';
    }
  }

  ngAfterViewChecked(): void {
    console.log('NG AFTER VIEW CHECKED');
  }

  public onSendData() {
    this.sendData.emit('Hi from child component');
  }
}
