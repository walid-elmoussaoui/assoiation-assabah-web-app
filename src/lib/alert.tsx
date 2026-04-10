import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import AlertModal from "../components/AlertModal";

type AlertOptions = {
  title?: string;
  confirmText?: string;
};

type AlertState = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
};

type AlertContextValue = {
  alert: (message: string, options?: AlertOptions) => void;
  close: () => void;
};

const AlertContext = createContext<AlertContextValue | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AlertState>({
    open: false,
    message: "",
  });

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const alert = useCallback((message: string, options?: AlertOptions) => {
    setState({
      open: true,
      message,
      title: options?.title,
      confirmText: options?.confirmText,
    });
  }, []);

  const value = useMemo(() => ({ alert, close }), [alert, close]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertModal
        open={state.open}
        title={state.title}
        message={state.message}
        confirmText={state.confirmText}
        onClose={close}
      />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
}

