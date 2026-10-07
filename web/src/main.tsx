import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./lib/auth/AuthContext.tsx";
import { ProfileProvider } from "./lib/ProfileProvider.tsx";
import { OnboardingGate } from "./components/OnboardingGate.tsx";
import { AccountPage } from "./pages/AccountPage.tsx";
import { ConceptMapPage } from "./pages/ConceptMapPage.tsx";
import { ConceptPage } from "./pages/ConceptPage.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import { CoursesPage } from "./pages/CoursesPage.tsx";
import { DevQuestionsPage } from "./pages/DevQuestionsPage.tsx";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.tsx";
import { ForumsPage } from "./pages/ForumsPage.tsx";
import { LeaderboardPage } from "./pages/LeaderboardPage.tsx";
import { MessagesPage } from "./pages/MessagesPage.tsx";
import { HowItWorksPage } from "./pages/HowItWorksPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { PostPage } from "./pages/PostPage.tsx";
import { PricingPage } from "./pages/PricingPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { ResetPasswordPage } from "./pages/ResetPasswordPage.tsx";
import { SignUpPage } from "./pages/SignUpPage.tsx";
import { SubmitAnalogyPage } from "./pages/SubmitAnalogyPage.tsx";
import { SubmitPage } from "./pages/SubmitPage.tsx";
import { SubmitQuestionPage } from "./pages/SubmitQuestionPage.tsx";
import { WelcomePage } from "./pages/WelcomePage.tsx";

// Interview prep is lazy-loaded: its ~800 KB question bank is a separate
// chunk, fetched only by people who open that section.
const InterviewPage = lazy(() => import("./pages/InterviewPage.tsx").then((m) => ({ default: m.InterviewPage })));
const InterviewMockPage = lazy(() => import("./pages/InterviewMockPage.tsx").then((m) => ({ default: m.InterviewMockPage })));
const InterviewTrainPage = lazy(() => import("./pages/InterviewTrainPage.tsx").then((m) => ({ default: m.InterviewTrainPage })));
const InterviewProblemPage = lazy(() => import("./pages/InterviewProblemPage.tsx").then((m) => ({ default: m.InterviewProblemPage })));
const DevBundlesPage = lazy(() => import("./pages/DevBundlesPage.tsx").then((m) => ({ default: m.DevBundlesPage })));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
        <OnboardingGate />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/" element={<App />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/map" element={<ConceptMapPage />} />
            <Route path="/concepts/:id" element={<ConceptPage />} />
            <Route
              path="/concepts/:id/discussion/:postId"
              element={<PostPage />}
            />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/u/:username" element={<ProfilePage />} />
            <Route path="/forums" element={<ForumsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/messages/:username" element={<MessagesPage />} />
            <Route path="/forums/post/:postId" element={<PostPage />} />
            {/* The school forum now lives in Forums; keep old links working. */}
            <Route path="/school" element={<Navigate to="/forums?space=school" replace />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/submit/questions" element={<SubmitQuestionPage />} />
            <Route path="/submit/analogies" element={<SubmitAnalogyPage />} />
            <Route path="/dev/questions" element={<DevQuestionsPage />} />
            <Route path="/dev/bundles" element={<DevBundlesPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/interview/mock" element={<InterviewMockPage />} />
            <Route path="/interview/train/:sectionId" element={<InterviewTrainPage />} />

            <Route path="/interview/problem/:id" element={<InterviewProblemPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </Suspense>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
