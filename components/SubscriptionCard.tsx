import React from 'react';
import { Trash2, Bell, Calendar, CreditCard } from 'lucide-react';
import { Subscription } from '../types';

interface SubscriptionCardProps {
  subscription: Subscription;
  onDelete: (id: string) => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onDelete }) => {
  const daysLeft = Math.ceil(
    (new Date(subscription.expirationDate).getTime() - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
  );

  const isUrgent = daysLeft <= 2 && daysLeft >= 0;
  const isExpired = daysLeft < 0;

  return (
    <div className="glass-panel p-6 rounded-2xl relative group hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] shadow-xl border-l-4 border-l-transparent hover:border-l-blue-500 overflow-hidden">
        {/* Ambient Glow */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${isUrgent ? 'from-red-500/20 to-orange-500/20' : 'from-blue-500/10 to-purple-500/10'} rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-colors`}></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
            {subscription.name}
            {isUrgent && !isExpired && (
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            )}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subscription.description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
            {subscription.currency === 'NGN' ? '₦' : '$'}{subscription.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6 relative z-10">
        <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{new Date(subscription.expirationDate).toLocaleDateString()}</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium ${
            isExpired ? 'bg-red-500/10 text-red-500' :
            isUrgent ? 'bg-orange-500/10 text-orange-500' :
            'bg-green-500/10 text-green-500'
        }`}>
            <Bell className="w-4 h-4" />
            <span>
                {isExpired ? 'Expired' : 
                 daysLeft === 0 ? 'Due Today' : 
                 `${daysLeft} days left`}
            </span>
        </div>
      </div>

      <div className="flex justify-end relative z-10">
        <button
          onClick={() => onDelete(subscription.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-300 group-hover:opacity-100"
          aria-label="Delete subscription"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
