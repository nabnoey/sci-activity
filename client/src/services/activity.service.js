import api from "./api";
const API_URL = import.meta.env.VITE_ACTIVITY_API;

const createActivity = async (data) => {
  return await api.post(API_URL + "/", data);
};
const getAllActivities = async () => {
  return await api.get(API_URL + "/");
};

const getById = async (id) => {
  return await api.get(API_URL + `/${id}`);
};

const deleteActivities = async (id) => {
  return await api.delete(API_URL + `/${id}`);
};

const update = async (id, data) => {
  return await api.put(API_URL + `/${id}`, data);
};

const ActivityService = {
  createActivity,
  getAllActivities,
  getById,
  deleteActivities,
  update,
};
export default ActivityService;
