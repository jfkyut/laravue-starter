import { useApiUtilities } from "@/utilities/api"
import axios from "axios";

const { sendApiRequest, getCsrfToken } = useApiUtilities();

export const useHttpProfile = () => {

  const getProfileRequest = () => {
    return sendApiRequest( async () => {
      return await axios.get('/api/profile')
    }, false)
  }

  const updateProfileRequest = (credentials) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      await axios.put('api/profile', credentials);

      return true;
    });
  }

  const updatePasswordRequest = (credentials) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      await axios.put('/api/password', credentials);

      return true;
    });
  }

  const destroyProfileRequest = (credentials) => {
    return sendApiRequest( async () => {
      await axios.delete('/api/profile', { data: credentials });

      return true;
    });
  }

  return { 
    getProfileRequest,
    updateProfileRequest,
    updatePasswordRequest,
    destroyProfileRequest
  }
}