import axiosClient from "./axiosClient";

const categoriesApi = {
  getCategories: () => {
    const url = "categories/category";
    return axiosClient.get(url);
  },
  getParentCategories: () => {
    const url = "categories/parentcategory";
    return axiosClient.get(url);
  },
  get: (idParent) => {
    const url = `categories/${idParent}`;
    return axiosClient.get(url);
  },
};

export default categoriesApi;
