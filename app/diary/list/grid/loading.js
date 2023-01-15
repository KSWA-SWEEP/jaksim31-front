export default function Loading() {
    return (
        <>
            <div className="relative flex flex-row m-10">
                <div className="grid grid-cols-1">
                    <progress className="w-56 progress"></progress>
                    <div className="mt-4 text-center w-100">목록을 가져오는 중입니다...</div>
                </div>
            </div>
        </>);
  }