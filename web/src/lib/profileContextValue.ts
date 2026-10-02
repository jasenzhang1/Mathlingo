import { createContext } from "react";
import type { Profile } from "./profiles";

export interface ProfileContextValue {
  /** The signed-in user's profile; null when signed out or not loaded yet. */
  profile: Profile | null;
  /** True until the first load for the current user has settled. */
  loading: boolean;
  /** Re-reads the profile — call after changing it (username, avatar, name). */
  refresh: () => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextValue>({
  profile: null,
  loading: true,
  refresh: async () => {},
});
