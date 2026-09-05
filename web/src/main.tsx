import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./lib/auth/AuthContext.tsx";
import { AccountPage } from "./pages/AccountPage.tsx";
import { ConceptMapPage } from "./pages/ConceptMapPage.tsx";
import { ConceptPage } from "./pages/ConceptPage.tsx";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { PostPage } from "./pages/PostPage.tsx";
import { PricingPage } from "./pages/PricingPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { ResetPasswordPage } from "./pages/ResetPasswordPage.tsx";
import { SchoolBoardPage } from "./pages/SchoolBoardPage.tsx";
import { SignUpPage } from "./pages/SignUpPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
