# Document Editor

A modern, feature-rich document editor built with React, TipTap, and React Router 7. Supports templates, variables, drag & drop, and comprehensive text formatting.

![Document Editor](https://img.shields.io/badge/React-19-blue) ![TipTap](https://img.shields.io/badge/TipTap-3.x-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.x-cyan)

## Features

### 📝 Rich Text Editor
- Full text formatting (bold, italic, underline, strikethrough, highlight)
- Headings (H1, H2, H3) and paragraphs
- Text alignment (left, center, right, justify)
- Bullet and numbered lists
- Blockquotes and code blocks
- Subscript and superscript
- Undo/redo functionality

### 📋 Templates System
- Pre-built document templates
- Drag & drop templates into the editor
- Templates include:
  - Header Block
  - Paragraph
  - Two Columns
  - Signature Block
  - Contact Information
  - Letter Opening
  - Quote Block
  - Bullet List

### 🔤 Variables System
- Dynamic variables for document personalization
- Drag & drop variables into the editor
- Type `{{` to trigger variable autocomplete
- Variable categories:
  - **User**: First Name, Last Name, Email, Phone
  - **Company**: Company Name, Company Address
  - **System**: Current Date, Current Time
  - **Document**: Document Title, Page Number

### 📊 Advanced Features (More Menu)
- **Table**: Insert and manage tables with row/column controls
- **Image**: Insert images via URL
- **Link**: Add and remove hyperlinks
- **Horizontal Rule**: Insert separator lines
- **Code Block**: Insert formatted code blocks

### 🎨 Modern UI/UX
- Clean 3-column layout
- A4 paper-like document area
- Floating toolbar with grouped controls
- Responsive design
- Smooth animations and hover effects

## Tech Stack

- **Framework**: React 19 with React Router 7
- **Editor**: TipTap 3.x (based on ProseMirror)
- **Styling**: Tailwind CSS 4.x
- **Language**: TypeScript 5.x
- **Build Tool**: Vite
- **Icons**: Lucide React

## Project Structure

```
app/
├── components/
│   ├── editor/
│   │   ├── DocumentEditor.tsx    # Main editor component
│   │   ├── EditorToolbar.tsx     # Formatting toolbar with More menu
│   │   ├── TemplatesSidebar.tsx  # Left sidebar with templates
│   │   ├── VariablesSidebar.tsx  # Right sidebar with variables
│   │   ├── VariableSuggestion.tsx # Autocomplete popup for variables
│   │   ├── suggestion.ts         # TipTap suggestion configuration
│   │   ├── data.ts               # Templates & variables data
│   │   ├── types.ts              # TypeScript interfaces
│   │   └── index.ts              # Module exports
│   └── ClientOnly.tsx            # Client-side rendering wrapper
├── routes/
│   └── home.tsx                  # Home page route
├── app.css                       # Global styles
└── root.tsx                      # Root layout component
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd document-editor
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm typecheck` | Run TypeScript type checking |

## Usage

### Basic Editing
1. Click on the document area to start typing
2. Use the toolbar to format text
3. Use keyboard shortcuts (Ctrl+B for bold, Ctrl+I for italic, etc.)

### Using Templates
1. Browse templates in the left sidebar
2. Drag a template and drop it into the editor
3. The template content will be inserted at the cursor position

### Using Variables
1. **Drag & Drop**: Drag a variable from the right sidebar into the editor
2. **Autocomplete**: Type `{{` anywhere in the editor to trigger the variable picker
3. Use arrow keys to navigate and Enter to select

### Working with Tables
1. Click the "More" button (⋯) in the toolbar
2. Select "Table" to insert a 3x3 table
3. When inside a table, additional table controls appear in the More menu:
   - Add/delete rows and columns
   - Merge cells
   - Delete entire table

### Inserting Images and Links
1. Click the "More" button (⋯) in the toolbar
2. Select "Image" or "Link"
3. Enter the URL when prompted

## Customization

### Adding New Templates
Edit `app/components/editor/data.ts`:

```typescript
export const templates: Template[] = [
  {
    id: "unique-id",
    name: "Template Name",
    icon: "icon-name", // lucide icon name
    content: `<p>Your HTML content here</p>`,
  },
  // ...
];
```

### Adding New Variables
Edit `app/components/editor/data.ts`:

```typescript
export const variables: Variable[] = [
  {
    id: "unique-id",
    name: "variableName", // used in {{variableName}}
    label: "Display Label",
    category: "Category Name",
  },
  // ...
];
```

## TipTap Extensions Used

- `@tiptap/starter-kit` - Core editing features
- `@tiptap/extension-placeholder` - Placeholder text
- `@tiptap/extension-mention` - Variable mentions
- `@tiptap/extension-text-align` - Text alignment
- `@tiptap/extension-underline` - Underline formatting
- `@tiptap/extension-highlight` - Text highlighting
- `@tiptap/extension-text-style` - Text styling
- `@tiptap/extension-color` - Text color
- `@tiptap/extension-table` - Table support
- `@tiptap/extension-link` - Hyperlinks
- `@tiptap/extension-image` - Image embedding
- `@tiptap/extension-subscript` - Subscript text
- `@tiptap/extension-superscript` - Superscript text

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
