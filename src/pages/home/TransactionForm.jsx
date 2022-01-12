import { useEffect, useState } from "react";
import LoadingButton from "src/components/LoadingButton";
import { useFirestore } from "src/hooks/useFirestore";

import ChevronUp from "../../assets/chevron-down.svg";

export default function TransactionForm({ uid }) {
  const { addDocument, response } = useFirestore("transactions");

  const options = [
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Insurance",
    "Healthcare",
    "Investing",
    "Personal Spending",
    "Entertainment",
    "Miscellaneous"
  ];

  const [userInfo, setUserInfo] = useState({
    name: "",
    amount: "",
    category: options[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userInfo);

    addDocument({ ...userInfo, uid });
  };

  useEffect(() => {
    if (response.success) {
      setUserInfo(() => ({
        name: "",
        amount: "",
        category: ""
      }));
    }
  }, [response.success]);
  return (
    <div className="grid xl:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg dark:text-gray-50 font-medium leading-6 text-gray-900">
            Add a Transaction
          </h3>
          <p className="mt-1 text-sm dark:text-gray-100">
            Use truthful information to keep track of your budget.
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 lg:col-span-2">
        <form onSubmit={handleSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 dark:bg-gray-700 dark:text-gray-100 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-grey-darker text-sm font-md mb-2"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    autoComplete="Name"
                    onChange={handleChange}
                    value={userInfo.name}
                    className="shadow dark:bg-gray-700 dark:text-white appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    htmlFor="amount"
                    className="block text-grey-darker text-sm font-md mb-2"
                  >
                    Amount ($):
                  </label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    required
                    autoComplete="10"
                    onChange={handleChange}
                    value={userInfo.amount}
                    className="shadow dark:bg-gray-700 dark:text-white appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-4">
                  <label
                    htmlFor="category"
                    className="block text-grey-darker text-sm font-md mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    role="button"
                    style={{
                      backgroundImage: `url(${ChevronUp})`,
                      backgroundSize: "20px 20px",
                      backgroundRepeat: "no-repeat",
                      backgroundPositionX: "95%",
                      backgroundPositionY: "50%"
                    }}
                    onChange={handleChange}
                    value={userInfo.category}
                    autoComplete="Category"
                    className="appearance-none dark:bg-gray-700 dark:text-white shadow border bg-white border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 dark:bg-gray-600 bg-gray-50 text-right sm:px-6">
              {response.isPending ? (
                <button
                  style={{ cursor: "not-allowed" }}
                  disabled
                  className="flex ml-auto bg-indigo-600 hover:bg-indigo-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LoadingButton />
                </button>
              ) : (
                <button className="bg-indigo-600 hover:bg-indigo-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Transaction
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
