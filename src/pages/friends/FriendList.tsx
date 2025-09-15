import FriendListComp from '../../components/friend/FriendList';
import Header from "../../components/Header";

const FriendList = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-15">
            <Header label="Liste d'amis" icons={["FaUserFriends"]}/>
            <FriendListComp />
        </div>
    );
}

export default FriendList;