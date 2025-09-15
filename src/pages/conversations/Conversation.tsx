import { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { getMessages } from "../../services/api/messages";
import { Message } from "../../interfaces/messages";

const Conversation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [writtenMessage, setWrittenMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    postMessage();
  };

  const handleClick = (): void => {
    postMessage();
  };

  const postMessage = (): void => {
    console.log(writtenMessage);
    setWrittenMessage("");
  };

  useEffect(() => {
    (async () => {
      setMessages(await getMessages());
    })();
  }, []);
  return (
    <>
      <div className="flex flex-col items-start gap-5 p-10 pb-0 mb-30">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={`max-w-100 ${
                message.author_id === 1
                  ? "ml-auto rounded-bl-xl"
                  : "rounded-br-xl"
              }`}
            >
              <div className="italic">{message.author_name}</div>
              <div
                className={`bg-gray-200 rounded-t-xl p-4 max-w-100 ${
                  message.author_id === 1
                    ? "ml-auto rounded-bl-xl"
                    : "rounded-br-xl"
                }`}
              >
                {message.content}
              </div>
            </div>
          );
        })}
        <div className="flex justify-center pt-20 w-full">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Envoyer un message"
              className="w-100 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              onChange={(e) => setWrittenMessage(e.target.value)}
              value={writtenMessage}
            />
            <FaArrowCircleRight size={40} onClick={handleClick} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Conversation;
