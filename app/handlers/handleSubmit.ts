import { toast } from "react-hot-toast";
import { saveLead } from "./saveLead";
import { handleWhatsApp } from "./handlewhatsapp";
import { isValidEmail } from "./emailValidation";

export const handleSubmit = async (e: any, form: any, setForm: any) => {
  e.preventDefault();

  const toastId = toast.loading("Booking your demo...");

  try {
    await saveLead(form);

    toast.success("Demo booked successfully!", {
      id: toastId,
    });

    setTimeout(() => {
      handleWhatsApp(form, isValidEmail);
    }, 1200);

    setForm({
      parent: "",
      child: "",
      mobile: "",
      grade: "",
      email: "",
      topic: "",
      date: "",
      time: "",
    });
  } catch (error) {
    console.error("Supabase Error:", error);

    toast.error(
      error instanceof Error ? error.message : "Failed to save booking",
      {
        id: toastId,
      },
    );
  }
};
