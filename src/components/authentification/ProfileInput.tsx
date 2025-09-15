import { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import {
  Confidentiality,
  ConfidentialityColorByLevel,
  IInformation,
} from "../../interfaces/IInformation";
import ConfidentialityPicker from "../informations/ConfidentialityPicker";
import {
  deleteDataUserDataService,
  patchConfidentialityUserDataService,
  patchValueUserDataService,
} from "../../services/api/userdata";
import UserDataContext from "../../hooks/contexts/userData.context";

interface IProfileInputComponent extends IInformation {
  fieldID: string;
  displayConfidentialityPicker: boolean;
  onConfidentialityClick: () => void;
  onDeleteData: (id: number) => void;
  type?: string;
  errorMessage?: string;
}

//Composant différent parce que le fonctionnement de cet input est unique à l'appplication, il n'y a pas de submit
const ProfileInput = ({
  id,
  fieldID,
  label,
  content,
  confidentiality,
  displayConfidentialityPicker,
  onConfidentialityClick,
  onDeleteData,
  type = "text",
  errorMessage = "Ce champ est requis",
}: IProfileInputComponent) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [previousValue, setPreviousValue] = useState<string>("");
  const [currentConfidentiality, setCurrentConfidentiality] =
    useState<Confidentiality>(Confidentiality.MAXIMUM);
  const [error, setError] = useState<boolean>(false);

  const { patchValue } = patchValueUserDataService();
  const { patchConf } = patchConfidentialityUserDataService();
  const { deleteData } = deleteDataUserDataService();

  useEffect(() => {
    setIsDisabled(!!confidentiality);
    setCurrentValue(`${content}` || "");
    setPreviousValue(`${content}` || "");
    setCurrentConfidentiality(confidentiality);
  }, []);

  useEffect(() => {
    setError(!currentValue);
  }, [currentValue]);

  const { updateAvailableUserData } = useContext(UserDataContext);

  const handleValueChange = async () => {
    if (!error) {
      await patchValue(id, currentValue);
      setPreviousValue(currentValue);
      const lData = localStorage.getItem("user_data");
      if (!!lData) {
        const parsedData: IInformation[] = JSON.parse(lData);
        const index = parsedData.findIndex((data) => data.id === id);
        parsedData[index].content = currentValue;
        localStorage.setItem("user_data", JSON.stringify(parsedData));
      }
      setIsDisabled(true);
    }
  };

  const handleConfidentialityChange = async (conf: Confidentiality) => {
    if (conf !== currentConfidentiality) {
      await patchConf(id, conf);
      const lData = localStorage.getItem("user_data");
      if (!!lData) {
        const parsedData: IInformation[] = JSON.parse(lData);
        const index = parsedData.findIndex((data) => data.id === id);
        parsedData[index].confidentiality = conf;
        localStorage.setItem("user_data", JSON.stringify(parsedData));
      }
    }
  };

  const handleDelete = async () => {
    await deleteData(id);
    const lData = localStorage.getItem("user_data");
    if (!!lData) {
      const parsedData: IInformation[] = JSON.parse(lData);
      localStorage.setItem(
        "user_data",
        JSON.stringify(parsedData.filter((data) => data.id !== id))
      );
      updateAvailableUserData([]);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <label htmlFor={fieldID}>{label}</label>

        <div className="relative">
          <input
            disabled={isDisabled}
            className="peer block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
            id={fieldID}
            type={type}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
          {!!confidentiality && (
            <div className="w-35 h-full absolute top-0 right-0 flex items-center gap-5 justify-end pr-5">
              {!!isDisabled && (
                <>
                  <FaPen
                    size={20}
                    className="cursor-pointer"
                    onClick={() => {
                      setIsDisabled(false);
                    }}
                  />

                  <IconContext.Provider
                    value={{
                      color:
                        ConfidentialityColorByLevel[currentConfidentiality],
                    }}
                  >
                    <FaCircle
                      size={20}
                      className="cursor-pointer confidentiality-picker"
                      onClick={() => {
                        onConfidentialityClick();
                      }}
                    />
                  </IconContext.Provider>
                  {label !== "Email" && (
                    <FaTrashAlt
                      size={20}
                      className="cursor-pointer"
                      onClick={async () => {
                        await handleDelete();
                        onDeleteData(id);
                      }}
                    />
                  )}
                </>
              )}
              {!isDisabled && (
                <>
                  <IconContext.Provider value={{ color: "#7cc20a" }}>
                    <FaCheck
                      size={20}
                      className="cursor-pointer"
                      onClick={() => {
                        handleValueChange();
                      }}
                    />
                  </IconContext.Provider>
                  <IconContext.Provider value={{ color: "#d70029" }}>
                    <MdCancel
                      size={20}
                      className="cursor-pointer"
                      onClick={() => {
                        setCurrentValue(previousValue);
                        setIsDisabled(true);
                      }}
                    />
                  </IconContext.Provider>
                </>
              )}
            </div>
          )}
          {!!displayConfidentialityPicker && (
            <div className="absolute bg-white shadow-md rounded-lg w-50 top-10 right-0 z-20 flex flex-col gap-3 py-3">
              <ConfidentialityPicker
                pickConfidentiality={(conf: Confidentiality) => {
                  handleConfidentialityChange(conf);
                  setCurrentConfidentiality(conf);
                  onConfidentialityClick();
                }}
                currentlySelected={currentConfidentiality}
              />
            </div>
          )}
        </div>
        {error && <div className="text-red-600">{errorMessage}</div>}
      </div>
    </>
  );
};
export default ProfileInput;
