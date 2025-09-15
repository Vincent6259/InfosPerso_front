import FriendCard from '../friend/FriendCard';
import { useEffect, useState } from 'react';
import { patchConfidentialityFriendshipService, useFriendService } from '../../services/api/friendships';
import { FriendListInterface } from '../../interfaces/friend';
import { Confidentiality } from '../../interfaces/IInformation';

const FriendList = () => {

  const { getFriendsList } = useFriendService()
  const { patchFriendshipConf } = patchConfidentialityFriendshipService()

  const [friendsList, setFriendsList] = useState<FriendListInterface[]>([]);
  const [openOptionMenuIndex, setOpenOptionMenuIndex] = useState<number | null>(null);
  const [openConfColorMenuIndex, setOpenConfColorOptionMenuIndex] = useState<number>(-1);

  const handleOptionMenuToggle = (index: number) => {
    setOpenConfColorOptionMenuIndex(-1);
    setOpenOptionMenuIndex(openOptionMenuIndex === index ? null : index);
  };

  const handleConfColorMenuToggle = (index: number) => {
    setOpenOptionMenuIndex(-1);
    setOpenConfColorOptionMenuIndex(openConfColorMenuIndex === index ? -1 : index);
  };

  const onClickConfColorMenu = async (conf: Confidentiality, userID: number) => {
    await patchFriendshipConf(userID, conf);
    setFriendsList(localStorage.getItem("friends") ? JSON.parse(localStorage.getItem("friends") as string) : friendsList);
  };

  useEffect(() => {
    const getFriendShipsFromApi = async () => {
      const response = await getFriendsList();
      setFriendsList(Array.isArray(response) ? response : [response]);
    }
    getFriendShipsFromApi();
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if ( target instanceof HTMLElement && !Array.from(target.classList).includes("friendCardConfBtn")) {
        setOpenOptionMenuIndex(-1);
        setOpenConfColorOptionMenuIndex(-1);
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="container flex flex-wrap m-auto w-full items-center justify-center gap-2 lg:gap-8 mt-8 pb-30">
      {
        friendsList.map((friendship: FriendListInterface, index: any) => (
          <div key={index} className="flex p-0 border-gray-400 flex-row mb-2 h-20">
            <FriendCard
              friendData={friendship}
              isOptionMenuOpen={openOptionMenuIndex === index}
              isConfColorMenuOpen={openConfColorMenuIndex === index}
              onOptionMenuToggle={() => handleOptionMenuToggle(index)}
              onConfColorMenuToggle={() => handleConfColorMenuToggle(index)}
              onConfColorMenuClick={onClickConfColorMenu}
            />
          </div>
        ))
      }
    </div>
  );
};

export default FriendList;
