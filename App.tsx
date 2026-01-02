import React, { useState, useEffect } from 'react';
import { Subscription, Theme } from './types';
import { STORAGE_KEY, THEME_KEY } from './constants';
import { sendReminderEmail } from './services/notificationService';
import { ThemeToggle } from './components/ThemeToggle';
import { SubscriptionForm } from './components/SubscriptionForm';
import { SubscriptionCard } from './components/SubscriptionCard';
import { Footer } from './components/Footer';
import { LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [theme, setTheme] = useState<Theme>('dark');
  const [loading, setLoading] = useState(true);

  // Load Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to dark
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Load Subscriptions
  useEffect(() => {
    const savedSubs = localStorage.getItem(STORAGE_KEY);
    if (savedSubs) {
      try {
        setSubscriptions(JSON.parse(savedSubs));
      } catch (e) {
        console.error("Failed to parse subscriptions", e);
      }
    }
    setLoading(false);
  }, []);

  // Save Subscriptions
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
    }
  }, [subscriptions, loading]);

  // Check for Reminders logic
  useEffect(() => {
    if (loading) return;

    const checkReminders = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayString = today.toISOString().split('T')[0];

      const updatedSubscriptions = [...subscriptions];
      let hasChanges = false;

      for (let i = 0; i < updatedSubscriptions.length; i++) {
        const sub = updatedSubscriptions[i];
        const expiryDate = new Date(sub.expirationDate);
        expiryDate.setHours(0, 0, 0, 0);

        // Calculate difference in days
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Logic: Exactly 2 days left AND hasn't been notified today
        // We track lastNotified by Date String to avoid multiple emails on the same day
        if (diffDays === 2 && sub.lastNotified !== todayString) {
          console.log(`Triggering email for ${sub.name}`);
          const sent = await sendReminderEmail(sub);
          
          if (sent) {
            updatedSubscriptions[i] = {
              ...sub,
              lastNotified: todayString
            };
            hasChanges = true;
          }
        }
      }

      if (hasChanges) {
        setSubscriptions(updatedSubscriptions);
      }
    };

    checkReminders();
    // We only want to run this once on mount/load, or potentially on an interval. 
    // running on subscriptions change might cause loops if we aren't careful, 
    // but updating lastNotified inside the array fixes that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]); 

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const addSubscription = (sub: Subscription) => {
    setSubscriptions(prev => [sub, ...prev]);
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-100 dark:bg-[#0f172a] transition-colors duration-500">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/30 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                SubTrak
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
                Expense & Subscription Manager
              </p>
            </div>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </header>

        {/* Main Content */}
        <main>
          <SubscriptionForm onAdd={addSubscription} />
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 pl-2 border-l-4 border-blue-500 mb-6">
              Active Subscriptions
            </h2>
            
            {subscriptions.length === 0 ? (
              <div className="glass-panel rounded-2xl p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No subscriptions tracked yet.</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Add one above to get started.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {subscriptions.map(sub => (
                  <SubscriptionCard 
                    key={sub.id} 
                    subscription={sub} 
                    onDelete={deleteSubscription} 
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
