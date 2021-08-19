import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../models/Device';
import { IrrigationLog } from '../models/IrrigationLog';
import { Measurement } from '../models/Measurement';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private urlApi = 'http://localhost:3000/devices';

  constructor(private http: HttpClient) {}

  getDevices(): Promise<Array<Device>> {
    return this.http.get<Array<Device>>(this.urlApi).toPromise();
  }

  getDeviceById(deviceId: string): Promise<Device> {
    return this.http.get<Device>(this.urlApi + `/${deviceId}`).toPromise();
  }

  getDeviceMeasurements(deviceId: string): Promise<Array<Measurement>> {
    return this.http
      .get<Array<Measurement>>(this.urlApi + `/${deviceId}/measurements`)
      .toPromise();
  }

  getDeviceIrrigationLog(deviceId: string): Promise<Array<IrrigationLog>> {
    return this.http
      .get<Array<IrrigationLog>>(this.urlApi + `/${deviceId}/irrigation-log`)
      .toPromise();
  }

  postMeasure(measure: Measurement): Promise<Measurement> {
    return this.http
      .post<Measurement>(this.urlApi + `/measurement`, measure)
      .toPromise();
  }
}
