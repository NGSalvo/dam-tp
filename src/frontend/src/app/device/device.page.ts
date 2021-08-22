import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDidEnter, ViewWillEnter, ModalController } from '@ionic/angular';
import { Device } from '../models/Device';
import { DeviceService } from '../services/device.service';
import { IrrigationLog } from '../models/IrrigationLog';

import * as Highcharts from 'highcharts';
import { IrrigationLogListPage } from '../irrigation-log-list/irrigation-log-list.page';
import { Measurement } from '../models/Measurement';
import { IrrigationLogService } from '../services/irrigation-log.service';
declare let require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit, ViewWillEnter, ViewDidEnter {
  deviceId: string;
  device: Device;
  isOpen: boolean;
  irrigationLog: Array<IrrigationLog>;
  measurements: Array<Measurement>;

  public myChart;
  public valorObtenido = 0;
  private chartOptions;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private irrigationLogService: IrrigationLogService,
    private modalController: ModalController
  ) {
    this.deviceId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
  }

  ionViewWillEnter(): void {
    console.log('Probando ciclo de vida');
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  ngOnInit() {}

  generarChart() {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: 'Sensor N° ' + this.deviceId,
      },

      credits: { enabled: false },

      pane: {
        startAngle: -150,
        endAngle: 150,
      },
      // the value axis
      yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto',
        },
        title: {
          text: 'kPA',
        },
        plotBands: [
          {
            from: 0,
            to: 10,
            color: '#55BF3B', // green
          },
          {
            from: 10,
            to: 30,
            color: '#DDDF0D', // yellow
          },
          {
            from: 30,
            to: 100,
            color: '#DF5353', // red
          },
        ],
      },
      series: [
        {
          name: 'kPA',
          data: [this.valorObtenido],
          tooltip: {
            valueSuffix: ' kPA',
          },
        },
      ],
    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }

  toggleValve() {
    this.isOpen = !this.isOpen;

    // Agrega nuevo registro
    const newLog = this.createIrrigationLog(+this.isOpen);
    this.irrigationLogService.postIrrigationLog(newLog);

    const openStatusDescription = this.getOpenStatusDescription();
    if (openStatusDescription === 'Abierta') {
      // Simula la generación de un nuevo valor aleatorio y se renderiza
      this.valorObtenido = Math.floor(Math.random() * 101);
      this.renderUpdateChart(this.valorObtenido);
    } else {
      // Agrega una nueva medición
      const newMeasure = this.createMeasure(this.valorObtenido);
      this.deviceService.postMeasure(newMeasure);
      // Simula el cerrado de una válvula, vuelve a 0 y se renderiza
      this.valorObtenido = 0;
      this.renderUpdateChart(this.valorObtenido);
    }
  }

  // Se obtienen los datos necesarios para trabajar con el template
  async getData() {
    this.device = await this.getDevice();
    // Se genera nuevo objeto para que la propiedad virtual 'isOpened' surta efecto
    this.irrigationLog = (await this.getIrrigationLog()).map(
      (il) =>
        new IrrigationLog(
          il.id,
          il.opened,
          il.date_of_log,
          il.solenoid_valve_id
        )
    );
    this.getOpenStatus();
    this.measurements = await this.getDeviceMeasurements();
    this.valorObtenido = this.getLastMeasureValue();
  }

  async getDevice() {
    return this.deviceService.getDeviceById(this.deviceId);
  }

  async getIrrigationLog() {
    return this.deviceService.getDeviceIrrigationLog(this.deviceId);
  }

  // Modal del Log
  async showIrrigationLog() {
    const modal = await this.modalController.create({
      component: IrrigationLogListPage,
      componentProps: {
        logs: this.irrigationLog,
      },
    });

    await modal.present();
  }

  createIrrigationLog(status: number): IrrigationLog {
    const newLog = new IrrigationLog(
      this.irrigationLog.length.toString(),
      status,
      new Date(),
      this.device.solenoid_valve_id
    );

    // Se agrega en memoria para fácil manipulación
    this.irrigationLog = [...this.irrigationLog, newLog];
    return newLog;
  }

  createMeasure(value: number): Measurement {
    const newMeasure = new Measurement(
      this.measurements.length.toString(),
      new Date(),
      value,
      this.deviceId
    );

    // Se agrega en memoria para fácil manipulación
    this.measurements = [...this.measurements, newMeasure];

    return newMeasure;
  }

  getLastMeasureValue(): number {
    return +this.measurements[this.measurements.length - 1].value;
  }

  getLastIrrigationLog(): IrrigationLog {
    const currentLog = this.irrigationLog.filter(
      (log) => log.solenoid_valve_id === this.device.solenoid_valve_id
    );
    if (currentLog.length > 0) {
      return currentLog[currentLog.length - 1];
    } else {
      return null;
    }
  }

  getOpenStatus() {
    const currentLog = this.getLastIrrigationLog();
    if (!currentLog) {
      this.isOpen = false;
    } else {
      this.isOpen = !!currentLog.opened;
    }
  }

  getOpenStatusDescription() {
    const currentLog = this.getLastIrrigationLog();
    if (currentLog instanceof IrrigationLog) {
      return currentLog.isOpened;
    } else {
      return 'Cerrada';
    }
  }

  renderUpdateChart(value: number) {
    this.myChart.update({
      series: [
        {
          name: 'kPA',
          data: [value],
          tooltip: {
            valueSuffix: ' kPA',
          },
        },
      ],
    });
  }

  async getDeviceMeasurements() {
    return this.deviceService.getDeviceMeasurements(this.deviceId);
  }
}
