import React, { useState } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip } from '../components/ui/Feedback';
import { Plus } from 'lucide-react';

export default function Trips() {
  const [search, setSearch] = useState('');
  
  const columns = [
    { key: 'tripId', label: 'Trip ID', sortable: true, render: (row) => <span className="font-bold">{row.tripId}</span> },
    { key: 'vehicle', label: 'Vehicle', sortable: true },
    { key: 'driver', label: 'Driver', sortable: true },
    { key: 'destination', label: 'Destination', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: () => <Button variant="ghost" size="sm">Manage</Button> }
  ];

  const data = [
    { id: 1, tripId: 'TRP-1049', vehicle: 'TRK-9821', driver: 'John Doe', destination: 'Los Angeles, CA', date: '2026-07-12', status: 'Dispatched' },
    { id: 2, tripId: 'TRP-1050', vehicle: 'TRK-7734', driver: 'Jane Smith', destination: 'Phoenix, AZ', date: '2026-07-12', status: 'Dispatched' },
    { id: 3, tripId: 'TRP-1051', vehicle: 'TRK-1123', driver: 'Mike Johnson', destination: 'Las Vegas, NV', date: '2026-07-14', status: 'Draft' },
    { id: 4, tripId: 'TRP-1045', vehicle: 'TRK-8812', driver: 'Sarah Williams', destination: 'Seattle, WA', date: '2026-07-10', status: 'Completed' },
    { id: 5, tripId: 'TRP-1042', vehicle: 'TRK-4452', driver: 'Robert Chen', destination: 'Denver, CO', date: '2026-07-08', status: 'Cancelled' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Trips Management" subtitle="Dispatch vehicles, assign drivers, and monitor active trips in real-time.">
        <Button variant="primary" icon={<Plus size={18} />}>
          Create Trip
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by Trip ID, vehicle, or driver..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} onSort={(conf) => console.log(conf)} />
        <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
      </Section>
    </div>
  );
}
