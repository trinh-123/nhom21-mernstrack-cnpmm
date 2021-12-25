import axiosClient from "./axiosClient";

const MessengerAPI = {
  getAllUserForChat: () => {
    const url = `/auth/users-chat`;
    return axiosClient.get(url);
  },

  getAllMessage: (query) => {
    const url = `/messenger${query}`;
    return axiosClient.get(url);
  },

  postMessage: (query) => {
    const url = `/messenger/send${query}`;
    return axiosClient.post(url);
  },

  autoSendMessage: (query) => {
    const url = `messenger/auto-send${query}`;
    return axiosClient.post(url);
  },
};

export default MessengerAPI;
