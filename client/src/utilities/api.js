import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useApiUtilities = () => {

  const sendApiRequest = async (requestCallback, toastify = true) => {
    try {
      return await requestCallback();
    } catch (error) {
      toastify && (
        toast.error(
          !error.response 
            ? error.message 
            : error.response.data.message
        )
      )

      return false;
    }
  }

  const getCsrfToken = async () => await axios.get('/sanctum/csrf-cookie');

  return {
    sendApiRequest,
    getCsrfToken,
  }
}
