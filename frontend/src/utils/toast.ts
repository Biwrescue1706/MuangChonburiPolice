// src/utils/toast.ts
import Swal from "sweetalert2";

export const toast = (
  icon: "success" | "error" | "warning" | "info",
  title: string,
  text?: string
) => {
  return Swal.fire({
    icon,
    title,
    text,
    showConfirmButton: false,
    timer: 500,
    timerProgressBar: true,
    didOpen: (el) => {
      el.onmouseenter = Swal.stopTimer;
      el.onmouseleave = Swal.resumeTimer;
    },
  });
};