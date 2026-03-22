import Link from "next/link";
import Image from "next/image";
import { getMembers } from "@/lib/members-store";

export const dynamic = "force-dynamic";

const values = [
  {
    title: "Trust",
    description:
      "We operate with complete transparency and accountability in all financial dealings.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Discipline",
    description:
      "Consistent monthly contributions and adherence to our constitution drive our success.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Legacy",
    description:
      "We invest today to create lasting wealth for ourselves and future generations.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Growth",
    description:
      "Strategic investments in property, business, and trade development multiply our collective wealth.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

const objectives = [
  "Mobilize savings through monthly member contributions",
  "Advance loans to members for productive purposes",
  "Invest in property, estate, and real estate development",
  "Develop and improve profitable business ventures",
];

export default async function HomePage() {
  const members = await getMembers();
  const leadership = members.filter((m) =>
    ["Chairman", "Vice-Chairman", "Treasurer", "Secretary"].includes(m.role)
  );

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-4 py-1 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-medium mb-6">
                Kampala, Uganda
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Building{" "}
                <span className="text-gold-400">Generational Wealth</span>{" "}
                Together
              </h1>
              <p className="text-lg text-gray-300 max-w-xl mb-8">
                Trust &middot; Discipline &middot; Legacy &middot; Growth
              </p>
              <p className="text-gray-400 max-w-xl mb-10">
                Kikalayi Investment Club is a collective of dedicated individuals
                pooling resources to create lasting financial prosperity through
                strategic investments and disciplined savings.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link
                  href="/about"
                  className="px-8 py-3 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors"
                >
                  Learn More
                </Link>
                <Link
                  href="/members"
                  className="px-8 py-3 border border-gold-400/50 text-gold-400 font-semibold rounded-lg hover:bg-gold-400/10 transition-colors"
                >
                  Meet Our Members
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Kikalayi Investment Club Logo"
                width={280}
                height={280}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy-800">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-gold-400 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-navy-800 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-gold-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={v.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy-800 mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-800 mb-6">
                Our Objectives
              </h2>
              <div className="w-20 h-1 bg-gold-400 mb-8" />
              <ul className="space-y-4">
                {objectives.map((obj, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-400 text-navy-900 flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy-800 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold text-gold-400 mb-4">
                How We Operate
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex gap-2">
                  <span className="text-gold-400">&#x2713;</span>
                  Monthly contributions to the investment club fund
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-400">&#x2713;</span>
                  Loans up to 4x member contributions
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-400">&#x2713;</span>
                  Annual General Meetings for democratic governance
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-400">&#x2713;</span>
                  Professional auditing and financial management
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-400">&#x2713;</span>
                  Executive Committee elected every two years
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-400">&#x2713;</span>
                  Banking with DFCU Bank
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      {leadership.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-navy-800">
                Executive Committee
              </h2>
              <div className="w-20 h-1 bg-gold-400 mx-auto mt-4" />
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Our elected leadership guides the club with integrity, ensuring
                every decision aligns with our mission of collective prosperity.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {leadership.map((m) => (
                <div
                  key={m.id}
                  className="text-center bg-white rounded-2xl p-6 shadow-md"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-navy-100 overflow-hidden mb-4 relative">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-navy-800">{m.name}</h3>
                  <p className="text-gold-500 text-sm font-medium">{m.role}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/members"
                className="px-8 py-3 bg-navy-800 text-white font-semibold rounded-lg hover:bg-navy-700 transition-colors inline-block"
              >
                View All Members
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-navy-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Financial Future?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join a community of disciplined investors committed to creating
            lasting wealth. Membership is open to all qualifying individuals in
            Uganda.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors inline-block"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}
