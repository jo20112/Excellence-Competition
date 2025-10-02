import { supabase } from './supabase';

export interface Admin {
  id: string;
  admin_id?: string;
  name: string;
  initials: string;
  avatar_url?: string;
  total_points: number;
  attendance: number;
  delays: number;
  absences: number;
  last_reward_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PublicAdmin {
  id: string;
  admin_id?: string;
  name: string;
  initials: string;
  avatar_url?: string;
  total_points: number;
}

export interface AdminAction {
  id?: string;
  admin_id: string;
  action_type: string;
  points: number;
  description?: string;
  performed_by?: string;
  created_at?: string;
}

export async function fetchAdmins(): Promise<Admin[]> {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .order('total_points', { ascending: false });

  if (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }

  return data || [];
}

export async function fetchPublicAdmins(): Promise<PublicAdmin[]> {
  const { data, error } = await supabase
    .from('admins')
    .select('id, admin_id, name, initials, avatar_url, total_points')
    .order('total_points', { ascending: false });

  if (error) {
    console.error('Error fetching public admins:', error);
    throw error;
  }

  return data || [];
}

export async function addAdmin(name: string, initials: string, adminId?: string, avatarUrl?: string): Promise<Admin> {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('admins')
    .insert({
      name,
      initials,
      admin_id: adminId,
      avatar_url: avatarUrl,
      total_points: 0,
      attendance: 0,
      delays: 0,
      absences: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding admin:', error);
    throw error;
  }

  return data;
}

export async function updateAdmin(id: string, name: string, initials: string, adminId?: string, avatarUrl?: string): Promise<Admin> {
  const updates: any = {
    name,
    initials,
    admin_id: adminId,
  };

  if (avatarUrl) {
    updates.avatar_url = avatarUrl;
  }

  const { data, error } = await supabase
    .from('admins')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating admin:', error);
    throw error;
  }

  return data;
}

export async function updateAdminPoints(
  adminId: string,
  pointsChange: number,
  actionType: string,
  description: string
): Promise<void> {
  const { data: admin, error: fetchError } = await supabase
    .from('admins')
    .select('total_points, attendance, delays, absences')
    .eq('id', adminId)
    .single();

  if (fetchError) {
    console.error('Error fetching admin:', fetchError);
    throw fetchError;
  }

  const newTotalPoints = admin.total_points + pointsChange;
  const updates: any = { total_points: newTotalPoints };

  if (actionType.includes('حضور') || actionType.includes('التزام')) {
    updates.attendance = admin.attendance + 1;
  } else if (actionType.includes('تأخير')) {
    updates.delays = admin.delays + 1;
  } else if (actionType.includes('غياب')) {
    updates.absences = admin.absences + 1;
  }

  const { error: updateError } = await supabase
    .from('admins')
    .update(updates)
    .eq('id', adminId);

  if (updateError) {
    console.error('Error updating admin:', updateError);
    throw updateError;
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { error: actionError } = await supabase
    .from('admin_actions')
    .insert({
      admin_id: adminId,
      action_type: actionType,
      points: pointsChange,
      description,
      performed_by: user?.id,
    });

  if (actionError) {
    console.error('Error logging action:', actionError);
    throw actionError;
  }
}

export async function uploadAvatar(file: File, adminId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${adminId}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.error('Error uploading avatar:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  await supabase
    .from('admins')
    .update({ avatar_url: data.publicUrl })
    .eq('id', adminId);

  return data.publicUrl;
}
