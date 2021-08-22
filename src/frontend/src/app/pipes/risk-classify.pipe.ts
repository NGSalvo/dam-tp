import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'riskClassify',
})
export class RiskClassifyPipe implements PipeTransform {
  /*
    value < 11 : saturado
    value < 30 : correcto
    value < 50 : semi seco
    value < 101 :seco
  */
  transform(value): string {
    if (value < 11) {
      return 'Saturado';
    }
    if (value < 31) {
      return 'En condiciones';
    }
    if (value < 51) {
      return 'Semiseco';
    }
    if (value < 101) {
      return 'Seco';
    }
  }
}
