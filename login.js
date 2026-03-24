import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  try {
    // Utilisation des noms de ta table "admin" et tes colonnes "identifiant"/"mdp"
    const { data, error } = await supabase
      .from('admin') 
      .select('*')
      .eq('identifiant', username)
      .eq('mdp', password)
      .single();

    if (error || !data) {
      return res.status(401).json({ success: false, message: 'Identifiants incorrects' });
    }

    // Succès !
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
