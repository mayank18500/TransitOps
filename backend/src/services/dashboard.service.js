import prisma from '../lib/prisma.js';

export const getDashboardStats = async () => {
  // Aggregate operational costs
  const fuelSum = await prisma.fuelLog.aggregate({
    _sum: { cost: true }
  });
  const maintenanceSum = await prisma.maintenance.aggregate({
    _sum: { cost: true }
  });
  const expenseSum = await prisma.expense.aggregate({
    _sum: { amount: true }
  });

  const totalFuelCost = fuelSum._sum.cost || 0;
  const totalMaintenanceCost = maintenanceSum._sum.cost || 0;
  const totalExpenseCost = expenseSum._sum.amount || 0;
  const totalOperationalCost = totalFuelCost + totalMaintenanceCost + totalExpenseCost;

  // Calculate fleet utilization
  const vehicles = await prisma.vehicle.findMany();
  const totalRegistered = vehicles.length;
  const retiredCount = vehicles.filter(v => v.status === 'Retired').length;
  const onTripCount = vehicles.filter(v => v.status === 'On Trip').length;

  const denominator = totalRegistered - retiredCount;
  let fleetUtilization = 0;
  if (denominator > 0) {
    fleetUtilization = (onTripCount / denominator) * 100;
    // Round to 2 decimal places
    fleetUtilization = Math.round(fleetUtilization * 100) / 100;
  }

  return {
    fleetUtilization,
    totalOperationalCost
  };
};
