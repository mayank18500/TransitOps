import React from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card } from '../components/ui/Cards';
import { Button } from '../components/ui/Button';
import { Download } from 'lucide-react';

export default function Reports() {
  const reports = [
    { title: 'Monthly Financial Summary', description: 'Comprehensive overview of revenue, expenses, and net profit for the last 30 days.' },
    { title: 'Fleet Maintenance Log', description: 'Detailed record of all maintenance activities, repairs, and associated costs.' },
    { title: 'Driver Safety & Compliance', license: 'Current status of driver licenses, safety scores, and recent incidents.' },
    { title: 'Fuel Consumption Analysis', description: 'Breakdown of fuel usage per vehicle and driver, highlighting efficiency trends.' },
    { title: 'Trip Performance Metrics', description: 'Analysis of on-time deliveries, route durations, and cargo capacities.' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="System Reports" subtitle="Generate, view, and export operational reports." />
      
      <Section>
        <Grid cols={2} gap={6}>
          {reports.map((report, idx) => (
            <Card key={idx} className="flex flex-col gap-4">
              <div className="flex-1">
                <h4 className="text-body-lg font-bold tracking-tight mb-2">{report.title}</h4>
                <p className="text-caption text-text-secondary">{report.description || report.license}</p>
              </div>
              <div className="pt-4 border- border-border flex gap-3">
                <Button variant="primary" className="flex-1" icon={<Download size={16} />}>Generate</Button>
                <Button variant="outline" className="flex-1">Schedule</Button>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>
    </div>
  );
}
