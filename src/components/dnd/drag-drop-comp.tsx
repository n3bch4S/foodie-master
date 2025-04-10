"use client";
import { Dom, TagName } from "@/lib/page/types";
import {
  useDraggable,
  UseDraggableArguments,
  useDroppable,
  UseDroppableArguments,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { CSSProperties } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  useEditor,
  useEditorDispatch,
} from "@/providers/editor/editor-provider";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
                className="hover:border-2 flex"
              >
                {props.dom.innerText}
              </p>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <div className="flex flex-row gap-4 items-center justify-between">
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
                  className="w-32"
                />
              </div>
              <div className="flex flex-row gap-4 items-center justify-between">
                <Label htmlFor="gap">ช่องว่างระหว่างกล่อง</Label>
                <Input
                  id="gap"
                  value={props.dom.gap}
                  onChange={(e) => {
                    editorDispatch({
                      type: "editGap",
                      editGapArgs: { id: props.id, gap: e.currentTarget.value },
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
          // {...dragState.attributes}
          style={style}
          className="border-2 min-h-8 min-w-16"
        >
          {props.dom.innerText}
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
          // {...dragState.attributes}
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
