import Image from "next/image";

export const metadata = {
  title: "About Us | Kikalayi Investment Club",
};

const timeline = [
  { year: "2021", event: "Club founded by visionary members in Kampala" },
  { year: "2021", event: "Constitution and bye-laws established" },
  { year: "2021", event: "Opened investment account with DFCU Bank" },
  { year: "Present", event: "Growing membership and investment portfolio" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-6">
                About <span className="text-gold-400">Kikalayi</span>
              </h1>
              <div className="w-20 h-1 bg-gold-400 mb-6" />
              <p className="text-gray-300 leading-relaxed mb-4">
                Kikalayi Investment Club is a registered investment group based
                in Kampala, Uganda, established under the Laws of the Republic
                of Uganda. We bring together individuals committed to building
                wealth through collective savings, strategic investments, and
                mutual financial empowerment.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our name represents unity, strength, and forward momentum — just
                like the arrow in our shield emblem, always pointing toward
                progress and prosperity.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Kikalayi Logo"
                width={200}
                height={200}
                className="drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-navy-800 mb-4">
                Our Mission
              </h2>
              <div className="w-16 h-1 bg-gold-400 mb-4" />
              <p className="text-gray-700 leading-relaxed">
                To mobilize savings from members, advance loans for productive
                purposes, and invest club funds in financially profitable
                ventures including property development, estate management, and
                strategic business opportunities across Uganda.
              </p>
            </div>
            <div className="bg-navy-800 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold text-gold-400 mb-4">
                Our Vision
              </h2>
              <div className="w-16 h-1 bg-gold-400 mb-4" />
              <p className="text-gray-300 leading-relaxed">
                To be a leading investment club in Uganda, empowering members
                through disciplined collective investment, creating generational
                wealth, and contributing to the economic development of our
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy-800">
              Our Governance
            </h2>
            <div className="w-20 h-1 bg-gold-400 mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-navy-800 text-lg mb-3">
                Executive Committee
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                An elected committee of up to nine members conducts day-to-day
                business, led by the Chairman, Vice-Chairman, Treasurer, and
                Secretary. Elections are held every two years.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-navy-800 text-lg mb-3">
                Annual General Meeting
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The supreme authority of the club. Every fully paid-up member
                has the right to attend and vote. Held annually within three
                months of the financial year end.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold text-navy-800 text-lg mb-3">
                Financial Oversight
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                All accounts are professionally audited annually. Funds are
                deposited with DFCU Bank, and financial statements including
                balance sheets are presented at the AGM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-800 text-center mb-14">
            Our Journey
          </h2>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gold-400 text-navy-900 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {item.year.slice(-2)}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gold-200 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-gold-500 font-semibold text-sm">
                    {item.year}
                  </span>
                  <p className="text-navy-800 font-medium mt-1">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Info */}
      <section className="py-20 bg-navy-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Membership Requirements
          </h2>
          <div className="w-20 h-1 bg-gold-400 mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-navy-700/50 rounded-xl p-6">
              <h3 className="text-gold-400 font-semibold mb-3">
                Eligibility
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>&#x2022; Must be 18 years or older</li>
                <li>&#x2022; Resident or land occupier in Uganda</li>
                <li>&#x2022; Application seconded by 2 existing members</li>
              </ul>
            </div>
            <div className="bg-navy-700/50 rounded-xl p-6">
              <h3 className="text-gold-400 font-semibold mb-3">
                Member Benefits
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>&#x2022; Access to loans up to 4x contributions</li>
                <li>&#x2022; Dividends and bonuses from investments</li>
                <li>&#x2022; Voting rights at General Meetings</li>
                <li>&#x2022; Professional financial management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
