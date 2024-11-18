import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import Grid from "./components/Grid";
import Search from "./components/Search";
import { API_BASE_URL } from "./config/constants";

interface Item {
	name: string;
	"poster-image": string;
}

const App: React.FC = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [stopFetching, setStopFetching] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const observerTarget = useRef(null);

	const fetchData = async (pageNum: number) => {
		if (loading) return;
		setLoading(true);
		try {
			const response = await fetch(
				`${API_BASE_URL}/data/page${pageNum}.json`
			).then(data => data.json());
			const data = (await response?.page?.["content-items"]?.content) ?? [];
			setItems(prevItems => [...prevItems, ...data]);
		} catch (error) {
			console.error("Error fetching data", error);
			setStopFetching(true);
		} finally {
			setLoading(false);
		}
	};

	const loadMoreContent = useCallback(async () => {
		await fetchData(page);
		setPage(prev => prev + 1);
	}, [page]);

	useEffect(() => {
		loadMoreContent();
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && !loading) {
					loadMoreContent();
				}
			},
			{ threshold: 1.0 }
		);
		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}
		return () => observer.disconnect();
	}, [loadMoreContent, loading]);

	/**
	 * API call for image will get triggered even when we do client side search
	 * one approach is to use a hashmap and store image name and content
	 */
	const filteredItems = items.filter(item =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<main>
			<div className="sticky-nav">
				{!isSearching ? (
					<div className="list-nav">
						<img
							src={`${API_BASE_URL}/images/Back.png`}
							alt="search"
							width="18"
							className="cursor-pointer"
						/>
						<span>Romantic Comedy</span>
						<img
							src={`${API_BASE_URL}/images/search.png`}
							alt="search"
							width="20"
							onClick={() => setIsSearching(true)}
							className="search-icon"
						/>
					</div>
				) : (
					<Search
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						setSearching={setIsSearching}
					/>
				)}
			</div>
			<div className="container">
				<Grid items={filteredItems} hasCompletedFetching={!loading} />
				{loading && <div className="loading">Loading...</div>}
				{!searchQuery && !stopFetching && (
					<div ref={observerTarget} style={{ height: "4px" }} />
				)}
			</div>
		</main>
	);
};
export default App;
