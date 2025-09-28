import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFilms, fetchResourceCounts } from "../../services/swapi";
import DashboardLayout from "../../components/organisms/DashboardLayout/DashboardLayout";
import SummaryCard from "../../components/molecules/SummeryCard/SummeryCards";
import MobileFilmCard from "../../components/molecules/MobileFilmCard";
import ResourceTable from "../../components/molecules/ResourceTable/ResourceTable";
import {
  SummaryCardSkeleton,
  MobileCardSkeleton,
} from "../../components/atoms/SkeletonLoader/SkeletonLoader";
import { ResourceCounts } from "@/types/types";

export default function Overview() {
  const [films, setFilms] = useState<any[]>([]);
  const [counts, setCounts] = useState<ResourceCounts>({
    films: 0,
    starships: 0,
    people: 0,
    species: 0,
  });
  const [loading, setLoading] = useState({
    films: true,
    counts: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading({ films: true, counts: true });

        const [filmsData, countsData] = await Promise.all([
          fetchFilms(),
          fetchResourceCounts(),
        ]);

        setFilms(filmsData.results);
        setCounts(countsData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading({ films: false, counts: false });
      }
    };

    loadData();
  }, []);

  const handleCardClick = (resource: string) => {
    navigate(`/${resource.toLowerCase()}`);
  };

  const handleFilmClick = (film: any) => {
    const filmId = film.url.split("/").filter(Boolean).pop();
    navigate(`/films/${filmId}`);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filmColumns = [
    "Film Title",
    "Release Date",
    "Director",
    "Producer",
    "Episode ID",
    "Characters",
  ];

  const renderFilmRow = (film: any, index: number) => (
    <>
      <td className="p-4">
        <div className="font-medium text-gray-900">{film.title}</div>
      </td>
      <td className="p-4 text-gray-600">{film.release_date}</td>
      <td className="p-4 text-gray-600">{film.director}</td>
      <td className="p-4 text-gray-600">{film.producer}</td>
      <td className="p-4 text-gray-600">{film.episode_id}</td>
      <td className="p-4">{film.characters[1]}</td>
    </>
  );

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading.counts ? (
          <>
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
          </>
        ) : (
          <>
            <SummaryCard
              title="Films"
              count={counts.films}
              change={20}
              onClick={() => handleCardClick("films")}
            />
            <SummaryCard
              title="Starships"
              count={counts.starships}
              change={20}
              onClick={() => handleCardClick("starships")}
            />
            <SummaryCard
              title="People"
              count={counts.people}
              change={20}
              onClick={() => handleCardClick("people")}
            />
            <SummaryCard
              title="Species"
              count={counts.species}
              change={20}
              onClick={() => handleCardClick("species")}
            />
          </>
        )}
      </div>

      <div className="bg-white ">
        <div className="py-6">
          <h1 className="text-xl text-[#A4A7B7] font-semibold">Films</h1>
        </div>

        {!isMobile && (
          <div className="hidden md:block md:shadow md:rounded-lg ">
            <ResourceTable
              columns={filmColumns}
              data={films}
              loading={loading.films}
              onRowClick={handleFilmClick}
              renderRow={renderFilmRow}
            />
          </div>
        )}

        {isMobile && (
          <div className="md:hidden">
            {loading.films ? (
              <>
                <MobileCardSkeleton />
                <MobileCardSkeleton />
                <MobileCardSkeleton />
                <MobileCardSkeleton />
                <MobileCardSkeleton />
                <MobileCardSkeleton />
              </>
            ) : (
              films.map((film, i) => (
                <MobileFilmCard
                  key={i}
                  film={film}
                  onClick={() => handleFilmClick(film)}
                />
              ))
            )}
          </div>
        )}

        {!loading.films && films.length === 0 && (
          <div className="p-8 text-center text-gray-500">No films found</div>
        )}
      </div>
    </DashboardLayout>
  );
}
