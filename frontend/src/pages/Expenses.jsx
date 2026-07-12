import React, { useState } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { Badge } from '../components/ui/Feedback';
import { Plus } from 'lucide-react';

export default function Expenses() {
  const [search, setSearch] = useState('');
  
  const columns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'vehicle', label: 'Vehicle', sortable: true },
    { key: 'category', label: 'Category', sortable: true, render: (row) => (
      <Badge variant={row.category === 'Repair' ? 'warning' : row.category === 'Insurance' ? 'info' : row.category === 'Fuel' ? 'brand' : 'muted'}>
        {row.category}
      </Badge>
    ) },
    { key: 'description', label: 'Description', sortable: false },
    { key: 'amount', label: 'Amount', sortable: true, render: (row) => <span className="font-bold text-text-primary">${row.amount}</span> },
    { key: 'actions', label: 'Actions', render: () => <Button variant="ghost" size="sm">Details</Button> }
  ];

  const data = [
    { id: 1, date: '2026-07-12', vehicle: 'TRK-9821', category: 'Fuel', description: 'Diesel refill - 180L', amount: 320 },
    { id: 2, date: '2026-07-11', vehicle: 'TRK-7734', category: 'Fuel', description: 'Diesel refill - 250L', amount: 450 },
    { id: 3, date: '2026-07-10', vehicle: 'TRK-1123', category: 'Repair', description: 'Engine oil and filter change', amount: 450 },
    { id: 4, date: '2026-07-05', vehicle: 'Fleet', category: 'Office', description: 'Office supplies', amount: 120 },
    { id: 5, date: '2026-07-01', vehicle: 'Fleet', category: 'Insurance', description: 'Annual fleet insurance premium', amount: 12000 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Expense Ledger" subtitle="Track operational costs, fuel expenses, and fleet maintenance costs.">
        <Button variant="primary" icon={<Plus size={18} />}>
          Add Expense
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search expenses by vehicle or description..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} onSort={(conf) => console.log(conf)} />
        <Pagination currentPage={1} totalPages={8} onPageChange={() => {}} />
      </Section>
    </div>
  );
}
