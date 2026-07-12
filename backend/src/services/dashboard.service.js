import prisma from '../lib/prisma.js';

export const getDashboardStats = async () => {
  // === MANAGER STATS ===
  const totalVehicles = await prisma.vehicle.count();
  const onTripVehicles = await prisma.vehicle.count({ where: { status: 'On Trip' } });
  const inShopVehicles = await prisma.vehicle.count({ where: { status: 'In Shop' } });
  const retiredVehiclesCount = await prisma.vehicle.count({ where: { status: 'Retired' } });
  const availableVehicles = await prisma.vehicle.count({ where: { status: 'Available' } });
  
  const recentVehicles = await prisma.vehicle.findMany({
    take: 5,
    orderBy: { id: 'desc' }
  });
  
  const maintenanceAlerts = await prisma.maintenance.findMany({
    where: { status: 'Open' },
    take: 5,
    orderBy: { date: 'desc' },
    include: { vehicle: true }
  });

  // === DISPATCHER STATS ===
  const activeTripsCount = await prisma.trip.count({ where: { status: 'Dispatched' } });
  const pendingTripsCount = await prisma.trip.count({ where: { status: 'Draft' } });
  const availableDriversCount = await prisma.driver.count({ where: { status: 'Available' } });
  
  const activeTrips = await prisma.trip.findMany({
    where: { status: 'Dispatched' },
    take: 5,
    orderBy: { id: 'desc' },
    include: { vehicle: true, driver: true }
  });

  const availableDriversList = await prisma.driver.findMany({
    where: { status: 'Available' },
    take: 5,
    orderBy: { safetyScore: 'desc' }
  });

  // === SAFETY STATS ===
  const totalDrivers = await prisma.driver.count();
  const onDutyDrivers = await prisma.driver.count({ where: { status: 'On Trip' } });
  const suspendedDrivers = await prisma.driver.count({ where: { status: 'Suspended' } });
  
  const aggSafety = await prisma.driver.aggregate({ _avg: { safetyScore: true } });
  const avgSafetyScore = aggSafety._avg.safetyScore ? Math.round(aggSafety._avg.safetyScore) : 0;
  
  const recentDrivers = await prisma.driver.findMany({
    take: 5,
    orderBy: { id: 'desc' }
  });

  const licenseAlerts = await prisma.driver.findMany({
    take: 5,
    orderBy: { licenseExpiry: 'asc' }
  });

  // === FINANCIAL STATS ===
  const fuelSum = await prisma.fuelLog.aggregate({ _sum: { cost: true } });
  const maintenanceSum = await prisma.maintenance.aggregate({ _sum: { cost: true } });
  const expenseSum = await prisma.expense.aggregate({ _sum: { amount: true } });

  const fuelCost = fuelSum._sum.cost || 0;
  const maintenanceCost = maintenanceSum._sum.cost || 0;
  const otherExpenses = expenseSum._sum.amount || 0;
  const totalExpenses = fuelCost + maintenanceCost + otherExpenses;
  
  const totalRevenue = totalExpenses === 0 ? 0 : Math.round(totalExpenses * 1.2); 
  const netProfit = totalRevenue - totalExpenses;

  const recentExpenses = await prisma.expense.findMany({
    take: 5,
    orderBy: { date: 'desc' },
    include: { vehicle: true }
  });

  const recentFuelLogs = await prisma.fuelLog.findMany({
    take: 5,
    orderBy: { date: 'desc' },
    include: { vehicle: true }
  });

  // Calculate fleet utilization and totalOperationalCost for legacy tests
  const denominator = totalVehicles - retiredVehiclesCount;
  let fleetUtilization = 0;
  if (denominator > 0) {
    fleetUtilization = (onTripVehicles / denominator) * 100;
    fleetUtilization = Math.round(fleetUtilization * 100) / 100;
  }
  const totalOperationalCost = totalExpenses;

  return {
    fleetUtilization,
    totalOperationalCost,
    manager: {
      totalVehicles,
      onTripVehicles,
      inShopVehicles,
      availableVehicles,
      recentVehicles,
      maintenanceAlerts
    },
    dispatcher: {
      activeTrips: activeTripsCount,
      pendingTrips: pendingTripsCount,
      availableDrivers: availableDriversCount,
      availableVehicles,
      recentTrips: activeTrips,
      recentDrivers: availableDriversList
    },
    safety: {
      totalDrivers,
      onDutyDrivers,
      avgSafetyScore,
      suspendedDrivers,
      recentDrivers,
      licenseAlerts
    },
    financial: {
      totalRevenue,
      totalExpenses,
      fuelCost,
      netProfit,
      recentExpenses,
      recentFuelLogs
    }
  };
};
