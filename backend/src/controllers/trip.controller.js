import * as tripService from '../services/trip.service.js';

export const getAllTrips = async (req, res) => {
  try {
    const trips = await tripService.getAllTrips();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await tripService.getTripById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTrip = async (req, res) => {
  try {
    const { source, destination, cargoWeight, vehicleId, driverId } = req.body;
    if (!source || !destination || cargoWeight === undefined || !vehicleId || !driverId) {
      return res.status(400).json({ message: 'Missing required trip fields' });
    }

    const newTrip = await tripService.createTrip(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    if (error.message === 'Vehicle not found' || error.message === 'Driver not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await tripService.updateTrip(req.params.id, req.body);
    res.status(200).json(updatedTrip);
  } catch (error) {
    if (error.message === 'Trip not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('Only draft')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    await tripService.deleteTrip(req.params.id);
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    if (error.message === 'Trip not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('Only draft')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const dispatchTrip = async (req, res) => {
  try {
    const dispatched = await tripService.dispatchTrip(req.params.id);
    res.status(200).json(dispatched);
  } catch (error) {
    if (error.message === 'Trip not found' || error.message === 'Vehicle not found' || error.message === 'Driver not found') {
      return res.status(404).json({ message: error.message });
    }
    // Validation failures
    return res.status(400).json({ message: error.message });
  }
};

export const completeTrip = async (req, res) => {
  try {
    const completed = await tripService.completeTrip(req.params.id);
    res.status(200).json(completed);
  } catch (error) {
    if (error.message === 'Trip not found') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
};

export const cancelTrip = async (req, res) => {
  try {
    const cancelled = await tripService.cancelTrip(req.params.id);
    res.status(200).json(cancelled);
  } catch (error) {
    if (error.message === 'Trip not found') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(400).json({ message: error.message });
  }
};
