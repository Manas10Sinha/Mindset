export const handleWhatsApp = (
  form: any,
  isValidEmail: (email: string) => boolean,
) => {
  if (
    !form.parent ||
    !form.child ||
    !form.grade ||
    !form.email ||
    !form.topic ||
    !form.date ||
    !form.time
  ) {
    alert("Please fill all fields first");
    return;
  }

  if (!isValidEmail(form.email)) {
    alert("Please enter a valid email address");
    return;
  }

  const message = `Hello, I want to book a free demo.

Parent Name: ${form.parent}
Child Name: ${form.child}
Grade: ${form.grade}
Email: ${form.email}
Topic: ${form.topic}
Preferred Date: ${form.date}
Preferred Time: ${form.time}`;

  const url = `https://wa.me/${
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  }?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};
