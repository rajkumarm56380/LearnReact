import { StatusBar } from "expo-status-bar";
import { Button, FlatList, Platform, Text, View } from "react-native";
import { useCart } from "../provider/CartProvider";
import CartListItem from "./components/CartListItem";

const cartScreen = () => {
  const { items, total } = useCart();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total}
      </Text>
      <Button title="Checkout" onPress={() => {}} />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default cartScreen;
