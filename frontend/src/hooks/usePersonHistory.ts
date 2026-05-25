import { useEffect, useState } from "react";
import api from "../api/axios";

export default function usePersonHistory(
  statusParam: string | null,
  firstName: string,
  lastName: string
) {
  const [persons, setPersons] = useState<any[]>([]);
  const [allPersons, setAllPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ debounce
  const [debounceFirstName, setDebounceFirstName] = useState("");
  const [debounceLastName, setDebounceLastName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceFirstName(firstName);
      setDebounceLastName(lastName);
    }, 300);

    return () => clearTimeout(timer);
  }, [firstName, lastName]);

  const fetchPersons = async () => {
    try {
      setLoading(true);

      // ✅ โหลดทั้งหมดไว้ใช้ count
      const allRes = await api.get("/person/getall");

      setAllPersons(allRes.data.data || []);

      // ✅ filter
      const params = new URLSearchParams();

      if (statusParam !== null) {
        params.append("status", statusParam);
      }

      if (debounceFirstName) {
        params.append("firstName", debounceFirstName);
      }

      if (debounceLastName) {
        params.append("lastName", debounceLastName);
      }

      const res = await api.get(
        `/person/getall?${params.toString()}`
      );

      setPersons(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, [statusParam, debounceFirstName, debounceLastName]);

  return {
    persons,
    allPersons,
    loading,
    fetchPersons,
  };
}