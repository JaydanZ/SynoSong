import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const useCheckLogin = () => {
  const [isLoggedIn, setLoginState] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" || session === null) {
      setLoginState(false);
    } else {
      setLoginState(true);
    }
  }, [session]);

  return { isLoggedIn, session };
};

export default useCheckLogin;
