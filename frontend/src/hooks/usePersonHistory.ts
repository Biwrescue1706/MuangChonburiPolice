import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

export interface PersonHistory {
  personId: string;
  status: number;

  firstName?: string | null;
  lastName?: string | null;
  prefix?: string | null;
  fullName?: string | null;

  receiptBookNo?: string | number | null;
  receiptNo?: string | number | null;
  receiptDate?: string | null;

  [key: string]: unknown;
}

interface PersonApiResponse {
  data?: PersonHistory[];
}

export default function usePersonHistory(
  statusParam: string | null,
  firstName: string,
  lastName: string,
) {
  const [persons, setPersons] = useState<PersonHistory[]>([]);
  const [allPersons, setAllPersons] = useState<PersonHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const [debounceFirstName, setDebounceFirstName] = useState("");
  const [debounceLastName, setDebounceLastName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceFirstName(firstName.trim());
      setDebounceLastName(lastName.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [firstName, lastName]);

  const fetchPersons = useCallback(async () => {
    try {
      setLoading(true);

      const allRes = await api.get<PersonApiResponse>("/person/getall");
      const allData = Array.isArray(allRes.data?.data) ? allRes.data.data : [];

      setAllPersons(allData);

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

      const query = params.toString();

      const res = await api.get<PersonApiResponse>(
        `/person/getall${query ? `?${query}` : ""}`,
      );

      const data = Array.isArray(res.data?.data) ? res.data.data : [];

      setPersons(data);

      console.log("Person History API:", {
        total: allData.length,
        filtered: data.length,
        sample: data[0] ?? null,
      });
    } catch (err) {
      console.error("โหลดข้อมูลประวัติบุคคลไม่สำเร็จ:", err);
      setPersons([]);
    } finally {
      setLoading(false);
    }
  }, [statusParam, debounceFirstName, debounceLastName]);

  useEffect(() => {
    void fetchPersons();
  }, [fetchPersons]);

  return {
    persons,
    allPersons,
    loading,
    fetchPersons,
  };
}
