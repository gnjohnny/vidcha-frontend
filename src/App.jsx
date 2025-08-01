import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import OnBoardingPage from "./pages/OnBoardingPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";

import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
    const { isLoading, authUser } = useAuthUser();
    const { theme } = useThemeStore();

    const isAuthenticated = Boolean(authUser);
    const isOnBoarded = authUser?.isOnboarded;

    if (isLoading) return <PageLoader />;
    return (
        <div className="h-screen" data-theme={theme}>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated && isOnBoarded ? (
                            <Layout showSideBar={true}>
                                <HomePage />
                            </Layout>
                        ) : (
                            <Navigate
                                to={!isAuthenticated ? "/login" : "/onboarding"}
                            />
                        )
                    }
                />
                <Route
                    path="/signup"
                    element={
                        !isAuthenticated ? (
                            <SignUpPage />
                        ) : (
                            <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        !isAuthenticated ? (
                            <LogInPage />
                        ) : (
                            <Navigate to={isOnBoarded ? "/" : "/onboarding"} />
                        )
                    }
                />
                <Route
                    path="/onboarding"
                    element={
                        isAuthenticated ? (
                            !isOnBoarded ? (
                                <OnBoardingPage />
                            ) : (
                                <Navigate to={"/"} />
                            )
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        isAuthenticated && isOnBoarded ? (
                            <Layout showSideBar={true}>
                                <NotificationsPage />
                            </Layout>
                        ) : (
                            <Navigate
                                to={!isAuthenticated ? "/login" : "/onboarding"}
                            />
                        )
                    }
                />
                <Route
                    path="/chat/:id"
                    element={
                        isAuthenticated && isOnBoarded ? (
                            <Layout showSideBar={true}>
                                <ChatPage />
                            </Layout>
                        ) : (
                            <Navigate
                                to={!isAuthenticated ? "/login" : "/onboarding"}
                            />
                        )
                    }
                />
                <Route
                    path="/call/:id"
                    element={
                        isAuthenticated && isOnBoarded ? (
                            <CallPage />
                        ) : (
                            <Navigate
                                to={!isAuthenticated ? "/login" : "/onboarding"}
                            />
                        )
                    }
                />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
