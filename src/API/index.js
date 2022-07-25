import axios from "axios";

// BaseURL could be loaded from environment variables
const baseURL = "http://netheria.takehome.octoml.ai/";
const serverAxios = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Requests
const getHardware = () => {
  return serverAxios({
    url: "/hardware",
    method: "GET",
  });
};

const saveBenchmark = (data) => {
  return serverAxios({
    url: "/benchmark",
    method: "POST",
    data,
  });
};

const saveAccelerate = (data) => {
  return serverAxios({
    url: "/accelerate",
    method: "POST",
    data,
  });
};

export { getHardware, saveBenchmark, saveAccelerate };
