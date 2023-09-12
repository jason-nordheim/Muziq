import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { FC, createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProps {
  [k: string]: any;
}

const MyUserProvider: FC<UserContextProps> = (props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSubscription = () =>
    supabase.from("subscriptions").select("*, prices(*, products(*))").in("status", ["active"]).single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.all([getUserDetails(), getSubscription()]).then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];

        if (userDetailsPromise.status < 300 && userDetailsPromise.status > 199 && userDetailsPromise.data) {
          setUserDetails(userDetailsPromise.data as UserDetails);
        }
        if (subscriptionPromise.status < 300 && subscriptionPromise.status > 199 && subscriptionPromise.data) {
          setSubscription(subscriptionPromise.data as Subscription);
        }
        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
    // purposely only want this effect to run when the included
    // dependencies have changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }
  return context;
};

export { useUser, MyUserProvider };
