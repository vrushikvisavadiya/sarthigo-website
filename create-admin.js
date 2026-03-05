const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Locating rogue users...");
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("List Error:", listError);
    return;
  }
  
  const rogueUser = users.users.find(u => u.email === "admin@sarthigo.com");
  if (rogueUser) {
    console.log(`Deleting rogue user: ${rogueUser.id}`);
    await supabase.auth.admin.deleteUser(rogueUser.id);
  }

  // Also manually delete from tables if somehow stuck
  await supabase.from("profiles").delete().eq("email", "admin@sarthigo.com");

  console.log("Creating new user safely...");
  const { data: user, error } = await supabase.auth.admin.createUser({
    email: "admin@sarthigo.com",
    password: "AdminPassword123!",
    email_confirm: true,
  });

  if (error) {
    console.error("Create Auth Error:", error);
    return;
  }

  console.log("Auth User created:", user.user.id);
  
  // Wait a few seconds for the trigger to insert the profile
  await new Promise(r => setTimeout(r, 2000));

  console.log("Promoting to admin...");
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ role: "admin" })
    .eq("id", user.user.id);

  if (profileError) {
    console.error("Profile Error:", profileError);
  } else {
    console.log("Successfully created and promoted admin@sarthigo.com!");
  }
}

main();
