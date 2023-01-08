import React from "react";

// components

export default function CardSocialTraffic() {
  return (
    <>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words shadow-lg bg-slate-100 rounded-xl">
        <div className="px-4 py-3 mb-0 border-0 rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
              <h3 className="text-base font-semibold text-slate-700">
                Social traffic
              </h3>
            </div>
            <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
              <button
                className="px-3 py-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-500 rounded outline-none active:bg-indigo-600 focus:outline-none"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-slate-50 text-slate-500 border-slate-100 whitespace-nowrap">
                  Referral
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-slate-50 text-slate-500 border-slate-100 whitespace-nowrap">
                  Visitors
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-slate-50 text-slate-500 border-slate-100 whitespace-nowrap min-w-140-px"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  Facebook
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  1,480
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">60%</div>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs bg-red-200 rounded">
                        <div
                          style={{ width: "60%" }}
                          className="flex flex-col justify-center text-center text-white bg-red-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  Facebook
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  5,480
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">70%</div>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs rounded bg-emerald-200">
                        <div
                          style={{ width: "70%" }}
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-emerald-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  Google
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  4,807
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">80%</div>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs bg-purple-200 rounded">
                        <div
                          style={{ width: "80%" }}
                          className="flex flex-col justify-center text-center text-white bg-purple-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  Instagram
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  3,678
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">75%</div>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs rounded bg-lightBlue-200">
                        <div
                          style={{ width: "75%" }}
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-lightBlue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  twitter
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  2,645
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">30%</div>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs bg-orange-200 rounded">
                        <div
                          style={{ width: "30%" }}
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-emerald-500"
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
