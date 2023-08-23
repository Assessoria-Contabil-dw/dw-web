import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ToastSucess(msg: string) {
  return toast.success(msg, {
    position: 'top-right',
    autoClose: 100,

    // hideProgressBar: false,
    // closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // progress: undefined,
    theme: 'light',
  })
}
