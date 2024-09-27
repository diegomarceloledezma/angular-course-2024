import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  // databinding
  box1Value: number = 0;
  box2Value: number = 0;

  @Output() sum = new EventEmitter();
  @Output() mul = new EventEmitter();
  @Output() reset = new EventEmitter();

  public onSum() {
    this.sum.emit({
      operation: 'SUM',
      result: Number(this.box1Value) + Number(this.box2Value),
    });
  }

  public onMul() {
    this.mul.emit({
      operation: 'MUL',
      result: Number(this.box1Value) * Number(this.box2Value),
    });
  }

  public onReset() {
    this.box1Value = 0;
    this.box2Value = 0;
    this.reset.emit({ operation: 'Reset', result: null });
  }
}
