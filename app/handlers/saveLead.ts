import { supabase } from "@/lib/supabase";

export async function saveLead(form: any) {
  const { data, error } = await supabase.from("demo_bookings").insert([
    {
      parent_name: form.parent,
      child_name: form.child,
      mobile: form.mobile,
      grade: form.grade,
      email: form.email,
      topic: form.topic,
      preferred_date: form.date,
      preferred_time: form.time,
    },
  ]);

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
