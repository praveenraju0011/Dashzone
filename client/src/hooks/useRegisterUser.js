import { useMutation } from "react-query";
import { registerUser } from "../api/registerUser";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, error, data } = useMutation(registerUser, {
    onSuccess: (data) => {
      setTimeout(() => {
        console.log("Login successful", data);
        navigate("/dashboard");
      }, 2500);
    },
    onError: (error) => {
      console.log("Register failed", error.message);
    },
  });

  return { mutate, isLoading, error, data };
};

export default useRegister;
