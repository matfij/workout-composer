import { toast, ToastOptions } from 'react-toastify';

export class ToastManager {
    private static readonly defaultOptions: ToastOptions = {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    };

    static showInfo(message: string, options = this.defaultOptions) {
        toast.info(message, options);
    }

    static showSuccess(message: string, options = this.defaultOptions) {
        toast.success(message, options);
    }

    static showError(message: string, options = this.defaultOptions) {
        toast.error(message, options);
    }
}
