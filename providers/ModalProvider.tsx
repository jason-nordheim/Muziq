"use client";

import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import UploadModal from "@/components/UploadModal";
import { FC, useEffect, useState } from "react";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
