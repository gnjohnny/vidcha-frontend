import { axiosInstance } from "../config/axios.config";

export const signUp = async (signupData) => {
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
};

export const logIn = async (loginData) => {
    const res = await axiosInstance.post("/auth/login", loginData);
    return res.data;
};

export const logOut = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
};

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
    } catch (error) {
        console.error("Error getting auth user:", error.message);
        return null;
    }
};

export const completeOnboarding = async (onboardingData) => {
    const res = await axiosInstance.post("/auth/onboarding", onboardingData);
    return res.data;
};

export const getUserFriends = async () => {
    const res = await axiosInstance.get("/users/friends");
    return res.data;
};

export const getRecommendedUsers = async () => {
    const res = await axiosInstance.get("/users");
    return res.data;
};

export const getOutgoingFriendRequests = async () => {
    const res = await axiosInstance.get("/users/outgoing-friend-requests");
    return res.data;
};

export const sendFriendRequest = async (userId) => {
    const res = await axiosInstance.post(`/users/friend-request/${userId}`);
    return res.data;
};

export const getFriendequests = async () => {
    const res = await axiosInstance.get("/users/friend-requests");
    return res.data;
};

export const acceptFriendRequest = async (userId) => {
    const res = await axiosInstance.put(
        `/users/friend-request/${userId}/accept`,
    );
    return res.data;
};

export const getStreamToken = async () => {
    const res = await axiosInstance.get("/chat/token");
    return res.data;
};
