import React, { useState, useEffect } from 'react';
import { PageHeader, Section } from '../components/ui/LayoutUtils';
import { SearchBar, Pagination } from '../components/ui/NavigationUtils';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { Badge } from '../components/ui/Feedback';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Overlays';
import { Plus } from 'lucide-react';
import { expenseService } from '../services/expense.service';
import { vehicleService } from '../services/vehicle.service';

export default function Expenses() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ description: '', amount: '', vehicleId: '' });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const expenses = await expenseService.getAllExpenses();
      const vecs = await vehicleService.getVehicles();
      setData(expenses);
      setVehicles(vecs);
      if (vecs.length > 0) setFormData(prev => ({ ...prev, vehicleId: vecs[0].id }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await expenseService.createExpense({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to add expense');
    }
  };

  const columns = [
    { key: 'date', label: 'Date', sortable: true, render: (row) => new Date(row.date).toLocaleDateString() },
    { key: 'vehicle', label: 'Vehicle', sortable: true, render: (row) => row.vehicle?.registrationNumber || 'Unknown' },
    { key: 'description', label: 'Description', sortable: false },
    { key: 'amount', label: 'Amount', sortable: true, render: (row) => <span className="font-bold text-text-primary">${row.amount}</span> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title="Expense Ledger" subtitle="Track operational costs, fuel expenses, and fleet maintenance costs.">
        <Button variant="primary" icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
          Add Expense
        </Button>
      </PageHeader>
      
      <Section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search expenses..." isFilterActive={false} onFilterToggle={() => {}} />
        <DataTable columns={columns} data={data} isLoading={isLoading} onSort={() => {}} />
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Expense">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <Input label="Description" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <Input label="Amount ($)" type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
          <Select 
            label="Vehicle" 
            options={vehicles.map(v => ({ value: v.id, label: v.registrationNumber }))}
            value={formData.vehicleId}
            onChange={e => setFormData({...formData, vehicleId: e.target.value})}
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Expense</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
