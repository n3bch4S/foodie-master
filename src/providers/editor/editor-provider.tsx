"use client";
import { editPage } from "@/lib/page";
import {
  baseDomSchema,
  Dom,
  PageDetail,
  TagName,
  tagNameSchema,
} from "@/lib/page/types";
import { DndContext, UniqueIdentifier } from "@dnd-kit/core";
import { createContext, Dispatch, useContext, useReducer } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

type EditorContextType = {
  isOpenPageSelector: boolean;
  isOpenPageDialog: boolean;
  screenSize: "DESKTOP" | "MOBILE";
  isPreview: boolean;
  currentPage: string | null;
  dom: Dom | null;
  selectedComponentId: UniqueIdentifier | null;
  pageId: string | null;
  pageDetail: PageDetail | null;
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
    isOpenPageSelector: false,
    isOpenPageDialog: false,
    screenSize: "DESKTOP",
    isPreview: false,
    currentPage: null,
    dom: null,
    selectedComponentId: null,
    pageId: null,
    pageDetail: null,
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
            } else if (evt.active.id === evt.over.id) {
              dispatch({
                type: "selectComponent",
                selectComponent: { id: evt.active.id },
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

export type SetPageIdArgs = {
  pageId: string | null;
};

export type SetDomArgs = {
  dom: Dom | null;
};

export type SetIsOpenPageSelectorArgs = {
  isOpen: boolean;
};

export type SetIsOpenDialogArgs = {
  isOpen: boolean;
};

export type AddDomArgs = {
  tagName: TagName;
  newParentId: UniqueIdentifier;
};

export type RemoveCompArgs = {
  compId: UniqueIdentifier;
};

export type UpdateDomArgs = {
  childId: UniqueIdentifier;
  newParentId: UniqueIdentifier;
};

export type UpdateDomInPageArgs = {
  pageId: string;
  dom: Dom;
};

export type ChangePageArgs = {
  page: string;
};

export type SelectComponentArgs = {
  id: UniqueIdentifier | null;
};

export type setIsOpenComponentPopupArgs = {
  isOpen: boolean;
};

export type EditInnerArgs = {
  id: UniqueIdentifier;
  innerText: string;
};

export type EditUrlArgs = {
  id: UniqueIdentifier;
  url: string;
};

export type EditGapArgs = {
  id: UniqueIdentifier;
  gap: number;
};

export type EditJustifyArgs = {
  id: UniqueIdentifier;
  justify: Dom["justify"];
};

export type EditItemsArgs = {
  id: UniqueIdentifier;
  items: Dom["items"];
};

export type EditPaddingArgs = {
  id: UniqueIdentifier;
  padding: number;
};

export type EditWidthArgs = {
  id: UniqueIdentifier;
  width: number;
};

export type EditHeightArgs = {
  id: UniqueIdentifier;
  height: number;
};

export type EditFontFamilyArgs = {
  id: UniqueIdentifier;
  fontFamily: Dom["fontFamily"];
};

export type EditFontSizeArgs = {
  id: UniqueIdentifier;
  fontSize: number;
};

export type EditTextColorArgs = {
  id: UniqueIdentifier;
  textColor: string;
};

export type EditBackgroundColorArgs = {
  id: UniqueIdentifier;
  backgroundColor: string | undefined;
};

export type EditorActionType = {
  type:
    | "changePage"
    | "setPageId"
    | "setDom"
    | "setIsOpenDialog"
    | "setIsOpenPageSelector"
    | "updateDom"
    | "addDom"
    | "removeComp"
    | "saveDom"
    | "selectComponent"
    | "editInner"
    | "editUrl"
    | "editGap"
    | "editJustify"
    | "editItems"
    | "editPadding"
    | "editWidth"
    | "editHeight"
    | "editFontFamily"
    | "editFontSize"
    | "editTextColor"
    | "editBackgroundColor";
  setPageId?: SetPageIdArgs;
  setDom?: SetDomArgs;
  setIsOpenPageSelector?: SetIsOpenPageSelectorArgs;
  setIsOpenDialog?: SetIsOpenDialogArgs;
  changePage?: ChangePageArgs;
  addDom?: AddDomArgs;
  removeComp?: RemoveCompArgs;
  updateDom?: UpdateDomArgs;
  updateDomInPage?: UpdateDomInPageArgs;
  selectComponent?: SelectComponentArgs;
  setIsOpenComponentPopup?: setIsOpenComponentPopupArgs;
  editInnerArgs?: EditInnerArgs;
  editUrl?: EditUrlArgs;
  editGapArgs?: EditGapArgs;
  editJustifyArgs?: EditJustifyArgs;
  editItemsArgs?: EditItemsArgs;
  editPaddingArgs?: EditPaddingArgs;
  editWidthArgs?: EditWidthArgs;
  editHeightArgs?: EditHeightArgs;
  editFontFamilyArgs?: EditFontFamilyArgs;
  editFontSizeArgs?: EditFontSizeArgs;
  editTextColorArgs?: EditTextColorArgs;
  editBackgroundColorArgs?: EditBackgroundColorArgs;
};
function editorReducer(
  editorContext: EditorContextType,
  action: EditorActionType
): EditorContextType {
  switch (action.type) {
    case "setPageId": {
      return { ...editorContext, pageId: action.setPageId!.pageId };
    }
    case "setDom": {
      return { ...editorContext, dom: action.setDom!.dom };
    }
    case "setIsOpenPageSelector": {
      return {
        ...editorContext,
        isOpenPageSelector: action.setIsOpenPageSelector!.isOpen,
      };
    }
    case "setIsOpenDialog": {
      return {
        ...editorContext,
        isOpenPageDialog: action.setIsOpenDialog!.isOpen,
      };
    }
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
        fontFamily: "font-sans",
        fontSize: 16,
        textColor: "#000000",
        justify: "justify-start",
        items: "items-start",
        width: 16,
        height: 2,
        padding: 8,
        gap: 4,
        backgroundColor: undefined,
      };
      const newDom = addComponent(
        editorContext.dom!,
        newChild,
        action.addDom!.newParentId
      );
      return { ...editorContext, dom: newDom };
    }
    case "removeComp": {
      return {
        ...editorContext,
        dom: removeComponent(editorContext.dom!, action.removeComp!.compId),
      };
    }
    case "updateDom": {
      const newDom = moveComponent(
        editorContext.dom!,
        action.updateDom!.childId,
        action.updateDom!.newParentId
      );
      return { ...editorContext, dom: newDom };
    }
    case "saveDom": {
      editPage(editorContext.pageId!, editorContext.dom!).then((page) => {
        toast.success("สำเร็จ", { description: `บันทึก ${page.name} สำเร็จ` });
      });
      return editorContext;
    }
    case "selectComponent": {
      return {
        ...editorContext,
        selectedComponentId: action.selectComponent!.id,
      };
    }
    case "editInner": {
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editInnerArgs!.id);
      if (!component) return editorContext;
      component.innerText = action.editInnerArgs!.innerText;
      return { ...editorContext, dom: newDom };
    }
    case "editUrl": {
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editUrl!.id);
      if (!component)
        throw new Error(`Can't find component with id ${action.editUrl!.id}`);
      component.url = action.editUrl!.url;
      return { ...editorContext, dom: newDom };
    }
    case "editGap": {
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editGapArgs!.id);
      if (!component) return editorContext;
      component.gap = action.editGapArgs!.gap;
      return { ...editorContext, dom: newDom };
    }
    case "editJustify": {
      const maybeJustify = baseDomSchema
        .pick({ justify: true })
        .safeParse({ justify: action.editJustifyArgs!.justify });
      if (!maybeJustify.success) return editorContext;
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editJustifyArgs!.id);
      if (!component) return editorContext;
      component.justify = maybeJustify.data.justify;
      return { ...editorContext, dom: newDom };
    }
    case "editItems": {
      const maybeItems = baseDomSchema
        .pick({ items: true })
        .safeParse({ items: action.editItemsArgs!.items });
      if (!maybeItems.success) return editorContext;
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editItemsArgs!.id);
      if (!component) return editorContext;
      component.items = maybeItems.data.items;
      return { ...editorContext, dom: newDom };
    }
    case "editPadding": {
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editPaddingArgs!.id);
      if (!component) return editorContext;
      component.padding = action.editPaddingArgs!.padding;
      return { ...editorContext, dom: newDom };
    }
    case "editWidth": {
      const maybeWidth = baseDomSchema
        .pick({ width: true })
        .safeParse({ width: action.editWidthArgs!.width });
      if (!maybeWidth.success) return editorContext;
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editWidthArgs!.id);
      if (!component) return editorContext;
      component.width = maybeWidth.data.width;
      return { ...editorContext, dom: newDom };
    }
    case "editHeight": {
      const maybeHeight = baseDomSchema
        .pick({ height: true })
        .safeParse({ height: action.editHeightArgs!.height });
      if (!maybeHeight.success) return editorContext;
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editHeightArgs!.id);
      if (!component) return editorContext;
      component.height = maybeHeight.data.height;
      return { ...editorContext, dom: newDom };
    }
    case "editFontFamily": {
      const maybeFontFamily = baseDomSchema
        .pick({ fontFamily: true })
        .safeParse({ fontFamily: action.editFontFamilyArgs!.fontFamily });
      if (!maybeFontFamily.success) return editorContext;
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editFontFamilyArgs!.id);
      if (!component) return editorContext;
      component.fontFamily = maybeFontFamily.data.fontFamily;
      return { ...editorContext, dom: newDom };
    }
    case "editFontSize": {
      const maybeFontSize = baseDomSchema
        .pick({ fontSize: true })
        .safeParse({ fontSize: action.editFontSizeArgs!.fontSize });
      if (!maybeFontSize.success) return editorContext;
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editFontSizeArgs!.id);
      if (!component) return editorContext;
      component.fontSize = maybeFontSize.data.fontSize;
      return { ...editorContext, dom: newDom };
    }
    case "editTextColor": {
      const maybeTextColor = baseDomSchema
        .pick({ textColor: true })
        .safeParse({ textColor: action.editTextColorArgs!.textColor });
      if (!maybeTextColor.success) return editorContext;
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editTextColorArgs!.id);
      if (!component) return editorContext;
      component.textColor = maybeTextColor.data.textColor;
      return { ...editorContext, dom: newDom };
    }
    case "editBackgroundColor": {
      const maybeBackgroundColor = baseDomSchema
        .pick({ backgroundColor: true })
        .safeParse({
          backgroundColor: action.editBackgroundColorArgs!.backgroundColor,
        });
      if (!maybeBackgroundColor.success) return editorContext;
      const newDom = editorContext.dom!;
      const component = findIn(newDom, action.editBackgroundColorArgs!.id);
      if (!component) return editorContext;
      component.backgroundColor = maybeBackgroundColor.data.backgroundColor;
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

function removeComponent(dom: Dom, compId: UniqueIdentifier): Dom {
  const newDom = deepClone(dom);
  const parent = findParentIn(newDom, compId);
  if (!parent) throw new Error(`Can't find parent of component id ${compId}`);
  parent.children = parent.children.filter((child) => child.id !== compId);
  return newDom;
}

function generatePreInnerText(tagName: TagName): string | undefined {
  switch (tagName) {
    case "p":
      return "ข้อความ";
    case "div":
      return undefined;
    case "button":
      return "Button";
    default:
      throw new Error(`Unknown tag name: ${tagName}`);
  }
}
