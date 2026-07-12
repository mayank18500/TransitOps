import * as vehicleService from '../services/vehicle.service.js';

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVehicle = async (req, res) => {
  try {
    const { registrationNumber, name, model, type, maxLoadCapacity, acquisitionCost } = req.body;

    if (!registrationNumber || !name || !model || !type || maxLoadCapacity === undefined || acquisitionCost === undefined) {
      return res.status(400).json({ message: 'Missing required vehicle fields' });
    }

    const newVehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json(newVehicle);
  } catch (error) {
    if (error.message === 'Registration number must be unique') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await vehicleService.updateVehicle(req.params.id, req.body);
    res.status(200).json(updatedVehicle);
  } catch (error) {
    if (error.message === 'Vehicle not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Registration number must be unique') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    if (error.message === 'Vehicle not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
