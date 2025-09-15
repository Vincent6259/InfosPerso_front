const FriendData = ({ data }: any) => {
    return (
        <>
            <div className="flex flex-col min-w-75 max-w-250 h-20">
                <div className="flex flex-col items-center justify-between w-full mb-2 pb-5 border-b border-gray-300">
                    <div className="text-xl font-semibold mb-2">
                        {data?.label}
                    </div>
                    <div className="flex w-full p-2 border bg-gray-100 border-gray-300 rounded-md">
                        <div className="text-sm text-gray-800">
                            {data?.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FriendData;
