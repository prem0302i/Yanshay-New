import { supabase } from '@/lib/supabase';

export const saveDesign = async (userId: string, designData: any, previewUrl: string, printUrl: string) => {
  const { data, error } = await supabase
    .from('designs')
    .insert([
      { 
        user_id: userId, 
        design_data: designData, 
        preview_url: previewUrl, 
        print_url: printUrl 
      }
    ]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
