import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { useData } from '@/src/context/DataContext';
import { cn } from '@/src/lib/utils';
import { 
  UserCircle, 
  Plus, 
  Shield, 
  Mail,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  XCircle,
  CheckCircle
} from 'lucide-react';
import RecordModal from './RecordModal';

const roleColors: Record<string, string> = {
  'Admin': 'bg-purple-500/20 text-purple-400',
  'Manager': 'bg-blue-500/20 text-blue-400',
  'User': 'bg-emerald-500/20 text-emerald-400',
  'Viewer': 'bg-slate-500/20 text-slate-400',
};

export default function UserPipeline() {
  const { config } = useConfig();
  const { users, saveRecord, deleteRecord } = useData();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter((user: any) => {
    const matchesFilter = filter === 'all' || user.role === filter;
    const matchesSearch = !searchQuery || 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSave = async (data: any) => {
    const record = {
      name: data.name,
      email: data.email,
      role: data.role,
      status: 'Active',
      password: data.password || 'password123',
    };
    await saveRecord('users', record);
    setModalOpen(false);
  };

  return (
    <div className='p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar'>
      <RecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        objectType='user'
        onSave={handleSave}
      />
      <div className='flex flex-col sm:flex-row justify-between items-end gap-4'>
        <div>
          <h2 className='text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white'>Users</h2>
          <p className='text-on-surface-variant mt-1 text-sm'>Manage team members and permissions.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold rounded-full text-sm shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-transform'
        >
          <Plus className='w-4 h-4' />
          Add User
        </button>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
        <div className='flex gap-2'>
          {['all', 'Admin', 'Manager', 'User'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                filter === f 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container-low text-slate-400 hover:bg-white/10'
              )}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
        <div className='relative w-full sm:w-auto'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4' />
          <input
            type='text'
            placeholder='Search users...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full sm:w-64 bg-surface-container-lowest border border-white/10 rounded-xl pl-10 pr-4 py-2 text-on-surface text-sm focus:border-primary/50 focus:outline-none'
          />
        </div>
      </div>

      <div className='bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-white/5'>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>User</th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>Email</th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>Role</th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>Status</th>
                <th className='text-right px-6 py-4 text-sm font-semibold text-slate-400'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className='px-6 py-12 text-center text-slate-400'>
                    No users found. Click 'Add User' to create one.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user: any) => (
                  <tr key={user.id} className='border-b border-white/5 hover:bg-white/5 transition-colors'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-full flex items-center justify-center text-white font-bold'>
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <span className='font-medium text-white'>{user.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2 text-slate-400'>
                        <Mail className='w-4 h-4' />
                        {user.email || '-'}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={cn('px-3 py-1 rounded-full text-xs font-medium', roleColors[user.role] || roleColors['User'])}>
                        {user.role || 'User'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'
                      )}>
                        {user.status || 'Active'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-end gap-2'>
                        {user.status === 'Active' ? (
                          <button 
                            onClick={() => saveRecord('users', { ...user, status: 'Inactive' })}
                            className='p-2 text-slate-400 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors'
                            title='Deactivate'
                          >
                            <XCircle className='w-4 h-4' />
                          </button>
                        ) : (
                          <button 
                            onClick={() => saveRecord('users', { ...user, status: 'Active' })}
                            className='p-2 text-slate-400 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-colors'
                            title='Activate'
                          >
                            <CheckCircle className='w-4 h-4' />
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                              saveRecord('users', { ...user, status: 'Deleted' });
                            }
                          }}
                          className='p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors'
                          title='Delete'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-surface-container-low rounded-2xl p-6 border border-white/5'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-primary/20 rounded-lg'>
              <UserCircle className='w-5 h-5 text-primary' />
            </div>
            <span className='text-slate-400 text-sm'>Total Users</span>
          </div>
          <p className='text-2xl font-bold text-white'>{users.length}</p>
        </div>
        <div className='bg-surface-container-low rounded-2xl p-6 border border-white/5'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-purple-500/20 rounded-lg'>
              <Shield className='w-5 h-5 text-purple-400' />
            </div>
            <span className='text-slate-400 text-sm'>Admins</span>
          </div>
          <p className='text-2xl font-bold text-white'>{users.filter((u: any) => u.role === 'Admin').length}</p>
        </div>
        <div className='bg-surface-container-low rounded-2xl p-6 border border-white/5'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-blue-500/20 rounded-lg'>
              <Shield className='w-5 h-5 text-blue-400' />
            </div>
            <span className='text-slate-400 text-sm'>Managers</span>
          </div>
          <p className='text-2xl font-bold text-white'>{users.filter((u: any) => u.role === 'Manager').length}</p>
        </div>
        <div className='bg-surface-container-low rounded-2xl p-6 border border-white/5'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-emerald-500/20 rounded-lg'>
              <UserCircle className='w-5 h-5 text-emerald-400' />
            </div>
            <span className='text-slate-400 text-sm'>Users</span>
          </div>
          <p className='text-2xl font-bold text-white'>{users.filter((u: any) => u.role === 'User').length}</p>
        </div>
      </div>
    </div>
  );
}