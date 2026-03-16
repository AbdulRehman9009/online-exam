"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { UserFormDialog } from "./UserFormDialog";

export function FacultyActions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <UserPlus className="mr-2 h-4 w-4" /> Add Faculty
      </Button>
      <UserFormDialog 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
        role="FACULTY" 
      />
    </>
  );
}
