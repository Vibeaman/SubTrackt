import React, { useState } from 'react';
import { Plus, DollarSign, Calendar, Type, FileText } from 'lucide-react';
import { Subscription } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface SubscriptionFormProps {
  onAdd: (sub: Subscription) => void;
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !date) return;

    const newSub: Subscription = {
      id: uuidv4(),
      name,
      price: parseFloat(price),
      currency,
      description,
      expirationDate: date,
    };

    onAdd(newSub);
    setName('');
    setPrice('');
    setDescription('');
    setDate('');
  };

  return (
    <div className="glass-panel p-6 rounded-2xl mb-8 transform transition-all duration-500 hover:translate-z-4 perspective-1000">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-sm">
        Add Subscription
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Type className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Plan Name (e.g. Netflix)"
            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 dark:text-white backdrop-blur-sm"
            required
          />
        </div>

        {/* Price & Currency */}
        <div className="flex gap-4">
          <div className="relative group flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-lg font-bold text-gray-400 group-focus-within:text-green-500 transition-colors">
                {currency === 'NGN' ? '₦' : '$'}
              </span>
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder-gray-400 dark:text-white backdrop-blur-sm"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex bg-white/50 dark:bg-black/20 rounded-xl p-1 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setCurrency('NGN')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currency === 'NGN'
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'text-gray-500 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              ₦
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currency === 'USD'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-500 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              $
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FileText className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
          </div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-400 dark:text-white backdrop-blur-sm"
          />
        </div>

        {/* Date */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-700 dark:text-white backdrop-blur-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Tracker
        </button>
      </form>
    </div>
  );
};
