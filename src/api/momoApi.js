import axiosClient from "./axiosClient";

const MomoApi = {
  CheckOut: (body) => {
    const url = "momo/create-order";
    return axiosClient.post(url, body);
  },
};

export default MomoApi;
