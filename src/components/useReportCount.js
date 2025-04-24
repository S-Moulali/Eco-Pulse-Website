import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Update path if needed
import { collection, onSnapshot } from 'firebase/firestore';

const useReportCount = () => {
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reports'), (snapshot) => {
      setReportCount(snapshot.size);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return reportCount;
};

export default useReportCount;
