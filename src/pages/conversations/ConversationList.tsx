import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getConversations } from "../../services/api/conversations";
import { Conversation } from "../../interfaces/conversations";
import ConversationCard from "../../components/conversations/ConversationCard";

const ConversationList = () => {
  const [conv, setConv] = useState<Conversation[]>([]);
  useEffect(() => {
    (async () => {
      setConv(await getConversations());
    })();
  }, []);

  return (
    <>
      <Header label="Mes conversations" icons={["BiSolidMessageDots"]} />
      <div className="flex flex-col items-center gap-5 p-10 pb-30">
        {conv.map((c, index) => {
          return (
            <ConversationCard
              key={index}
              id={c.id}
              name={c.name}
              type={c.type}
            />
          );
        })}
      </div>
    </>
  );
};

export default ConversationList;
