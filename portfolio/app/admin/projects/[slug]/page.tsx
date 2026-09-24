import { createClient } from "@/lib/supabase/server";
import { updateProject, uploadProjectPrd } from "../../actions";

export default async function EditProject({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: p } = await supabase.from("projects").select("*").eq("slug", params.slug).single();

  if (!p) return <p className="text-sm text-ink-soft">Project not found.</p>;

  const updateWithSlug = updateProject.bind(null, params.slug);
  const uploadPrdWithSlug = uploadProjectPrd.bind(null, params.slug);

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-display text-2xl font-semibold text-ink">Edit: {p.name}</h1>

      <form action={updateWithSlug} className="space-y-3 bg-surface border border-line rounded-lg p-6">
        <Field label="Name" name="name" defaultValue={p.name} />
        <Field label="Tag / one-line description" name="tag" defaultValue={p.tag} />
        <Field label="Role" name="role" defaultValue={p.role} />
        <Field label="Dates" name="dates" defaultValue={p.dates} />
        <Field label="Tech (comma-separated)" name="tech" defaultValue={(p.tech || []).join(", ")} />
        <Field label="Hook (one-line, shown on homepage card)" name="hook" defaultValue={p.hook} />
        <TextArea label="Summary" name="summary" defaultValue={p.summary} rows={3} />
        <TextArea
          label="Bullets (one per line)"
          name="bullets"
          defaultValue={(p.bullets || []).join("\n")}
          rows={6}
        />
        <Field label="GitHub link" name="github_link" defaultValue={p.github_link} />
        <SaveButton />
      </form>

      <form action={uploadPrdWithSlug} className="bg-surface border border-line rounded-lg p-6">
        <label className="block text-sm text-ink-soft mb-1">AI PRD (PDF)</label>
        {p.prd_link && (
          <a href={p.prd_link} target="_blank" className="text-sm text-primary underline block mb-2">
            Current PRD
          </a>
        )}
        <input type="file" name="prd" accept="application/pdf" className="text-sm mb-2 block" />
        <SaveButton label="Upload PRD" />
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <div>
      <label className="block text-sm text-ink-soft mb-1">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue || ""}
        className="w-full border border-line rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm text-ink-soft mb-1">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue || ""}
        rows={rows}
        className="w-full border border-line rounded-md px-3 py-2 text-sm font-mono text-xs"
      />
    </div>
  );
}

function SaveButton({ label = "Save" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
    >
      {label}
    </button>
  );
}
