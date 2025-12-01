export interface Variable {
  id: string;
  name: string;
  label: string;
  category: string;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  icon: string;
}

export interface DragData {
  type: "template" | "variable";
  data: Template | Variable;
}

