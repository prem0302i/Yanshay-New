import { supabaseAdmin } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    console.log('Attempting to delete user with ID:', id);

    if (!id) {
      console.error('User ID is missing from the request.');
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Delete from carts
    const { error: cartError } = await supabaseAdmin.from('carts').delete().eq('user_id', id);
    if (cartError) {
      console.error('Error deleting user carts:', cartError.message);
      return NextResponse.json({ error: cartError.message }, { status: 500 });
    }

    // Delete from orders (and cascade to order_items)
    const { error: orderError } = await supabaseAdmin.from('orders').delete().eq('user_id', id);
    if (orderError) {
      console.error('Error deleting user orders:', orderError.message);
      return NextResponse.json({ error: orderError.message }, { status: 500 });
    }

    // Delete from profiles
    const { error: profileError } = await supabaseAdmin.from('profiles').delete().eq('id', id);
    if (profileError) {
      console.error('Error deleting user profile:', profileError.message);
      // Not returning error here in case profile doesn't exist
    }

    // Finally, delete the user from auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (authError) {
      console.error('Error deleting user from Supabase Auth:', authError.message);
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const userData = users.map(user => ({
      id: user.id,
      full_name: user.user_metadata.full_name,
      email: user.email,
    }));

    return NextResponse.json(userData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
