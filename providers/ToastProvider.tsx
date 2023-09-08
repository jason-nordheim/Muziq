"use client";

import { FC } from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider: FC = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
  );
};

export default ToastProvider;
