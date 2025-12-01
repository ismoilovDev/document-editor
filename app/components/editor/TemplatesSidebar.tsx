import type { DragEvent } from "react";
import {
  Heading,
  Type,
  Columns,
  PenTool,
  Contact,
  Mail,
  Quote,
  List,
  LayoutTemplate,
} from "lucide-react";
import { templates } from "./data";
import type { Template } from "./types";

const iconMap: Record<string, React.ReactNode> = {
  heading: <Heading size={18} />,
  text: <Type size={18} />,
  columns: <Columns size={18} />,
  "pen-tool": <PenTool size={18} />,
  contact: <Contact size={18} />,
  mail: <Mail size={18} />,
  quote: <Quote size={18} />,
  list: <List size={18} />,
};

interface DraggableTemplateProps {
  template: Template;
}

function DraggableTemplate({ template }: DraggableTemplateProps) {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("application/type", "template");
    e.dataTransfer.setData("application/id", template.id);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="template-item"
    >
      <div className="template-icon">
        {iconMap[template.icon] || <LayoutTemplate size={18} />}
      </div>
      <span className="template-name">{template.name}</span>
    </div>
  );
}

export function TemplatesSidebar() {
  return (
    <div className="sidebar templates-sidebar">
      <div className="sidebar-header">
        <LayoutTemplate size={20} />
        <h3>Shablonlar</h3>
      </div>
      <p className="sidebar-hint">Shablonlarni muharrirga tashlang</p>
      <div className="sidebar-content">
        <div className="templates-list">
          {templates.map((template) => (
            <DraggableTemplate key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
}
