import { createClient } from "@/lib/supabase/server";
import {
  updateProfile,
  updateProfilePhoto,
  updateResume,
  updateResearchPaper,
  uploadResearchPaperPdf,
  updateTeardown,
} from "./actions";

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: profile } = await supabase.from("profile").select("*").eq("id", 1).single();
  const { data: paper } = await supabase.from("research_paper").select("*").eq("id", 1).single();
  const { data: teardown } = await supabase.from("teardown").select("*").eq("id", 1).single();

  return (
    <div className="space-y-10 max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>

      {/* Profile */}
      <section className="bg-surface border border-line rounded-lg p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Profile</h2>
        <form action={updateProfile} className="space-y-3">
          <Field label="Name" name="name" defaultValue={profile?.name} />
          <Field label="Tagline" name="tagline" defaultValue={profile?.tagline} />
          <Field label="Email" name="email" defaultValue={profile?.email} />
          <Field label="Phone" name="phone" defaultValue={profile?.phone} />
          <Field label="Location" name="location" defaultValue={profile?.location} />
          <Field label="LinkedIn URL" name="linkedin" defaultValue={profile?.linkedin} />
          <Field label="GitHub URL" name="github" defaultValue={profile?.github} />
          <TextArea label="Summary" name="summary" defaultValue={profile?.summary} />
          <SaveButton />
        </form>
      </section>

      {/* Photo + Resume uploads */}
      <section className="bg-surface border border-line rounded-lg p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Files</h2>
        <form action={updateProfilePhoto} className="mb-6">
          <label className="block text-sm text-ink-soft mb-1">Photo</label>
          {profile?.photo_url && (
            <img src={profile.photo_url} alt="Current" className="w-16 h-16 rounded-full object-cover mb-2" />
          )}
          <input type="file" name="photo" accept="image/*" className="text-sm mb-2 block" />
          <SaveButton label="Upload photo" />
        </form>
        <form action={updateResume}>
          <label className="block text-sm text-ink-soft mb-1">Resume (PDF)</label>
          {profile?.resume_url && (
            <a href={profile.resume_url} target="_blank" className="text-sm text-primary underline block mb-2">
              Current resume
            </a>
          )}
          <input type="file" name="resume" accept="application/pdf" className="text-sm mb-2 block" />
          <SaveButton label="Upload resume" />
        </form>
      </section>

      {/* Research paper */}
      <section className="bg-surface border border-line rounded-lg p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Research Paper</h2>
        <form action={updateResearchPaper} className="space-y-3 mb-4">
          <Field label="Title" name="title" defaultValue={paper?.title} />
          <Field label="Publication" name="publication" defaultValue={paper?.publication} />
          <Field label="Date" name="date" defaultValue={paper?.date} />
          <Field label="Note" name="note" defaultValue={paper?.note} />
          <SaveButton />
        </form>
        <form action={uploadResearchPaperPdf}>
          <label className="block text-sm text-ink-soft mb-1">PDF</label>
          {paper?.pdf_link && (
            <a href={paper.pdf_link} target="_blank" className="text-sm text-primary underline block mb-2">
              Current PDF
            </a>
          )}
          <input type="file" name="pdf" accept="application/pdf" className="text-sm mb-2 block" />
          <SaveButton label="Upload PDF" />
        </form>
      </section>

      {/* Teardown */}
      <section className="bg-surface border border-line rounded-lg p-6">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Product Teardown</h2>
        <form action={updateTeardown} className="space-y-3">
          <Field label="Product name" name="product_name" defaultValue={teardown?.product_name} />
          <TextArea label="Summary" name="summary" defaultValue={teardown?.summary} />
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" name="placeholder" defaultChecked={teardown?.placeholder} />
            Still a placeholder (uncheck once it's really written)
          </label>
          <SaveButton />
        </form>
      </section>
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

function TextArea({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <div>
      <label className="block text-sm text-ink-soft mb-1">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue || ""}
        rows={4}
        className="w-full border border-line rounded-md px-3 py-2 text-sm"
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
