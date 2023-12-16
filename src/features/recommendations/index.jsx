import useRecommendationParser from "../../hooks/useRecommendationParser";
import RecommendationsFullView from "./components/RecommendationsFullView";

const Recommendations = ({ data, startDate, endDate, iconSize, type }) => {
	const recommendations = useRecommendationParser(data, startDate, endDate, iconSize);

	console.log(recommendations);

	if (!recommendations) return <></>;
	if (type === "full") return <RecommendationsFullView recommendations={recommendations} />;
	return <></>;
};

export default Recommendations;
