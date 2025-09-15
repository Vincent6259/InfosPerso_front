import { IconContext } from "react-icons";
import Header from "../../components/Header";
import { FaCirclePlus } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import InformationCard from "../../components/informations/InformationCard";
import { Confidentiality, IInformation } from "../../interfaces/IInformation";
import UserDataContext from "../../hooks/contexts/userData.context";
import { postUserDataService } from "../../services/api/userdata";
import { useNavigate } from "react-router-dom";

export interface InfoCard {
  id: number;
  label: string;
  content: string | number;
  confidentiality: Confidentiality;
}

const AddInformation = () => {
  const [nextCardId, setNextCardId] = useState<number>(0);
  const [inforCards, setInforCards] = useState<InfoCard[]>([]);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const { availableUserData, updateAvailableUserData } =
    useContext(UserDataContext);

  useEffect(() => {
    updateAvailableUserData([]);
    console.log(availableUserData);
  }, []);

  useEffect(() => {
    const usedLabels = inforCards.map((infos) => infos.label);
    updateAvailableUserData(usedLabels);
  }, [inforCards]);

  const addToCards = (): void => {
    setInforCards([
      ...inforCards,
      {
        id: nextCardId,
        label: "",
        content: "",
        confidentiality: Confidentiality.MAXIMUM,
      },
    ]);
    setNextCardId(nextCardId + 1);
  };

  const changeCard = (
    id: number,
    label: string,
    content: string | number,
    confidentiality: Confidentiality
  ): void => {
    const foundCard = inforCards.find((card) => card.id === id);
    if (!foundCard) {
      return;
    }
    setInforCards(
      inforCards.map((card: InfoCard) => {
        return card.id === id
          ? { ...card, label, content, confidentiality }
          : card;
      })
    );
  };

  const removeCard = (id: number): void => {
    setInforCards(inforCards.filter((card) => card.id !== id));
  };

  const { postUserData } = postUserDataService();

  const validate = async (): Promise<any> => {
    const allContents = inforCards.map((info) => info.content);
    if (
      !!inforCards.length &&
      allContents.every((content) => !!content.toString().length)
    ) {
      setError(false);
      const dataToCreate = inforCards.map((card) => {
        const data = {
          label: card.label,
          content: card.content,
          confidentiality: card.confidentiality,
        };
        return data;
      });
      const createdData = await postUserData(dataToCreate);
      const lDataLabels = localStorage.getItem("data_label");
      if (!!createdData && lDataLabels) {
        const prunedCreatedData: IInformation[] = createdData.data.map(
          (cData) => {
            return {
              id: cData.id,
              content: cData.content,
              confidentiality: cData.confidentiality as Confidentiality,
              label: JSON.parse(lDataLabels)[cData.label_id - 1],
            };
          }
        );
        const lData = localStorage.getItem("user_data");
        if (!!lData) {
          const parsedData: IInformation[] = JSON.parse(lData);
          const updatedData: IInformation[] = [
            ...parsedData,
            ...prunedCreatedData,
          ];
          localStorage.setItem("user_data", JSON.stringify(updatedData));
        }
      }

      navigate("/");
      return createdData;
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div>
        <Header
          label="Ajouter des informations"
          iconClasses={["bg-white rounded-full"]}
          icons={["FaUserCircle"]}
        />

        {inforCards.map((card) => (
          <InformationCard
            key={card.id}
            id={card.id}
            availableLabels={availableUserData}
            changeCallback={changeCard}
            closeCallback={removeCard}
          />
        ))}

        {availableUserData.length >= inforCards.length && (
          <div className="flex justify-center mt-10">
            <IconContext.Provider value={{ color: "#B2EBF2" }}>
              <FaCirclePlus
                className="bg-black border-1 border-black rounded-full cursor-pointer"
                size={40}
                onClick={() => addToCards()}
              />
            </IconContext.Provider>
          </div>
        )}

        {error && !inforCards.length && (
          <div className="text-red-600 text-center pt-10">
            Veuillez ajouter des informations
          </div>
        )}

        {error && !!inforCards.length && (
          <div className="text-red-600 text-center pt-10">
            Veuillez remplir toutes les informations
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="cursor-pointer text-white font-semibold p-3 rounded-md mt-10 mb-10 green"
            onClick={() => validate()}
          >
            Valider
          </button>
        </div>
      </div>
    </>
  );
};

export default AddInformation;
