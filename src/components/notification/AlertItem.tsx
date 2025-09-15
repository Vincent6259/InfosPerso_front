import { HiAnnotation } from "react-icons/hi";

interface AlertType {
    content: string,
}

interface AlertProps {
    alert: AlertType
}

const AlertItem: React.FC<AlertProps> = ({ alert }) => {
    return (
        <div className="w-full p-3 mt-4 rounded flex blue shadow-lg ring-2 ">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
            <HiAnnotation />
         </div>
      <div className="pl-3 pt-1">
        <h3 className="text-sm font-medium text-gray-800">
          {alert.content}
        </h3>
      </div>
    </div>
    )
};

export default AlertItem