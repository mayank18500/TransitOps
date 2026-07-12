import React from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card } from '../components/ui/Cards';
import { Skeleton } from '../components/ui/SystemFeedback';

export default function Analytics() {
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Performance Analytics" subtitle="Data-driven insights into fleet efficiency and financial metrics." />
      
      <Section>
        <Grid cols={2} gap={6}>
          <Card className="flex flex-col gap-4">
            <h4 className="text-body-lg font-bold tracking-tight">Revenue vs Expenses</h4>
            <Skeleton variant="chart" className="!h-[250px]" />
          </Card>
          <Card className="flex flex-col gap-4">
            <h4 className="text-body-lg font-bold tracking-tight">Fleet Utilization</h4>
            <Skeleton variant="chart" className="!h-[250px]" />
          </Card>
          <Card className="flex flex-col gap-4">
            <h4 className="text-body-lg font-bold tracking-tight">Fuel Efficiency (MPG)</h4>
            <Skeleton variant="chart" className="!h-[250px]" />
          </Card>
          <Card className="flex flex-col gap-4">
            <h4 className="text-body-lg font-bold tracking-tight">Driver Safety Distribution</h4>
            <Skeleton variant="chart" className="!h-[250px]" />
          </Card>
        </Grid>
      </Section>
    </div>
  );
}
