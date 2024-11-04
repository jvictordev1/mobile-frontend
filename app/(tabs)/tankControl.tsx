import apiInstance from "@/api/apiInstance";
import AppHeader from "@/components/AppHeader";
import CustomStatusBar from "@/components/CustomStatusBar";
import SafeAreaView from "@/components/SafeAreaView";
import { Href, Link, useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CardProps {
  title: string;
  isAvailable: boolean;
  density?: string;
  temperature?: number;
  pressure?: 0;
}

function FilterDrawer({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: any;
}) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <View className="bg-white p-4 rounded-t-lg">
          <Text className="text-xl font-bold mb-4">Filtros</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-blue-500">Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function Card({
  title,
  isAvailable,
  density = "",
  temperature = 0,
  pressure = 0,
}: CardProps) {
  const router = useRouter();

  const href = isAvailable
    ? { pathname: "/(tankControl)/[emptyTank]", params: { tank: title } }
    : { pathname: "/tank/[tank]", params: { tank: title } };

  return (
    <Link href={href as Href} asChild>
      <TouchableOpacity style={{ marginBottom: 16, width: "100%" }}>
        <View className="bg-white rounded-lg shadow flex-col border border-neutral-250">
          <View className="flex-row p-4 justify-between items-center">
            <Text className="text-2xl font-bold">{title}</Text>
            {isAvailable ? (
              <View className="bg-green-200 px-2 py-1 rounded-full">
                <Text className="text-md text-green-800">Disponível</Text>
              </View>
            ) : (
              <View className="bg-red-200 px-2 py-1 rounded-full">
                <Text className="text-md text-red-800">Ocupado</Text>
              </View>
            )}
          </View>
          {!isAvailable && (
            <>
              <View className="w-full h-[1px] bg-neutral-250"></View>
              <View className="p-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-xl font-light">Densidade:</Text>
                  <View className="flex-row justify-center items-end">
                    <Text className="text-2xl font-semibold">{density} </Text>
                    <Text className="text-base font-normal text-neutral-400">
                      kg/m³
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-xl font-light">Temperatura:</Text>
                  <View className="flex-row justify-center items-end">
                    <Text className="text-2xl font-semibold">
                      {temperature}{" "}
                    </Text>
                    <Text className="text-base font-normal text-neutral-400">
                      °C
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-xl font-light">Pressão:</Text>
                  <View className="flex-row justify-center items-end">
                    <Text className="text-2xl font-semibold">{pressure} </Text>
                    <Text className="text-base font-normal text-neutral-400">
                      Pa
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

interface Data {
  tipo: "string";
  numero: "string";
  valid: true;
}

export default function TankControl() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getDepositos();
  }, []);

  const getDepositos = async () => {
    try {
      const token = await SecureStore.getItemAsync("user-token");
      const response = await apiInstance.get(
        "/deposito/findDepositosComAnalises",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar depósitos:", error);
    }
  };

  //getDepositos();

  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <SafeAreaView>
        <AppHeader
          showReturnButton
          variant="secondary"
          mainText="Controle de tanques"
          returnHref={router.back}
        />
        <View className="px-7 flex-1">
          <View>
            <Text className="text-4xl text-black font-bold">
              Controle de tanques.
            </Text>
            <Text className="text-xl mt-2 mb-4">
              Lista de todas as informações acessíveis no momento.
            </Text>
          </View>
          <View className="flex flex-row items-center w-full mb-4">
            <View className="flex flex-row items-center bg-[#DEDEDE] py-3 px-3 rounded-lg flex-1">
              <Search size="25px" color="#9A9A9A" />
              <TextInput
                className="text-xl ml-2 flex-1"
                placeholder="Digite o que deseja buscar..."
              />
            </View>
            <TouchableOpacity
              onPress={() => setDrawerVisible(true)}
              style={{
                backgroundColor: "#007BFF",
                paddingVertical: 14,
                paddingHorizontal: 15,
                borderRadius: 5,
                marginLeft: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "semibold" }}>
                Filtrar
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <Card
                  title={item.deposito}
                  isAvailable={item.tempMostro == null ? true : item.tempMostro}
                  density={"0"}
                  temperature={20}
                  pressure={item.pressure == 0 ? 0 : undefined}
                />
              );
            }}
            keyExtractor={(item) => item.numero}
            showsVerticalScrollIndicator={false}
          />
          <FilterDrawer
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
