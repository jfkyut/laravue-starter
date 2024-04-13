import axios from "axios";
import { useApiUtilities } from "@/utilities/api";

const { getCsrfToken, sendApiRequest } = useApiUtilities();

export const useHttpAuth = () => {

  const loginRequest = (credentials) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      await axios.post('/login', credentials);

      return true;
    })
  }

  const registerRequest = (credentials) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      await axios.post('/register', credentials);

      return true;
    })
  }

  const logoutRequest = () => {
    return sendApiRequest(async () => {
      await axios.post('/logout');

      return true;
    })
  }

  const newPasswordRequest = (credentials) => {
    return sendApiRequest(async () => {
      await getCsrfToken()
      const { data } = await axios.post('/forgot-password', credentials);

      return data;
    });
  }

  const resetPasswordRequest = (credentials) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      const { data } = await axios.post('/reset-password', credentials)

      return data;
    })
  }

  const emailVerificationRequest = () => {
    return sendApiRequest(async () => {
      const { data } = await axios.post('/email/verification-notification');

      return data;
    });
  }

  return {
    loginRequest,
    registerRequest,
    logoutRequest,
    newPasswordRequest,
    resetPasswordRequest,
    emailVerificationRequest
  }
}
