import { useEffect, useState } from "react";
import { db } from "../firebase"; // Assuming firebase config is here
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const UseRecentReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsQuery = query(
          collection(db, "reports"),  // Make sure the collection name matches your Firestore collection
          orderBy("createdAt", "desc"),  // Sorting by createdAt timestamp to get most recent reports
          limit(5)  // You can adjust this to show more or fewer reports
        );

        const querySnapshot = await getDocs(reportsQuery);
        const reportsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setReports(reportsData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { reports, loading, error };
};

export default UseRecentReports;
