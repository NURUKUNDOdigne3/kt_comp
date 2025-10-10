import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const data = {
  facebookLink: "https://facebook.com/kt_computer_supply",
  instaLink: "https://instagram.com/kt_computer_supply",
  twitterLink: "https://twitter.com/kt_computer_supply",
  githubLink: "https://github.com/ndizeyedavid/ktcomputersupply-new",
  categories: {
    computers: "/computers",
    // phones: "/phones",
    printers: "/printers",
    routers: "/routers",
    speakers: "/speakers",
    monitors: "/monitors",
  },
  companyPages: {
    about: "/about",
    brands: "/brands",
    contact: "/contact",
    careers: "/careers",
  },
  support: {
    faqs: "/faqs",
    shipping: "/shipping",
    returns: "/returns",
    warranty: "/warranty",
  },
  contact: {
    email: "hello@ktcomputersupply.com",
    phone: "+250 788 123 456",
    address: "Kigali, Rwanda",
  },
  company: {
    name: "ComputerSupply",
    description:
      "Your trusted partner for quality computers, electronics, and technology solutions in Rwanda. We provide top-notch products and exceptional customer service.",
    logo: "/logo.svg",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
  { icon: Twitter, label: "Twitter", href: data.twitterLink },
  { icon: Github, label: "GitHub", href: data.githubLink },
];

const categoryLinks = [
  { text: "Computers", href: data.categories.computers },
  // { text: "Phones", href: data.categories.phones },
  { text: "Printers", href: data.categories.printers },
  { text: "Routers", href: data.categories.routers },
  { text: "Speakers", href: data.categories.speakers },
  { text: "Monitors", href: data.categories.monitors },
];

const companyLinks = [
  { text: "About Us", href: data.companyPages.about },
  { text: "Brands", href: data.companyPages.brands },
  { text: "Contact", href: data.companyPages.contact },
  { text: "Careers", href: data.companyPages.careers },
];

const supportLinks = [
  { text: "FAQs", href: data.support.faqs },
  { text: "Shipping Info", href: data.support.shipping },
  { text: "Returns & Refunds", href: data.support.returns },
  { text: "Warranty", href: data.support.warranty },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function Footer() {
  return (
    <footer className="bg-secondary dark:bg-secondary/20 mt-16 w-full place-self-end rounded-t-xl">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center gap-2 sm:justify-start">
              <img src="/logo.png" alt="logo" className="size-8" />
              <span className="text-2xl font-semibold">
                <span className="text-blue-700 font-bold">KT</span>
                {data.company.name}
              </span>
            </div>

            <p className="text-foreground/50 mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left">
              {data.company.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    prefetch={false}
                    href={href}
                    className="text-primary hover:text-primary/80 transition"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Shop Categories</p>
              <ul className="mt-8 space-y-4 text-sm">
                {categoryLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      className="text-secondary-foreground/70 hover:text-primary transition"
                      href={href}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Company</p>
              <ul className="mt-8 space-y-4 text-sm">
                {companyLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      className="text-secondary-foreground/70 hover:text-primary transition"
                      href={href}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Support</p>
              <ul className="mt-8 space-y-4 text-sm">
                {supportLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      className="text-secondary-foreground/70 hover:text-primary transition"
                      href={href}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium">Contact Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start"
                      href="#"
                    >
                      <Icon className="text-primary size-5 shrink-0 shadow-sm" />
                      {isAddress ? (
                        <address className="text-secondary-foreground/70 -mt-0.5 flex-1 not-italic transition">
                          {text}
                        </address>
                      ) : (
                        <span className="text-secondary-foreground/70 flex-1 transition">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition">
                Terms
              </Link>
            </div>

            <p className="text-secondary-foreground/70 mt-4 text-sm transition sm:order-first sm:mt-0">
              &copy; 2025 {data.company.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
