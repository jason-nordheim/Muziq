"use client";

import Modal from "./Modal";

const AuthModal = () => {
  return (
    <Modal title="Welcome back" description="Login to your account" isOpen onChange={() => ({})}>
      Test Children
    </Modal>
  );
};

export default AuthModal;
