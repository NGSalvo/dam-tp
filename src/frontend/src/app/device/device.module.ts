import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicePageRoutingModule } from './device-routing.module';

import { DevicePage } from './device.page';
import { IrrigationLogListPageModule } from '../irrigation-log-list/irrigation-log-list.module';
import { RiskClassifyPipe } from '../pipes/risk-classify.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicePageRoutingModule,
    IrrigationLogListPageModule,
  ],
  declarations: [DevicePage, RiskClassifyPipe],
})
export class DevicePageModule {}
