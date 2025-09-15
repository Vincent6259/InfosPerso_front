import { Link } from "react-router-dom";

interface IFriendCardOptionComponent {
  children?: React.ReactNode;
  link: string;
  text: string;
  color?: string;
  handleClick?: () => unknown;
}

// const [nexFriendship, setNexFriendship] = useState<FriendListInterface>();

const FriendCardOptionsBtn = ({
  children,
  link,
  text,
  color,
  handleClick,
}: IFriendCardOptionComponent) => {
  const handleClicks = () => {
    if (handleClick) {
      console.log(handleClick());
    }
  }
  return (
    <>
      <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-gray-300  focus:outline-none focus:bg-gray-100" onClick={() => handleClick && handleClicks()}>
        <Link to={link} className="flex flex-col items-center">
          <div className={`flex justify-evenly text-${color || "black"}`}>
            {/* Lorsqu'on utilise une nouvelle couleur, décommenter la ligne si dessous (faire un rendu), puis la redécommenter, la nouvelle couleur devrait pouvoir s'afficher*/}
            {/* <div className={`text-blue-900`}> */}
            {children} {text}
          </div>
        </Link>
      </div>
    </>
  );
};

export default FriendCardOptionsBtn;
