import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import SocketContextProvider from "./context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<BrowserRouter>
		<AuthContextProvider>
			<SocketContextProvider>
				<App />
			</SocketContextProvider>
		</AuthContextProvider>
	</BrowserRouter>
	// </React.StrictMode>
);
