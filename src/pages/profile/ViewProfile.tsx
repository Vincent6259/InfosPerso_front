import { useContext, useEffect, useState } from "react";
import { IInformation } from "../../interfaces/IInformation";
import ProfileInput from "../../components/authentification/ProfileInput";
import Header from "../../components/Header";
import { FaCirclePlus } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getUserDataService } from "../../services/api/userdata";
import { getDataLabelsService } from "../../services/api/labels";
import UserDataContext from "../../hooks/contexts/userData.context";

const ViewProfile = () => {
  const [infos, setInfos] = useState<IInformation[]>([]);
  const [labelsAmount, setLabelsAmount] = useState<number>(0);

  const [, setCookie] = useCookies(["access", "refresh"]);

  const [displayedConfidentialityPicker, setDisplayedConfidentialityPicker] =
    useState<number>(-1);

  const { updateAvailableUserData } = useContext(UserDataContext);

  const logout = (): void => {
    setCookie("access", "");
    setCookie("refresh", "");
  };

  const { getDataLabels } = getDataLabelsService();
  const { getUserData } = getUserDataService();

  useEffect(() => {
    (async () => {
      setLabelsAmount((await getDataLabels()).length);
      setInfos(await getUserData());

      updateAvailableUserData([]);
      console.log(infos);
    })();
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        !Array.from(target.classList).includes("confidentiality-picker")
      ) {
        setDisplayedConfidentialityPicker(-1);
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <Header
        label="Profil"
        iconClasses={["bg-white rounded-full", "cursor-pointer"]}
        icons={["FaUserCircle", "IoIosLogOut"]}
        callsBacks={[() => {}, () => logout()]}
      />
      <div className="pt-5 pl-5 pr-5 pb-30">
        <div className="flex justify-between pb-10">
          {!!labelsAmount && !!infos.length && labelsAmount > infos.length && (
            <Link to={"/add-info"}>
              <IconContext.Provider value={{ color: "#B2EBF2" }}>
                <FaCirclePlus
                  className="bg-black border-1 border-black rounded-full cursor-pointer"
                  size={40}
                />
              </IconContext.Provider>
            </Link>
          )}
          {/* <IconContext.Provider value={{ color: "#B2EBF2" }}>
            <FaAddressCard
              className="bg-black cursor-pointer ml-auto"
              size={40}
            />
          </IconContext.Provider> */}
        </div>
        <div className="flex flex-col gap-6 max-w-200 m-auto">
          {!!infos.length &&
            infos.map((info, index) => (
              <ProfileInput
                key={index}
                id={info.id}
                fieldID={info.label}
                label={info.label}
                content={info.content}
                confidentiality={info.confidentiality}
                displayConfidentialityPicker={
                  index === displayedConfidentialityPicker
                }
                onConfidentialityClick={() => {
                  if (index !== displayedConfidentialityPicker) {
                    setDisplayedConfidentialityPicker(index);
                  } else setDisplayedConfidentialityPicker(-1);
                }}
                onDeleteData={(id) => {
                  setInfos(infos.filter((info) => info.id !== id));
                }}
              />
            ))}
          {!infos.length && (
            <div className="text-center font-bold">
              Pas d'informations à afficher
            </div>
          )}
        </div>
        <div className="flex justify-center">
          {/* <button className="cursor-pointer text-white font-semibold p-3 rounded-md mt-15 red">
            Supprimer son compte
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
