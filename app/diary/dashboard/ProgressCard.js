import React from "react";

// components

export default function ProgressCard() {
  
  return (
    <>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words shadow-lg bg-zinc-100 rounded-xl">
        <div className="px-4 py-3 mb-0 border-0 rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
              <h2 className="text-xl font-semibold text-zinc-700">
                월별 모아보기 📅
              </h2>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 py-3 text-s font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                  2022년
                </th>
                <th className="px-6 py-3 text-s font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                  일기 쓴 날
                </th>
                <th className="px-6 py-3 text-s font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap min-w-140-px"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  1월
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  23일 / 31일
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">78%</div>
                    <div className="relative w-full">
                      <div className="flex h-3 overflow-hidden text-xs bg-red-200 rounded">
                        <div
                          style={{ width: "78%" }}
                          className="flex flex-col justify-center text-center text-white bg-red-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  2월
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  21일 / 28일
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">75%</div>
                    <div className="relative w-full">
                      <div className="flex h-3 overflow-hidden text-xs rounded bg-emerald-200">
                        <div
                          style={{ width: "75%" }}
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-emerald-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  3월
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  15일 / 31일
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">50%</div>
                    <div className="relative w-full">
                      <div className="flex h-3 overflow-hidden text-xs bg-purple-200 rounded">
                        <div
                          style={{ width: "50%" }}
                          className="flex flex-col justify-center text-center text-white bg-purple-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  4월
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  30일 / 30일
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">100%</div>
                    <div className="relative w-full">
                      <div className="flex h-3 overflow-hidden text-xs rounded bg-blue-200">
                        <div
                          style={{ width: "100%" }}
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  5월
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  10일 / 31일
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">28%</div>
                    <div className="relative w-full">
                      <div className="flex h-3 overflow-hidden text-xs bg-orange-200 rounded">
                        <div
                          style={{ width: "30%" }}
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-emerald-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  6월
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  23일 / 30일
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">78%</div>
                    <div className="relative w-full">
                      <div className="flex h-3 overflow-hidden text-xs bg-red-200 rounded">
                        <div
                          style={{ width: "78%" }}
                          className="flex flex-col justify-center text-center text-white bg-red-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  7월
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  15일 / 31일
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">50%</div>
                    <div className="relative w-full">
                      <div className="flex h-3 overflow-hidden text-xs bg-blue-200 rounded">
                        <div
                          style={{ width: "50%" }}
                          className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  8월
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  24일 / 31일
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">78%</div>
                    <div className="relative w-full">
                      <div className="flex h-3 overflow-hidden text-xs bg-purple-200 rounded">
                        <div
                          style={{ width: "78%" }}
                          className="flex flex-col justify-center text-center text-white bg-purple-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
