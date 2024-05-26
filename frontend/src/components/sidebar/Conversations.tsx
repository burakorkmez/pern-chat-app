import { DUMMY_CONVERSATIONS } from "../../dummy_data/dummy";
import Conversation from "./Conversation";

const Conversations = () => {
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{DUMMY_CONVERSATIONS.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} />
			))}
		</div>
	);
};
export default Conversations;
