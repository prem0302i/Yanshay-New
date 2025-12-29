import { supabase } from '@/lib/supabase';

export const updateUserPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUsers = async () => {
  const response = await fetch('/api/admin/users');
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch users');
  }
  const data = await response.json();
  return data;
};
