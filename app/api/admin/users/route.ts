import { supabaseAdmin } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

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
