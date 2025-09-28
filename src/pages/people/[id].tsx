import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/organisms/DashboardLayout/DashboardLayout";
import { fetchPerson } from "../../services/swapi";
import { Person } from "../../types/types";
import BackButton from "../../components/atoms/Button/BackButton/BackButton";

export default function PersonDetail() {
  const { id } = useParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadPerson = async () => {
      try {
        setLoading(true);
        setError(null);

        const personData = await fetchPerson(id);
        setPerson(personData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadPerson();
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

  if (error || !person) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || "Person not found"}</p>
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
              src="/images/person-img.png"
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-black mb-2">
                  {person.name}
                </h1>
              </div>
              <div className="flex  items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Gender:</label>
                <div className="capitalize">
                  {person.gender === "n/a" ? "Not specified" : person.gender}
                </div>
              </div>

              <div className="flex  items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Year of birth</label>
                <div>
                  {person.birth_year === "unknown"
                    ? "Unknown"
                    : person.birth_year}
                </div>
              </div>

              <div className="flex  items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Skin Color</label>
                <div className="capitalize">
                  {person.skin_color === "n/a"
                    ? "Not applicable"
                    : person.skin_color}
                </div>
              </div>

              <div className="flex  items-center gap-x-2 text-lg font-semibold text-[#303B54]">
                <label>Height</label>
                <div>
                  {person.height === "unknown"
                    ? "Unknown"
                    : `${person.height}CM`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </DashboardLayout>
  );
}
