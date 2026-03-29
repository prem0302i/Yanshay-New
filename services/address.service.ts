import { supabase } from '@/lib/supabase';

export const getUserAddress = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('street_address, landmark, city, state, postal_code, country, full_name')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const saveUserAddress = async (userId: string, address: any) => {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      street_address: address.street_address,
      landmark: address.landmark,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country || 'India'
     })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

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
