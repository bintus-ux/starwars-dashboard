import { useLocation, useNavigate } from "react-router-dom";
import {
  UserIcon,
  NotificationIcon,
  ArrowLeftIcon,
  ActionIcon,
} from "../../../assets/icons";

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = /\d+$/.test(location.pathname);

  return (
    <header className="h-16 bg-white shadow flex items-center justify-end md:justify-between px-6 ">
      <div className="hidden md:flex items-center gap-4 lg:ml-[19.5vw]">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon size={10} />
            <span>Back</span>
          </button>
        )}
      </div>

      <div className="flex justify-between items-center gap-x-8 md:gap-x-10">
        <button className="text-gray-500 hover:text-gray-700">
          <NotificationIcon size={20} />
        </button>
        <div className="flex items-center gap-4 border-l-2 border-[#E5E5E5] pl-6">
          <UserIcon size={20} className="text-gray-500" />
          <span className="font-medium">John Doe</span>
        </div>

        <div>
          <ActionIcon size={20} />
        </div>
      </div>
    </header>
  );
}
