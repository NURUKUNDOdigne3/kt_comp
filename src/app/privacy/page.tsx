import Header from "@/components/Header";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                KT Computer Supply ("we", "our", or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website and use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Information We Collect
              </h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when
                you create an account, place an order, or contact us. This may
                include your name, email address, phone number, shipping
                address, and payment information.
              </p>
              <p className="mb-4">
                We also automatically collect certain information about your
                device and how you interact with our Services, including your IP
                address, browser type, and usage data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your account and orders</li>
                <li>Improve our Services and develop new features</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Protect against fraud and unauthorized transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. Information Sharing
              </h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside mb-4">
                <li>
                  Service providers who assist us in operating our business
                </li>
                <li>Payment processors to complete transactions</li>
                <li>Shipping carriers to deliver your orders</li>
                <li>
                  Law enforcement or regulatory authorities when required by law
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement reasonable security measures to protect your
                information. However, no method of transmission over the
                internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">
                You have the right to access, update, or delete your personal
                information. You may also opt out of marketing communications at
                any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your
                experience and analyze usage patterns. You can control cookies
                through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                8. Children's Privacy
              </h2>
              <p className="mb-4">
                Our Services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                9. Changes to This Policy
              </h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="mb-4">
                KT Computer Supply
                <br />
                Email: privacy@ktcomputersupply.com
                <br />
                Phone: +250 788 123 456
              </p>
            </section>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-muted-foreground">
            <p>
              © {new Date().getFullYear()} KT Computer Supply. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
