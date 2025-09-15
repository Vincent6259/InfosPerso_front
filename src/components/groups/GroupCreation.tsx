import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { IoMdClose } from "react-icons/io";
import { getUserDataService } from "../../services/api/userdata";
import { dataLabel, getDataLabelsService } from "../../services/api/labels";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useFriendService } from "../../services/api/friendships";
import { FriendListInterface } from "../../interfaces/friend";
import { postGroupService } from "../../services/api/groups";
import { useNavigate } from "react-router-dom";
import { GroupCardInterface } from "../../interfaces/IGroup";

export enum Mode {
  CREATE,
  EDIT,
}

interface IGroupCreationComponent {
  mode: Mode;
  defaultName?: string;
  defaultDescription?: string;
  defaultSharedData?: number[];
  displaySharedData?: boolean;
  displayInvitedMembers?: boolean;
}

const GroupCreation = ({
  mode,
  defaultName = "",
  defaultDescription = "",
  defaultSharedData = [],
  displaySharedData = true,
  displayInvitedMembers = true,
}: IGroupCreationComponent) => {
  const { getDataLabels } = getDataLabelsService();
  const { getUserData } = getUserDataService();
  const { getFriendsList } = useFriendService();

  const [isSharedDataModalOpen, setIsSharedDataModalOpen] =
    useState<boolean>(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState<boolean>(false);

  const [groupName, setGroupName] = useState<string>("");
  const [groupNameError, setGroupNameError] = useState<boolean>(false);

  const [groupDescription, setGroupDescription] = useState<string>("");
  const [groupDescriptionError, setGroupDescriptionError] =
    useState<boolean>(false);

  const [sharedData, setSharedData] = useState<number[]>([]);
  const [sharedDataError, setSharedDataError] = useState<boolean>(false);

  const [invitedFriends, setInvitedFriends] = useState<number[]>([]);
  const [invitedFriendsError, setInvitedFriendsError] =
    useState<boolean>(false);

  const [enteredData, setEnteredData] = useState<dataLabel[]>([]);
  const [currentFriends, setCurrentFriends] = useState<FriendListInterface[]>(
    []
  );

  const { postGroup } = postGroupService();
  const navigate = useNavigate();

  const closeSharedDataModal = () => {
    if (!sharedData.length) {
      setSharedDataError(true);
    } else setSharedDataError(false);

    setIsSharedDataModalOpen(false);
  };

  const closeInvitedFriendsModal = () => {
    if (!invitedFriends.length) {
      setInvitedFriendsError(true);
    } else setInvitedFriendsError(false);

    setIsFriendsModalOpen(false);
  };

  const submit = async () => {
    if (
      !groupName ||
      !groupDescription ||
      !sharedData.length ||
      !invitedFriends.length
    ) {
      setGroupNameError(!groupName);
      setGroupDescriptionError(!groupDescription);
      setSharedDataError(!sharedData.length);
      setInvitedFriendsError(!invitedFriends.length);
    } else {
      if (mode === Mode.CREATE) {
        const newGroup = await postGroup({
          name: groupName,
          description: groupDescription,
          invitedMembers: invitedFriends,
          sharedData,
        });
        const newGroupStorage: GroupCardInterface = {
          name: newGroup.data.name,
          description: newGroup.data.description,
          id: newGroup.data.id,
          creator_id: newGroup.data.creator_id,
        };
        const currentGroupStorage = localStorage.getItem("groups");

        if (currentGroupStorage !== null) {
          localStorage.setItem(
            "groups",
            JSON.stringify([
              ...JSON.parse(currentGroupStorage),
              newGroupStorage,
            ])
          );
        }
        navigate("/groups");
      }
    }
  };

  useEffect(() => {
    const data = getUserData();
    const labels = getDataLabels();
    const friends = getFriendsList();

    Promise.all([data, labels, friends]).then((values) => {
      const solvedData = values[0];
      const solvedLabels = values[1];
      const friends = values[2];
      const enteredDataLabels = solvedData.map((data) => {
        const label = solvedLabels.find(
          (lLabel) => lLabel.label === data.label
        );
        return label;
      });
      setEnteredData(enteredDataLabels as dataLabel[]);
      setCurrentFriends(friends);

      setGroupName(defaultName);
      setGroupDescription(defaultDescription);
      setSharedData(defaultSharedData);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-md sm:max-w-lg md:max-w-xl p-4 mx-auto my-5">
        <div className="flex flex-col gap-3">
          <label htmlFor="groupName">Nom du groupe</label>

          <input
            className="peer block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
            id="groupName"
            type="text"
            value={groupName}
            onChange={(e) => {
              const newVal = e.target.value;
              setGroupName(newVal);
              setGroupNameError(!newVal);
            }}
          />

          {groupNameError && (
            <span className="error-msg text-[#FF0000]">
              Veuillez renseigner ce champ
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="groupDesc">Description</label>

          <textarea
            className="peer block w-full p-2 border border-gray-300 rounded-md
            focus:outline-none focus:border-gray-500 resize-none"
            rows={5}
            id="groupDesc"
            value={groupDescription}
            onChange={(e) => {
              const newVal = e.target.value;
              setGroupDescription(newVal);
              setGroupDescriptionError(!newVal);
            }}
          />

          {groupDescriptionError && (
            <span className="error-msg text-[#FF0000]">
              Veuillez renseigner ce champ
            </span>
          )}
        </div>

        {displaySharedData && (
          <div>
            <div className="flex">
              <div
                className="mx-auto p-4 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-400 hover:text-white"
                onClick={() => {
                  setIsSharedDataModalOpen(true);
                }}
              >
                Afficher les données partagées
              </div>
            </div>
            {sharedDataError && (
              <div className="text-center error-msg text-[#FF0000]">
                Veuillez partager au moins une donnée
              </div>
            )}
          </div>
        )}

        {displayInvitedMembers && (
          <div>
            <div className="flex">
              <div
                className="mx-auto p-4 bg-gray-200 rounded-sm cursor-pointer hover:bg-gray-400 hover:text-white"
                onClick={() => {
                  setIsFriendsModalOpen(true);
                }}
              >
                Inviter des personnes
              </div>
            </div>
            {invitedFriendsError && (
              <div className="text-center error-msg text-[#FF0000] pt-3">
                Veuillez inviter au moins une personne
              </div>
            )}
          </div>
        )}
        <div className="flex">
          <div
            className="mx-auto p-4 green rounded-md cursor-pointer text-white"
            onClick={() => {
              submit();
            }}
          >
            {" "}
            {mode === Mode.CREATE
              ? "Créer le groupe"
              : "Valider les modifications"}
          </div>
        </div>
      </div>
      <Modal isOpen={isSharedDataModalOpen}>
        <IoMdClose
          className="cursor-pointer absolute top-3 right-3"
          onClick={() => closeSharedDataModal()}
        />
        <div className="pb-5">
          Choisissez les données à partager avec le groupe
        </div>
        <div className="flex flex-col gap-3">
          {enteredData.map((data, index) => (
            <div
              className={`flex justify-between  p-3 items-center ${
                sharedData.includes(data.id) ? "bg-gray-100" : "bg-gray-200"
              }`}
              key={index}
            >
              <div className="flex">{data.label}</div>
              {!sharedData.includes(data.id) && (
                <FaPlus
                  size={30}
                  className="cursor-pointer"
                  onClick={() => {
                    setSharedData([...sharedData, data.id]);
                  }}
                />
              )}
              {sharedData.includes(data.id) && (
                <FaMinus
                  size={30}
                  className="cursor-pointer"
                  onClick={() => {
                    setSharedData(sharedData.filter((nb) => data.id !== nb));
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-15">
          <div
            className="green text-white rounded-md p-3 cursor-pointer font-semibold"
            onClick={() => closeSharedDataModal()}
          >
            Valider
          </div>
        </div>
      </Modal>
      <Modal isOpen={isFriendsModalOpen}>
        <IoMdClose
          className="cursor-pointer absolute top-3 right-3"
          onClick={() => closeInvitedFriendsModal()}
        />
        <div className="pb-5">Choisissez les amis à inviter dans le groupe</div>
        <div className="flex flex-col gap-3">
          {currentFriends.map((data, index) => (
            <div
              className={`flex justify-between  p-3 items-center ${
                invitedFriends.includes(data.userId)
                  ? "bg-gray-100"
                  : "bg-gray-200"
              }`}
              key={index}
            >
              <div className="flex">
                {data.firstName && data.lastName
                  ? data.firstName + " " + data.lastName
                  : data.userTag}
              </div>
              {!invitedFriends.includes(data.userId) && (
                <FaPlus
                  size={30}
                  className="cursor-pointer"
                  onClick={() => {
                    setInvitedFriends([...invitedFriends, data.userId]);
                  }}
                />
              )}
              {invitedFriends.includes(data.userId) && (
                <FaMinus
                  size={30}
                  className="cursor-pointer"
                  onClick={() => {
                    setInvitedFriends(
                      invitedFriends.filter((nb) => data.userId !== nb)
                    );
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-15">
          <div
            className="green text-white rounded-md p-3 cursor-pointer font-semibold"
            onClick={() => closeInvitedFriendsModal()}
          >
            Valider
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GroupCreation;
