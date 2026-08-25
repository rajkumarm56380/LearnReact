import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Profile } from "../app/types";
import { supabase } from "../lib/supabase";

type AuthData = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  // Use Hooks
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch session
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        // 2. Convert the returned object/array to a JSON string
        const jsonString = JSON.stringify(data);
        // 3. Optional: Make the string human-readable with indentation
        const prettyJsonString = JSON.stringify(data, null, 2);
        console.log("jsonString. ==>" + jsonString);
        console.log("profile prettyJsonString ==> " + prettyJsonString);
        setProfile(data || null);
      }
      setLoading(false);
    };

    // Fetch session
    fetchSession();

    // Fetch Listener
    supabase.auth.onAuthStateChange((_event, session) => {
      // setLoading(true);
      setSession(session);
    });
  }, []);

  console.log("profile group ==> " + profile);
  console.log("profile GROUP TRUE or FALSE ==> " + profile?.group === "ADMIN");

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        isAdmin: profile?.group === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
