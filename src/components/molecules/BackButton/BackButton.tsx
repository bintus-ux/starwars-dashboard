import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      onClick={() => navigate(-1)}
      className="flex items-center gap-2"
    >
      <ArrowLeftIcon size={10} />
      Back
    </Button>
  );
}
