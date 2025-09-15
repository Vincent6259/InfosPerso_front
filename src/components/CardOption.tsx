import { Link } from "react-router-dom";

export interface CardOptionComponent {
  params: {
    label: string;
    link?: string;
    callback?: () => void;
    color?: string;
    isDisplayed?: boolean;
  };
}

const CardOption = ({
  params: { label, link, callback, color, isDisplayed = true },
}: CardOptionComponent) => {
  return (
    <>
      {isDisplayed && (
        <div className="flex items-center gap-x-3.5 rounded-lg text-sm hover:bg-gray-300  focus:outline-none focus:bg-gray-100">
          {link && (
            <Link
              to={link}
              className="py-2 px-3 flex flex-1 flex-col items-start"
            >
              <div className={`flex justify-evenly text-${color || "black"}`}>
                {label}
              </div>
            </Link>
          )}

          {callback && (
            <div
              className="py-2 px-3 flex flex-1 flex-col items-start"
              onClick={() => callback!()}
            >
              <div className={`flex justify-evenly text-${color || "black"}`}>
                {label}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CardOption;
