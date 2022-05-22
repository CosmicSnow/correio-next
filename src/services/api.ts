import axios from "axios";

const isDev = !process.env.AWS_REGION;

export default axios.create({
  baseURL: isDev
    ? "http://localhost:1073/api/"
    : "https://correioanonimo.com.br/api/",
});
