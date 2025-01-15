import { Href, Link, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FormFooterP {
  nextHref: string;
  isReturnButtonEnabled?: boolean;
  handleDataSubmit: () => Promise<void>;
}

export default function FormFooter({
  nextHref,
  isReturnButtonEnabled = false,
  handleDataSubmit,
}: FormFooterP) {
  const router = useRouter();
  return (
    <View
      style={{
        height: 80,
        borderTopWidth: 1,
        paddingHorizontal: 20,
        borderTopColor: "#C0C0C0",
      }}
    >
      <View className="flex-1 flex-row items-center justify-between px-14">
        <TouchableOpacity
          onPress={() => router.dismiss(1)}
          disabled={!isReturnButtonEnabled}
        >
          <Text
            className="text-xl"
            style={{
              color: isReturnButtonEnabled ? "#93c5fd" : "#C0C0C0",
            }}
          >
            Anterior
          </Text>
        </TouchableOpacity>
        {isReturnButtonEnabled ? (
          <TouchableOpacity onPress={handleDataSubmit}>
            <Text className="text-xl text-blue-500">Concluir</Text>
          </TouchableOpacity>
        ) : (
          <Link href={nextHref as Href} asChild>
            <TouchableOpacity>
              <Text className="text-xl text-blue-500">Próximo</Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
}
