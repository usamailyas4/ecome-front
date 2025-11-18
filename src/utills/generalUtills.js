import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const toastNote = (message, type)=>{
    toast(`${message}`, {
        "type": type,
        "position": "top-center",
        "autoClose": 2000,
        "theme": "colored"
    })
}

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}