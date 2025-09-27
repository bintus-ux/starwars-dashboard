import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/organisms/DashboardLayout/DashboardLayout";
import { fetchStarship } from "../../services/swapi";
import { ArrowLeftIcon } from "../../assets/icons";
import { Starship } from "../../types/swapi";
import BackButton from "../../components/molecules/BackButton/BackButton";

export default function StarshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [starship, setStarship] = useState<Starship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadStarship = async () => {
      try {
        setLoading(true);
        setError(null);

        const starshipData = await fetchStarship(id);
        setStarship(starshipData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadStarship();
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

  if (error || !starship) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">
            {error || "starship data not found"}
          </p>
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
              src="/images/spaceship-img.png"
              alt={starship.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-black mb-2">
                  {starship.name}
                </h1>
              </div>
              <div className="flex  items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Model:</label>
                <div className="capitalize">
                  {starship.model === "n/a" ? "Not specified" : starship.model}
                </div>
              </div>

              <div className="flex  items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Passeners</label>
                <div>
                  {starship.passengers === "unknown"
                    ? "Unknown"
                    : starship.passengers}
                </div>
              </div>

              <div className="flex items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Pilots</label>
                <div className="capitalize">
                  {Array.isArray(starship.pilots) && starship.pilots.length > 0
                    ? starship.pilots.join(", ")
                    : "Not applicable"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </DashboardLayout>
  );
}
