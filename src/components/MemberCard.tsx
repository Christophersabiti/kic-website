"use client";
import { useState } from "react";
import Image from "next/image";
import type { Member } from "@/lib/types";
import SocialIcons from "./SocialIcons";

export default function MemberCard({ member }: { member: Member }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left cursor-pointer"
      >
        <div className="relative">
          <div className="aspect-square relative bg-navy-100">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/90 to-transparent p-4 pt-12">
            <h3 className="text-white font-bold text-lg">{member.name}</h3>
            <span className="text-gold-400 text-sm font-medium">
              {member.role}
            </span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-navy-600 text-sm italic border-l-2 border-gold-400 pl-3">
            &ldquo;{member.quote}&rdquo;
          </p>
          <div className="mt-3 flex items-center justify-between">
            <SocialIcons social={member.social} size="sm" />
            <svg
              className={`w-5 h-5 text-navy-400 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 p-4 space-y-4 animate-in">
          <div>
            <h4 className="text-navy-800 font-semibold text-sm uppercase tracking-wider mb-2">
              About
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
          </div>

          {member.story && (
            <div>
              <h4 className="text-navy-800 font-semibold text-sm uppercase tracking-wider mb-2">
                My Story
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.story}
              </p>
            </div>
          )}

          {member.testimony && (
            <div className="bg-navy-50 rounded-xl p-4">
              <h4 className="text-navy-800 font-semibold text-sm uppercase tracking-wider mb-2">
                Testimony
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                &ldquo;{member.testimony}&rdquo;
              </p>
            </div>
          )}

          <div className="pt-2">
            <p className="text-xs text-gray-400">
              Member since{" "}
              {new Date(member.joinDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
