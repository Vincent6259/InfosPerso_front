import React, { useState } from 'react';
import { Tabs, Tab } from "@heroui/tabs";
import NotificationList from '../../components/notification/NotificationList';
import AlertList from '../../components/notification/AlertList';
import Header from '../../components/Header';


export default function App() {
  const [selectedKey, setSelectedKey] = useState("notifications");

  const handleSelectionChange = (key: React.Key) => {
    setSelectedKey(String(key));
  };

  return (
    <div >
      <Header label='Notifications' icons={["GoBellFill"]} />
      <div className="flex flex-col gap-4 p-4">
        <Tabs
          selectedKey={selectedKey}
          onSelectionChange={handleSelectionChange}
        >
          <Tab
            key="notifications"
            titleValue="notifications"
            title={
              selectedKey === "notifications" ? 
              <span className="text-red-600 font-bold px-4 py-2 border-2 rounded-md shadow-lg">Notifications</span> :
              <span className="text-gray-600 px-4 py-2 border-2 rounded-md">Notifications</span>
            }
          />
          <Tab
            key="alerts"
            titleValue="alerts"
            title={
              selectedKey === "alerts" ? 
              <span className="text-red-600 font-bold px-11 py-2 border-2 rounded-md shadow-lg">Alertes</span> :
              <span className="text-gray-600 px-10 py-2 border-2 rounded-md">Alertes</span>
            }
          />
        </Tabs>
      </div>
      <div className="mt-6">
        {selectedKey === "notifications" && <NotificationList />}
        {selectedKey === "alerts" && <AlertList />}
      </div>
    </div>
  );
}

