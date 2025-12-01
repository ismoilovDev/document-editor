import type { DragEvent } from "react";
import { Braces, User, Building, Settings, FileText } from "lucide-react";
import { variables } from "./data";
import type { Variable } from "./types";

const categoryIcons: Record<string, React.ReactNode> = {
  Foydalanuvchi: <User size={16} />,
  Kompaniya: <Building size={16} />,
  Tizim: <Settings size={16} />,
  Hujjat: <FileText size={16} />,
};

interface DraggableVariableProps {
  variable: Variable;
}

function DraggableVariable({ variable }: DraggableVariableProps) {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("application/type", "variable");
    e.dataTransfer.setData("application/id", variable.id);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="variable-item"
    >
      <span className="variable-label">{variable.label}</span>
      <code className="variable-code">{`{{${variable.name}}}`}</code>
    </div>
  );
}

export function VariablesSidebar() {
  const grouped = variables.reduce(
    (acc, variable) => {
      if (!acc[variable.category]) acc[variable.category] = [];
      acc[variable.category].push(variable);
      return acc;
    },
    {} as Record<string, Variable[]>
  );

  return (
    <div className="sidebar variables-sidebar">
      <div className="sidebar-header">
        <Braces size={20} />
        <h3>O'zgaruvchilar</h3>
      </div>
      <p className="sidebar-hint">
        Tashlang yoki muharrirda <code>{"{{"}</code> yozing
      </p>
      <div className="sidebar-content">
        <div className="variables-list">
          {Object.entries(grouped).map(([category, vars]) => (
            <div key={category} className="variable-category">
              <div className="category-header">
                {categoryIcons[category]}
                <span>{category}</span>
              </div>
              <div className="category-items">
                {vars.map((variable) => (
                  <DraggableVariable key={variable.id} variable={variable} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
