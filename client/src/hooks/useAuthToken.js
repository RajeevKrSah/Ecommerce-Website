
import { useEffect, useState } from "react";

const useAuthToken = () => {
  const [tokenData, setTokenData] = useState({
    token: "",
    userId: "",
    name: "",
  });

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token") || "";
      const storedUserId = localStorage.getItem("userId") || "";
      const storedLoggedInUser = localStorage.getItem("loggedInUser") || "";

      setTokenData({
        token: storedToken,
        userId: storedUserId,
        name: storedLoggedInUser,
      });
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setTokenData({
        token: "",
        userId: "",
        name: "",
      });
    }
  }, []);

  return tokenData;
};

export default useAuthToken;
