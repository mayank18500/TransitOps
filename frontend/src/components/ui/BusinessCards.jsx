import React from 'react';
import { Truck, Compass, ShieldAlert, BadgeDollarSign, Calendar, Flame, PenTool } from 'lucide-react';
import { Card } from './Cards';
import { StatusChip, Badge } from './Feedback';
import { Progress } from './Feedback';
import { cn } from '../../utils/cn';

export const VehicleCard = ({
  className,
  plateNumber,
  model,
  status,
  payloadCapacity,
  currentWeight = 0,
  odometer,
  onAction,
  ...props
}) => {
  return (
    <Card isHoverable className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-body-lg font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Truck className="h-4 w-4 text-text-secondary" />
            {plateNumber}
          </h4>
          <p className="text-caption text-text-secondary">{model}</p>
        </div>
        <StatusChip status={status} />
      </div>

      <div className="space-y-3">
        <div className="text-caption space-y-1">
          <div className="flex justify-between text-text-muted">
            <span>Payload Capacity</span>
            <span>{currentWeight} / {payloadCapacity} kg</span>
          </div>
          <Progress value={currentWeight} max={payloadCapacity} />
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3 text-caption text-text-muted">
          <span>Odometer: <strong className="text-text-secondary font-semibold">{odometer} km</strong></span>
          {onAction && (
            <button
              onClick={onAction}
              className="text-brand-primary font-semibold hover:underline"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export const DriverCard = ({
  className,
  name,
  licenseNumber,
  licenseExpiry,
  safetyScore,
  status,
  onAction,
  ...props
}) => {
  return (
    <Card isHoverable className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-body-lg font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Compass className="h-4 w-4 text-text-secondary" />
            {name}
          </h4>
          <p className="text-caption text-text-secondary">License: {licenseNumber}</p>
        </div>
        <StatusChip status={status} />
      </div>

      <div className="space-y-3">
        <div className="text-caption space-y-1">
          <div className="flex justify-between text-text-muted">
            <span>Safety Score</span>
            <span className={cn(
              'font-semibold',
              safetyScore >= 85 ? 'text-success-fg' : safetyScore >= 70 ? 'text-warning-fg' : 'text-danger-fg'
            )}>
              {safetyScore} / 100
            </span>
          </div>
          <Progress value={safetyScore} max={100} />
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3 text-caption text-text-muted">
          <span>Expires: <strong className="text-text-secondary font-semibold">{licenseExpiry}</strong></span>
          {onAction && (
            <button
              onClick={onAction}
              className="text-brand-primary font-semibold hover:underline"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export const TripCard = ({
  className,
  tripId,
  vehicle,
  driver,
  cargoWeight,
  destination,
  status,
  onAction,
  ...props
}) => {
  return (
    <Card isHoverable className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-body-lg font-bold tracking-tight text-text-primary flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-text-secondary" />
            Trip #{tripId}
          </h4>
          <p className="text-caption text-text-secondary">To: {destination}</p>
        </div>
        <StatusChip status={status} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-caption text-text-muted border-t border-b border-border py-2.5 my-1">
        <div>
          <span>Vehicle</span>
          <p className="text-text-primary font-semibold">{vehicle}</p>
        </div>
        <div>
          <span>Driver</span>
          <p className="text-text-primary font-semibold">{driver}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-caption text-text-muted">
        <span>Cargo Weight: <strong className="text-text-secondary font-semibold">{cargoWeight} kg</strong></span>
        {onAction && (
          <button
            onClick={onAction}
            className="text-brand-primary font-semibold hover:underline"
          >
            Manage
          </button>
        )}
      </div>
    </Card>
  );
};

export const MaintenanceCard = ({
  className,
  vehicle,
  type,
  cost,
  startDate,
  endDate,
  status,
  ...props
}) => {
  return (
    <Card isHoverable className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-body-lg font-bold tracking-tight text-text-primary flex items-center gap-2">
            <PenTool className="h-4 w-4 text-text-secondary" />
            {vehicle}
          </h4>
          <p className="text-caption text-text-secondary">{type}</p>
        </div>
        <Badge variant={status === 'Resolved' ? 'success' : 'warning'}>
          {status}
        </Badge>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3 text-caption text-text-muted">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {startDate}
        </span>
        <span className="font-bold text-text-primary">${cost}</span>
      </div>
    </Card>
  );
};

export const FuelCard = ({
  className,
  vehicle,
  liters,
  cost,
  date,
  odometer,
  ...props
}) => {
  return (
    <Card isHoverable className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-body-lg font-bold tracking-tight text-text-primary flex items-center gap-2">
            <Flame className="h-4 w-4 text-text-secondary" />
            {vehicle}
          </h4>
          <p className="text-caption text-text-secondary">Fuel Log</p>
        </div>
        <Badge variant="info">Fuel</Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-caption text-text-muted border-t border-b border-border py-2.5 my-1">
        <div>
          <span>Quantity</span>
          <p className="text-text-primary font-semibold">{liters} L</p>
        </div>
        <div>
          <span>Odometer</span>
          <p className="text-text-primary font-semibold">{odometer} km</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-caption text-text-muted">
        <span>Date: <strong className="text-text-secondary font-semibold">{date}</strong></span>
        <span className="font-bold text-text-primary">${cost}</span>
      </div>
    </Card>
  );
};

export const ExpenseCard = ({
  className,
  vehicle,
  category,
  cost,
  date,
  description,
  ...props
}) => {
  return (
    <Card isHoverable className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-body-lg font-bold tracking-tight text-text-primary flex items-center gap-2">
            <BadgeDollarSign className="h-4 w-4 text-text-secondary" />
            {vehicle || 'General Fleet'}
          </h4>
          <p className="text-caption text-text-secondary">{description || category}</p>
        </div>
        <Badge variant={category === 'Repair' ? 'warning' : category === 'Insurance' ? 'info' : 'muted'}>
          {category}
        </Badge>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3 text-caption text-text-muted">
        <span>Date: <strong className="text-text-secondary font-semibold">{date}</strong></span>
        <span className="font-bold text-text-primary">${cost}</span>
      </div>
    </Card>
  );
};
