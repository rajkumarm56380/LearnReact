import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "../../components/Themed";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: "Details" }} />
      <Text style={{ fontSize: 20 }}>Product Details screen for id: {id}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
