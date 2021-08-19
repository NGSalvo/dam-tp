import { Handler } from 'express';
import { getConnection } from '../db';
import { RowDataPacket } from 'mysql2';
import { Device } from '../models/Device';
import { Measurement } from '../models/Measurement';

type DeviceRow = Device & RowDataPacket & RowDataPacket[];
type MeasurementRow = Measurement & RowDataPacket & RowDataPacket[];

export const getDevices: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * from device');
  res.json(rows);
};

export const getDevicesCount: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<DeviceRow>(
    'SELECT COUNT(*) from device',
  );
  res.json(rows[0]['COUNT(*)']);
};

export const getDevice: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<DeviceRow>(
    'SELECT * from device WHERE id = ?',
    [req.params.id],
  );
  res.json(rows[0]);
};

export const getDeviceMeasurements: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<DeviceRow>(
    ` select m.id, m.date_of_measurement date, m.value, m.device_id deviceId from device d
      inner join measurement m ON m.device_id = d.id
      where d.id = ?`,
    [req.params.id],
  );
  res.json(rows);
};

export const getDeviceIrrigationLog: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<DeviceRow>(
    ` SELECT il.id, il.opened, il.date_of_log, il.solenoid_valve_id from device d
      inner join solenoid_valve sv on d.solenoid_valve_id = sv.id
      inner join irrigation_log il on il.solenoid_valve_id = sv.id
      where d.id = ?`,
    [req.params.id],
  );
  res.json(rows);
};

export const saveDevice: Handler = async (req, res) => {
  const { name, location, solenoid_valve_id } = req.body;

  try {
    const connection = await getConnection();
    const [results] = await connection.query<DeviceRow>(
      'INSERT INTO device(name, location, solenoid_valve_id) VALUES (?, ?, ?)',
      [name, location, solenoid_valve_id],
    );
    res.json({
      id: results.insertId,
      ...req.body,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const saveDeviceMeasurement: Handler = async (req, res) => {
  const { _value, _deviceId }: Measurement = req.body;
  // console.log({ _date, _value, _deviceId });
  // res.send();
  try {
    const connection = await getConnection();
    const [results] = await connection.query<MeasurementRow>(
      'INSERT INTO measurement(value, device_id) VALUES (?, ?)',
      [_value, _deviceId],
    );
    res.json({
      id: results.insertId,
      ...req.body,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteDevice: Handler = async (req, res) => {
  // const task = getConnection().get('tasks').find({ id: req.params.id }).value();

  // if (!task) {
  //   return res.status(404).json({ message: 'Task not found' });
  // }
  // TODO: Si no se borro ninguno es que no existia.
  const connection = await getConnection();
  await connection.query('DELETE FROM device WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
};

export const updateDevice: Handler = async (req, res) => {
  // const task = getConnection().get('tasks').find({ id: req.params.id }).value();

  // if (!task) {
  //   return res.status(404).json({ message: 'Task not found' });
  // }
  // TODO: Si no se actualizo ninguno es que no existia.
  const connection = await getConnection();
  await connection.query('UPDATE device SET ? WHERE ID = ?', [
    req.body,
    req.params.id,
  ]);
  res.sendStatus(204);
};
