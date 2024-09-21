import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: number = 10;

  constructor() {
    console.log('substract', this.substract(8,4))
  }
  public sum(num1: number, num2: number):number {
    return num1 + num2
  }

  private substract(num1: number, num2: number):number{
    return num1 - num2
  }
}
