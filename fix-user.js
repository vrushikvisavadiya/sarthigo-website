const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseKey) { console.error("Missing keys in env"); process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Checking for admin@sarthigo.com...");
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  
  const existing = users.users.find(u => u.email === "admin@sarthigo.com");
  if (existing) {
    console.log("User exists. Updating password to: AdminPassword123!");
    const { error: updErr } = await supabase.auth.admin.updateUserById(existing.id, {
      password: "AdminPassword123!",
      email_confirm: true
    });
    if (updErr) console.error("Password update failed:", updErr);
    else console.log("Password successfully updated. Try logging in now!");
  } else {
    console.log("User missing entirely. Creating from scratch...");
    const { data: newUser, error: crError } = await supabase.auth.admin.createUser({
      email: "admin@sarthigo.com",
      password: "AdminPassword123!",
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });
    if (crError) {
      console.error("Creation failed:", crError);
    } else {
      console.log("User explicitly created with AdminPassword123!");
      await new Promise(r => setTimeout(r, 2000));
      await supabase.from("profiles").update({ role: "admin" }).eq("id", newUser.user.id);
      console.log("Profile elevated to Admin.");
    }
  }
}

main();
