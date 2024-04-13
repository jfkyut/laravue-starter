import axios from "axios";
import { useApiUtilities } from "@/utilities/api";

const { getCsrfToken, sendApiRequest } = useApiUtilities();

export const useHttpAuth = () => {

  const login = (credentials) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      await axios.post('/login', credentials);

      return true;
    })
  }

  const createAccount = (credentials) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      await axios.post('/register', credentials);

      return true;
    })
  }

  const logout = () => {
    return sendApiRequest(async () => {
      await axios.post('/logout');

      return true;
    })
  }

  const requestPasswordReset = (credentials) => {
    return sendApiRequest(async () => {
      await getCsrfToken()
      const { data } = await axios.post('/forgot-password', credentials);

      return data;
    });
  }

  const resetPassword = (credentials) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      const { data } = await axios.post('/reset-password', credentials)

      return data;
    })
  }

  const requestEmailVerificationLink = () => {
    return sendApiRequest(async () => {
      const { data } = await axios.post('/email/verification-notification');

      return data;
    });
  }

  return {
    login,
    createAccount,
    logout,
    requestPasswordReset,
    resetPassword,
    requestEmailVerificationLink
  }
}
