"use client";
import { CUSTOM_PAGE_DOM } from "@/lib/page/constants";
import { Dom, TagName, tagNameSchema } from "@/lib/page/types";
import { DndContext, UniqueIdentifier } from "@dnd-kit/core";
import { createContext, Dispatch, useContext, useReducer } from "react";
import { v4 } from "uuid";

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
        <DndContext
          onDragEnd={(evt) => {
            if (!evt.over) return;
            const parseId = tagNameSchema.safeParse(evt.active.id);
            if (parseId.success) {
              dispatch({
                type: "addDom",
                addDom: { tagName: parseId.data, newParentId: evt.over.id },
              });
            } else if (evt.over && evt.active.id !== evt.over.id) {
              dispatch({
                type: "updateDom",
                updateDom: {
                  childId: evt.active.id,
                  newParentId: evt.over.id,
                },
              });
            }
          }}
        >
          {children}
        </DndContext>
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

export type AddDomArgs = {
  tagName: TagName;
  newParentId: UniqueIdentifier;
};

export type UpdateDomArgs = {
  childId: UniqueIdentifier;
  newParentId: UniqueIdentifier;
};

export type ChangePageArgs = {
  page: string;
};

export type EditorActionType = {
  type: "changePage" | "updateDom" | "addDom";
  changePage?: ChangePageArgs;
  addDom?: AddDomArgs;
  updateDom?: UpdateDomArgs;
};
function editorReducer(
  editorContext: EditorContextType,
  action: EditorActionType
): EditorContextType {
  switch (action.type) {
    case "changePage": {
      return { ...editorContext, currentPage: action.changePage!.page };
    }
    case "addDom": {
      const newChild: Dom = {
        id: v4(),
        tagName: action.addDom!.tagName,
        innerText: generatePreInnerText(action.addDom!.tagName),
        canHaveChildren: action.addDom!.tagName === "div",
        children: [],
      };
      const newDom = addComponent(
        editorContext.dom,
        newChild,
        action.addDom!.newParentId
      );
      return { ...editorContext, dom: newDom };
    }
    case "updateDom": {
      const newDom = moveComponent(
        editorContext.dom,
        action.updateDom!.childId,
        action.updateDom!.newParentId
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

function addComponent(
  dom: Dom,
  child: Dom,
  newParentId: UniqueIdentifier
): Dom {
  const newDom = deepClone(dom);
  const newParent = findIn(newDom, newParentId);
  console.log(newParent);
  if (!newParent)
    throw new Error(`Can't find parent for component id ${child.id}`);
  if (!newParent.canHaveChildren) return newDom;
  newParent.children.push(child);
  return newDom;
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
  if (!newParent.canHaveChildren) return newComponent;
  const child = findIn(oldParent, childId);
  if (!child) throw new Error(`Can't find child with id ${childId}`);

  oldParent.children = oldParent.children.filter(
    (child) => child.id !== childId
  );
  newParent.children.push(child);
  return newComponent;
}

function generatePreInnerText(tagName: TagName): string | undefined {
  switch (tagName) {
    case "p":
      return "Paragraph";
    case "div":
      return "Div";
    case "button":
      return "Button";
    case "image":
      return undefined;
    default:
      throw new Error(`Unknown tag name: ${tagName}`);
  }
}
