import { useState, useRef, useEffect } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Highlighter,
  Type,
  Heading1,
  Heading2,
  Heading3,
  RemoveFormatting,
  MoreHorizontal,
  Table,
  Image,
  Link,
  Subscript,
  Superscript,
  Minus,
  Code,
  TableCellsMerge,
  Trash2,
  ArrowUpFromLine,
  ArrowDownFromLine,
  ArrowLeftFromLine,
  ArrowRightFromLine,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  children,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`toolbar-btn ${isActive ? "is-active" : ""}`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="toolbar-divider" />;
}

interface MoreMenuProps {
  editor: Editor;
  onClose: () => void;
}

function MoreMenu({ editor, onClose }: MoreMenuProps) {
  const handleInsertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    onClose();
  };

  const handleInsertImage = () => {
    const url = prompt("Rasm URL manzilini kiriting:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    onClose();
  };

  const handleInsertLink = () => {
    const url = prompt("Havola URL manzilini kiriting:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
    onClose();
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
    onClose();
  };

  const isInTable = editor.isActive("table");

  return (
    <div className="more-menu">
      <div className="more-menu-section">
        <div className="more-menu-label">Qo'shish</div>
        <button className="more-menu-item" onClick={handleInsertTable}>
          <Table size={16} />
          <span>Jadval</span>
        </button>
        <button className="more-menu-item" onClick={handleInsertImage}>
          <Image size={16} />
          <span>Rasm</span>
        </button>
        <button className="more-menu-item" onClick={handleInsertLink}>
          <Link size={16} />
          <span>Havola</span>
        </button>
        {editor.isActive("link") && (
          <button className="more-menu-item" onClick={handleRemoveLink}>
            <Link size={16} />
            <span>Havolani o'chirish</span>
          </button>
        )}
        <button
          className="more-menu-item"
          onClick={() => {
            editor.chain().focus().setHorizontalRule().run();
            onClose();
          }}
        >
          <Minus size={16} />
          <span>Gorizontal chiziq</span>
        </button>
        <button
          className="more-menu-item"
          onClick={() => {
            editor.chain().focus().setCodeBlock().run();
            onClose();
          }}
        >
          <Code size={16} />
          <span>Kod bloki</span>
        </button>
      </div>

      <div className="more-menu-section">
        <div className="more-menu-label">Matn</div>
        <button
          className={`more-menu-item ${editor.isActive("subscript") ? "is-active" : ""}`}
          onClick={() => {
            editor.chain().focus().toggleSubscript().run();
            onClose();
          }}
        >
          <Subscript size={16} />
          <span>Pastki yozuv</span>
        </button>
        <button
          className={`more-menu-item ${editor.isActive("superscript") ? "is-active" : ""}`}
          onClick={() => {
            editor.chain().focus().toggleSuperscript().run();
            onClose();
          }}
        >
          <Superscript size={16} />
          <span>Yuqori yozuv</span>
        </button>
      </div>

      {isInTable && (
        <div className="more-menu-section">
          <div className="more-menu-label">Jadval</div>
          <button
            className="more-menu-item"
            onClick={() => {
              editor.chain().focus().addRowBefore().run();
              onClose();
            }}
          >
            <ArrowUpFromLine size={16} />
            <span>Yuqoriga qator qo'shish</span>
          </button>
          <button
            className="more-menu-item"
            onClick={() => {
              editor.chain().focus().addRowAfter().run();
              onClose();
            }}
          >
            <ArrowDownFromLine size={16} />
            <span>Pastga qator qo'shish</span>
          </button>
          <button
            className="more-menu-item"
            onClick={() => {
              editor.chain().focus().addColumnBefore().run();
              onClose();
            }}
          >
            <ArrowLeftFromLine size={16} />
            <span>Chapga ustun qo'shish</span>
          </button>
          <button
            className="more-menu-item"
            onClick={() => {
              editor.chain().focus().addColumnAfter().run();
              onClose();
            }}
          >
            <ArrowRightFromLine size={16} />
            <span>O'ngga ustun qo'shish</span>
          </button>
          <button
            className="more-menu-item"
            onClick={() => {
              editor.chain().focus().deleteRow().run();
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Qatorni o'chirish</span>
          </button>
          <button
            className="more-menu-item"
            onClick={() => {
              editor.chain().focus().deleteColumn().run();
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Ustunni o'chirish</span>
          </button>
          <button
            className="more-menu-item"
            onClick={() => {
              editor.chain().focus().mergeCells().run();
              onClose();
            }}
          >
            <TableCellsMerge size={16} />
            <span>Kataklarni birlashtirish</span>
          </button>
          <button
            className="more-menu-item text-red"
            onClick={() => {
              editor.chain().focus().deleteTable().run();
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Jadvalni o'chirish</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreButtonRef.current && !moreButtonRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!editor) return null;

  return (
    <div className="editor-toolbar">
      <div className="toolbar-group">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Bekor qilish"
        >
          <Undo size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Qaytarish"
        >
          <Redo size={18} />
        </ToolbarButton>
      </div>

      <ToolbarDivider />

      <div className="toolbar-group">
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive("paragraph")}
          title="Paragraf"
        >
          <Type size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          title="Sarlavha 1"
        >
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          title="Sarlavha 2"
        >
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          title="Sarlavha 3"
        >
          <Heading3 size={18} />
        </ToolbarButton>
      </div>

      <ToolbarDivider />

      <div className="toolbar-group">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Qalin"
        >
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Kursiv"
        >
          <Italic size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Tagiga chizish"
        >
          <Underline size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="O'chirilgan"
        >
          <Strikethrough size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          title="Ajratish"
        >
          <Highlighter size={18} />
        </ToolbarButton>
      </div>

      <ToolbarDivider />

      <div className="toolbar-group">
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Chapga tekislash"
        >
          <AlignLeft size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Markazga tekislash"
        >
          <AlignCenter size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="O'ngga tekislash"
        >
          <AlignRight size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
          title="Ikki tomonga tekislash"
        >
          <AlignJustify size={18} />
        </ToolbarButton>
      </div>

      <ToolbarDivider />

      <div className="toolbar-group">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Belgilar ro'yxati"
        >
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Raqamli ro'yxat"
        >
          <ListOrdered size={18} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Iqtibos"
        >
          <Quote size={18} />
        </ToolbarButton>
      </div>

      <ToolbarDivider />

      <div className="toolbar-group">
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
          title="Formatlashni tozalash"
        >
          <RemoveFormatting size={18} />
        </ToolbarButton>
      </div>

      <ToolbarDivider />

      <div className="toolbar-group toolbar-more" ref={moreButtonRef}>
        <ToolbarButton
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          isActive={showMoreMenu}
          title="Ko'proq"
        >
          <MoreHorizontal size={18} />
        </ToolbarButton>
        {showMoreMenu && <MoreMenu editor={editor} onClose={() => setShowMoreMenu(false)} />}
      </div>
    </div>
  );
}
