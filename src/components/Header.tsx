import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { GoBellFill } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidMessageDots } from "react-icons/bi";

interface HeaderComponent {
  label: string;
  iconClasses?: [string] | [string, string];
  icons?: [string] | [string, string];
  callsBacks?: [() => void] | [() => void, () => void];
}

const iconMap = {
  FaUserFriends,
  MdGroups,
  GoBellFill,
  IoIosLogOut,
  FaUserCircle,
  BiSolidMessageDots,
};

const Header = ({
  label,
  iconClasses = ["", ""],
  icons,
  callsBacks,
}: HeaderComponent) => {
  const [FirstCustomTag, SecondCustomTag] = (icons ?? []).map((icon) =>
    icon ? iconMap[icon as keyof typeof iconMap] : null
  );
  if (iconClasses.length === 1) {
    iconClasses.push("");
  }

  return (
    <>
      <div className="flex justify-center items-center teal w-full py-8 px-5 sm:py-10 mt-10">
        {FirstCustomTag ? (
          <FirstCustomTag
            className={iconClasses[0]}
            size={40}
            onClick={
              !!callsBacks && !!callsBacks[0]
                ? () => {
                    callsBacks[0]();
                  }
                : () => {}
            }
          />
        ) : null}

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold ml-auto mr-auto">
          {label}
        </h1>

        {SecondCustomTag ? (
          <SecondCustomTag
            className={iconClasses[1]}
            size={40}
            onClick={
              !!callsBacks && !!callsBacks[1]
                ? () => {
                    callsBacks[1]?.();
                  }
                : () => {}
            }
          />
        ) : null}
      </div>
    </>
  );
};

export default Header;
