import { IoMdClose } from "react-icons/io";
import { Confidentiality } from "../../interfaces/IInformation";
import { useEffect, useRef, useState } from "react";
import ConfidentialityPicker from "./ConfidentialityPicker";

interface InfoCardComponent {
  id: number;
  availableLabels: string[];
  changeCallback: (
    id: number,
    label: string,
    content: string | number,
    confidentiality: Confidentiality
  ) => void;
  closeCallback: (id: number) => void;
}

const InformationCard = ({
  id,
  availableLabels,
  changeCallback,
  closeCallback,
}: InfoCardComponent) => {
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const [selectedConfidentiality, setSelectedConfidentiality] =
    useState<Confidentiality>(Confidentiality.MAXIMUM);
  const [labelsToPickFrom, setLabelsToPickFrom] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const isFirstRender = useRef(true);

  const errorMessage = "Ce champ est requis";

  const pickConfidentiality = (conf: Confidentiality) => {
    setSelectedConfidentiality(conf);
  };

  useEffect(() => {
    if (availableLabels.length > 0 && !selectedLabel) {
      setSelectedLabel(availableLabels[0]);
    }
  }, []);

  useEffect(() => {
    const labelsSet = new Set([selectedLabel, ...availableLabels]);
    setLabelsToPickFrom([...labelsSet]);
  }, [selectedLabel, availableLabels]);

  useEffect(() => {
    changeCallback(id, selectedLabel, selectedValue, selectedConfidentiality);
  }, [selectedLabel, selectedValue, selectedConfidentiality]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setError(!selectedValue);
    }
  }, [selectedValue]);

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="bg-gray-100">
          <div className="flex justify-end">
            <IoMdClose
              className="cursor-pointer"
              onClick={() => closeCallback(id)}
            />
          </div>
          <div className="flex flex-col p-10">
            <select
              className="border bg-white"
              onChange={(e) => {
                setSelectedLabel(e.target.value);
              }}
            >
              {labelsToPickFrom.map((label, index) => (
                <option key={label + index} value={label}>
                  {label}
                </option>
              ))}
            </select>
            <input
              placeholder="Valeur"
              className="border border-black bg-white mt-10 pl-1"
              type="text"
              onChange={(e) => {
                setSelectedValue(e.target.value);
              }}
            />
            {error && <div className="text-red-600">{errorMessage}</div>}
            <div className="text-center mt-10">Sensibilité</div>
            <ConfidentialityPicker
              pickConfidentiality={pickConfidentiality}
              currentlySelected={selectedConfidentiality}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationCard;
