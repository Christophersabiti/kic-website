import { NextRequest, NextResponse } from "next/server";
import { getMembers, addMember } from "@/lib/members-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const members = await getMembers();
  return NextResponse.json(members);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const member = await addMember(body);
  return NextResponse.json(member, { status: 201 });
}
