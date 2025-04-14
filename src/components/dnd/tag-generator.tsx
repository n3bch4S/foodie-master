import { TagName } from "@/lib/page/types";
import Image from "next/image";
import React from "react";

interface TagGeneratorProps {
  tagName: TagName;
  children?: React.ReactNode;
  src?: string;
  alt?: string;
}

export function TagGenerator({
  tagName,
  children,
  src,
  alt,
  ...other
}: TagGeneratorProps) {
  switch (tagName) {
    case "p":
      return <p {...other}>{children}</p>;
    case "div":
      return <div {...other}>{children}</div>;
    case "button":
      return <button {...other}>{children}</button>;

    default:
      throw new Error(`Unknown tag name: ${tagName}`);
  }
}
