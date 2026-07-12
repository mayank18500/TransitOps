import * as maintenanceService from '../services/maintenance.service.js';

export const getAllMaintenance = async (req, res) => {
  try {
    const records = await maintenanceService.getAllMaintenance();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMaintenance = async (req, res) => {
  try {
    const { description, cost, vehicleId } = req.body;

    if (!description || cost === undefined || !vehicleId) {
      return res.status(400).json({ message: 'Missing required maintenance fields' });
    }

    const newRecord = await maintenanceService.createMaintenance(req.body);
    res.status(201).json(newRecord);
  } catch (error) {
    if (error.message === 'Vehicle not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
