import { useState } from "react";

export interface SelectablePerson {
  personId: string;
  status: number;
}

export default function useSelection(persons: SelectablePerson[]) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string, status: number) => {
    if (status >= 4) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    const valid = persons.filter((person) => person.status < 4);
    const validIds = valid.map((person) => person.personId);

    if (
      validIds.length > 0 &&
      validIds.every((id) => selectedIds.includes(id))
    ) {
      setSelectedIds((prev) => prev.filter((id) => !validIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...validIds])]);
    }
  };

  return {
    selectMode,
    setSelectMode,
    selectedIds,
    setSelectedIds,
    toggleSelect,
    handleSelectAll,
  };
}
