import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./lib/auth/AuthContext.tsx";
import { AccountPage } from "./pages/AccountPage.tsx";
import { ConceptMapPage } from "./pages/ConceptMapPage.tsx";
import { ConceptPage } from "./pages/ConceptPage.tsx";
import { DevQuestionsPage } from "./pages/DevQuestionsPage.tsx";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { PostPage } from "./pages/PostPage.tsx";
import { PricingPage } from "./pages/PricingPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { ResetPasswordPage } from "./pages/ResetPasswordPage.tsx";
import { SchoolBoardPage } from "./pages/SchoolBoardPage.tsx";
import { SignUpPage } from "./pages/SignUpPage.tsx";
import { SubmitAnalogyPage } from "./pages/SubmitAnalogyPage.tsx";
import { SubmitQuestionPage } from "./pages/SubmitQuestionPage.tsx";

// Interview prep is lazy-loaded: its ~800 KB question bank is a separate
// chunk, fetched only by people who open that section.
const InterviewPage = lazy(() => import("./pages/InterviewPage.tsx").then((m) => ({ default: m.InterviewPage })));
const InterviewMockPage = lazy(() => import("./pages/InterviewMockPage.tsx").then((m) => ({ default: m.InterviewMockPage })));
const InterviewTrainPage = lazy(() => import("./pages/InterviewTrainPage.tsx").then((m) => ({ default: m.InterviewTrainPage })));
const DevBundlesPage = lazy(() => import("./pages/DevBundlesPage.tsx").then((m) => ({ default: m.DevBundlesPage })));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/map" element={<ConceptMapPage />} />
            <Route path="/concepts/:id" element={<ConceptPage />} />
            <Route
              path="/concepts/:id/discussion/:postId"
              element={<PostPage />}
            />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/u/:username" element={<ProfilePage />} />
            <Route path="/school" element={<SchoolBoardPage />} />
            <Route path="/submit/questions" element={<SubmitQuestionPage />} />
            <Route path="/submit/analogies" element={<SubmitAnalogyPage />} />
            <Route path="/dev/questions" element={<DevQuestionsPage />} />
            <Route path="/dev/bundles" element={<DevBundlesPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/interview/mock" element={<InterviewMockPage />} />
            <Route path="/interview/train/:sectionId" element={<InterviewTrainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
