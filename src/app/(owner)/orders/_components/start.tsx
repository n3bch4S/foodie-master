"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createOrder, createSession, editOrder, editSession } from "../action";
import { useState } from "react";
import { OrderDetail, SessionDetail } from "../types";

export function StartSess() {
  const [ssn, setSsn] = useState<SessionDetail | null>(null);
  const [odr, setOdr] = useState<OrderDetail | null>(null);
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
      <Button
        onClick={() => {
          if (!ssn) {
            toast.warning("No session found");
            return;
          }
          createOrder(ssn.id, "foodId", 21).then((odr) => {
            setOdr(odr);
            toast.success(odr.id, { description: odr.foodItemId });
          });
        }}
      >
        createorder
      </Button>
      <Button
        onClick={() => {
          if (!odr) {
            toast.warning("No order found");
            return;
          }
          editOrder(odr.id, "COMPLETED").then((odr) => {
            toast.success(odr.id, { description: odr.status });
          });
        }}
      >
        done Order
      </Button>
    </>
  );
}
