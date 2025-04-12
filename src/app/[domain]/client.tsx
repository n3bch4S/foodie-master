"use client";

import { Dom, PageDetail } from "@/lib/page/types";
import { CSSProperties, useMemo } from "react";

export function ClientPage(props: { page: PageDetail }) {
  const { dom } = useMemo(() => {
    return props.page;
  }, [props.page]);
  return <>{renderDom(dom)}</>;
}

export function renderDom(
  dom: Dom,
  orderElem?: React.ReactNode
): React.ReactNode {
  if (dom.id === "root" && dom.children.length === 0)
    return <div className="container" key={dom.id} />;
  if (dom.id === "root" && dom.children.length > 0)
    return (
      <div className="container" key={dom.id}>
        {dom.children.map((child) => renderDom(child, orderElem))}
      </div>
    );
  if (dom.tagName === "order") {
    if (!orderElem) null;
    return orderElem;
  }

  if (dom.canHaveChildren)
    return (
      <ThisComp dom={dom} key={dom.id}>
        {dom.children.map((child) => renderDom(child, orderElem))}
      </ThisComp>
    );
  return <ThisComp dom={dom} key={dom.id} />;
}

function ThisComp(props: { dom: Dom; children?: React.ReactNode }) {
  const { dom } = props;
  const style: CSSProperties = {
    gap: dom.gap ? `${dom.gap}px` : undefined,
    padding: dom.padding ? `${dom.padding}px` : undefined,
    width: dom.width ? `${dom.width}rem` : undefined,
    height: dom.height ? `${dom.height}rem` : undefined,
    fontSize: dom.fontSize ? `${dom.fontSize}px` : undefined,
    color: dom.textColor ? dom.textColor : undefined,
    backgroundColor: dom.backgroundColor ? dom.backgroundColor : undefined,
  };

  switch (dom.tagName) {
    case "p": {
      return (
        <p
          style={style}
          className={` flex ${dom.justify} ${dom.items} ${dom.fontFamily}`}
        >
          {dom.innerText}
        </p>
      );
    }
    case "div": {
      return (
        <div
          style={style}
          className={`flex flex-row ${dom.justify} ${dom.items} ${dom.fontFamily}`}
        >
          {props.children}
        </div>
      );
    }
    case "button": {
      return (
        <a href={dom.url}>
          <button
            style={style}
            className={`rounded-lg flex ${dom.justify} ${dom.items} ${dom.fontFamily}`}
          >
            {dom.innerText}
          </button>
        </a>
      );
    }
    case "order": {
      return (
        <div
          style={style}
          className="w-full h-16 flex justify-center items-center"
        >
          เมนูออเดอร์sds
        </div>
      );
    }
    default: {
      throw new Error(`Unknown tagName: ${dom.tagName}`);
    }
  }
}
