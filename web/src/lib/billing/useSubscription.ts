import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { FREE_SUBSCRIPTION, loadInterviewAccess, loadSubscription, type Subscription } from "./api";
import { useIsRealDeveloper } from "../dev/devAuth";
import { useStudentView } from "../dev/studentView";
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

  // A developer in "Student view" can preview another plan. Display only: the
  // server still checks the real one.
  const isRealDeveloper = useIsRealDeveloper();
  const view = useStudentView();
  const previewing = isRealDeveloper && view.on;
  const shownSubscription: Subscription =
    previewing && view.plan !== "actual" ? { ...subscription, tier: view.plan } : subscription;
  const shownInterview = previewing && view.interview !== "actual" ? view.interview === "on" : interview;

  const can = useCallback(
    (entitlement: Entitlement) => hasEntitlement(shownSubscription.tier, entitlement),
    [shownSubscription.tier],
  );

  return {
    subscription: shownSubscription,
    interview: shownInterview,
    interviewLifetime: shownInterview && interviewLifetime,
    loading: loading || authLoading,
    can,
    refresh,
  };
}
