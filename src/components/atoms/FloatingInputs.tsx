import "./floating-input.css";
import { FloatingInputProps } from "../../types/types";

export default function FloatingInput({
  label,
  type = "text",
  registration,
  error,
}: FloatingInputProps) {
  return (
    <div
      className={`did-floating-label-content ${error ? "did-error-input" : ""}`}
    >
      <input
        type={type}
        {...registration}
        placeholder=" "
        className="did-floating-input"
      />
      <label className="did-floating-label">{label}</label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
