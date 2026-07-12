import * as dashboardService from '../services/dashboard.service.js';

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: error.message });
  }
};
