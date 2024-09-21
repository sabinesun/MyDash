import { useQuery } from "react-query";
import { Dashboard } from "@/dashboard.tsx";
import { DimensionsResponse } from "./types";

const fetchDimensions = async (): Promise<DimensionsResponse> => {
  const response = await fetch("http://localhost:8080/dimensions");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: "dimensions",
    queryFn: fetchDimensions,
  });

  if (isLoading || error || !data) return null;

  return (
    <main className="h-screen w-screen p-6">
      <Dashboard
        dimensionsList={data.results}
      />
    </main>
  );
}

export default App;
