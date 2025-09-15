import FriendData from '../../components/friend/FriendData';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFriendService } from "../../services/api/friendships";
import { IFriendData } from '../../interfaces/IInformation';
import Header from "../../components/Header";

const FriendDetails = () => {

    const { id } = useParams()
    const { getFriendData } = useFriendService()
    const [userDatas, setUserData] = useState<IFriendData[]>([])

    useEffect(() => {
        const getUserData = async () => {
            setUserData(await getFriendData(id as string));
        }
        getUserData()
    }, [id])

    return (
        <div className="flex flex-col items-center justify-center mt-10 gap-15">
            <Header label={`Informations partagées`} />
            <div className="flex flex-wrap flex-col w-full h-full items-center justify-center gap-5">
                {userDatas.map((userData: IFriendData) => (
                    <FriendData data={userData} />
                ))}
            </div>
        </div>
    );
}

export default FriendDetails;