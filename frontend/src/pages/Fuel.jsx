import React, { useState, useEffect } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { Plus } from 'lucide-react';
import api from '../lib/axios';

export default function Fuel() {
  const [search, setSearch] = useState('');
  const [fuelLogs, setFuelLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const columns = [
    { key: 'date', label: 'Date', sortable: true, render: (row) => new Date(row.date).toLocaleDateString() },
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => row.vehicle?.registrationNumber || 'N/A' },
    { key: 'driver', label: 'Driver', sortable: true, render: (row) => row.trip?.driver?.name || 'N/A' },
    { key: 'liters', label: 'Quantity (L)', sortable: true, render: (row) => <span className="font-semibold">{row.liters}</span> },
    { key: 'odometer', label: 'Odometer (km)', sortable: true, render: (row) => row.vehicle?.odometer || 0 },
    { key: 'cost', label: 'Cost', sortable: true, render: (row) => <span className="font-bold text-text-primary">${row.cost}</span> },
  ];

  useEffect(() => {
    const fetchFuelLogs = async () => {
      try {
        const response = await api.get('/api/fuel');
        setFuelLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch fuel logs', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFuelLogs();
  }, []);

  const filteredLogs = fuelLogs.filter((f) => 
    f.vehicle?.registrationNumber?.toLowerCase().includes(search.toLowerCase()) || 
    f.trip?.driver?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Fuel Management" subtitle="Track fuel consumption, efficiency, and costs.">
        <Button variant="primary" icon={<Plus size={18} />}>
          Log Fuel
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search fuel logs..." isFilterActive={false} onFilterToggle={() => {}} />
        
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
