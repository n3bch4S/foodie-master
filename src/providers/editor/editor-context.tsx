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
    currentPage: "home",
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
  type: string;
  id: string;
  text: string;
};
function editorReducer(
  editorContext: EditorContextType,
  action: EditorActionType
): EditorContextType {
  switch (action.type) {
    case "added": {
      return { ...editorContext };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
