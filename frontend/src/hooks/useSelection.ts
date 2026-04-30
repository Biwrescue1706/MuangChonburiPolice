import { useState } from "react";

export default function useSelection(persons: any[]) {
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string, status: number) => {
    if (status >= 3) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    const valid = persons.filter((p) => p.status < 3);

    if (selectedIds.length === valid.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(valid.map((p) => p.personId));
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