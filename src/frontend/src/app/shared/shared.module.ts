import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiColorDirective } from '../directives/multi-color.directive';

@NgModule({
  declarations: [MultiColorDirective],
  imports: [CommonModule],
  exports: [MultiColorDirective],
})
export class SharedModule {}
