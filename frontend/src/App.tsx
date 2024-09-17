import { useQuery } from "react-query";
import { Dashboard } from "@/dashboard.tsx";

const fetchDimensions = async () => {
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

  if (isLoading || error) return null;

  const uniqueCountries = Array.from(
    new Set(data.results.map((item) => item.country)),
  );

  const uniqueBusinessUnit = Array.from(
    new Set(data.results.map((item) => item.business_unit)),
  );

  return (
    <main className="h-screen w-screen p-6">
      <Dashboard
        uniqueCountries={uniqueCountries}
        uniqueBusinessUnit={uniqueBusinessUnit}
        datalist={data}
      />
    </main>
  );
}

export default App;
