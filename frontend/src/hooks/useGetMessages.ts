import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation) return;
			setLoading(true);
			setMessages([]);
			try {
				const res = await fetch(`/api/messages/${selectedConversation.id}`);
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "An error occurred");
				setMessages(data);
			} catch (error: any) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
