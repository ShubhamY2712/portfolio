"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ---------- Profile ----------
export async function updateProfile(formData: FormData) {
  const supabase = createClient();
  await supabase
    .from("profile")
    .update({
      name: formData.get("name"),
      tagline: formData.get("tagline"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      linkedin: formData.get("linkedin"),
      github: formData.get("github"),
      summary: formData.get("summary"),
    })
    .eq("id", 1);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function uploadFile(file: File, folder: string) {
  const supabase = createClient();
  const fileName = `${folder}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("portfolio-assets").upload(fileName, file, {
    upsert: true,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("portfolio-assets").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function updateProfilePhoto(formData: FormData) {
  const file = formData.get("photo") as File;
  if (!file || file.size === 0) return;
  const url = await uploadFile(file, "photo");
  const supabase = createClient();
  await supabase.from("profile").update({ photo_url: url }).eq("id", 1);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateResume(formData: FormData) {
  const file = formData.get("resume") as File;
  if (!file || file.size === 0) return;
  const url = await uploadFile(file, "resume");
  const supabase = createClient();
  await supabase.from("profile").update({ resume_url: url }).eq("id", 1);
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------- Skills ----------
export async function addSkill(formData: FormData) {
  const supabase = createClient();
  await supabase.from("skills").insert({ label: formData.get("label") });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkill(id: string) {
  const supabase = createClient();
  await supabase.from("skills").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

// ---------- Achievements ----------
export async function addAchievement(formData: FormData) {
  const supabase = createClient();
  await supabase.from("achievements").insert({
    text: formData.get("text"),
    date: formData.get("date"),
  });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
}

export async function deleteAchievement(id: string) {
  const supabase = createClient();
  await supabase.from("achievements").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/achievements");
}

// ---------- Certifications ----------
export async function addCertification(formData: FormData) {
  const supabase = createClient();
  await supabase.from("certifications").insert({
    text: formData.get("text"),
    org: formData.get("org"),
    date: formData.get("date"),
    status: formData.get("status"),
  });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function deleteCertification(id: string) {
  const supabase = createClient();
  await supabase.from("certifications").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

// ---------- Projects ----------
export async function updateProject(slug: string, formData: FormData) {
  const supabase = createClient();
  const bulletsRaw = formData.get("bullets") as string;
  const techRaw = formData.get("tech") as string;
  await supabase
    .from("projects")
    .update({
      name: formData.get("name"),
      tag: formData.get("tag"),
      role: formData.get("role"),
      dates: formData.get("dates"),
      hook: formData.get("hook"),
      summary: formData.get("summary"),
      prd_link: formData.get("prd_link"),
      github_link: formData.get("github_link"),
      bullets: JSON.stringify(bulletsRaw.split("\n").filter(Boolean)),
      tech: JSON.stringify(techRaw.split(",").map((t) => t.trim()).filter(Boolean)),
    })
    .eq("slug", slug);
  revalidatePath("/");
  revalidatePath(`/${slug}`);
  revalidatePath("/admin/projects");
}

export async function uploadProjectPrd(slug: string, formData: FormData) {
  const file = formData.get("prd") as File;
  if (!file || file.size === 0) return;
  const url = await uploadFile(file, `prd-${slug}`);
  const supabase = createClient();
  await supabase.from("projects").update({ prd_link: url }).eq("slug", slug);
  revalidatePath("/");
  revalidatePath(`/${slug}`);
}

// ---------- Research paper ----------
export async function updateResearchPaper(formData: FormData) {
  const supabase = createClient();
  await supabase
    .from("research_paper")
    .update({
      title: formData.get("title"),
      publication: formData.get("publication"),
      date: formData.get("date"),
      note: formData.get("note"),
    })
    .eq("id", 1);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function uploadResearchPaperPdf(formData: FormData) {
  const file = formData.get("pdf") as File;
  if (!file || file.size === 0) return;
  const url = await uploadFile(file, "research-paper");
  const supabase = createClient();
  await supabase.from("research_paper").update({ pdf_link: url }).eq("id", 1);
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------- Teardown ----------
export async function updateTeardown(formData: FormData) {
  const supabase = createClient();
  await supabase
    .from("teardown")
    .update({
      product_name: formData.get("product_name"),
      summary: formData.get("summary"),
      placeholder: formData.get("placeholder") === "on",
    })
    .eq("id", 1);
  revalidatePath("/");
  revalidatePath("/teardown");
  revalidatePath("/admin");
}

// ---------- Auth ----------
export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
