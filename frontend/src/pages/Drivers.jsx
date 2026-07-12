import React, { useState } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip, Progress } from '../components/ui/Feedback';
import { Plus } from 'lucide-react';

export default function Drivers() {
  const [search, setSearch] = useState('');
  
  const columns = [
    { key: 'name', label: 'Driver Name', sortable: true },
    { key: 'licenseNumber', label: 'License Number', sortable: true },
    { key: 'licenseExpiry', label: 'License Expiry', sortable: true },
    { key: 'safetyScore', label: 'Safety Score', sortable: true, render: (row) => <div className="w-24"><Progress value={row.safetyScore} max={100} showLabel={true} /></div> },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: () => <Button variant="ghost" size="sm">View</Button> }
  ];

  const data = [
    { id: 1, name: 'Mike Johnson', licenseNumber: 'DL-44991', licenseExpiry: '2028-10-15', safetyScore: 98, status: 'Available' },
    { id: 2, name: 'Sarah Williams', licenseNumber: 'DL-22341', licenseExpiry: '2027-05-22', safetyScore: 92, status: 'Available' },
    { id: 3, name: 'John Doe', licenseNumber: 'DL-11882', licenseExpiry: '2026-11-30', safetyScore: 85, status: 'On Trip' },
    { id: 4, name: 'Jane Smith', licenseNumber: 'DL-99432', licenseExpiry: '2024-01-10', safetyScore: 72, status: 'Suspended' },
    { id: 5, name: 'Robert Chen', licenseNumber: 'DL-55211', licenseExpiry: '2026-08-01', safetyScore: 88, status: 'Off Duty' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Drivers Directory" subtitle="Manage driver records, track safety scores, and monitor compliance.">
        <Button variant="primary" icon={<Plus size={18} />}>
          Add Driver
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or license number..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} onSort={(conf) => console.log(conf)} />
        <Pagination currentPage={1} totalPages={2} onPageChange={() => {}} />
      </Section>
    </div>
  );
}
