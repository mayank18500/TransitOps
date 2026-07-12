import React, { useState } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { Plus } from 'lucide-react';

export default function Fuel() {
  const [search, setSearch] = useState('');
  
  const columns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'vehicle', label: 'Vehicle', sortable: true },
    { key: 'driver', label: 'Driver', sortable: true },
    { key: 'liters', label: 'Quantity (L)', sortable: true, render: (row) => <span className="font-semibold">{row.liters}</span> },
    { key: 'odometer', label: 'Odometer (km)', sortable: true },
    { key: 'cost', label: 'Cost', sortable: true, render: (row) => <span className="font-bold text-text-primary">${row.cost}</span> },
  ];

  const data = [
    { id: 1, date: '2026-07-12', vehicle: 'TRK-9821', driver: 'John Doe', liters: 180, odometer: 144980, cost: 320 },
    { id: 2, date: '2026-07-11', vehicle: 'TRK-7734', driver: 'Jane Smith', liters: 250, odometer: 88900, cost: 450 },
    { id: 3, date: '2026-07-09', vehicle: 'TRK-1123', driver: 'Mike Johnson', liters: 150, odometer: 209500, cost: 280 },
    { id: 4, date: '2026-07-08', vehicle: 'TRK-9821', driver: 'John Doe', liters: 200, odometer: 144200, cost: 350 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Fuel Management" subtitle="Track fuel consumption, efficiency, and costs.">
        <Button variant="primary" icon={<Plus size={18} />}>
          Log Fuel
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search fuel logs..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} onSort={(conf) => console.log(conf)} />
        <Pagination currentPage={1} totalPages={6} onPageChange={() => {}} />
      </Section>
    </div>
  );
}
