import { useEffect, useReducer, useState } from "react";
import {
  db,
  doc,
  collection,
  addDoc,
  timestamp,
  deleteDoc
} from "src/firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        document: null,
        isPending: true,
        error: null,
        success: false
      };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true
      };
    case "DELETED_DOCUMENT":
      return {
        document: null,
        isPending: false,
        error: null,
        success: true
      };

    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false
      };

    default:
      return state;
  }
};

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const colRef = collection(db, col);

  //  only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) dispatch(action);
  };

  // add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await addDoc(colRef, { ...doc, createdAt });

      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(db, col, id));

      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT"
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete" });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    response
  };
};
