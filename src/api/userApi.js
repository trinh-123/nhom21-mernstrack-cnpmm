import axiosClient from "./axiosClient";

const userApi = {
  getBestSoldByQuarter:()=>{
    const url="auth//get-bestsold-by-quarter";
    return axiosClient.get(url);
  },
  getSeller:()=>{
    const url="auth/get-seller";
    return axiosClient.get(url);
  },
  getRevenueByAdmin:(params)=>{
    const url = "auth/admin-getrevenue";
    return axiosClient.post(url, params);
  },
  getBestSold:()=>{
    const url ="auth/get-list-bestsold";
    return axiosClient.get(url);
  },
  getStatistic:()=>{
    const url = "auth/user-revenue";
    return axiosClient.get(url);
  },
  viewed: (params) => {
    const url = "auth/viewed";
    return axiosClient.post(url, params);
  },
  getProductBestSold: (idSeller) => {
    const url = `seller/best-seller/${idSeller}`;
    return axiosClient.get(url);
  },
  getById: (params) => {
    const url = "auth/user";
    return axiosClient.get(url, { params });
  },
  getDiscount: (params) => {
    const url = "auth/get-discount";
    return axiosClient.get(url, { params });
  },
  getDiscountPrice: () => {
    const url = "auth/get-discount-total";
    return axiosClient.get(url);
  },
  applyDiscount: (params) => {
    const url = "auth/apply-discount";
    return axiosClient.post(url, params);
  },
  changePassword: (userData) => {
    const url = "auth/changepassword";
    return axiosClient.post(url, userData);
  },
  forgot: (userData) => {
    const url = "auth/forgot";
    return axiosClient.post(url, userData);
  },
  register: (userData) => {
    const url = "auth/register";
    return axiosClient.post(url, userData);
  },
  login: (userData) => {
    const url = "auth/login";
    return axiosClient.post(url, userData);
  },
  update: (userData) => {
    const url = "auth/updateuser";
    return axiosClient.post(url, userData);
  },
  changeStautusSeller: (idOrder, status) => {
    const url = `seller/orders/${idOrder}/status`;
    return axiosClient.put(url, { status });
  },
  getOrderBySeller: () => {
    const url = "seller/order-by-seller";
    return axiosClient.get(url);
  },
  upload: (shirt) => {
    const url = "seller/upload";
    return axiosClient.post(url, shirt, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  order: (params) => {
    const url = "auth/orders/add-order";
    return axiosClient.post(url, params);
  },
  payment: (body) => {
    const url = "zalopay/create-order";
    return axiosClient.post(url, body);
  },
  callback: () => {
    const url = "auth/callback";
    return axiosClient.get(url);
  },
  getOders: () => {
    const url = "auth/orders";
    return axiosClient.get(url);
  },
  changeStautus: (idOrder, status) => {
    const url = `auth/orders/${idOrder}/status`;
    return axiosClient.put(url, { status });
  },
  orderDetail: (idOrder) => {
    const url = `auth/orders/order-detail/${idOrder}`;
    return axiosClient.get(url);
  },
  comment: (body) => {
    const url = "auth/comment";
    return axiosClient.post(url, body);
  },
  commentProduct: (body) => {
    const url = "auth/comment-product";
    return axiosClient.post(url, body);
  },
  addToFollow: (body) => {
    const url = "auth/add-to-follow";
    return axiosClient.post(url, body);
  },
  addToFavorite: (body) => {
    const url = "auth/add-to-favorite";
    return axiosClient.post(url, body);
  },
  getFollows: () => {
    const url = "auth/get-follow";
    return axiosClient.post(url);
  },
  getFavorites: () => {
    const url = "auth/get-favorite";
    return axiosClient.post(url);
  },
  deleteFollow: (data) => {
    const url = "auth/delete-follow";
    return axiosClient.post(url, data);
  },
  deleteFromFavorite: (data) => {
    const url = "auth/delete-favorite";
    return axiosClient.post(url, data);
  },
  uploadAvatar: (formData) => {
    const url = "auth/upload-avatar";
    return axiosClient.post(url, formData, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
  deleteAvatar: () => {
    const url = "auth/delete-avatar";
    return axiosClient.get(url);
  },
  contact: (body) => {
    const url = "auth/contact";
    return axiosClient.post(url, body);
  },
  addDiscount: (body) => {
    const url = "auth/add-discount";
    return axiosClient.post(url, body);
  },
  loginGoogle: (params) => {
    const url = "auth/login-google";
    return axiosClient.post(url, params);
  },
  loginFacebook: (params) => {
    const url = "auth/login-facebook";
    return axiosClient.post(url, params);
  },
};

export default userApi;
