import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/organisms/DashboardLayout/DashboardLayout";
import { fetchSpecie } from "../../services/swapi";
import { Species } from "@/types/swapi";
import BackButton from "../../components/atoms/Button/BackButton/BackButton";

export default function SpeciesDetail() {
  const { id } = useParams();
  const [species, setSpecies] = useState<Species | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadSpecies = async () => {
      try {
        setLoading(true);
        setError(null);

        const specieData = await fetchSpecie(id);
        setSpecies(specieData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadSpecies();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <>
          <div className="animate-pulse flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-200 rounded-lg h-64 w-full mb-4"></div>
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </>
      </DashboardLayout>
    );
  }

  if (error || !species) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || "specie not found"}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <>
        <div className="block md:hidden mb-6">
          <BackButton />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 ">
            <img
              src="/images/specie-img.png"
              alt={species.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-black mb-2">
                  {species.name}
                </h1>
              </div>
              <div className="flex  items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Language:</label>
                <div className="capitalize">
                  {species?.language === "n/a"
                    ? "Not specified"
                    : species?.language}
                </div>
              </div>

              <div className="flex items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Eye Colors</label>
                <div className="capitalize">
                  {Array.isArray(species?.eye_colors) &&
                  species?.eye_colors.length > 0
                    ? species?.eye_colors.join(", ") // join array elements with commas
                    : "Not applicable"}
                </div>
              </div>

              <div className="flex  items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Average Lifespan:</label>
                <div className="capitalize">
                  {species?.average_lifespan === "n/a"
                    ? "Not specified"
                    : species?.average_lifespan}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </DashboardLayout>
  );
}
