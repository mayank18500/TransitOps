import * as fuelService from '../services/fuel.service.js';

export const getAllFuelLogs = async (req, res) => {
  try {
    const logs = await fuelService.getAllFuelLogs();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFuelLogById = async (req, res) => {
  try {
    const log = await fuelService.getFuelLogById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: 'Fuel log not found' });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFuelLog = async (req, res) => {
  try {
    const { liters, cost, vehicleId } = req.body;
    if (liters === undefined || cost === undefined || !vehicleId) {
      return res.status(400).json({ message: 'Missing required fuel log fields' });
    }

    const newLog = await fuelService.createFuelLog(req.body);
    res.status(201).json(newLog);
  } catch (error) {
    if (error.message === 'Vehicle not found' || error.message === 'Trip not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateFuelLog = async (req, res) => {
  try {
    const updated = await fuelService.updateFuelLog(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    if (error.message === 'Fuel log not found' || error.message === 'Vehicle not found' || error.message === 'Trip not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteFuelLog = async (req, res) => {
  try {
    await fuelService.deleteFuelLog(req.params.id);
    res.status(200).json({ message: 'Fuel log deleted successfully' });
  } catch (error) {
    if (error.message === 'Fuel log not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
