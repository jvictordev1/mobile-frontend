import React, { forwardRef, LegacyRef, ReactElement } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

interface DefaultButtonP extends TouchableOpacityProps {
  icon?: ReactElement;
  title: string;
  className?: string;
}

export const DefaultButton = forwardRef(
  (
    { icon, title, className, ...TouchableOpacityProps }: DefaultButtonP,
    ref?: LegacyRef<View> | undefined
  ) => (
    <Pressable ref={ref}>
      <TouchableOpacity
        className={
          "flex flex-row justify-center items-center bg-blue-500 rounded-xl py-3 gap-2 h-16 disabled:bg-[#C0C0C0] " +
          className
        }
        {...TouchableOpacityProps}
      >
        {/* <CirclePlus size="24px" color="white" /> */}
        {icon}
        <Text className="text-white font-semibold">{title}</Text>
      </TouchableOpacity>
    </Pressable>
  )
);
