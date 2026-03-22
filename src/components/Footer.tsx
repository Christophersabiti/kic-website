import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gold-400 font-bold text-lg mb-4">
              KIKALAYI Investment Club
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Trust &middot; Discipline &middot; Legacy &middot; Growth
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Building generational wealth through collective investment in
              Kampala, Uganda.
            </p>
          </div>

          <div>
            <h4 className="text-gold-400 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-gold-400 transition-colors">
                  Our Members
                </Link>
              </li>
              <li>
                <Link href="/bye-laws" className="hover:text-gold-400 transition-colors">
                  Bye-Laws
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Kampala, Uganda</li>
              <li>info@kicalayiclub.com</li>
              <li>Banking: DFCU Bank</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Kikalayi Investment Club. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
