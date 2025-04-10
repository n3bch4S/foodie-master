"use client";
import { Dom } from "@/lib/page/types";
import {
  useDraggable,
  UseDraggableArguments,
  useDroppable,
  UseDroppableArguments,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  useEditor,
  useEditorDispatch,
} from "@/providers/editor/editor-provider";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  PenOff,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

type ImageArgs = {
  src: string;
  alt: string;
};

interface DragDropCompProps
  extends UseDroppableArguments,
    UseDraggableArguments {
  dom: Dom;
  innerText?: string;
  imageTag?: ImageArgs;
  children?: React.ReactNode;
}
export function DragDropComp(props: DragDropCompProps) {
  console.log(props.dom);
  const dropState = useDroppable({
    id: props.id,
    disabled: props.disabled,
    data: props.data,
  });
  const dragState = useDraggable({
    id: props.id,
    disabled: props.disabled,
    data: props.data,
    attributes: props.attributes,
  });
  const editor = useEditor();
  const editorDispatch = useEditorDispatch();
  const style: CSSProperties = {
    transform: CSS.Translate.toString(dragState.transform),
    borderColor: dropState.isOver ? "green" : undefined,
    gap: props.dom.gap ? `${props.dom.gap}px` : undefined,
    padding: props.dom.padding ? `${props.dom.padding}px` : undefined,
    width: props.dom.width ? `${props.dom.width}rem` : undefined,
    height: props.dom.height ? `${props.dom.height}rem` : undefined,
    fontSize: props.dom.fontSize ? `${props.dom.fontSize}px` : undefined,
    color: props.dom.textColor ? props.dom.textColor : undefined,
    backgroundColor: props.dom.backgroundColor
      ? props.dom.backgroundColor
      : undefined,
  };

  switch (props.dom.tagName) {
    case "p": {
      return (
        <>
          <Popover
            open={editor.selectedComponentId === props.id}
            onOpenChange={() => {
              editorDispatch({
                type: "selectComponent",
                selectComponent: { id: null },
              });
            }}
          >
            <PopoverTrigger asChild>
              <p
                ref={(element) => {
                  dragState.setNodeRef(element);
                  dropState.setNodeRef(element);
                }}
                {...dragState.listeners}
                style={style}
                className={`${
                  editor.selectedComponentId === props.id
                    ? "border-2 border-pink-300"
                    : ""
                } hover:border-2 flex ${props.dom.justify} ${props.dom.items} ${
                  props.dom.fontFamily
                }`}
              >
                {props.dom.innerText}
              </p>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-4">
              <Button
                variant={"destructive"}
                onClick={(e) => {
                  editorDispatch({
                    type: "removeComp",
                    removeComp: { compId: props.id },
                  });
                }}
                className="absolute -right-14"
              >
                <Trash2 />
              </Button>
              <div className="flex flex-col gap-4 items-center justify-between">
                <Label htmlFor="innerText">ข้อความ</Label>
                <Input
                  id="innerText"
                  value={props.dom.innerText}
                  onChange={(e) => {
                    editorDispatch({
                      type: "editInner",
                      editInnerArgs: {
                        id: props.id,
                        innerText: e.currentTarget.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 py-2 border-2 rounded-xl border-slate-200">
                <div className="flex flex-row gap-4 items-center justify-evenly">
                  ฟ้อนต์
                  <div className="w-32">
                    <Select
                      value={props.dom.fontFamily}
                      onValueChange={(val) => {
                        editorDispatch({
                          type: "editFontFamily",
                          editFontFamilyArgs: {
                            id: props.id,
                            fontFamily: val as Dom["fontFamily"],
                          },
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="ฟ้อนต์" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="font-sans">font-sans</SelectItem>
                        <SelectItem value="font-serif">font-serif</SelectItem>
                        <SelectItem value="font-mono">font-mono</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-row justify-around">
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <Label htmlFor="fontSize">ขนาด</Label>
                    <Input
                      id="fontSize"
                      type="number"
                      value={props.dom.fontSize}
                      onChange={(e) => {
                        const maybeNumber = Number(e.currentTarget.value);
                        if (Number.isNaN(maybeNumber)) return;
                        editorDispatch({
                          type: "editFontSize",
                          editFontSizeArgs: {
                            id: props.id,
                            fontSize: maybeNumber,
                          },
                        });
                      }}
                      className="w-16"
                    />
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <Label htmlFor="textColor">สี</Label>
                    <Input
                      id="textColor"
                      type="color"
                      value={props.dom.textColor}
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        editorDispatch({
                          type: "editTextColor",
                          editTextColorArgs: { id: props.id, textColor: value },
                        });
                      }}
                      className="w-16"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center justify-evenly">
                  <Button
                    variant="outline"
                    onClick={() => {
                      editorDispatch({
                        type: "editJustify",
                        editJustifyArgs: {
                          id: props.id,
                          justify: "justify-start",
                        },
                      });
                    }}
                  >
                    <AlignLeft />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      editorDispatch({
                        type: "editJustify",
                        editJustifyArgs: {
                          id: props.id,
                          justify: "justify-center",
                        },
                      });
                    }}
                  >
                    <AlignCenter />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      editorDispatch({
                        type: "editJustify",
                        editJustifyArgs: {
                          id: props.id,
                          justify: "justify-end",
                        },
                      });
                    }}
                  >
                    <AlignRight />
                  </Button>
                </div>
                <div className="flex flex-row gap-4 items-center justify-evenly">
                  <Button
                    variant="outline"
                    onClick={() => {
                      editorDispatch({
                        type: "editItems",
                        editItemsArgs: {
                          id: props.id,
                          items: "items-start",
                        },
                      });
                    }}
                  >
                    <AlignVerticalJustifyStart />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      editorDispatch({
                        type: "editItems",
                        editItemsArgs: {
                          id: props.id,
                          items: "items-center",
                        },
                      });
                    }}
                  >
                    <AlignVerticalJustifyCenter />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      editorDispatch({
                        type: "editItems",
                        editItemsArgs: {
                          id: props.id,
                          items: "items-end",
                        },
                      });
                    }}
                  >
                    <AlignVerticalJustifyEnd />
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex flex-row gap-2 justify-evenly">
                <div className="flex flex-row gap-2 items-center justify-between">
                  <Label htmlFor="width">กว้าง</Label>
                  <Input
                    id="width"
                    type="number"
                    value={props.dom.width}
                    onChange={(e) => {
                      const maybeNumber = Number(e.currentTarget.value);
                      if (Number.isNaN(maybeNumber)) return;
                      editorDispatch({
                        type: "editWidth",
                        editWidthArgs: { id: props.id, width: maybeNumber },
                      });
                    }}
                    className="w-16"
                  />
                </div>
                <div className="flex flex-row gap-2 items-center justify-between">
                  <Label htmlFor="height">สูง</Label>
                  <Input
                    id="height"
                    type="number"
                    value={props.dom.height}
                    onChange={(e) => {
                      const maybeNumber = Number(e.currentTarget.value);
                      if (Number.isNaN(maybeNumber)) return;
                      editorDispatch({
                        type: "editHeight",
                        editHeightArgs: { id: props.id, height: maybeNumber },
                      });
                    }}
                    className="w-16"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center justify-between">
                <Label htmlFor="padding">ขนาดขอบใน</Label>
                <Input
                  id="padding"
                  type="number"
                  value={props.dom.padding}
                  onChange={(e) => {
                    const maybeNumber = Number(e.currentTarget.value);
                    if (Number.isNaN(maybeNumber)) return;
                    editorDispatch({
                      type: "editPadding",
                      editPaddingArgs: { id: props.id, padding: maybeNumber },
                    });
                  }}
                  className="w-32"
                />
              </div>
              <div className="flex flex-row gap-2 items-center justify-between">
                <Label htmlFor="gap">ความห่าง</Label>
                <Input
                  id="gap"
                  type="number"
                  value={props.dom.gap?.toString()}
                  onChange={(e) => {
                    const maybeNumber = Number(e.currentTarget.value);
                    if (Number.isNaN(maybeNumber)) return;
                    editorDispatch({
                      type: "editGap",
                      editGapArgs: {
                        id: props.id,
                        gap: maybeNumber,
                      },
                    });
                  }}
                  className="w-32"
                />
              </div>
              <div className="flex flex-row gap-2 items-center justify-between">
                <Label htmlFor="backgroundColor">สีพื้นหลัง</Label>
                <Button
                  variant={"outline"}
                  onClick={(e) => {
                    editorDispatch({
                      type: "editBackgroundColor",
                      editBackgroundColorArgs: {
                        id: props.id,
                        backgroundColor: undefined,
                      },
                    });
                  }}
                  className="size-8 border-2 border-slate-200 rounded-md flex items-center justify-center"
                >
                  <PenOff size={22} />
                </Button>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={props.dom.backgroundColor}
                  onChange={(e) => {
                    const value = e.currentTarget.value;
                    editorDispatch({
                      type: "editBackgroundColor",
                      editBackgroundColorArgs: {
                        id: props.id,
                        backgroundColor: value,
                      },
                    });
                  }}
                  className="w-32"
                />
              </div>
            </PopoverContent>
          </Popover>
        </>
      );
    }
    case "div": {
      return (
        <div
          ref={(element) => {
            dragState.setNodeRef(element);
            dropState.setNodeRef(element);
          }}
          {...dragState.listeners}
          style={style}
          className="border-2 min-h-8 min-w-16"
        >
          {props.children}
        </div>
      );
    }
    case "button": {
      return (
        <button
          ref={(element) => {
            dragState.setNodeRef(element);
            dropState.setNodeRef(element);
          }}
          {...dragState.listeners}
          style={style}
        >
          {props.dom.innerText}
        </button>
      );
    }
  }

  return (
    <div
      ref={(element) => {
        dragState.setNodeRef(element);
        dropState.setNodeRef(element);
      }}
      {...dragState.listeners}
      // {...dragState.attributes}
      style={style}
    >
      {props.children}
    </div>
  );
}

interface TextInputProps {
  id: string;
  innerText?: string;
}
function TextInput(props: TextInputProps) {
  const editorDispatch = useEditorDispatch();
  return (
    <div className="flex flex-row gap-4 items-center justify-between">
      <Label htmlFor={props.id}>ข้อความ</Label>
      <Input
        id={props.id}
        value={props.innerText}
        onChange={(e) => {
          editorDispatch({
            type: "editInner",
            editInnerArgs: { id: props.id, innerText: e.currentTarget.value },
          });
        }}
        className="w-32"
      />
    </div>
  );
}
