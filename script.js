import { createClient } from "https://esm.sh/@supabase/supabase-js"

const SUPABASE_URL = "https://fjksprfocmyqebjfxftf.supabase.co"
const SUPABASE_KEY = "sb_publishable_A3J91eJqawcbb2s6a-8vRQ_9bOFqaE_"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function loadUsers() {

  const { data, error } = await supabase
    .from("users")
    .select("*")

  const list = document.getElementById("users")

  data.forEach(user => {
    const li = document.createElement("li")
    li.textContent = user.name + " - " + user.email
    list.appendChild(li)
  })

}

loadUsers()