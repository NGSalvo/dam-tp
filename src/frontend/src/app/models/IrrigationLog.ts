/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */

type OpenStatus = 'Abierta' | 'Cerrada';

enum IsOpenStatus {
  closed,
  opened,
}

export class IrrigationLog {
  constructor(
    private _id: string,
    private _opened: number,
    private _date_of_log: Date,
    private _solenoid_valve_id: string
  ) {}

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get opened(): number {
    return this._opened;
  }
  set opened(value: number) {
    this._opened = value;
  }
  get date_of_log(): Date {
    return this._date_of_log;
  }
  set date_of_log(value: Date | string) {
    this._date_of_log = typeof value === 'string' ? new Date(value) : value;
  }
  get solenoid_valve_id(): string {
    return this._solenoid_valve_id;
  }
  set solenoid_valve_id(value: string) {
    this._solenoid_valve_id = value;
  }

  get isOpened(): OpenStatus {
    return this._opened === IsOpenStatus.opened ? 'Abierta' : 'Cerrada';
  }
}
