import axios from "axios";
import { setLoading, showToast } from "store/common";
import { dispatch } from "store/store";
import { LocalStorage } from "utils/localStorage";

const storage = new LocalStorage();

/**NOTE: CENTRAL GATEWAY AXIOS */
export const centralGW = axios.create({
  baseURL: process.env.REACT_APP_CENTRAL_GATEWAY, // Replace with your API base URL
});

// Request interceptor
centralGW.interceptors.request.use(
  (config) => {
    const accessToken = storage.getStorageItem(
      storage.availableKey.ACCESS_TOKEN
    );
    dispatch(setLoading(true));

    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    dispatch(setLoading(false));
    throw error;
  }
);

// Response interceptor
centralGW.interceptors.response.use(
  (response) => {
    dispatch(setLoading(false));
    dispatch(
      showToast({
        status: response.data.isSuccess ? "success" : "error",
        message: response.data.message || "",
      })
    );
    return response;
  },
  (error) => {
    const { response } = error;
    dispatch(setLoading(false));
    dispatch(
      showToast({
        status: "error",
        message: response.data.message || "",
      })
    );
    if (response?.status === 401) {
      window.location.href = "/login";
    }

    throw error;
  }
);
