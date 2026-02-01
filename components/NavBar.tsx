import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface NavBarProps {
  items?: NavItem[];
  onAddPress?: () => void;
}

const defaultItems: NavItem[] = [
  { label: "Home", href: "/home", icon: "🏠" },
  { label: "Goals", href: "/goals", icon: "⚡" },
  { label: "Transactions", href: "/transaction", icon: "✓" },
  { label: "More", href: "/more", icon: "⋯" },
];

export default function NavBar({ items = defaultItems, onAddPress }: NavBarProps) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        backgroundColor: "#fff",
        paddingBottom: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        height: 80,
      }}
    >
      {items.slice(0, 2).map((item) => (
        <Link key={item.href} href={item.href} asChild>
          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</Text>
            <Text style={{ fontSize: 12, color: "#666" }}>{item.label}</Text>
          </Pressable>
        </Link>
      ))}

      <Pressable
        onPress={onAddPress}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#5B5FFF",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 28, color: "#fff" }}>+</Text>
      </Pressable>

      {items.slice(2).map((item) => (
        <Link key={item.href} href={item.href} asChild>
          <Pressable
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</Text>
            <Text style={{ fontSize: 12, color: "#666" }}>{item.label}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
