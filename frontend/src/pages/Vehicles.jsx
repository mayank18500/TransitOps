import React, { useState } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip } from '../components/ui/Feedback';
import { Plus } from 'lucide-react';

export default function Vehicles() {
  const [search, setSearch] = useState('');
  
  const columns = [
    { key: 'plateNumber', label: 'Plate Number', sortable: true },
    { key: 'model', label: 'Model', sortable: true },
    { key: 'payloadCapacity', label: 'Capacity (kg)', sortable: true },
    { key: 'odometer', label: 'Odometer (km)', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: () => <Button variant="ghost" size="sm">View</Button> }
  ];

  const data = [
    { id: 1, plateNumber: 'TRK-9821', model: 'Volvo FH16', payloadCapacity: 20000, odometer: 145000, status: 'Available' },
    { id: 2, plateNumber: 'TRK-7734', model: 'Scania R500', payloadCapacity: 24000, odometer: 89000, status: 'On Trip' },
    { id: 3, plateNumber: 'TRK-1123', model: 'Mercedes Actros', payloadCapacity: 18000, odometer: 210000, status: 'In Shop' },
    { id: 4, plateNumber: 'TRK-4452', model: 'Volvo FH16', payloadCapacity: 20000, odometer: 320000, status: 'Retired' },
    { id: 5, plateNumber: 'TRK-8812', model: 'Peterbilt 579', payloadCapacity: 22000, odometer: 55000, status: 'Available' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Vehicles Directory" subtitle="Manage your fleet, track status, and schedule maintenance.">
        <Button variant="primary" icon={<Plus size={18} />}>
          Register Vehicle
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by plate number or model..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} onSort={(conf) => console.log(conf)} />
        <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
      </Section>
    </div>
  );
}
