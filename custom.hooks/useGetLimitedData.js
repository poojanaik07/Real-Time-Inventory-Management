import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, onSnapshot, query, limit as firestoreLimit } from 'firebase/firestore';

const useGetLimitedData = (collectionName, limit) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(db, collectionName);
  const limitedQuery = query(collectionRef, firestoreLimit(limit));

  useEffect(() => {
    const getData = async () => {
      await onSnapshot(limitedQuery, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      });
    };

    getData();
  }, [limitedQuery]);

  return { data, loading };
};

export default useGetLimitedData;
