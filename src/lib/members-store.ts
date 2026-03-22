import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Member } from "./types";

const DATA_PATH = join(process.cwd(), "src/data/members.json");

export function getMembers(): Member[] {
  const raw = readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function getMember(id: string): Member | undefined {
  return getMembers().find((m) => m.id === id);
}

export function saveMembers(members: Member[]): void {
  writeFileSync(DATA_PATH, JSON.stringify(members, null, 2));
}

export function addMember(member: Omit<Member, "id">): Member {
  const members = getMembers();
  const newMember: Member = {
    ...member,
    id: Date.now().toString(),
  };
  members.push(newMember);
  saveMembers(members);
  return newMember;
}

export function updateMember(
  id: string,
  data: Partial<Member>
): Member | null {
  const members = getMembers();
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;
  members[index] = { ...members[index], ...data, id };
  saveMembers(members);
  return members[index];
}

export function deleteMember(id: string): boolean {
  const members = getMembers();
  const filtered = members.filter((m) => m.id !== id);
  if (filtered.length === members.length) return false;
  saveMembers(filtered);
  return true;
}
