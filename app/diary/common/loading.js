export default function Loading() {
    return (
        <>
            <div className="relative flex flex-row m-10">
                <div className="grid grid-cols-1">
                    <progress className="w-56 progress"></progress>
                    <div className="mt-4 text-center w-100">데이터를 로딩하고 있습니다...</div>
                </div>
            </div>
        </>);
  }