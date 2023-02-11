export default function Loading(props) {
    return (
        <>
            <div className="relative flex flex-row justify-center w-full my-16">
                <div className="grid grid-cols-1">
                    <progress className="w-56 progress"></progress>
                    <div className="mt-4 text-center w-100">{props.dataType} 데이터를 불러오는 중입니다...</div>
                </div>
            </div>
        </>);
  }