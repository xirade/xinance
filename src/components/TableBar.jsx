export default function TableBar({
  searchQuery,
  documents,
  debouncedChangeHandler
}) {
  const categories = [
    ...new Set(documents.map((transaction) => transaction.category))
  ];
  return (
    <div className="flex gap-2 px-1 mb-3">
      <div className="relative">
        <select className="shadow-sm cursor-pointer mr-3 bg-white dark:bg-gray-700 dark:text-white appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker">
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="relative">
        <select
          onChange={debouncedChangeHandler}
          className="shadow-sm mr-3 cursor-pointer bg-white dark:bg-gray-700 dark:text-white appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
        >
          <option value="">All</option>
          {categories.map((category, i) => (
            <option key={`category-${i}`}>{category}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="block relative">
        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current text-gray-500"
          >
            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search"
          onInput={debouncedChangeHandler}
          className="pl-8 shadow-sm cursor-pointer bg-white dark:bg-gray-700 dark:text-white appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
        />
      </div>
    </div>
  );
}
