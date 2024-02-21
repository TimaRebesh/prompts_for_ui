import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCheckSession = () => {
  const { data: session } = useSession(undefined);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined) {
      setIsSessionLoading(false);
    }
  }, [session]);

  return {
    session,
    isSessionLoading,
  };
};
