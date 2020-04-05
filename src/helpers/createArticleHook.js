import axios from "axios";
import { useState } from "react";

const useCreateArticle = () => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const createArticle = async (event) => {
    event.preventDefault();
    let selectPremium = event.target.premium.checked === true ? true : false;

    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let response = await axios.post(
      "/admin",
      {
        article: {
          title: event.target.title.value,
          snippet: event.target.snippet.value,
          content: event.target.content.value,
          category: selectedCategory,
          premium: selectPremium,
          image: image,
        },
      },
      { headers: headers }
    );
    if (response.status === 200) {
      setMessage(response.data.message);
      document.getElementById("new-article-form").reset();
    } else {
      setMessage(response.data.message);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const onImageDropHandler = (imageList) => {
    if (imageList.length > 0) {
      setImage(imageList[0].dataURL);
    }
  };

  let categoryOptions = [
    { key: "latest_news", text: "Latest News", value: "latest_news" },
    { key: "Tech", text: "Tech", value: "tech" },
    { key: "Sports", text: "Sports", value: "sports" },
    { key: "Politics", text: "Politics", value: "politics" },
    { key: "Culture", text: "Culture", value: "culture" },
  ];

  return [
    categoryOptions,
    handleCategoryChange,
    message,
    onImageDropHandler,
    createArticle,
  ];
};

export default useCreateArticle;
