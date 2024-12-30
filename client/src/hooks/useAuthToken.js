import { useEffect, useState } from "react";

const getTokenData = () => {
  try {
    return {
      token: localStorage.getItem("token") || "",
      userId: localStorage.getItem("userId") || "",
      name: localStorage.getItem("loggedInUser") || "",
    };
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return { token: "", userId: "", name: "" };
  }
};

const useAuthToken = () => {
  const [tokenData, setTokenData] = useState(getTokenData);

  useEffect(() => {
    const handleStorageChange = () => {
      const newTokenData = getTokenData();
      setTokenData((prev) =>
        JSON.stringify(prev) === JSON.stringify(newTokenData) ? prev : newTokenData
      );
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return tokenData;
};

export default useAuthToken;
