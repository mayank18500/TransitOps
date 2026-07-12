import express from 'express';
import cors from 'cors';
import healthRoute from './routes/health.route.js';
import authRoute from './routes/auth.route.js';
import vehicleRoute from './routes/vehicle.route.js';
import driverRoute from './routes/driver.route.js';
import maintenanceRoute from './routes/maintenance.route.js';
import tripRoute from './routes/trip.route.js';
import fuelRoute from './routes/fuel.route.js';
import expenseRoute from './routes/expense.route.js';
import dashboardRoute from './routes/dashboard.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', healthRoute);
app.use('/api/auth', authRoute);
app.use('/api/vehicles', vehicleRoute);
app.use('/api/drivers', driverRoute);
app.use('/api/maintenance', maintenanceRoute);
app.use('/api/trips', tripRoute);
app.use('/api/fuel', fuelRoute);
app.use('/api/expenses', expenseRoute);
app.use('/api/dashboard', dashboardRoute);

app.get('/', (req, res) => {
  res.send('TransitOps Backend Running');
});

export default app;
