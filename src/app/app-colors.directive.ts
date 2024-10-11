import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngColors]',
  standalone: true
})
export class AppColorsDirective {

  @Input() ngColors!: string;
  @Input() defaultColor!: string;

  @Output() colorClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() colorDoubleClick: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('click') onClick() {
    this.element.nativeElement.style.backgroundColor = this.ngColors;
    this.colorClick.emit('Click current color is: ' + this.ngColors)
  }

  @HostListener('dblclick') onDoubleClick() {
    this.element.nativeElement.style.backgroundColor = this.ngColors;
    this.colorDoubleClick.emit('DBL current color is: ' + this.ngColors)
  }

  @HostListener('blur') onBlur() {
    this.ngColors = this.defaultColor;
  }

  constructor(private element: ElementRef) { 
    this.element.nativeElement.setAttribute('tabindex', '0');
  }

}

