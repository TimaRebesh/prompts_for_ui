import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface SessionExecution {
  redirectIfSession?: boolean;
  redirectIfNoSession?: boolean;
}

export const useSessionExecution = ({
  redirectIfSession,
  redirectIfNoSession,
}: SessionExecution) => {
  const { data: session } = useSession(undefined);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined) {
      setIsSessionLoading(false);
    }
    if (session && redirectIfSession) {
      redirect("/");
    }
    if (session === null && redirectIfNoSession) {
      redirect("/");
    }
  }, [session]);

  return {
    session,
    isSessionLoading,
  };
};
