import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

export interface Person {
  personId: string;
  status: number;
  firstName?: string | null;
  lastName?: string | null;
  prefix?: string | null;
  fullName?: string | null;
  [key: string]: unknown;
}

interface PersonApiResponse {
  data?: Person[];
}

export default function usePersons(
  statusParam: string | null,
  firstName: string,
  lastName: string,
) {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  const [debounceFirstName, setDebounceFirstName] = useState("");
  const [debounceLastName, setDebounceLastName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceFirstName(firstName);
      setDebounceLastName(lastName);
    }, 300);

    return () => clearTimeout(timer);
  }, [firstName, lastName]);

  const fetchPersons = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (statusParam) params.append("status", statusParam);
      if (debounceFirstName) {
        params.append("firstName", debounceFirstName);
      }
      if (debounceLastName) {
        params.append("lastName", debounceLastName);
      }

      const res = await api.get<PersonApiResponse>(
        `/person/getall?${params.toString()}`,
      );

      setPersons(res.data.data ?? []);
    } catch (error) {
      console.error("Fetch persons error:", error);
    } finally {
      setLoading(false);
    }
  }, [statusParam, debounceFirstName, debounceLastName]);

  const deletePerson = async (id: string) => {
    await api.delete(`/person/${id}`);
    await fetchPersons();
  };

  const updateStatus = async (id: string, status: number) => {
    await api.patch(`/person/${id}/status`, { status });
    await fetchPersons();
  };

  const bulkUpdate = async (ids: string[]) => {
    await Promise.all(
      ids.map(async (id) => {
        const person = persons.find((item) => item.personId === id);

        if (!person || person.status >= 4) return;

        await api.patch(`/person/${id}/status`, {
          status: person.status + 1,
        });
      }),
    );

    await fetchPersons();
  };

  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

  return {
    persons,
    loading,
    deletePerson,
    updateStatus,
    bulkUpdate,
    refetch: fetchPersons,
  };
}
