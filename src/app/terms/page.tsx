import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

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
                Welcome to KT Computer Supply. These Terms of Service ("Terms")
                govern your access to and use of our website, services, and
                applications (collectively, the "Services"). By accessing or
                using our Services, you agree to be bound by these Terms and our
                Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
              <p className="mb-4">
                KT Computer Supply provides an online platform for purchasing
                computers, phones, printers, and related accessories. Our
                Services include product listings, order processing, payment
                processing, and customer support.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="mb-4">
                To access certain features of our Services, you may be required
                to create an account. You are responsible for maintaining the
                confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. Orders and Payments
              </h2>
              <p className="mb-4">
                When you place an order through our Services, you agree to pay
                the total amount specified, including any applicable taxes and
                shipping fees. We reserve the right to refuse or cancel any
                order for any reason.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Product Information
              </h2>
              <p className="mb-4">
                We strive to provide accurate product descriptions and pricing
                information. However, we do not warrant that product
                descriptions, prices, or other content are accurate, complete,
                reliable, current, or error-free.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by law, KT Computer Supply shall
                not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or
                revenues.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance
                with the laws of Rwanda, without regard to its conflict of law
                provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                8. Changes to Terms
              </h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will
                notify you of any changes by posting the new Terms on this page
                and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <p className="mb-4">
                KT Computer Supply
                <br />
                Email: info@ktcomputersupply.com
                <br />
                Phone: +250 788 123 456
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
