import React, { useState, useEffect } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip } from '../components/ui/Feedback';
import { Plus } from 'lucide-react';
import api from '../lib/axios';

export default function Maintenance() {
  const [search, setSearch] = useState('');
  const [maintenance, setMaintenance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const columns = [
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => row.vehicle?.registrationNumber || 'Unknown' },
    { key: 'description', label: 'Maintenance Type', sortable: true },
    { key: 'date', label: 'Date', sortable: true, render: (row) => new Date(row.date).toLocaleDateString() },
    { key: 'cost', label: 'Cost', sortable: true, render: (row) => <span className="font-bold">${row.cost}</span> },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: () => <Button variant="ghost" size="sm">Details</Button> }
  ];

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const response = await api.get('/api/maintenance');
        setMaintenance(response.data);
      } catch (error) {
        console.error('Failed to fetch maintenance logs', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMaintenance();
  }, []);

  const filteredLogs = maintenance.filter((m) => 
    m.vehicle?.registrationNumber?.toLowerCase().includes(search.toLowerCase()) || 
    m.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Maintenance Logs" subtitle="Track repairs, schedule services, and monitor fleet health.">
        <Button variant="primary" icon={<Plus size={18} />}>
          Log Maintenance
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search maintenance logs..." isFilterActive={false} onFilterToggle={() => {}} />
        
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-primary" />
          </div>
        ) : (
          <DataTable columns={columns} data={filteredLogs} onSort={(conf) => console.log(conf)} />
        )}
        
        <Pagination currentPage={1} totalPages={Math.max(1, Math.ceil(filteredLogs.length / 10))} onPageChange={() => {}} />
      </Section>
    </div>
  );
}
