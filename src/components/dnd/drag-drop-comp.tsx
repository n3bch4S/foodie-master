"use client";
import { TagName } from "@/lib/page/types";
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
  tagName: TagName;
  innerText?: string;
  imageTag?: ImageArgs;
  children?: React.ReactNode;
}

export function DragDropComp({
  id,
  disabled,
  data,
  attributes,
  tagName,
  innerText,
  imageTag,
  children,
}: DragDropCompProps) {
  const dropState = useDroppable({
    id,
    disabled,
    data,
  });
  const dragState = useDraggable({ id, disabled, data, attributes });
  const editor = useEditor();
  const editorDispatch = useEditorDispatch();
  const style: CSSProperties = {
    transform: CSS.Translate.toString(dragState.transform),
    borderColor: dropState.isOver ? "green" : undefined,
  };

  switch (tagName) {
    case "p": {
      return (
        <>
          <Popover
            open={editor.selectedComponentId === id}
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
                // {...dragState.attributes}
                style={style}
                className="hover:border-2"
              >
                {innerText}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-row gap-4 items-center justify-between">
                <Label htmlFor="innerText">ข้อความ</Label>
                <Input
                  id="innerText"
                  value={innerText}
                  onChange={(e) => {
                    editorDispatch({
                      type: "editInner",
                      editInnerArgs: { id, innerText: e.currentTarget.value },
                    });
                  }}
                  className="w-32"
                />
              </div>
              <div className="flex flex-row gap-4 items-center justify-between">
                <Label htmlFor="gap">ช่องว่าง</Label>
                <Input
                  id="gap"
                  value={innerText}
                  onChange={(e) => {
                    editorDispatch({
                      type: "editInner",
                      editInnerArgs: { id, innerText: e.currentTarget.value },
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
          {innerText}
          {children}
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
          {innerText}
        </button>
      );
    }
    case "image": {
      return <Image src={imageTag!.src} alt={imageTag!.alt} />;
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
      {children}
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
