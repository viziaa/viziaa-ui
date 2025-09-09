"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

interface Props {
  id: string;
  onDelete: (id: string) => void;
}

export function SkillDeleteDialog({ id, onDelete }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`/educations/${id}`);

      onDelete(id);
    } catch (err) {
      console.error("Error deleting education", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogTitle>Hapus Data Skill</DialogTitle>
      </DialogHeader>
      <p className="text-gray-600">
        Apakah kamu yakin ingin menghapus data ini?
      </p>
      <DialogFooter>
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? "Menghapus..." : "Hapus"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
