import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Measurement } from '../models/Measurement';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.page.html',
  styleUrls: ['./measurement-list.page.scss'],
})
export class MeasurementListPage implements OnInit {
  deviceId: string;
  measurements: Array<Measurement>;

  constructor(
    private deviceService: DeviceService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.deviceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.measurements = await this.getMeasurements();
  }

  async getMeasurements(): Promise<Array<Measurement>> {
    return this.deviceService.getDeviceMeasurements(this.deviceId);
  }
}
