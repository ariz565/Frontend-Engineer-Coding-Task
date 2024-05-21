import { toast } from "react-toastify";

export const showToastMessage = (message: string, type: string) => {
  const toastOptions = {
    position: toast.POSITION.TOP_CENTER,
  };

  if (type === "error") {
    toast.error(message, toastOptions);
  } else {
    toast.success(message, toastOptions);
  }
};
