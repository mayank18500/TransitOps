import React, { useState, useEffect } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { StatusChip, Progress } from '../components/ui/Feedback';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Overlays';
import { Plus } from 'lucide-react';
import { driverService } from '../services/driver.service';

export default function Drivers() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', licenseNumber: '', licenseCategory: 'CDL-A', licenseExpiry: '', contactNumber: '' });

  const fetchDrivers = async () => {
    setIsLoading(true);
    try {
      const drivers = await driverService.getAllDrivers();
      setData(drivers);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await driverService.createDriver({
        ...formData,
        licenseExpiry: new Date(formData.licenseExpiry).toISOString()
      });
      setIsModalOpen(false);
      fetchDrivers();
    } catch (err) {
      console.error(err);
      alert('Failed to add driver');
    }
  };

  const columns = [
    { key: 'name', label: 'Driver Name', sortable: true },
    { key: 'licenseNumber', label: 'License Number', sortable: true },
    { key: 'licenseExpiry', label: 'License Expiry', sortable: true, render: (row) => new Date(row.licenseExpiry).toLocaleDateString() },
    { key: 'safetyScore', label: 'Safety Score', sortable: true, render: (row) => <div className="w-24"><Progress value={row.safetyScore} max={100} showLabel={true} /></div> },
    { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusChip status={row.status} /> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Drivers Directory" subtitle="Manage driver records, track safety scores, and monitor compliance.">
        <Button variant="primary" icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
          Add Driver
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or license number..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} isLoading={isLoading} onSort={() => {}} />
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Driver">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input label="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <Input label="License Number" required value={formData.licenseNumber} onChange={e => setFormData({...formData, licenseNumber: e.target.value})} />
          <Input label="License Expiry" type="date" required value={formData.licenseExpiry} onChange={e => setFormData({...formData, licenseExpiry: e.target.value})} />
          <Input label="Contact Number" required value={formData.contactNumber} onChange={e => setFormData({...formData, contactNumber: e.target.value})} />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Driver</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
