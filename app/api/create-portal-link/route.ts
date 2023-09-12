import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { getUrl } from "@/lib/helpers";
import { createOrRetrieveCustomer } from "@/lib/supabaseAdmin";

export const POST = async () => {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Could not get user");

    const customer = await createOrRetrieveCustomer({
      uuid: user.id || "",
      email: user.email || "",
    });

    if (!customer) throw new Error("Could not get customer");

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getUrl()}/account`,
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", 500);
  }
};
