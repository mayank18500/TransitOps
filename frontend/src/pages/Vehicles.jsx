import React, { useState, useEffect } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip } from '../components/ui/Feedback';
import { Plus } from 'lucide-react';
import { vehicleService } from '../services/vehicle.service';

export default function Vehicles() {
  const [search, setSearch] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const data = await vehicleService.getVehicles();
      setVehicles(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch vehicles');
    } finally {
      setIsLoading(false);
    }
  };
  
  const columns = [
    { key: 'registrationNumber', label: 'Plate Number', sortable: true },
    { key: 'model', label: 'Model', sortable: true },
    { key: 'maxLoadCapacity', label: 'Capacity (kg)', sortable: true },
    { key: 'odometer', label: 'Odometer (km)', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
    { key: 'actions', label: 'Actions', render: () => <Button variant="ghost" size="sm">View</Button> }
  ];

  const filteredVehicles = vehicles.filter(v => 
    v.registrationNumber.toLowerCase().includes(search.toLowerCase()) || 
    v.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Vehicles Directory" subtitle="Manage your fleet, track status, and schedule maintenance.">
        <Button variant="primary" icon={<Plus size={18} />}>
          Register Vehicle
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by plate number or model..." isFilterActive={false} onFilterToggle={() => {}} />
        
        {isLoading ? (
          <div className="p-8 text-center text-text-secondary">Loading vehicles...</div>
        ) : error ? (
          <div className="p-8 text-center text-status-error">{error}</div>
        ) : (
          <DataTable columns={columns} data={filteredVehicles} onSort={(conf) => console.log(conf)} />
        )}
        
        {!isLoading && !error && (
          <Pagination currentPage={1} totalPages={Math.ceil(filteredVehicles.length / 10) || 1} onPageChange={() => {}} />
        )}
      </Section>
    </div>
  );
}
