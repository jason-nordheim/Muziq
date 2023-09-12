"use client";

import useSubscribeModal from "@/hooks/useSubscribeModel";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });
      if (error) throw error;
      window.location.assign(url);
    } catch (error: any) {
      if (error) {
        toast.error(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gay-y-4">
          <p>No active plan</p>
          <Button onClick={() => subscribeModal.onOpen()}>Subscribe</Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the <b>{subscription?.prices?.products?.name}</b> plan
          </p>
          <Button onClick={() => redirectToCustomerPortal()} disabled={loading || isLoading} className="w-[300px]">
            Open Customer Portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
