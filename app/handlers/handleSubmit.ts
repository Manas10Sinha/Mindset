import { toast } from "react-hot-toast";
import { handleWhatsApp } from "./handlewhatsapp";
import { isValidEmail } from "./emailValidation";

export const handleSubmit = (e: any, form: any, setForm: any) => {
  e.preventDefault();

  const toastId = toast.loading("Booking your demo...");

  setTimeout(() => {
    toast.success("Demo booked successfully!", {
      id: toastId,
    });

    setTimeout(() => {
      handleWhatsApp(form, isValidEmail);
    }, 1200);
  }, 1200);

  setForm({
    parent: "",
    child: "",
    grade: "",
    email: "",
    topic: "",
    date: "",
    time: "",
  });
};
