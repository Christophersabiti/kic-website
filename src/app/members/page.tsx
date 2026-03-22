import members from "@/data/members.json";
import MemberCard from "@/components/MemberCard";
import type { Member } from "@/lib/types";

export const metadata = {
  title: "Our Members | Kikalayi Investment Club",
};

export default function MembersPage() {
  const leadership = (members as Member[]).filter((m) =>
    ["Chairman", "Vice-Chairman", "Treasurer", "Secretary"].includes(m.role)
  );
  const otherMembers = (members as Member[]).filter(
    (m) =>
      !["Chairman", "Vice-Chairman", "Treasurer", "Secretary"].includes(m.role)
  );

  return (
    <>
      <section className="bg-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Our <span className="text-gold-400">Members</span>
          </h1>
          <div className="w-20 h-1 bg-gold-400 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the dedicated individuals who make Kikalayi Investment Club
            thrive. Click on any member card to learn more about their journey
            and story.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy-800 mb-8">
            Executive Committee
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Members */}
      {otherMembers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy-800 mb-8">Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
