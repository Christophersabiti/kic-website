export const metadata = {
  title: "Bye-Laws | Kikalayi Investment Club",
};

const sections = [
  {
    number: "1",
    title: "Name",
    content:
      "The name of the club shall be Kikalayi Investment Club.",
  },
  {
    number: "2-3",
    title: "Office & Address",
    content:
      "The registered office of the club shall be situated in Kampala, Uganda, and shall have branches at such other place as shall be designated from time to time.",
  },
  {
    number: "4",
    title: "Objectives",
    items: [
      "To mobilize savings from its members by way of monthly contribution to the investment club fund and to encourage members to raise funds for savings in every possible way.",
      "To advance loans to members for productive purposes and to charge interest thereon at such rates and terms as shall be agreed on from time to time.",
      "To carry on, develop and improve any trade business whether manufacturing or otherwise which may enhance the value of the investment club's property, assets or rights.",
      "To invest the club funds in financially profitable ways including buildings, property and estate development, habitat, environment and real property development.",
      "Political interference shall be kept out of the investment club but members of all political leanings can be members if they fulfill the required qualifications.",
    ],
  },
  {
    number: "5",
    title: "Operations",
    content:
      "The investment club's area of operation shall be in Uganda. Membership shall not be limited except as herein provided.",
  },
  {
    number: "6",
    title: "Membership",
    items: [
      "Open to any person who has attained 18 years of age.",
      "Any person who is resident within or in occupation of land within the club's area of operation.",
      "Applicants must be seconded by at least two existing and fully paid up members (except founder members).",
      "Membership ceases upon death, expulsion by AGM, bankruptcy/criminal declaration, full repayment, or failure to pay monthly contributions.",
    ],
  },
  {
    number: "7",
    title: "Management",
    content:
      "There shall be an Executive Committee (up to nine people) consisting of the Chairman, Vice-Chairman, Treasurer, and Secretary. The Committee is the controlling authority and conducts day-to-day business.",
  },
  {
    number: "9",
    title: "Funds",
    items: [
      "Funds raised from members' monthly contributions.",
      "Loans, grants and advances made to the club.",
      "Reserve Funds.",
      "All funds not required for immediate use deposited in DFCU Bank.",
    ],
  },
  {
    number: "13",
    title: "Loans",
    items: [
      "Interest payable on amounts advanced in accordance with prevailing economic conditions.",
      "Amount lent shall not exceed four times the value of contribution held on the member's account.",
      "Purpose of the loan must be disclosed with feasibility study and/or development plans.",
      "Security for repayment must be provided by the member.",
    ],
  },
  {
    number: "14",
    title: "Surplus",
    content:
      "The committee may pay dividends or bonuses on return on investment, not exceeding 10% of fully paid up capital. Surplus may be appropriated to reserve funds or for maintaining club property.",
  },
  {
    number: "18",
    title: "General Meeting",
    content:
      "The supreme authority of the club is the Annual General Meeting. Every fully paid up member has a right to attend and vote. Held annually within three months of the financial year end (Jan 1 - Dec 31). At least fourteen days' notice required.",
  },
  {
    number: "22",
    title: "Accounts",
    content:
      "The committee prepares books of accounts, balance sheets, income/expenditure statements, and surplus/deficit statements. All records are open to member inspection. Financial year: January 1 to December 31.",
  },
  {
    number: "23",
    title: "Auditors",
    content:
      "All books, accounts and records shall be audited within three months after each financial year by auditors from a recognized accounting body, appointed at the AGM.",
  },
];

export default function ByeLawsPage() {
  return (
    <>
      <section className="bg-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Constitution & <span className="text-gold-400">Bye-Laws</span>
          </h1>
          <div className="w-20 h-1 bg-gold-400 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our constitution governs the operations of Kikalayi Investment Club
            under the Laws of the Republic of Uganda. Below is a summary of the
            key provisions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.number}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-navy-800 text-gold-400 flex items-center justify-center text-sm font-bold">
                    {section.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy-800 mb-3">
                      {section.title}
                    </h3>
                    {section.content && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {section.content}
                      </p>
                    )}
                    {section.items && (
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-gray-600 text-sm leading-relaxed flex gap-2"
                          >
                            <span className="text-gold-400 flex-shrink-0 mt-1">
                              &#x2022;
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-navy-50 rounded-2xl p-8 text-center">
            <p className="text-gray-600 text-sm">
              This is a summary of the Kikalayi Investment Club Constitution.
              For the full document, please contact the Secretary or attend the
              Annual General Meeting.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
