import { Modal, View, Text, Pressable } from "react-native";
import React from "react";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/60 justify-center items-center">
        <View className="w-[85%] bg-[#1c1c1c] p-5 rounded-2xl gap-5">
          <Text className="text-white text-2xl font-bold">{title}</Text>

          <Text className="text-[#B3B3B3] text-base">{message}</Text>

          <View className="flex-row justify-end gap-6">
            {cancelText ? (
              <Pressable onPress={onCancel}>
                <Text className="text-[#B3B3B3] text-lg">{cancelText}</Text>
              </Pressable>
            ) : null}

            {confirmText ? (
              <Pressable onPress={onConfirm}>
                <Text className="text-[#e53e3e] text-lg font-bold">
                  {confirmText}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}
