"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
    //   console.log(token);
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const response = await axios.get(
          "https://coding-assignment-server.vercel.app/validateToken",
          {
            headers: {
                authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.isValid) {
          localStorage.removeItem("token");
          router.push("/");
        }
      } catch (error) {
        // console.error("Token validation failed:", error);
        localStorage.removeItem("token");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [router]);



if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
