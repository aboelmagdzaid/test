import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://YOUR-PROJECT.supabase.co",
  "YOUR-PUBLIC-ANON-KEY"
);

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    let { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (userData?.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "user.html";
    }
  }
};
