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
	// handling title wrapping with JS as CSS white-space: nowrap causes issues when rerendering
	const title =
		item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name;

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
			<div className="title" title={item.name}>
				{title}
			</div>
		</div>
	);
};

export default ContentItem;
