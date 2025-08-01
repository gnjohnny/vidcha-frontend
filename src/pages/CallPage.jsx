import React from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
    StreamVideo,
    StreamVideoClient,
    StreamCall,
    CallControls,
    SpeakerLayout,
    StreamTheme,
    CallingState,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import PageLoader from "../components/PageLoader";
import toast from "react-hot-toast";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
    const [client, setClient] = React.useState(null);
    const [call, setCall] = React.useState(null);
    const [isCallActive, setIsCallActive] = React.useState(true);
    const { authUser, isLoading } = useAuthUser();

    const { data: tokenData } = useQuery({
        queryKey: ["streamToken"],
        queryFn: getStreamToken,
        enabled: !!authUser,
    });

    React.useEffect(() => {
        const initCall = async () => {
            if (!tokenData || !authUser || !callId) return;

            try {
                const user = {
                    id: authUser._id,
                    name: authUser.fullName,
                    image: authUser.profilePic,
                };

                const videoClient = new StreamVideoClient({
                    apiKey: STREAM_API_KEY,
                    user,
                    token: tokenData,
                });

              const callInstance = videoClient.call("default", callId);
                await callInstance.join({ create: true });
                setClient(videoClient);
                setCall(callInstance);

                toast.success("Video call connected successfully");
            } catch (error) {
                console.log("Error joining call", error.message);
                toast.error("Could not join the call. Please try again.");
            } finally {
                setIsCallActive(false);
            }
        };
        initCall();
    }, [tokenData, authUser, callId]);

    if (isLoading || isCallActive) return <PageLoader />;

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="relative">
                {client && call ? (
                    <StreamVideo client={client}>
                        <StreamCall call={call}>
                            <CallContent />
                        </StreamCall>
                    </StreamVideo>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p>
                            Could not initialize call. Please refresh or try
                            again later.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const CallContent = () => {
    const { useCallCallingState } = useCallStateHooks();
    const callState = useCallCallingState();

    const navigate = useNavigate();

    if (callState === CallingState.LEFT) return navigate("/");
    if (callState === CallingState.CALL_ENDED) return navigate("/");

    return (
        <StreamTheme>
            <SpeakerLayout />
            <CallControls />
        </StreamTheme>
    );
};

export default CallPage;
