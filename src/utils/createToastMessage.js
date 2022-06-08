import { toast } from 'react-toastify';

export default function createToastMessage(message, type = 'info') {
  return toast[type](message, {
    position: "top-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 60,
    pauseOnVisibilityChange: true,
    rtl: false
  });
}
