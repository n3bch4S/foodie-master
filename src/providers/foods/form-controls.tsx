import { createContext, useMemo, useState } from "react";

interface FoodFormContextProviderProps {
  children: React.ReactNode;
}

export function FoodFormContextProvider({
  children,
}: FoodFormContextProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formControls = useMemo<FoodFormControl>(() => {
    return { isOpen, setIsOpen, isEdit, setIsEdit };
  }, [isEdit, isOpen]);

  return (
    <FoodFormControlsContext.Provider value={formControls}>
      {children}
    </FoodFormControlsContext.Provider>
  );
}

type FoodFormControl = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
};

const FoodFormControlsContext = createContext<FoodFormControl | undefined>(
  undefined
);
