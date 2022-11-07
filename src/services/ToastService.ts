import { toast, ToastOptions } from 'react-toastify';

export default class ToastService {
  private static defaultOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  static showInfo(message: string, options = this.defaultOptions): void {
    toast(message, options);
  }

  static showSuccess(message: string, options = this.defaultOptions): void {
    toast.success(message, options);
  }

  static showError(message: string, options = this.defaultOptions): void {
    toast.success(message, options);
  }
}
