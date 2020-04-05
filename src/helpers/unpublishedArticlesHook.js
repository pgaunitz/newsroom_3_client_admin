import axios from "axios";
import { useState } from "react";

const useUnpublishedArticles = () => {
  const [message, setMessage] = useState("");

  const onPublish = async (articleID) => {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let response = await axios.put(
      `/admin/${articleID}`,
      {
        article: {
          published: true,
        },
      },
      { headers: headers }
    );
    if (response.status === 200) {
      setMessage(response.data.message);
    } else {
      setMessage(response.data.error);
    }
  };
  return [onPublish, message];
};

export default useUnpublishedArticles;
