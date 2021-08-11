import axiosInstance from "../../AxiosInstance";

const loadingData = async () => {
  return await axiosInstance.get("items.json");
};

export default loadingData;
