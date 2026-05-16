// src/contexts/alert/AlertProvider.tsx

import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Animated } from "react-native";

import {
  AlertContext,
  AlertData,
} from "./alert.context";

import { Alert } from "./Alert";

export function AlertProvider({
  children,
}: PropsWithChildren) {
  const [visible, setVisible] = useState(false);

  const [alert, setAlert] =
    useState<AlertData | null>(null);

  const [translateY] = useState(
    new Animated.Value(-120),
  );

  const hide = useCallback(() => {
    Animated.timing(translateY, {
      toValue: -120,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setAlert(null);
    });
  }, [translateY]);

  const show = useCallback(
    ({
      type = "info",
      title,
      message,
      duration = 3000,
    }: AlertData) => {
      setAlert({
        type,
        title,
        message,
        duration,
      });

      setVisible(true);

      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        hide();
      }, duration);
    },
    [hide, translateY],
  );

  const value = useMemo(
    () => ({
      show,
      hide,
    }),
    [show, hide],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}

      <Alert
        visible={visible}
        alert={alert}
        translateY={translateY}
        onClose={hide}
      />
    </AlertContext.Provider>
  );
}