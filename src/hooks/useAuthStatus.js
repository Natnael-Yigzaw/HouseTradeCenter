import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }
    return () => {
      // Clean up function to stop listening for authentication state changes when the component unmounts.
      isMounted.current = false;
    };
  }, [isMounted]);
  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
