import { useEffect, useState } from "react";
import api from "../api/axios";

export default function usePersons(statusParam: string | null, firstName: string, lastName: string) {
  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [debounceFirstName, setDebounceFirstName] = useState("");
  const [debounceLastName, setDebounceLastName] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounceFirstName(firstName);
      setDebounceLastName(lastName);
    }, 300);
    return () => clearTimeout(t);
  }, [firstName, lastName]);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (statusParam) params.append("status", statusParam);
      if (debounceFirstName) params.append("firstName", debounceFirstName);
      if (debounceLastName) params.append("lastName", debounceLastName);

      const res = await api.get(`/person/getall?${params.toString()}`);
      setPersons(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  const deletePerson = async (id: string) => {
    await api.delete(`/person/${id}`);
    fetchPersons();
  };

  const updateStatus = async (id: string, status: number) => {
    await api.patch(`/person/${id}/status`, { status });
    fetchPersons();
  };

  const bulkUpdate = async (ids: string[]) => {
    await Promise.all(
      ids.map(async (id) => {
        const p = persons.find((x) => x.personId === id);
        if (!p || p.status >= 3) return;

        await api.patch(`/person/${id}/status`, {
          status: p.status + 1,
        });
      })
    );

    fetchPersons();
  };

  useEffect(() => {
    fetchPersons();
  }, [statusParam, debounceFirstName, debounceLastName]);

  return {
    persons,
    loading,
    deletePerson,
    updateStatus,
    bulkUpdate,
    refetch: fetchPersons,
  };
}