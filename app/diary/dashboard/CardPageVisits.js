import React from "react";

// components

export default function CardPageVisits() {
  return (
    <>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words shadow-lg rounded-xl bg-zinc-100">
        <div className="px-4 py-3 mb-0 border-0 rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
              <h3 className="text-base font-semibold text-zinc-700">
                Page visits
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
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                  Page name
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                  Visitors
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                  Unique users
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                  Bounce rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  /argon/
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  4,569
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  340
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-4 fas fa-arrow-up text-emerald-500"></i>
                  46,53%
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  /argon/index.html
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  3,985
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  319
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-4 text-orange-500 fas fa-arrow-down"></i>
                  46,53%
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  /argon/charts.html
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  3,513
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  294
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-4 text-orange-500 fas fa-arrow-down"></i>
                  36,49%
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  /argon/tables.html
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  2,050
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  147
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-4 fas fa-arrow-up text-emerald-500"></i>
                  50,87%
                </td>
              </tr>
              <tr>
                <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  /argon/profile.html
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  1,795
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  190
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-4 text-red-500 fas fa-arrow-down"></i>
                  46,53%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
