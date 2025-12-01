import type { Route } from "./+types/home";
import { ClientOnly } from "../components/ClientOnly";
import { DocumentEditor } from "../components/editor";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Hujjat muharriri" },
    { name: "description", content: "Shablonlar va o'zgaruvchilar bilan zamonaviy hujjat muharriri" },
  ];
}

function EditorLoader() {
  return (
    <div className="editor-loading">
      <div className="loading-spinner" />
      <p>Muharrir yuklanmoqda...</p>
    </div>
  );
}

export default function Home() {
  return (
    <ClientOnly fallback={<EditorLoader />}>
      <DocumentEditor />
    </ClientOnly>
  );
}
