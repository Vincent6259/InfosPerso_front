import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { GoBellFill } from "react-icons/go";
import { BiSolidMessageDots } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import NavBarBtn from "./NavBarBtn";
import { useState } from "react";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const [cookies] = useCookies(["access"]);
  const [lastClicked, setLastClicked] = useState<string>("/");
  const handleClick = (btnClicked: string): void => {
    setLastClicked(btnClicked);
  };

  return (
    <>
      {!!cookies.access && (
        <div className="shadow-[0px_-2px_5px_0px_#808080] fixed bottom-0 z-100 flex gap-4 justify-center p-1 w-full bg-white lg:static lg:justify-start lg:px-10 lg:py-3 lg:gap-10 lg:shadow-[0px_2px_5px_0px_#808080]">
          <NavBarBtn
            link="/friends"
            text="Amis"
            isActive={lastClicked === "/friends"}
            onClick={handleClick}
          >
            <FaUserFriends size={40} />
          </NavBarBtn>

          <div className="cursor-pointer">
            <NavBarBtn
              link="/groups"
              text="Groupes"
              isActive={lastClicked === "/groups"}
              onClick={handleClick}
            >
              <MdGroups size={40} />
            </NavBarBtn>
          </div>

          <div className="cursor-pointer">
            <NavBarBtn
              link="/alerts"
              text="Alertes"
              isActive={lastClicked === "/alerts"}
              onClick={handleClick}
            >
              <GoBellFill size={40} />
            </NavBarBtn>
          </div>

          <div className="cursor-pointer">
            <NavBarBtn
              link="/messages"
              text="Messages"
              isActive={lastClicked === "/messages"}
              onClick={handleClick}
            >
              <BiSolidMessageDots size={40} />
            </NavBarBtn>
          </div>

          <div className="cursor-pointer lg:ml-auto">
            <NavBarBtn
              link="/"
              text="Profil"
              isActive={lastClicked === "/"}
              onClick={handleClick}
            >
              <FaUserCircle size={40} />
            </NavBarBtn>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
