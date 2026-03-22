import { put, list, del } from "@vercel/blob";
import type { Member } from "./types";
import initialMembers from "@/data/members.json";

const BLOB_PREFIX = "kic-data/";
const MEMBERS_KEY = `${BLOB_PREFIX}members.json`;

async function findBlob(pathname: string): Promise<string | null> {
  const { blobs } = await list({ prefix: pathname });
  const match = blobs.find((b) => b.pathname === pathname);
  return match ? match.url : null;
}

export async function getMembers(): Promise<Member[]> {
  try {
    const url = await findBlob(MEMBERS_KEY);
    if (!url) {
      // First run: seed with initial data from JSON file
      await saveMembers(initialMembers as Member[]);
      return initialMembers as Member[];
    }
    const res = await fetch(url, { cache: "no-store" });
    return res.json();
  } catch {
    // Fallback to local JSON if Blob not configured
    return initialMembers as Member[];
  }
}

export async function getMember(id: string): Promise<Member | undefined> {
  const members = await getMembers();
  return members.find((m) => m.id === id);
}

export async function saveMembers(members: Member[]): Promise<void> {
  // Delete old blob if it exists
  const url = await findBlob(MEMBERS_KEY);
  if (url) {
    await del(url);
  }
  await put(MEMBERS_KEY, JSON.stringify(members, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

export async function addMember(member: Omit<Member, "id">): Promise<Member> {
  const members = await getMembers();
  const newMember: Member = {
    ...member,
    id: Date.now().toString(),
  };
  members.push(newMember);
  await saveMembers(members);
  return newMember;
}

export async function updateMember(
  id: string,
  data: Partial<Member>
): Promise<Member | null> {
  const members = await getMembers();
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;
  members[index] = { ...members[index], ...data, id };
  await saveMembers(members);
  return members[index];
}

export async function deleteMember(id: string): Promise<boolean> {
  const members = await getMembers();
  const filtered = members.filter((m) => m.id !== id);
  if (filtered.length === members.length) return false;
  await saveMembers(filtered);
  return true;
}
