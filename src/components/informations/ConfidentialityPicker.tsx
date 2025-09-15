import { IconContext } from "react-icons";
import { FaCircle } from "react-icons/fa";
import {
  Confidentiality,
  ConfidentialityColorByLevel,
} from "../../interfaces/IInformation";

interface ConfidentialityPickerComponent {
  pickConfidentiality: (conf: Confidentiality) => void;
  gap?: number;
  currentlySelected?: Confidentiality | null;
  maximumVisible?: boolean;
}

const ConfidentialityPicker = ({
  pickConfidentiality,
  gap = 3,
  currentlySelected = null,
  maximumVisible = true,
}: ConfidentialityPickerComponent) => {
  return (
    <>
      <div className={`flex flex-col gap-${gap}`}>
        <div
          className={`flex items-center px-5 py-2 mx-5 cursor-pointer hover:bg-gray-400 hover:text-white border-3 rounded-sm ${
            currentlySelected === Confidentiality.MINIMUM
              ? ""
              : "border-transparent"
          }`}
          onClick={() => {
            pickConfidentiality(Confidentiality.MINIMUM);
          }}
        >
          <IconContext.Provider
            value={{ color: ConfidentialityColorByLevel.MINIMUM }}
          >
            <FaCircle size={20} className="mr-auto" />
          </IconContext.Provider>
          <div>Minimale</div>
        </div>
        <div
          className={`flex items-center px-5 py-2 mx-5 cursor-pointer hover:bg-gray-400 hover:text-white border-3 rounded-sm ${
            currentlySelected === Confidentiality.MIDDLING
              ? ""
              : "border-transparent"
          }`}
          onClick={() => {
            pickConfidentiality(Confidentiality.MIDDLING);
          }}
        >
          <IconContext.Provider
            value={{ color: ConfidentialityColorByLevel.MIDDLING }}
          >
            <FaCircle size={20} className="mr-auto" />
          </IconContext.Provider>
          <div>Modérée</div>
        </div>
        <div
          className={`flex items-center px-5 py-2 mx-5 cursor-pointer hover:bg-gray-400 hover:text-white border-3 rounded-sm ${
            currentlySelected === Confidentiality.CRITICAL
              ? ""
              : "border-transparent"
          }`}
          onClick={() => {
            pickConfidentiality(Confidentiality.CRITICAL);
          }}
        >
          <IconContext.Provider
            value={{ color: ConfidentialityColorByLevel.CRITICAL }}
          >
            <FaCircle size={20} className="mr-auto" />
          </IconContext.Provider>
          <div>Critique</div>
        </div>
        {maximumVisible && (
          <div
            className={`flex items-center px-5 py-2 mx-5 cursor-pointer hover:bg-gray-400 hover:text-white border-3 rounded-sm ${
              currentlySelected === Confidentiality.MAXIMUM
                ? ""
                : "border-transparent"
            }`}
            onClick={() => {
              pickConfidentiality(Confidentiality.MAXIMUM);
            }}
          >
            <IconContext.Provider
              value={{ color: ConfidentialityColorByLevel.MAXIMUM }}
            >
              <FaCircle size={20} className="mr-auto" />
            </IconContext.Provider>
            <div>Maximale</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfidentialityPicker;
