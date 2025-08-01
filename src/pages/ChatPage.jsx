import React from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
    Channel,
    ChannelHeader,
    Chat,
    MessageList,
    MessageInput,
    Thread,
    Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const ChatPage = () => {
    const { id: targetUserId } = useParams();

    const [chatClient, setChatClient] = React.useState(null);
    const [channel, setChannel] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

    const { authUser } = useAuthUser();

    const { data: tokenData } = useQuery({
        queryKey: ["streamToken"],
        queryFn: getStreamToken,
        enabled: !!authUser,
    });
    React.useEffect(() => {
        const initChat = async () => {
            if (!tokenData || !authUser) return;
            try {
                const client = StreamChat.getInstance(STREAM_API_KEY);

                await client.connectUser(
                    {
                        id: authUser._id,
                        name: authUser.fullName,
                        image: authUser.profilePic,
                    },
                    tokenData,
                );

                const channelId = [authUser._id, targetUserId].sort().join("-");

                const currentChannel = client.channel("messaging", channelId, {
                    members: [authUser._id, targetUserId],
                });

                await currentChannel.watch();

                setChatClient(client);
                setChannel(currentChannel);
            } catch (error) {
                console.error("Error initializing chat client:", error);
            } finally {
                setLoading(false);
            }
        };

        initChat();
    }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      
      channel.sendMessage({
        text: `I have started a video call. Join here: ${callUrl}`,
      })

      toast.success("Video call link sent successfully!");
      }
    };

    if (loading || !chatClient || !channel) return <ChatLoader />;
    return (
        <div className="h-[93vh]">
            <Chat client={chatClient}>
                <Channel channel={channel}>
                    <div className="w-full relative">
                        <CallButton handleVideoCall={handleVideoCall} />
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput focus />
                        </Window>
                    </div>
                    <Thread />
                </Channel>
            </Chat>
        </div>
    );
};

export default ChatPage;
