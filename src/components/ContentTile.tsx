import React from "react";
import { API_BASE_URL } from "../config/constants";

interface Props {
  item: {
    name: string;
    "poster-image": string;
  };
}

const ContentItem: React.FC<Props> = ({ item }) => {
  const imageName = item?.["poster-image"];

  return (
    <div className="content-item">
      <img
        src={`${API_BASE_URL}/images/${imageName}`}
        alt={item.name}
        loading="lazy"
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = `${API_BASE_URL}/images/placeholder_for_missing_posters.png`;
        }}
      />
      <div className="title">{item.name}</div>
    </div>
  );
};

export default ContentItem;
