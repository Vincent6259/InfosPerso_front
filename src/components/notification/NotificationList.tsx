
import NotificationsItem from "./NotificationItem";
import notifications from "../../data/notifications.json"

const NotificationList= () => {

    return (
        <div className="min-h-screen  flex flex-col">
          <div className=" flex flex-col justify-center w-full max-w-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4">
              {notifications.map((notification) => (
                <NotificationsItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          </div>
        </div>
      );
}

export default NotificationList;