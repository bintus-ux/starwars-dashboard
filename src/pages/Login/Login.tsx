import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../../components/atoms/FloatingInputs";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Min 8 characters")
    .matches(/[a-zA-Z]/, "Must contain letters")
    .matches(/\d/, "Must contain numbers")
    .required("Password is required"),
});

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-[30%] bg-[#031434] justify-center items-center">
        <img
          src="/images/logo.png"
          alt="Star Wars Logo"
          className="max-w-xs md:max-w-md object-contain"
        />
      </div>

      <div className="w-full md:w-[70%] flex justify-center items-center px-4 ">
        <div className="w-full max-w-md flex flex-col space-y-6 bg-white p-8 rounded-lg  border border-[#A4A7B74D] shadow-sm">
          <div>
            <h2 className="text-[24px] text-[#434854] font-semibold leading-[32px] mb-2">
              Login
            </h2>
            <p className="font-medium text-[#737373] text-[16px] mb-8 leading-[24px]">
              Kindly enter your details to log in
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FloatingInput
              label="Email Address"
              type="email"
              registration={register("email")}
              error={errors.email?.message}
            />

            <FloatingInput
              label="Password"
              type="password"
              registration={register("password")}
              error={errors.password?.message}
            />

            <button
              type="submit"
              className="w-full bg-[#0A74DC] text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Log in
            </button>
          </form>

          <div className="text-center mt-6">
            <a
              href="#"
              className="text-[14px] text-[#0A74DC] leading-[16px] hover:underline font-medium"
            >
              Forgot your password?
            </a>
          </div>

          <div className="mt-8 text-center text-md ">
            <a href="#" className="underline text-black">
              Privacy Policy
            </a>{" "}
            <span className="text-[#B0B9C8]">and</span>{" "}
            <a href="#" className="underline text-black">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
