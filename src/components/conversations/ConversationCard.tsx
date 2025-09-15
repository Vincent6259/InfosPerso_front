import { Link } from "react-router-dom";
import { ConversationType } from "../../interfaces/conversations";

interface ConversationCardComponent {
  id: number;
  type: ConversationType;
  name: string;
}

const ConversationCard = ({ name, id, type }: ConversationCardComponent) => {
  return (
    <>
      <Link to={`/messages/${type}/${id}`} className="w-full">
        <div className="select-none cursor-pointer w-full bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ">
          {name}
        </div>
      </Link>
    </>
  );
};

export default ConversationCard;
