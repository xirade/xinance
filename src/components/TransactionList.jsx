import { useFirestore } from "../hooks/useFirestore";

// icon
import Trashbin from "../assets/trashbin.svg";

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore("transactions");
  return (
    <div className="-my-2 sm:-mx-6 lg:-mx-8">
      <div
        style={{ height: "560px" }}
        className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
      >
        <div className="shadow overflow-hidden dark:bg-gray-600 dark:border-gray-400 border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y dark:divide-gray-50 divide-gray-400">
            <caption className="text-left px-5 py-4 border-b dark:border-gray-400 border-gray-100">
              <h2 className="font-semibold dark:text-white text-gray-800">
                Transactions list
              </h2>
            </caption>
            <thead className="bg-gray-50 dark:bg-gray-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-50 text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-50 text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-50 text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y dark:divide-gray-400">
              {transactions.length !== 0 &&
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm dark:text-white text-gray-900">
                        {transaction.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex dark:text-white text-xs leading-5 font-semibold rounded-full dark:bg-green-600 bg-green-100 text-green-800">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-50 text-gray-500">
                      {transaction.amount} $
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => deleteDocument(transaction.id)}
                        className="inline-block px-6 py-2 border-2 dark:border-red-300 dark:text-red-200 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      >
                        <div className="flex items-center gap-1 justify-center">
                          Delete
                          <img
                            className="h-5 w-5 dark:invert"
                            src={Trashbin}
                            alt="trash bin"
                          />
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {!transactions.length && (
          <p className="px-6 py-4 text-gray-300 whitespace-nowrap">
            I didn't find anything for your query request...
          </p>
        )}
      </div>
    </div>
  );
}
