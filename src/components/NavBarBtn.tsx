import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

interface INavBarBtnComponent {
  children: React.ReactNode;
  link: string;
  text: string;
  isActive: boolean;
  onClick: (btnClicked: string) => void;
}

const NavBarBtn = ({
  children,
  link,
  text,
  isActive,
  onClick,
}: INavBarBtnComponent) => {
  return (
    <>
      <div
        className={`cursor-pointer p-2 rounded-sm ${
          isActive ? "bg-black" : "bg-white"
        }`}
        onClick={() => onClick(link)}
      >
        <Link to={link} className="flex flex-col items-center">
          <IconContext.Provider value={{ color: isActive ? "white" : "black" }}>
            {children}
          </IconContext.Provider>
          <div className={`text-${isActive ? "white" : "black"}`}>{text}</div>
        </Link>
      </div>
    </>
  );
};

export default NavBarBtn;
