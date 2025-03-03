import { useShipmentStore } from "@/store/remessasContext";
import IShipmentCard from "@/types/IShipmentCard";
import { Trash2 } from "lucide-react-native"; // Ícone atualizado
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

interface ShipmentCardP {
  shipment: IShipmentCard;
  variant?: string;
}

export default function ShipmentCard({
  shipment,
  variant = "primary",
}: ShipmentCardP) {
  const toggleShipment = useShipmentStore((state) => state.toggleShipment);
  const isSelected = useShipmentStore((state) =>
    state.isShipmentSelected(shipment.id),
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta remessa?",
      [
        {
          text: "Cancelar",
          onPress: () => setIsDeleting(false),
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            console.log(`Remessa ${shipment.id} excluída.`);
            setIsDeleting(false);
          },
        },
      ],
    );
  };

  return (
    <View className="bg-white rounded-md border border-neutral-250">
      <View className="flex-row justify-between items-center p-5">
        <View className="flex-row gap-1 items-center">
          <Text className="text-2xl font-semibold" style={{ color: "#171717" }}>
            {shipment.id}
          </Text>
          <Text className="text-base text-neutral-400">
            {shipment.numerotalao}° Talão
          </Text>
        </View>
        {variant === "primary" ? (
          <View className="flex-row gap-4 items-center">
            <TouchableOpacity>
              <Text className="text-blue-500">Detalhes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} disabled={isDeleting}>
              <Trash2 color={isDeleting ? "gray" : "red"} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => toggleShipment(shipment.id)}
            className={
              "border rounded-md px-2 py-1 border-blue-500" +
              (isSelected ? " bg-blue-500" : "")
            }
          >
            <Text className={isSelected ? "text-white" : "text-blue-500"}>
              {isSelected ? "Selecionado" : "Selecionar"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-1 border-b border-neutral-250"></View>
      <View className="flex-col p-5">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl text-neutral-900 font-light">
            Identificador
          </Text>
          <Text className="text-2xl font-semibold text-neutral-900">
            {shipment.id}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl text-neutral-900 font-light">
            Data recebido
          </Text>
          <Text className="text-2xl font-semibold text-neutral-900">
            {new Date(shipment.datachegada).toLocaleDateString("pt-BR")}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl text-neutral-900 font-light">Casta</Text>
          <Text className="text-2xl font-semibold text-neutral-900">
            {shipment.casta}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl text-neutral-900 font-light">Tipo</Text>
          <Text className="text-2xl font-semibold text-neutral-900">
            {shipment.tipovinho}
          </Text>
        </View>
      </View>
    </View>
  );
}
