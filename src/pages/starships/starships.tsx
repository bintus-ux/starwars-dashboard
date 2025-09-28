import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStarships } from "../../services/swapi";
import DashboardLayout from "../../components/organisms/DashboardLayout/DashboardLayout";
import ResourceTable from "../../components/molecules/ResourceTable/ResourceTable";
import MobileResourceCard from "../../components/molecules/MobileResourceCard/MobileResourceCard";
import { MobileCardSkeleton } from "../../components/atoms/SkeletonLoader/SkeletonLoader";

export default function Starships() {
  const [starships, setStarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStarships = async () => {
      try {
        setLoading(true);
        const data = await fetchStarships();
        setStarships(data.results);
      } catch (error) {
        console.error("Error loading starships:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStarships();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStarshipClick = (starship: any) => {
    const starshipId = starship.url.split("/").filter(Boolean).pop();
    navigate(`/starships/${starshipId}`);
  };

  const starshipColumns = [
    "Name",
    "Model",
    "Class",
    "Passenger",
    "Length",
    "Character",
  ];

  const starshipFields = [
    { label: "Model", value: "model" },
    { label: "Class", value: "starship_class" },
    { label: "Passengers", value: "passengers" },
    { label: "Length", value: "length" },
    { label: "Character", value: "character_in_credits" },
  ];

  const renderStarshipRow = (starship: any) => (
    <>
      <td className="p-4">
        <div className="font-medium text-gray-900">{starship.name}</div>
      </td>
      <td className="p-4 text-gray-600">{starship.model}</td>
      <td className="p-4 text-gray-600">{starship.starship_class}</td>
      <td className="p-4 text-gray-600">{starship.passengers}</td>
      <td className="p-4 text-gray-600">{starship.length} meters</td>
      <td className="p-4 text-gray-600">{starship.character_in_credits}</td>
    </>
  );

  return (
    <DashboardLayout>
      <div className="bg-white">
        <div className="py-6">
          <h2 className="text-xl text-[#A4A7B7] font-semibold">Starship</h2>
        </div>

        {!isMobile && (
          <div className="hidden md:block md:shadow md:rounded-lg ">
            <ResourceTable
              columns={starshipColumns}
              data={starships}
              loading={loading}
              onRowClick={handleStarshipClick}
              renderRow={renderStarshipRow}
            />
          </div>
        )}

        {isMobile && (
          <div className="md:hidde">
            {loading ? (
              <>
                <MobileCardSkeleton />
                <MobileCardSkeleton />
                <MobileCardSkeleton />
                <MobileCardSkeleton />
              </>
            ) : (
              starships.map((starship, index) => (
                <MobileResourceCard
                  key={index}
                  item={starship}
                  onClick={() => handleStarshipClick(starship)}
                  fields={starshipFields}
                  titleField="name"
                />
              ))
            )}
          </div>
        )}

        {!loading && starships.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No starships found
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
