import React, { useState } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip } from '../components/ui/Feedback';
import { Plus } from 'lucide-react';

export default function Maintenance() {
  const [search, setSearch] = useState('');
  
  const columns = [
    { key: 'vehicle', label: 'Vehicle', sortable: true },
    { key: 'type', label: 'Maintenance Type', sortable: true },
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'cost', label: 'Cost', sortable: true, render: (row) => <span className="font-bold">${row.cost}</span> },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: () => <Button variant="ghost" size="sm">Details</Button> }
  ];

  const data = [
    { id: 1, vehicle: 'TRK-9821', type: 'Engine Oil Change', startDate: '2026-07-15', cost: 450, status: 'Pending' },
    { id: 2, vehicle: 'TRK-3341', type: 'Brake Pad Replacement', startDate: '2026-07-10', cost: 850, status: 'Resolved' },
    { id: 3, vehicle: 'TRK-1123', type: 'Transmission Service', startDate: '2026-07-08', cost: 1200, status: 'Resolved' },
    { id: 4, vehicle: 'TRK-7734', type: 'Tire Replacement', startDate: '2026-07-18', cost: 2400, status: 'Scheduled' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Maintenance Logs" subtitle="Track repairs, schedule services, and monitor fleet health.">
        <Button variant="primary" icon={<Plus size={18} />}>
          Log Maintenance
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search maintenance logs..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} onSort={(conf) => console.log(conf)} />
        <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
      </Section>
    </div>
  );
}
