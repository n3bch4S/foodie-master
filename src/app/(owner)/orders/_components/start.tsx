"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createSession, editSession } from "../_action";
import { useState } from "react";
import { SessionDetail } from "../_action/types";

export function StartSess() {
  const [ssn, setSsn] = useState<SessionDetail | null>(null);
  return (
    <>
      <Button
        onClick={() => {
          createSession().then((ssn) => {
            setSsn(ssn);
            toast.success(ssn.id);
          });
        }}
      >
        start session
      </Button>
      <Button
        onClick={() => {
          if (!ssn) {
            toast.warning("No session found");
            return;
          }
          editSession(ssn.id, false).then((ssn) =>
            toast.success(ssn.id, { description: `${ssn.isOpen}` })
          );
        }}
      >
        End
      </Button>
    </>
  );
}
