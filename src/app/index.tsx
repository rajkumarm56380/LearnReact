import { Link, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "../provider/AuthProvider";
import Button from "./components/Button";

const index = () => {
  // Use Hooks
  const { loading, session, profile, isAdmin } = useAuth();
  console.log("Main Screen Session ==>" + session);
  console.log("Main Screen  isAdmin ==>" + isAdmin);
  console.log("Main Screen  profile ==>" + profile);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!(session != null)) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!(isAdmin != null)) {
    return <Redirect href={"/(user)"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );

  /*if (profile?.group === "ADMIN") {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <Link href={"/(user)"} asChild>
          <Button text="User" />
        </Link>
        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>
      </View>
    );
  }

  return <Redirect href="/(user)" />;*/
};

export default index;
