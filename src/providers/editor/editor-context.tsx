"use client";
import { createContext, Dispatch, useContext, useReducer } from "react";

type EditorContextType = {
  isOpenPageDialog: boolean;
  screenSize: "DESKTOP" | "MOBILE";
  isPreview: boolean;
  currentPage: string;
};
const EditorContext = createContext<EditorContextType | null>(null);

type EditorDispatchContextType = Dispatch<EditorActionType>;
const EditorDispatchContext = createContext<EditorDispatchContextType | null>(
  null
);

interface EditorProviderProps {
  children: React.ReactNode;
}
export function EditorProvider({ children }: EditorProviderProps) {
  const initContext: EditorContextType = {
    isOpenPageDialog: false,
    screenSize: "DESKTOP",
    isPreview: false,
    currentPage: "Home",
  };

  const [editorContext, dispatch] = useReducer(editorReducer, initContext);

  return (
    <EditorContext.Provider value={editorContext}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorContext.Provider>
  );
}

export function useEditor(): EditorContextType {
  return useContext(EditorContext)!;
}

export function useEditorDispatch(): EditorDispatchContextType {
  return useContext(EditorDispatchContext)!;
}

export type EditorActionType = {
  type: "changePage";
  page?: string;
};
function editorReducer(
  editorContext: EditorContextType,
  action: EditorActionType
): EditorContextType {
  switch (action.type) {
    case "changePage": {
      return { ...editorContext, currentPage: action.page! };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
