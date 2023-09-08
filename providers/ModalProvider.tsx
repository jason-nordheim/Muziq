"use client";

import { FC, useEffect, useState } from "react";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return <>Modals!</>;
};

export default ModalProvider;
