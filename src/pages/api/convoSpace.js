import axios from "axios";

export default axios.create({
  baseURL: "https://theconvo.space/api",
  params: {
    api_key: "CONVO"
  }
});

