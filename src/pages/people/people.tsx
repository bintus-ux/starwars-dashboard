import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPeople } from "../../services/swapi";
import DashboardLayout from "../../components/organisms/DashboardLayout";
import ResourceTable from "../../components/molecules/ResourceTable/ResourceTable";
import MobileResourceCard from "../../components/molecules/MobileResourceCard/MobileResourceCard";
import { MobileCardSkeleton } from "../../components/atoms/SkeletonLoader/SkeletonLoader";
import { formatDate } from "../../utils/dateFormatter";

export default function People() {
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        const data = await fetchPeople();
        setPeople(data.results);
      } catch (error) {
        console.error("Error loading people:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePersonClick = (person: any) => {
    const personId = person.url.split("/").filter(Boolean).pop();
    navigate(`/people/${personId}`);
  };

  const peopleColumns = [
    "Name",
    "Birth Year",
    "Gender",
    "Hair Color",
    "Height",
    "Created",
  ];

  const peopleFields = [
    { label: "Birth Year", value: "birth_year" },
    { label: "Gender", value: "gender" },
    { label: "Hair Color", value: "hair_color" },
    { label: "Height", value: "height" },
    { label: "Created", value: (item: any) => formatDate(item.created) },
  ];

  const renderPersonRow = (person: any) => (
    <>
      <td className="p-4">
        <div className="font-medium text-gray-900">{person.name}</div>
      </td>
      <td className="p-4 text-gray-600">{person.birth_year}</td>
      <td className="p-4 text-gray-600">{person.gender}</td>
      <td className="p-4 text-gray-600">{person.hair_color}</td>
      <td className="p-4 text-gray-600">{person.height}cm</td>
      <td className="p-4 text-gray-600">{formatDate(person.created)}</td>
    </>
  );

  return (
    <DashboardLayout>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl text-[#A4A7B7] font-semibold">People</h2>
        </div>

        {!isMobile && (
          <div className="hidden md:block">
            <ResourceTable
              columns={peopleColumns}
              data={people}
              loading={loading}
              onRowClick={handlePersonClick}
              renderRow={renderPersonRow}
            />
          </div>
        )}

        {isMobile && (
          <div className="md:hidden p-4">
            {loading ? (
              <>
                <MobileCardSkeleton />
                <MobileCardSkeleton />
                <MobileCardSkeleton />
                <MobileCardSkeleton />
              </>
            ) : (
              people.map((person, index) => (
                <MobileResourceCard
                  key={index}
                  item={person}
                  onClick={() => handlePersonClick(person)}
                  fields={peopleFields}
                  titleField="name"
                />
              ))
            )}
          </div>
        )}

        {!loading && people.length === 0 && (
          <div className="p-8 text-center text-gray-500">No people found</div>
        )}
      </div>
    </DashboardLayout>
  );
}
