import { createClient } from '@supabase/supabase-js';

const supabaseUrl    = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const bucket         = import.meta.env.VITE_SUPABASE_BUCKET || 'portfolio-images';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload a File object to Supabase Storage and return the permanent public URL.
 * @param {File} file
 * @param {string} folder  e.g. "projects" | "avatars" | "profile"
 * @returns {Promise<string>} public URL
 */
export async function uploadImage(file, folder = 'uploads') {
    const ext      = file.name.split('.').pop();
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
        .from(bucket)
        .upload(filename, file, { upsert: false, contentType: file.type });

    if (error) throw error;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
    return data.publicUrl;
}
