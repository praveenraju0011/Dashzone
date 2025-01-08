import { useMutation } from "react-query";
import loginUser from "../api/loginUser";
import { useNavigate } from "react-router-dom";
import { logDetails } from "../api/logDetails";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation(loginUser, {
    onSuccess: async (data) => {
      console.log("login successful", data);
      try {
        const logObject = {
          logType: "Login",
        };
        await logDetails(logObject);

        console.log("Log Details Entered Successfully");
      } catch (error) {
        console.log("Error updating log data", error);
      }
      navigate("/dashboard");
    },

    onError: (error) => {
      console.log("Login failed", error.message);
    },
  });
};
