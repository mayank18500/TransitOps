import * as driverService from '../services/driver.service.js';

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await driverService.getAllDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDriverById = async (req, res) => {
  try {
    const driver = await driverService.getDriverById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDriver = async (req, res) => {
  try {
    const { name, licenseNumber, licenseCategory, licenseExpiry, contactNumber } = req.body;

    if (!name || !licenseNumber || !licenseCategory || !licenseExpiry || !contactNumber) {
      return res.status(400).json({ message: 'Missing required driver fields' });
    }

    const newDriver = await driverService.createDriver(req.body);
    res.status(201).json(newDriver);
  } catch (error) {
    if (error.message === 'License number must be unique') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateDriver = async (req, res) => {
  try {
    const updatedDriver = await driverService.updateDriver(req.params.id, req.body);
    res.status(200).json(updatedDriver);
  } catch (error) {
    if (error.message === 'Driver not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'License number must be unique') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    await driverService.deleteDriver(req.params.id);
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    if (error.message === 'Driver not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
