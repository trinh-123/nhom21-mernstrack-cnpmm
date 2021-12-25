import axiosClient from "./axiosClient";

const adminApi = {
  get: (params) => {
    const url = "admin/user-list";
    return axiosClient.get(url, { params });
  },
  getOrders: (params) => {
    const url = "admin/orders";
    return axiosClient.get(url, { params });
  },
  changeStatusOrder: (idOrder, status) => {
    const url = `admin/orders/${idOrder}/status`;
    return axiosClient.put(url, { status });
  },
  changeStatus: (body) => {
    const url = "admin/ban";
    return axiosClient.post(url, body);
  },
  getContacts: () => {
    const url = "admin/contact";
    return axiosClient.get(url);
  },
  deleteContact: (id) => {
    const url = "admin/delete-contact";
    return axiosClient.post(url, id);
  },
};

export default adminApi;
