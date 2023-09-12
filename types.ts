import Stripe from "stripe";
import { Address, PaymentMethod } from "@stripe/stripe-js";

export interface Song {
  id: string;
  user_id: string;
  author: string;
  album?: string;
  genre?: string;
  duration?: number;
  title: string;
  song_path: string;
  image_path: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Address;
  payment_method?: PaymentMethod["type"];
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: string;
  interval?: any; // todo: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  cancelled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}
