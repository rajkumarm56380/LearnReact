import { useClientOnlyValue } from "@/src/app/components/useClientOnlyValue";
import Colors from "@/src/app/constants/Colors";
import { useAuth } from "@/src/provider/AuthProvider";
import { Redirect, Tabs } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: React.ComponentProps<typeof FontAwesome>["color"];
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { session, isAdmin } = useAuth();

  // if (!profile || profile.group !== "ADMIN") {
  //   return <Redirect href="/" />;
  // }

  // if (!session) {
  //   return <Redirect href="/sign-in" />;
  // }

  if (!(isAdmin != null)) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: "gainsboro",
        tabBarStyle: {
          backgroundColor: Colors.light.tint,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cutlery" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
