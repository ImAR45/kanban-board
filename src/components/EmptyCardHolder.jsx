/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";

/* eslint-disable react/prop-types */
const EmptyCardHolder = ({ coulmnId }) => {
  const ref = useRef(null);
  const [aboutToDrop, setAboutToDrop] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      getData() {
        return {
          id: "placeholder",
          position: 0,
          columnId: coulmnId,
        };
      },
      onDragEnter() {
        setAboutToDrop(true);
      },
      onDragLeave() {
        setAboutToDrop(false);
      },
      onDrop() {
        setAboutToDrop(false);
      },
    });
  }, []);

  return <div ref={ref} className={`w-full h-full rounded-md`}></div>;
};

export default EmptyCardHolder;
