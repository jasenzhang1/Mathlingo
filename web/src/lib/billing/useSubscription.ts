import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { FREE_SUBSCRIPTION, loadInterviewAccess, loadSubscription, type Subscription } from "./api";
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
  /** The separate interview-prep subscription — independent of `subscription.tier`. */
  const [interview, setInterview] = useState(false);
  /** True when interview access comes from a lifetime purchase rather than a subscription. */
  const [interviewLifetime, setInterviewLifetime] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setSubscription(FREE_SUBSCRIPTION);
      setInterview(false);
      setInterviewLifetime(false);
      setLoading(false);
      return;
    }
    const [sub, interviewAccess] = await Promise.all([loadSubscription(user.id), loadInterviewAccess(user.id)]);
    setSubscription(sub);
    setInterview(interviewAccess.access);
    setInterviewLifetime(interviewAccess.lifetime);
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

  return { subscription, interview, interviewLifetime, loading: loading || authLoading, can, refresh };
}
