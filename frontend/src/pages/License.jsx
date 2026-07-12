import React, { useState } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip } from '../components/ui/Feedback';

export default function License() {
  const [search, setSearch] = useState('');
  
  const columns = [
    { key: 'driver', label: 'Driver', sortable: true },
    { key: 'licenseNumber', label: 'License Number', sortable: true },
    { key: 'type', label: 'Class', sortable: true },
    { key: 'expiryDate', label: 'Expiry Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: () => <Button variant="ghost" size="sm">Renew</Button> }
  ];

  const data = [
    { id: 1, driver: 'Mike Johnson', licenseNumber: 'DL-44991', type: 'Class A CDL', expiryDate: '2028-10-15', status: 'Active' },
    { id: 2, driver: 'Sarah Williams', licenseNumber: 'DL-22341', type: 'Class A CDL', expiryDate: '2027-05-22', status: 'Active' },
    { id: 3, driver: 'Jane Smith', licenseNumber: 'DL-99432', type: 'Class B CDL', expiryDate: '2024-01-10', status: 'Expired' },
    { id: 4, driver: 'Robert Chen', licenseNumber: 'DL-55211', type: 'Class A CDL', expiryDate: '2026-08-01', status: 'Expiring Soon' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="License Compliance" subtitle="Monitor driver certifications, renewals, and medical cards." />
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search licenses..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} onSort={(conf) => console.log(conf)} />
        <Pagination currentPage={1} totalPages={2} onPageChange={() => {}} />
      </Section>
    </div>
  );
}
