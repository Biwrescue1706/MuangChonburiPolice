// src/hooks/usePersonHistory.ts

import { useCallback, useEffect, useState } from "react";
import type { GeneratePDFData } from "../utils/generatePDF";
import api from "../api/axios";

export interface PersonHistory extends Omit<
  Partial<GeneratePDFData>,
  "purpose"
> {
  personId: string;
  status: number;

  prefix?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  purpose?: string | null;
  requestingAgency?: string | null;

  receiptBookNo?: string | number | null;
  receiptNo?: string | number | null;
  receiptDate?: string | null;

  priority?: number | null;
  returnDate?: string | null;
  deleteAt?: string | null;

  [key: string]: unknown;
}

interface PersonApiResponse {
  data?: PersonHistory[];
  message?: string;
}

interface UsePersonHistoryReturn {
  persons: PersonHistory[];
  allPersons: PersonHistory[];
  loading: boolean;
  fetchPersons: () => Promise<void>;
}

export default function usePersonHistory(
  statusParam: string | null,
  firstName: string,
  lastName: string,
): UsePersonHistoryReturn {
  const [persons, setPersons] = useState<PersonHistory[]>([]);
  const [allPersons, setAllPersons] = useState<PersonHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const [debounceFirstName, setDebounceFirstName] = useState(firstName);
  const [debounceLastName, setDebounceLastName] = useState(lastName);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounceFirstName(firstName.trim());
      setDebounceLastName(lastName.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [firstName, lastName]);

  const fetchPersons = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (statusParam !== null && statusParam !== "") {
        params.append("status", statusParam);
      }

      if (debounceFirstName) {
        params.append("firstName", debounceFirstName);
      }

      if (debounceLastName) {
        params.append("lastName", debounceLastName);
      }

      const query = params.toString();

      const [allRes, filteredRes] = await Promise.all([
        api.get<PersonApiResponse>("/person/getall"),
        api.get<PersonApiResponse>(`/person/getall${query ? `?${query}` : ""}`),
      ]);

      const allData = Array.isArray(allRes.data?.data) ? allRes.data.data : [];

      const filteredData = Array.isArray(filteredRes.data?.data)
        ? filteredRes.data.data
        : [];

      setAllPersons(allData);
      setPersons(filteredData);

      console.log("Person History API:", {
        total: allData.length,
        filtered: filteredData.length,
        sample: filteredData[0] ?? null,
      });
    } catch (error) {
      console.error("Fetch person history error:", error);
      setPersons([]);
      setAllPersons([]);
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
