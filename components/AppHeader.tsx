import { Link } from "expo-router";
import { Bell, ChevronLeft } from "lucide-react-native";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

interface AppHeaderProps {
  showReturnButton?: boolean;
  variant?: "primary" | "secondary";
  mainText: string;
}

export default function AppHeader({
  showReturnButton = false,
  variant = "primary",
  mainText,
}: AppHeaderProps) {
  const OSPadding = Platform.OS === "ios" ? 0 : 20;
  return (
    <View
      style={{
        paddingVertical: OSPadding,
        paddingHorizontal: 24,
        backgroundColor: variant === "primary" ? "#171717" : "transparent",
        borderBottomWidth: 1,
        borderColor: "#C0C0C0",
      }}
      className="flex-row items-center"
    >
      {showReturnButton ? (
        <Link href="/">
          <ChevronLeft color="#171717" />
        </Link>
      ) : null}
      <View
        style={{
          gap: variant === "primary" ? 10 : 0,
          flex: 1,
          justifyContent: variant === "primary" ? "space-between" : "center",
        }}
        className="flex-row items-center"
      >
        <Text
          className={
            variant === "primary"
              ? "text-white text-xl"
              : "text-zinc-950 text-2xl"
          }
        >
          {mainText}
        </Text>
        {variant === "primary" ? (
          <View className="flex flex-row items-center" style={{ gap: 12 }}>
            <TouchableOpacity>
              <Bell color="white" fill="white" />
            </TouchableOpacity>
            <Image
              source={require("@/assets/images/rio-sol-logo.jpg")}
              style={{ width: 45, height: 45, borderRadius: 100 }}
            />
          </View>
        ) : null}
      </View>
      {/* <TabBarIcon name="information-circle" style={{ color: "white" }} /> */}
    </View>
  );
}