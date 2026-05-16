// src/contexts/alert/Alert.tsx

import React from "react";

import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AlertData } from "./alert.context";

type Props = {
  visible: boolean;
  alert: AlertData | null;
  translateY: Animated.Value;
  onClose: () => void;
};

export function Alert({
  visible,
  alert,
  translateY,
  onClose,
}: Props) {
  if (!visible || !alert) {
    return null;
  }

  const backgroundColor = (() => {
    switch (alert.type) {
      case "success":
        return "#22c55e";

      case "error":
        return "#ef4444";

      case "warning":
        return "#f59e0b";

      default:
        return "#3b82f6";
    }
  })();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          {alert.title && (
            <Text style={styles.title}>
              {alert.title}
            </Text>
          )}

          <Text style={styles.message}>
            {alert.message}
          </Text>
        </View>

        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    borderRadius: 12,
    padding: 16,
    zIndex: 9999,
    elevation: 10,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
    marginRight: 12,
  },

  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },

  message: {
    color: "#fff",
    fontSize: 14,
  },

  close: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});