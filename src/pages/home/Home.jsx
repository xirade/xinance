import { useEffect, useMemo, useState } from "react";
import Loader from "src/components/Loader";
import Pagination from "src/components/Pagination";
import TableBar from "src/components/TableBar";
import TransactionList from "src/components/TransactionList";
import { useAppContext } from "src/hooks/useAppContext";
import { useCollection } from "src/hooks/useCollection";
import debounce from "src/utils/debounce";
import TransactionForm from "./TransactionForm";

export default function Home({ mode }) {
  const { user } = useAppContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  //search query
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTransactions =
    documents &&
    documents.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });

  const changeHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  // Debounce to reduce the onChange event call.
  const debouncedChangeHandler = useMemo(
    () => (event) => debounce(() => changeHandler(event), 2000),
    []
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [documents]);

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
  };

  const handleChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const count = documents && filteredTransactions.length;
  const transactionsCrop =
    documents && paginate(filteredTransactions, currentPage, pageSize);

  return (
    <div className="container mx-auto my-10">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
        <TransactionForm mode={mode} uid={user.uid} />
        <div>
          {error && <p>{error}</p>}
          {documents ? (
            <>
              <TableBar
                {...{
                  searchQuery,
                  documents,
                  debouncedChangeHandler
                }}
              />
              <TransactionList transactions={transactionsCrop} />

              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handleChange}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <Loader darkMode={mode} classNames="h-20 w-20 mx-auto" />
          )}
        </div>
      </div>
    </div>
  );
}
