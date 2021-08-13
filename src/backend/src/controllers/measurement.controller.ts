import { Handler } from 'express';
import { getConnection } from '../db';
import { RowDataPacket } from 'mysql2';
import { Measurement } from '../models/Measurement';

type MeasurementRow = Measurement & RowDataPacket & RowDataPacket[];

export const getMeasurements: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * from measurement');
  res.json(rows);
};

export const getMeasurementsCount: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<MeasurementRow>(
    'SELECT COUNT(*) from measurement',
  );
  res.json(rows[0]['COUNT(*)']);
};

export const getMeasurement: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<MeasurementRow>(
    'SELECT * from measurement WHERE id = ?',
    [req.params.id],
  );
  res.json(rows[0]);
};

export const saveMeasurement: Handler = async (req, res) => {
  const { date, value, deviceId }: Measurement = req.body;

  try {
    const connection = await getConnection();
    const [results] = await connection.query<MeasurementRow>(
      'INSERT INTO measurement(date, value, deviceId) VALUES (?, ?, ?)',
      [date, value, deviceId],
    );
    res.json({
      id: results.insertId,
      ...req.body,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteMeasurement: Handler = async (req, res) => {
  // const task = getConnection().get('tasks').find({ id: req.params.id }).value();

  // if (!task) {
  //   return res.status(404).json({ message: 'Task not found' });
  // }
  // TODO: Si no se borro ninguno es que no existia.
  const connection = await getConnection();
  await connection.query('DELETE FROM measurement WHERE id = ?', [
    req.params.id,
  ]);
  res.sendStatus(204);
};

export const updateMeasurement: Handler = async (req, res) => {
  // const task = getConnection().get('tasks').find({ id: req.params.id }).value();

  // if (!task) {
  //   return res.status(404).json({ message: 'Task not found' });
  // }
  // TODO: Si no se actualizo ninguno es que no existia.
  const connection = await getConnection();
  await connection.query('UPDATE measurement SET ? WHERE ID = ?', [
    req.body,
    req.params.id,
  ]);
  res.sendStatus(204);
};
