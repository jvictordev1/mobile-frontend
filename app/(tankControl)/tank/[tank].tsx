import ActivityCard from "@/components/ActivityCard";
import AppHeader from "@/components/AppHeader";
import SafeAreaView from "@/components/SafeAreaView";
import { useShipmentStore } from "@/store/remessasContext";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowRightLeft,
  Cylinder,
  Microscope,
  Milk,
  TestTubeDiagonal,
  Truck,
} from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function Tank() {
  const { tank, depositId, content, contentId, capacity, volume } =
    useLocalSearchParams();
  const router = useRouter();
  const { clearShipments } = useShipmentStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      clearShipments();
      return;
    }, []),
  );

  let activityListItems = [
    {
      name: "Análises diárias",
      icon: <Cylinder size="28px" color="#000000" />,
      route: "/(tankControl)/tank/dailyAnalysis/[dailyAnalysis]",
      param: [
        {
          //codigo gerado pelo DeepSeek (IA), não me pergunte o que ele faz
          //mas resolve o erro de tipagem insuportavel que acontecia na lista
          //de ActivityCard
          tank: tank as string,
          depositId: Number(depositId),
          content: Array.isArray(content) ? content[0] : content,
          contentId: Array.isArray(contentId)
            ? Number(contentId[0])
            : Number(contentId),
        },
      ],
    },
    {
      name: "Análises de deposito",
      icon: <Microscope size="28px" color="#000000" />,
      route: "/(tankControl)/tank/depositAnalysis/listAnalysis/[listAnalysis]",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Realizar Trasfega",
      icon: <ArrowRightLeft size="28px" color="#000000" />,
      route: "/(tankControl)/tank/realizarTrasfega/[trasfega]",
      param: [
        {
          tank: tank as string,
          depositId: Number(depositId),
          capacity,
          volume,
          contentId: Array.isArray(contentId)
            ? Number(contentId[0])
            : Number(contentId),
          content: content,
        },
      ],
    },
    {
      name: "Envase e rotulagem",
      icon: <Milk size="28px" color="#000000" />,
      route: "/envaseERotulagem/envase",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
    {
      name: "Controle de produtos",
      icon: <TestTubeDiagonal size="28px" color="#000000" />,
      route: "/(tankControl)/tank/addProduct/[addProduct]",
      param: [
        {
          tank: tank as string,
          contentId: Array.isArray(contentId)
            ? Number(contentId[0])
            : Number(contentId),
        },
      ],
    },
    {
      name: "Nova Remessa",
      icon: <Truck size="28px" color="#000000" />,
      route: "/(tankControl)/tank/addBaseWine/[addBaseWine]",
      param: [{ tank: tank as string, depositId: Number(depositId) }],
    },
  ];

  function filterActivityItems() {
    if ((content as string).toLowerCase() === "mostro") {
      return activityListItems.filter(
        (i) =>
          i.name !== "Envase e rotulagem" && i.name !== "Controle de produtos",
      );
    }
    if ((content as string).toLowerCase() === "pé de cuba")
      return activityListItems.filter((i) => i.name !== "Envase e rotulagem");
    return activityListItems.filter((i) => i.name !== "Nova Remessa");
  }

  return (
    <SafeAreaView>
      <AppHeader
        showReturnButton
        variant="secondary"
        mainText={`${tank}`}
        returnHref={() => router.dismissTo("/(tabs)/tankControl")}
      />
      <ScrollView>
        {/* Lista de Ações */}
        <View className="px-7 mb-4">
          <Text className="text-zinc-950 font-bold text-2xl">Ações</Text>
        </View>
        <FlatList
          data={filterActivityItems()}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <ActivityCard
                title={item.name}
                icon={item.icon}
                route={item.route}
                param={item.param}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 25,
            gap: 10,
          }}
        />

        {/* Dados Recentes */}
        <View className="px-7 gap-4 mt-4">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-xl font-bold text-gray-700">
              Dados recentes
            </Text>
            <Text className="text-emerald-500 text-xl">Status: Ok !</Text>
          </View>
          <View className="flex flex-row justify-between">
            <View className="flex-1 ">
              <Text className="text-xl font-semibold">Volume Atual</Text>
              <Text className="text-2xl font-semibold text-blue-500">
                {volume} L
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-semibold">Capacidade Total</Text>
              <Text className="text-2xl font-semibold text-blue-500">
                {capacity} L
              </Text>
            </View>
          </View>
          {/* <View className="flex-1 bg-gray-100 justify-center items-center rounded-lg p-4">
            <DensTempGraph />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Card = ({
  shipment,
  detailsLink,
}: {
  shipment: string;
  detailsLink: () => void;
}) => {
  if (true) return <></>;

  return (
    <View>
      <Text className="text-black font-bold text-xl mb-1 mt-2">
        Remessa (s)
      </Text>
      <View className="bg-white p-4 rounded-lg shadow-md">
        <Text className="text-gray-500 text-sm mb-1">Remessa associada</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-medium">{shipment}</Text>
          <Text
            className="text-base font-semibold text-blue-500"
            onPress={detailsLink}
          >
            Ver Detalhes
          </Text>
        </View>
      </View>
    </View>
  );
};

const AnalysisSummaryCard = ({ date, data }: { date: string; data: any }) => {
  if (true) return <></>;

  return (
    <View>
      <Text className="text-lg font-medium text-black mb-1 mt-1">
        Resumo da Última Análise
      </Text>
      <View className="bg-white p-4 rounded-lg shadow-md">
        <Text className="text-base font-medium text-gray-600">{date}</Text>
        {data.map((item: any, index: number) => (
          <View key={index} className="flex-row justify-between items-center">
            <Text className="text-gray-700">{item.label}</Text>
            <View className="flex-row items-center gap-1">
              {item.icon && (
                <item.icon
                  size="20px"
                  color={item.iconColor}
                  style={item.iconStyle || {}}
                />
              )}
              <Text className="text-lg font-medium text-black">
                {item.value}
              </Text>
              <Text className="text-sm text-gray-600">{item.unit}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
