import { createContext, useState, useEffect, useContext, ReactNode, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

interface ISocketContext {
	socket: Socket | null;
	onlineUsers: string[];
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocketContext = (): ISocketContext => {
	const context = useContext(SocketContext);
	if (context === undefined) {
		throw new Error("useSocketContext must be used within a SocketContextProvider");
	}
	return context;
};

const socketURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
	const socketRef = useRef<Socket | null>(null);

	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
	const { authUser, isLoading } = useAuthContext();

	useEffect(() => {
		if (authUser && !isLoading) {
			const socket = io(socketURL, {
				query: {
					userId: authUser.id,
				},
			});
			socketRef.current = socket;

			socket.on("getOnlineUsers", (users: string[]) => {
				setOnlineUsers(users);
			});

			return () => {
				socket.close();
				socketRef.current = null;
			};
		} else if (!authUser && !isLoading) {
			if (socketRef.current) {
				socketRef.current.close();
				socketRef.current = null;
			}
		}
	}, [authUser, isLoading]);

	return (
		<SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>{children}</SocketContext.Provider>
	);
};

export default SocketContextProvider;
