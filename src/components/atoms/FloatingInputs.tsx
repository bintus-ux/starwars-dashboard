import { UseFormRegisterReturn } from "react-hook-form";

type FloatingInputProps = {
  label: string;
  type?: string;
  registration: UseFormRegisterReturn;
  error?: string;
};

export default function FloatingInput({
  label,
  type = "text",
  registration,
  error,
}: FloatingInputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        {...registration}
        placeholder=" "
        className="peer w-full border px-3 pt-4 pb-2 rounded-sm
                   focus:outline-none focus:ring-2 focus:ring-[#0A74DC]"
      />
      <label
        className="absolute left-3 top-[-7px] text-[#B0B9C8] text-sm transition-all
                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400
                   peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
