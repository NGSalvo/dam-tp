import { Handler } from 'express';
import { getConnection } from '../db';
import { RowDataPacket } from 'mysql2';
import { SolenoidValve } from '../models/SolenoidValve';

type SolenoidValveRow = SolenoidValve & RowDataPacket & RowDataPacket[];

export const getSolenoidValves: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * from solenoid_valve');
  res.json(rows);
};

export const getSolenoidValvesCount: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<SolenoidValveRow>(
    'SELECT COUNT(*) from solenoid_valve',
  );
  res.json(rows[0]['COUNT(*)']);
};

export const getSolenoidValve: Handler = async (req, res) => {
  const connection = await getConnection();
  const [rows] = await connection.query<SolenoidValveRow>(
    'SELECT * from solenoid_valve WHERE id = ?',
    [req.params.id],
  );
  res.json(rows[0]);
};
export const saveSolenoidValve: Handler = async (req, res) => {
  const { name, location, solenoid_valve_id } = req.body;

  try {
    const connection = await getConnection();
    const [results] = await connection.query<SolenoidValveRow>(
      'INSERT INTO solenoid_valve(name, location, solenoid_valve_id) VALUES (?, ?, ?)',
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
export const deleteSolenoidValve: Handler = async (req, res) => {
  // const task = getConnection().get('tasks').find({ id: req.params.id }).value();

  // if (!task) {
  //   return res.status(404).json({ message: 'Task not found' });
  // }
  // TODO: Si no se borro ninguno es que no existia.
  const connection = await getConnection();
  await connection.query('DELETE FROM solenoid_valve WHERE id = ?', [
    req.params.id,
  ]);
  res.sendStatus(204);
};
export const updateSolenoidValve: Handler = async (req, res) => {
  // const task = getConnection().get('tasks').find({ id: req.params.id }).value();

  // if (!task) {
  //   return res.status(404).json({ message: 'Task not found' });
  // }
  // TODO: Si no se actualizo ninguno es que no existia.
  const connection = await getConnection();
  await connection.query('UPDATE solenoid_valve SET ? WHERE ID = ?', [
    req.body,
    req.params.id,
  ]);
  res.sendStatus(204);
};
