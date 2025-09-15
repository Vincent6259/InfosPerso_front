import { Link } from "react-router-dom";
import GroupListComp from "../../components/groups/GroupListComp";
import Header from "../../components/Header";
import { IconContext } from "react-icons";
import { FaCirclePlus } from "react-icons/fa6";

const GroupList = () => {
  return (
    <>
      <Header label="Liste des groupes" icons={["MdGroups"]} />
      <div className="pt-5 pl-5 pr-5 pb-30">
        <div className="flex justify-between pb-10">
          <Link to={"/new-group"}>
            <IconContext.Provider value={{ color: "#B2EBF2" }}>
              <FaCirclePlus
                className="bg-black border-1 border-black rounded-full cursor-pointer"
                size={40}
              />
            </IconContext.Provider>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-15">
          <GroupListComp />
        </div>
      </div>
    </>
  );
};

export default GroupList;
