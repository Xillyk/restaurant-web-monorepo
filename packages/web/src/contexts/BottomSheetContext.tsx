import React, { createContext, useState, ReactNode, useContext } from "react";

interface IBottomSheetContext {
  isOpenBottomSheet: boolean;
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomSheetContext = createContext<IBottomSheetContext>({
  isOpenBottomSheet: false,
  setIsOpenBottomSheet: () => {},
});

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<boolean>(false);
  console.log("🚀 ~ isOpenBottomSheet:", isOpenBottomSheet);

  return (
    <BottomSheetContext.Provider
      value={{
        isOpenBottomSheet,
        setIsOpenBottomSheet,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};
