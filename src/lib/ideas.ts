import { createClient } from "@/utils/supabase/client";

export type VideoIdea = {
  id: string;
  title: string;
  notes: string;
  createdAt: string;
};

type IdeaRow = {
  id: string;
  title: string;
  notes: string | null;
  created_at: string;
};

function mapIdea(row: IdeaRow): VideoIdea {
  return {
    id: row.id,
    title: row.title,
    notes: row.notes ?? "",
    createdAt: row.created_at,
  };
}

export async function loadIdeas(youtuberId: string): Promise<VideoIdea[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ideas")
    .select("id, title, notes, created_at")
    .eq("youtuber_id", youtuberId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapIdea(row as IdeaRow));
}

export async function addIdea(
  youtuberId: string,
  input: { title: string; notes: string },
): Promise<VideoIdea[]> {
  const supabase = createClient();
  const { error } = await supabase.from("ideas").insert({
    youtuber_id: youtuberId,
    title: input.title,
    notes: input.notes,
  });

  if (error) {
    throw new Error(error.message);
  }

  return loadIdeas(youtuberId);
}
