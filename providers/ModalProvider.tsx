"use client";

import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import { FC, useEffect, useState } from "react";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
    </>
  );
};

export default ModalProvider;
