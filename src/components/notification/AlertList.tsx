
import AlertItem from "./AlertItem";
import alerts from "../../data/alerts.json"

const AlertList= () => {

    return (
        <div className="min-h-screen  flex flex-col">
          <div className=" flex flex-col justify-center w-full max-w-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4">
              {alerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                />
              ))}
            </div>
          </div>
        </div>
      );
}

export default AlertList;