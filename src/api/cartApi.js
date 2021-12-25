import axiosClient from "./axiosClient";

const cartApi = {
  add: (cartItem) => {
    const url = "auth/add-to-cart";
    return axiosClient.post(url, cartItem);
  },
  get: () => {
    const url = "auth/cart";
    return axiosClient.get(url);
  },
  remove: (productID) => {
    const url = "auth/remove-from-cart";
    return axiosClient.post(url, productID);
  },
  update: (body) => {
    const url = "auth/update-cart";
    return axiosClient.post(url, body);
  },
  updateFeeDelivery: (body) => {
    const url = "auth/update-fee-delivery";
    return axiosClient.post(url, body);
  },
};

export default cartApi;
