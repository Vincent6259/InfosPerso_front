import "./app.css";

import { Route, Routes } from "react-router-dom";
import GroupList from "./pages/groups/GroupList";
import GroupDetail from "./pages/groups/GroupDetail";
import GroupCreation from "./pages/groups/GroupCreate";
import ListFriends from "./pages/friends/FriendList";
import FriendDetails from "./pages/friends/FriendDetails";
import NavBar from "./components/NavBar";
import ViewProfile from "./pages/profile/ViewProfile";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import AddInformation from "./pages/profile/AddInformation";
import NotFound from "./pages/NotFound";
import ConversationList from "./pages/conversations/ConversationList";
import Conversation from "./pages/conversations/Conversation";
import Alerts from "./pages/notification/Alerts";
import PrivateRoute from "./components/PrivateRoute";
// import WebSocketChat from "./websocket/chat";
// import SSENotif from "./SSENotif";
import { UserDataProvider } from "./hooks/contexts/userData.context";
import GroupEdit from "./pages/groups/GroupEdit";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route element={<PrivateRoute hasToBeLogged={false} />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoute hasToBeLogged />}>
          <Route
            path="/"
            element={
              <UserDataProvider>
                <ViewProfile />
              </UserDataProvider>
            }
          />
          <Route
            path="/add-info"
            element={
              <UserDataProvider>
                <AddInformation />
              </UserDataProvider>
            }
          />
          <Route path="/groups" element={<GroupList />} />
          <Route path="/group/:id" element={<GroupDetail />} />
          <Route path="/group/:id/edit" element={<GroupEdit />} />
          <Route path="/new-group" element={<GroupCreation />} />
          <Route path="/edit-group" element={<GroupCreation />} />
          <Route path="/friends" element={<ListFriends />} />
          <Route path="/friends/:id" element={<FriendDetails />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/messages" element={<ConversationList />} />
          <Route path="/messages/:type/:id" element={<Conversation />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <WebSocketChat />
      <SSENotif /> */}
    </>
  );
}

export default App;
