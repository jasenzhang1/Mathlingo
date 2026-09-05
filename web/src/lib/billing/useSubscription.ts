import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { FREE_SUBSCRIPTION, loadSubscription, type Subscription } from "./api";
import { hasEntitlement, type Entitlement } from "./tiers";

/**
 * The caller's subscription, and what it unlocks.
 *
 * `refresh` exists for the return from Stripe Checkout: the webhook that grants
 * the tier and the browser redirect race each other, and the redirect usually
 * wins. Without a re-read the user lands back on the app having just paid and
 * still sees the free tier.
 */
export function useSubscription() {
  const { user, loading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<Subscription>(FREE_SUBSCRIPTION);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setSubscription(FREE_SUBSCRIPTION);
      setLoading(false);
      return;
    }
    setSubscription(await loadSubscription(user.id));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    void refresh();
  }, [authLoading, refresh]);

  const can = useCallback(
    (entitlement: Entitlement) => hasEntitlement(subscription.tier, entitlement),
    [subscription.tier],
  );

  return { subscription, loading: loading || authLoading, can, refresh };
}
