import { useEffect, useRef, useState } from "react";
import {
  collection,
  db,
  onSnapshot,
  query,
  orderBy,
  where
} from "src/firebase/config";

export const useCollection = (col, _q, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // set up query
  const q = useRef(_q).current;
  // set up Order By
  const oB = useRef(_orderBy).current;

  useEffect(() => {
    let colRef = collection(db, col);

    if (q) {
      colRef = query(colRef, where(...q));
    }
    if (orderBy) {
      colRef = query(colRef, orderBy(...oB));
    }

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        // update state
        setDocuments(results);
        setError(null);
      },
      (err) => {
        setError(err.message);
        console.error(err.message);
      }
    );
    // usubscribe on unmount
    return () => unsubscribe();
  }, [col, oB, q]);

  return {
    documents,
    error
  };
};
