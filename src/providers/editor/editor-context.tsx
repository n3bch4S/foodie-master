"use client";
import { CUSTOM_PAGE_DOM } from "@/lib/page/constants";
import { Dom } from "@/lib/page/types";
import { DndContext, UniqueIdentifier } from "@dnd-kit/core";
import { createContext, Dispatch, useContext, useReducer } from "react";

type EditorContextType = {
  isOpenPageDialog: boolean;
  screenSize: "DESKTOP" | "MOBILE";
  isPreview: boolean;
  currentPage: string;
  dom: Dom;
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
    dom: CUSTOM_PAGE_DOM,
  };

  const [editorContext, dispatch] = useReducer(editorReducer, initContext);

  return (
    <EditorContext.Provider value={editorContext}>
      <EditorDispatchContext.Provider value={dispatch}>
        <DndContext>{children}</DndContext>
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
  type: "changePage" | "updateDom";
  page?: string;
  childId?: UniqueIdentifier;
  newParentId?: UniqueIdentifier;
};
function editorReducer(
  editorContext: EditorContextType,
  action: EditorActionType
): EditorContextType {
  switch (action.type) {
    case "changePage": {
      return { ...editorContext, currentPage: action.page! };
    }
    case "updateDom": {
      const newDom = moveComponent(
        editorContext.dom,
        action.childId!,
        action.newParentId!
      );
      return { ...editorContext, dom: newDom };
    }
    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
}

function findIn(component: Dom, id: UniqueIdentifier): Dom | null {
  if (component.id === id) return component;
  if (component.children.length === 0) return null;
  const foundChild = component.children.find(
    (child) => findIn(child, id) !== null
  );
  if (foundChild) return findIn(foundChild, id);
  return null;
}

function findParentIn(component: Dom, id: UniqueIdentifier): Dom | null {
  if (component.children.length === 0) return null;
  const foundChild = component.children.find((child) => child.id === id);
  if (foundChild) return component;
  const foundGrandChild = component.children.find(
    (child) => findIn(child, id) !== null
  );
  if (foundGrandChild) return findParentIn(foundGrandChild, id);
  return null;
}

function deepClone(component: Dom): Dom {
  return {
    ...component,
    children: component.children.map(deepClone),
  } as Dom;
}

function moveComponent(
  component: Dom,
  childId: UniqueIdentifier,
  newParentId: UniqueIdentifier
): Dom {
  const newComponent = deepClone(component);
  const oldParent = findParentIn(newComponent, childId);
  if (!oldParent)
    throw new Error(`Can't find parent of component id ${childId}`);
  const newParent = findIn(newComponent, newParentId);
  if (!newParent) throw new Error(`Can't find new parent id ${newParentId}`);
  if (oldParent.id === newParent.id) return newComponent;
  const child = findIn(oldParent, childId);
  if (!child) throw new Error(`Can't find child with id ${childId}`);

  newParent.children.push(child);
  oldParent.children = oldParent.children.filter(
    (child) => child.id !== childId
  );
  return newComponent;
}
