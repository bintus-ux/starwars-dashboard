interface MobileFilmCardProps {
  film: any;
  onClick: () => void;
}

export default function MobileFilmCard({ film, onClick }: MobileFilmCardProps) {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg text-gray-900 mb-3">{film.title}</h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium">Release Date:</span>
          <span>{film.release_date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Director:</span>
          <span className="text-right">{film.director}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Producer:</span>
          <span className="text-right">{film.producer}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Episode:</span>
          <span>{film.episode_id}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-blue-600 text-sm font-medium">
          View Characters →
        </span>
      </div>
    </div>
  );
}
