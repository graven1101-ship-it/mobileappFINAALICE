import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.dsffxatsx to edit this screen.</Text>
      <Link href="/home" asChild>
        <Pressable
          style={{
            marginTop: 20,
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: "#007AFF",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Go to Home
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
