import useRecommendationParser from "../../hooks/useRecommendationParser";
import RecommendationsFullView from "./components/RecommendationsFullView";

const Recommendations = ({ data, startDate, endDate, iconSize, type, alignment = "left" }) => {
	const recommendations = useRecommendationParser(data, startDate, endDate, iconSize);

	if (!recommendations) return <></>;
	if (type === "full") return <RecommendationsFullView recommendations={recommendations} alignment={alignment} />;
	return <></>;
};

export default Recommendations;
