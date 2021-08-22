import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[multiColor]',
})
export class MultiColorDirective {
  color = 0;

  constructor(private element: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    const color = this.colorRandomizer();
    this.changeColor(`hsl(${color}deg 100% 50%)`);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor(null);
  }

  changeColor(color: string | null) {
    this.element.nativeElement.style.color = color;
  }

  colorRandomizer() {
    this.color += 10;
    if (this.color > 360) {
      this.color = 0;
    }
    return this.color;
  }
}
