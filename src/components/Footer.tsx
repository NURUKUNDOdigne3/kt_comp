"use client";

import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const data = {
  facebookLink: "https://facebook.com/kt_computer_supply",
  instaLink: "https://instagram.com/kt_computer_supply",
  twitterLink: "https://twitter.com/kt_computer_supply",
  linkedinLink: "https://linkedin.com/company/kt_computer_supply",
  youtubeLink: "https://youtube.com/@kt_computer_supply",
  company: {
    home: "/",
    contact: "/contact",
    about: "/about",
    getStarted: "/products",
  },
  categories: {
    computers: "/computers",
    phones: "/phones",
    printers: "/printers",
    monitors: "/monitors",
  },
  account: {
    profile: "/account",
    myAccount: "/account",
    preferences: "/account/settings",
    purchase: "/account/orders",
  },
  support: {
    faqs: "/faqs",
    shipping: "/shipping",
    returns: "/returns",
    warranty: "/warranty",
  },
  companyInfo: {
    name: "KT Computer Supply",
    logo: "/logo-white.png",
  },
};

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    href: data.facebookLink,
    color: "bg-blue-600",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: data.twitterLink,
    color: "bg-sky-500",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: data.instaLink,
    color: "bg-pink-600",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: data.linkedinLink,
    color: "bg-blue-700",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: data.youtubeLink,
    color: "bg-red-600",
  },
];

const companyLinks = [
  { text: "Home", href: data.company.home },
  { text: "Contact us", href: data.company.contact },
  { text: "About us", href: data.company.about },
  { text: "Get started", href: data.company.getStarted },
];

const categoryLinks = [
  { text: "Computers", href: data.categories.computers },
  { text: "Phones", href: data.categories.phones },
  { text: "Printers", href: data.categories.printers },
  { text: "Monitors", href: data.categories.monitors },
];

const accountLinks = [
  { text: "Profile", href: data.account.profile },
  { text: "My account", href: data.account.myAccount },
  { text: "Preferences", href: data.account.preferences },
  { text: "Purchase", href: data.account.purchase },
];

const supportLinks = [
  { text: "HTML & CSS", href: data.support.faqs },
  { text: "JavaScript", href: data.support.shipping },
  { text: "Photography", href: data.support.returns },
  { text: "Photoshop", href: data.support.warranty },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#1a0b3e] text-white mt-16 w-full">
      {/* Top Section with Logo and Social Icons */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-col gap-7 md:flex-row md:gap-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-xl font-bold">
                <img
                  src={data.companyInfo.logo}
                  alt="logo"
                  className="size-8"
                />
                <span>{data.companyInfo.name}</span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href, color }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${color} hover:opacity-90 transition-opacity rounded-full p-2`}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 text-white" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map(({ text, href }) => (
                <li key={text}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              {categoryLinks.map(({ text, href }) => (
                <li key={text}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Account</h3>
            <ul className="space-y-3">
              {accountLinks.map(({ text, href }) => (
                <li key={text}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Find Us</h3>
            <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5150630506755!2d30.059535099999998!3d-1.9469428000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca50041a76767%3A0x1dee841a755a1cf!2sBliss%20Technology%20LTD!5e0!3m2!1sen!2srw!4v1760388296399!5m2!1sen!2srw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KT Computer Supply Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>Copyright 2025 {data.companyInfo.name}. All rights reserved</p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & condition
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
