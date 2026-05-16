// src/contexts/alert/alert.context.ts

import { createContext } from "react";

export type AlertType = "success" | "error" | "warning" | "info";

export type AlertData = {
  type?: AlertType;
  title?: string;
  message: string;
  duration?: number;
};

export type AlertContextData = {
  show: (data: AlertData) => void;
  hide: () => void;
};

export const AlertContext =
  createContext<AlertContextData | null>(null);