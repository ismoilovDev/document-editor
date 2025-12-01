import { useCallback, useState, type DragEvent } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Link } from "@tiptap/extension-link";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Image } from "@tiptap/extension-image";
import { EditorToolbar } from "./EditorToolbar";
import { TemplatesSidebar } from "./TemplatesSidebar";
import { VariablesSidebar } from "./VariablesSidebar";
import { suggestionConfig } from "./suggestion";
import { templates } from "./data";
import { variables } from "./data";
import { FileText } from "lucide-react";

export function DocumentEditor() {
  const [isDragOver, setIsDragOver] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Yozishni boshlang yoki shablonni shu yerga tashlang... O\'zgaruvchilar uchun "{{" yozing',
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "variable-mention",
        },
        suggestion: {
          ...suggestionConfig,
          char: "{{",
        },
        renderHTML({ node }) {
          return [
            "span",
            { class: "variable-mention", "data-variable": node.attrs.id },
            `{{${node.attrs.id}}}`,
          ];
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Highlight.configure({
        multicolor: false,
      }),
      TextStyle,
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "editor-link",
        },
      }),
      Subscript,
      Superscript,
      Image.configure({
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "editor-content",
      },
    },
  });

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (!editor) return;

      const dataType = e.dataTransfer.getData("application/type");
      const dataId = e.dataTransfer.getData("application/id");

      if (dataType === "template") {
        const template = templates.find((t) => t.id === dataId);
        if (template) {
          editor.chain().focus().insertContent(template.content).run();
        }
      } else if (dataType === "variable") {
        const variable = variables.find((v) => v.id === dataId);
        if (variable) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "mention",
              attrs: { id: variable.name },
            })
            .run();
        }
      }
    },
    [editor]
  );

  return (
    <div className="document-editor-layout">
      <TemplatesSidebar />

      <div className="editor-main">
        <header className="editor-header">
          <div className="header-title">
            <FileText size={24} />
            <h1>Hujjat muharriri</h1>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <span>Eksport</span>
            </button>
            <button className="btn btn-primary">
              <span>Saqlash</span>
            </button>
          </div>
        </header>

        <EditorToolbar editor={editor} />

        <div
          className={`editor-wrapper ${isDragOver ? "is-drag-over" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      <VariablesSidebar />
    </div>
  );
}
