import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchDashboardData } from "../api/dashboard";
import { updateUserData } from "../api/updateUserData";
import { deleteUserData } from "../api/deleteUser";

const useDashboard = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery(
    "dashboard",
    fetchDashboardData
  );

  const updateMutation = useMutation(
    (updatedData) => updateUserData(updatedData.id, updatedData),
    {
      onSuccess: async () => {
        try {
          queryClient.invalidateQueries("dashboard");
        } catch (err) {
          console.error("Error fetching fresh data:", err.message);
        }
      },
      onError: (err) => {
        console.error("Error updating user:", err.message);
      },
    }
  );

  const deleteMutation = useMutation((deleteId) => deleteUserData(deleteId), {
    onSuccess: async () => {
      try {
        queryClient.invalidateQueries("dashboard");
      } catch (err) {
        console.error("Error fetching fresh data:", err.message);
      }
    },
    onError: (err) => {
      console.error("Error Deleting user:", err.message);
    },
  });

  return { data, isLoading, isError, error, updateMutation, deleteMutation };
};

export default useDashboard;
