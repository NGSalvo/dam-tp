import { Component } from '@angular/core';
import { Device } from '../models/Device';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public devices: Array<Device>;

  constructor(private deviceService: DeviceService) {
    this.getDevices();
  }

  async getDevices() {
    this.devices = await this.deviceService.getDevices();
  }
}
