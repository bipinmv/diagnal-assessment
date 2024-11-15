import React, { memo } from "react";
import ContentTile from "./ContentTile";

interface Item {
	name: string;
	"poster-image": string;
}

interface Props {
	items: Item[];
}

const Grid: React.FC<Props> = ({ items }) => {
	return (
		<>
			{items.length > 0 ? (
				<div className="grid">
					{items.map((item, index) => (
						<ContentTile key={item.name + index} item={item} />
					))}
				</div>
			) : (
				<div className="no-data">No data to display</div>
			)}
		</>
	);
};

export default memo(Grid);
