"use client";

import { FC, useState } from "react";
import Modal from "./Modal";
import { Price, ProductWithPrice } from "@/types";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/lib/helpers";
import { getStripe } from "@/lib/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModel";

const NO_PRODUCTS = () => <div className="text-center">No Products Available</div>;

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeModal: FC<{ products: ProductWithPrice[] }> = ({ products }) => {
  const subscribeModal = useSubscribeModal();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const { user, isLoading, subscription } = useUser();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Must be logged in");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed");
    }

    try {
      const { sessionId } = await postData({ url: "/api/create-checkout-session", data: { price } });

      const stripe = await getStripe();

      stripe?.redirectToCheckout({ sessionId });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  let content = NO_PRODUCTS();

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product?.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }

          return product.prices.map((price) => {
            return (
              <Button
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
              >{`Subscribe for ${formatPrice(price)} per ${price.interval}`}</Button>
            );
          });
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already Subscribed</div>;
  }

  return (
    <Modal
      title="Muziq Premium"
      description="Get the most from Muziq with Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
