import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IrrigationLog } from '../models/IrrigationLog';

@Injectable({
  providedIn: 'root',
})
export class IrrigationLogService {
  private urlApi = 'http://localhost:3000/irrigation-log';

  constructor(private http: HttpClient) {}

  postIrrigationLog(log: IrrigationLog): Promise<IrrigationLog> {
    return this.http.post<IrrigationLog>(this.urlApi, log).toPromise();
  }
}
