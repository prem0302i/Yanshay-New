import { supabase } from '@/lib/supabase';

export const getAddresses = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_addresses')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addAddress = async (userId: string, address: any) => {
  const { data, error } = await supabase
    .from('user_addresses')
    .insert([{ ...address, user_id: userId }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
