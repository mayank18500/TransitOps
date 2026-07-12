import React, { useState, useEffect } from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { Badge } from '../components/ui/Feedback';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';

export default function Expenses() {
  const [search, setSearch] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [vehicleFilter, setVehicleFilter] = useState('All');
  
  const [formData, setFormData] = useState({
    vehicleId: '',
    description: '',
    amount: ''
  });
  const [vehicles, setVehicles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  
  const columns = [
    { key: 'date', label: 'Date', sortable: true, render: (row) => new Date(row.date).toLocaleDateString() },
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => row.vehicle?.registrationNumber || 'Fleet' },
    { key: 'category', label: 'Category', sortable: true, render: () => (
      <Badge variant="muted">Expense</Badge>
    ) },
    { key: 'description', label: 'Description', sortable: false },
    { key: 'amount', label: 'Amount', sortable: true, render: (row) => <span className="font-bold text-text-primary">${row.amount}</span> },
    { key: 'actions', label: 'Actions', render: (row) => <Button variant="ghost" size="sm" onClick={() => navigate(`/expenses/${row.id}`)}>Details</Button> }
  ];

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Failed to fetch expenses', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // Pre-fetch vehicles for the filter dropdown
    api.get('/api/vehicles').then(res => setVehicles(res.data)).catch(console.error);
  }, []);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    if (vehicles.length === 0) {
      setIsLoadingOptions(true);
      try {
        const vRes = await api.get('/api/vehicles');
        setVehicles(vRes.data);
      } catch (error) {
        console.error('Failed to fetch options', error);
      } finally {
        setIsLoadingOptions(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/api/expenses', {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setIsModalOpen(false);
      setFormData({ vehicleId: '', description: '', amount: '' });
      fetchExpenses();
    } catch (error) {
      console.error('Failed to log expense', error);
      alert('Failed to log expense. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch = e.vehicle?.registrationNumber?.toLowerCase().includes(search.toLowerCase()) || 
                          e.description?.toLowerCase().includes(search.toLowerCase());
    const matchesVehicle = vehicleFilter === 'All' || (vehicleFilter === 'Fleet' ? !e.vehicleId : e.vehicleId === vehicleFilter);
    return matchesSearch && (!isFilterActive || matchesVehicle);
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Expense Ledger" subtitle="Track operational costs, fuel expenses, and fleet maintenance costs.">
        <Button variant="primary" icon={<Plus size={18} />} onClick={handleOpenModal}>
          Add Expense
        </Button>
      </PageHeader>
      
      <Section>
        <div className="space-y-4">
          <SearchBar 
            value={search} 
            onChange={setSearch} 
            placeholder="Search expenses by vehicle or description..." 
            isFilterActive={isFilterActive} 
            onFilterToggle={() => setIsFilterActive(!isFilterActive)} 
          />
          
          {isFilterActive && (
            <div className="p-4 bg-bg-surface border border-border-default rounded-lg animate-fade-in flex gap-4 items-end">
              <div className="w-64">
                <Select 
                  label="Filter by Vehicle" 
                  options={[
                    {value: 'All', label: 'All Vehicles & Fleet'},
                    {value: 'Fleet', label: 'General / Fleet Only'},
                    ...vehicles.map(v => ({ value: v.id, label: v.registrationNumber }))
                  ]}
                  value={vehicleFilter}
                  onChange={(e) => setVehicleFilter(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setVehicleFilter('All')}>Clear</Button>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-primary" />
          </div>
        ) : (
          <DataTable columns={columns} data={filteredExpenses} onSort={(conf) => console.log(conf)} />
        )}
        
        <Pagination currentPage={1} totalPages={Math.max(1, Math.ceil(filteredExpenses.length / 10))} onPageChange={() => {}} />
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Expense">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h4 className="text-body-lg font-bold tracking-tight pb-2 text-text-primary border-b border-border-default">Expense Details</h4>
          <Grid cols={2} gap={4}>
            <Select 
              label="Vehicle (Optional)" 
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              options={[{value: '', label: 'General / Fleet'}, ...vehicles.map(v => ({ value: v.id, label: v.registrationNumber }))]} 
              isLoading={isLoadingOptions}
            />
            <Input label="Amount ($)" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} placeholder="0.00" required />
          </Grid>
          <Input label="Description" name="description" value={formData.description} onChange={handleChange} placeholder="e.g. Toll fees, Office supplies..." required />

          <div className="pt-6 mt-4 border-t border-border-default flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button variant="primary" type="submit" icon={<CheckCircle2 size={18} />} isLoading={isSubmitting}>Save Expense</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
