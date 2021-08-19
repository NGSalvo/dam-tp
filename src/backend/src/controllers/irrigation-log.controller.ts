import { Handler } from 'express';
import { getConnection } from '../db';
import { RowDataPacket } from 'mysql2';
import { IrrigationLog } from '../models/IrrigationLog';

type IrrigationLogRow = IrrigationLog & RowDataPacket & RowDataPacket[];

export const getIrrigationLogs: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * from irrigation_log');
  res.json(rows);
};

export const getIrrigationLogsCount: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<IrrigationLogRow>(
    'SELECT COUNT(*) from irrigation_log',
  );
  res.json(rows[0]['COUNT(*)']);
};

export const getIrrigationLog: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<IrrigationLogRow>(
    'SELECT * from irrigation_log WHERE id = ?',
    [req.params.id],
  );
  res.json(rows[0]);
};

export const saveIrrigationLog: Handler = async (req, res) => {
  const { _opened, _solenoid_valve_id } = req.body;
  // console.log({ _opened, _date_of_log, _solenoid_valve_id });
  // res.json({ message: `Registro guardado con éxito` });
  try {
    const connection = await getConnection();
    const [results] = await connection.query<IrrigationLogRow>(
      'INSERT INTO irrigation_log(opened, solenoid_valve_id) VALUES (?, ?)',
      [_opened, _solenoid_valve_id],
    );
    res.json({
      id: results.insertId,
      ...req.body,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteIrrigationLog: Handler = async (req, res) => {
  // const task = getConnection().get('tasks').find({ id: req.params.id }).value();

  // if (!task) {
  //   return res.status(404).json({ message: 'Task not found' });
  // }
  // TODO: Si no se borro ninguno es que no existia.
  const connection = await getConnection();
  await connection.query('DELETE FROM irrigation_log WHERE id = ?', [
    req.params.id,
  ]);
  res.sendStatus(204);
};

export const updateIrrigationLog: Handler = async (req, res) => {
  // const task = getConnection().get('tasks').find({ id: req.params.id }).value();

  // if (!task) {
  //   return res.status(404).json({ message: 'Task not found' });
  // }
  // TODO: Si no se actualizo ninguno es que no existia.
  const connection = await getConnection();
  await connection.query('UPDATE irrigation_log SET ? WHERE ID = ?', [
    req.body,
    req.params.id,
  ]);
  res.sendStatus(204);
};
