import axiosClient from "./axiosClient";

const shirtsApi = {
  getNameProducts: () => {
    const url = "product/name-products";
    return axiosClient.get(url);
  },
  get: (params) => {
    const url = "product/";
    return axiosClient.get(url, { params });
  },
  getByPrice: (params) => {
    const url = "product/getByPrice";
    return axiosClient.get(url, { params });
  },
  getAll: () => {
    const url = "product/all";
    return axiosClient.get(url);
  },
  getBySeller: (idSeller) => {
    const url = `product/getproduct/${idSeller}`;
    return axiosClient.get(url);
  },
  getDetail: (idShirt) => {
    const url = `product/${idShirt}`;
    return axiosClient.get(url);
  },
  getRelatedProduct: (idShirt) => {
    const url = `product/relate-product/${idShirt}`;
    return axiosClient.get(url);
  },
  delete: (params) => {
    const url = "product/delete-product";
    return axiosClient.post(url, params);
  },
  update: (params) => {
    const url = "product/update-product";
    return axiosClient.post(url, params);
  },
  search: (params) => {
    const url = "product/search";
    return axiosClient.post(url, params);
  },
  getNew: () => {
    const url = "product/new";
    return axiosClient.get(url);
  },
};

export default shirtsApi;
