import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";
import type { Variable } from "./types";

interface VariableSuggestionProps {
  items: Variable[];
  command: (item: { id: string }) => void;
}

export interface VariableSuggestionRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

export const VariableSuggestion = forwardRef<
  VariableSuggestionRef,
  VariableSuggestionProps
>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = useCallback(
    (index: number) => {
      const item = props.items[index];
      if (item) {
        props.command({ id: item.name });
      }
    },
    [props]
  );

  const upHandler = useCallback(() => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  }, [selectedIndex, props.items.length]);

  const downHandler = useCallback(() => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  }, [selectedIndex, props.items.length]);

  const enterHandler = useCallback(() => {
    selectItem(selectedIndex);
  }, [selectItem, selectedIndex]);

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }
      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }
      if (event.key === "Enter") {
        enterHandler();
        return true;
      }
      return false;
    },
  }));

  if (props.items.length === 0) {
    return (
      <div className="variable-suggestion-list">
        <div className="variable-suggestion-empty">O'zgaruvchilar topilmadi</div>
      </div>
    );
  }

  const grouped = props.items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, Variable[]>
  );

  let globalIndex = -1;

  return (
    <div className="variable-suggestion-list">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className="variable-suggestion-category">{category}</div>
          {items.map((item) => {
            globalIndex++;
            const itemIndex = globalIndex;
            return (
              <button
                key={item.id}
                className={`variable-suggestion-item ${
                  itemIndex === selectedIndex ? "is-selected" : ""
                }`}
                onClick={() => selectItem(itemIndex)}
              >
                <span className="variable-suggestion-name">{item.label}</span>
                <span className="variable-suggestion-code">
                  {`{{${item.name}}}`}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
});

VariableSuggestion.displayName = "VariableSuggestion";
