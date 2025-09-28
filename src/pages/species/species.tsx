import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSpecies } from "../../services/swapi";
import DashboardLayout from "../../components/organisms/DashboardLayout/DashboardLayout";
import ResourceTable from "../../components/molecules/ResourceTable/ResourceTable";
import MobileResourceCard from "../../components/molecules/MobileResourceCard/MobileResourceCard";
import { MobileCardSkeleton } from "../../components/atoms/SkeletonLoader/SkeletonLoader";
import { formatDate } from "../../utils/dateFormatter";

export default function Species() {
  const [species, setSpecies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        setLoading(true);
        const data = await fetchSpecies();
        setSpecies(data.results);
      } catch (error) {
        console.error("Error loading species:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSpecies();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSpeciesClick = (specie: any) => {
    const specieId = specie.url.split("/").filter(Boolean).pop();
    navigate(`/species/${specieId}`);
  };

  const speciesColumns = [
    "Name",
    "Classification",
    "Eye colors",
    "Hair color",
    "Height",
    "Created",
  ];

  const speciesFields = [
    { label: "Classification", value: "classification" },
    { label: "Eye colors", value: "eye_colors" },
    { label: "Hair color", value: "hair_colors" },
    { label: "Height", value: "average_height" },
    { label: "Created", value: (item: any) => formatDate(item.created) },
  ];

  const renderSpeciesRow = (specie: any) => (
    <>
      <td className="p-4">
        <div className="font-medium text-gray-900">{specie.name}</div>
      </td>
      <td className="p-4 text-gray-600">{specie.classification}</td>
      <td className="p-4 text-gray-600">{specie.eye_colors}</td>
      <td className="p-4 text-gray-600">{specie.hair_colors}</td>
      <td className="p-4 text-gray-600">{specie.average_height}cm</td>
      <td className="p-4 text-gray-600">{formatDate(specie.created)}</td>
    </>
  );

  return (
    <DashboardLayout>
      <div className="bg-white">
        <div className="py-6">
          <h2 className="text-xl text-[#A4A7B7] font-semibold">Species</h2>
        </div>
        <div className="overflow-hidden md:shadow md:rounded-lg ">
          {!isMobile && (
            <div className="hidden md:block">
              <ResourceTable
                columns={speciesColumns}
                data={species}
                loading={loading}
                onRowClick={handleSpeciesClick}
                renderRow={renderSpeciesRow}
              />
            </div>
          )}

          {isMobile && (
            <div className="md:hidden">
              {loading ? (
                <>
                  <MobileCardSkeleton />
                  <MobileCardSkeleton />
                  <MobileCardSkeleton />
                  <MobileCardSkeleton />
                </>
              ) : (
                species.map((specie, index) => (
                  <MobileResourceCard
                    key={index}
                    item={specie}
                    onClick={() => handleSpeciesClick(specie)}
                    fields={speciesFields}
                    titleField="name"
                  />
                ))
              )}
            </div>
          )}

          {!loading && species.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No species data found
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
