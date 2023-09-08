"use client";

import Modal from "@/components/Modal";
import { FC, useEffect, useState } from "react";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <Modal title="test title" description="test description" isOpen onChange={() => ({})}>
        test children
      </Modal>
    </>
  );
};

export default ModalProvider;
