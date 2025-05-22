import http from "k6/http";
import { sleep } from "k6";

const baseUrl = __ENV.BASE_URL;

export const options = {
  vus: 2,
  duration: "10s",
};

export default () => {
  console.log(__ENV.BASE_URL);
  http.get(`${baseUrl}/get`);
  sleep(1);
};
