import React, { useState, useEffect } from 'react';
import { PageHeader, Section, Grid } from '../components/ui/LayoutUtils';
import { Card, InfoCard } from '../components/ui/Cards';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Feedback';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Modal } from '../components/ui/Modal';
import axios from '../lib/axios';

export default function ExpenseDetails() {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const fetchExpense = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/expenses/${id}`);
      setExpense(res.data);
    } catch (error) {
      console.error('Error fetching expense:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Loading expense details...</div>;
  }

  if (!expense) {
    return <div className="p-8 text-center text-danger-fg">Expense not found</div>;
  }

  const expenseInfo = [
    { label: 'Expense ID', value: expense.id },
    { label: 'Date', value: new Date(expense.date).toLocaleDateString() },
    { label: 'Category', value: expense.category },
    { label: 'Amount', value: `$${expense.amount.toFixed(2)}` },
    { label: 'Vehicle', value: expense.vehicle ? `${expense.vehicle.registrationNumber} (${expense.vehicle.model})` : 'N/A' },
    { label: 'Trip ID', value: expense.tripId || 'N/A' },
  ];

  const handleDownload = () => {
    alert('Simulating PDF download for receipt...');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-2 text-text-muted mb-4">
        <Link to="/expenses" className="hover:text-text-primary transition-colors inline-flex items-center gap-1 font-semibold text-caption uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Expenses
        </Link>
      </div>

      <PageHeader title="Expense Details" subtitle={`View details for expense record (${expense.id.substring(0,8).toUpperCase()})`}>
        <Badge variant="muted">Completed</Badge>
        <Button variant="outline" icon={<Download size={18} />} onClick={handleDownload}>Download Receipt</Button>
      </PageHeader>
      
      <Section>
        <Grid cols={3} gap={6}>
          <div className="col-span-2 space-y-6">
            <InfoCard title="Expense Information" items={expenseInfo} />
            
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2">Description & Notes</h4>
              <p className="text-body text-text-secondary leading-relaxed">
                {expense.description || 'No additional description provided.'}
              </p>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="flex flex-col gap-4">
              <h4 className="text-body-lg font-bold tracking-tight border-b-4 border-border pb-2">Quick Actions</h4>
              <Button variant="primary" className="w-full" icon={<FileText size={18} />} onClick={() => setActiveModal('invoice')}>View Invoice</Button>
            </Card>
          </div>
        </Grid>
      </Section>

      <Modal isOpen={activeModal === 'invoice'} onClose={() => setActiveModal(null)} title="Invoice Document">
        <div className="space-y-6">
          <div className="border border-border-default rounded-lg p-6 bg-white text-black min-h-[400px]">
            <div className="flex justify-between items-start border-b pb-4 mb-4 border-gray-200">
              <div>
                <h2 className="text-2xl font-bold">INVOICE</h2>
                <p className="text-sm text-gray-500">#{expense.id.substring(0,8).toUpperCase()}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                {expense.vehicle && <p>Vehicle: {expense.vehicle.registrationNumber}</p>}
                {expense.tripId && <p>Trip: {expense.tripId.substring(0,8).toUpperCase()}</p>}
              </div>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4">{expense.description || expense.category}</td>
                  <td className="py-4 text-right font-bold">${expense.amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" icon={<Download size={16} />} onClick={handleDownload}>Download PDF</Button>
            <Button type="button" variant="primary" onClick={() => setActiveModal(null)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
