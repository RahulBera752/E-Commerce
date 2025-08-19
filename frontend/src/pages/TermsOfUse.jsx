import React from "react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms of Use
        </h1>

        {/* Disclaimer */}
        <p className="italic text-gray-600 mb-8">
          Disclaimer: In case of any discrepancy or difference, the English
          version will take precedence over any translation.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          1. Introduction
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          This document is an electronic record in terms of the Information
          Technology Act, 2000 and the rules thereunder, as applicable. By
          accessing or using our Website, mobile application, or related
          services (collectively referred to as the “Platform”), you agree to be
          bound by these Terms of Use.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          2. Eligibility
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          You must be at least 18 years of age to use this Platform. By using
          the Platform, you confirm that you are legally competent to enter into
          a binding contract under applicable law.
        </p>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          3. Account Registration
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          To access certain services, you may be required to register an
          account. You agree to provide accurate and complete information and to
          keep your account details updated. You are solely responsible for
          maintaining the confidentiality of your account credentials.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          4. Use of Services
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          You agree not to misuse the Platform or engage in activities that are
          unlawful, harmful, or disruptive. Prohibited activities include, but
          are not limited to, fraudulent transactions, spreading malware,
          spamming, or violating intellectual property rights.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          5. Orders & Payments
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          All orders placed on the Platform are subject to acceptance,
          availability, and confirmation of payment. We reserve the right to
          refuse or cancel orders under circumstances including pricing errors,
          stock unavailability, or suspected fraudulent activity.
        </p>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          6. Shipping & Delivery
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Delivery timelines provided are estimates and may vary due to factors
          beyond our control. Title and risk of loss for products pass to you
          upon delivery. Delayed or failed deliveries caused by incorrect
          addresses or unavailability of recipients will not be our
          responsibility.
        </p>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          7. Returns & Refunds
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Returns and refunds are governed by our Return & Refund Policy. Only
          products that meet the specified conditions will be eligible for
          returns or replacements. Refunds, if applicable, will be processed to
          your original payment method.
        </p>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          8. User-Generated Content
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          By submitting reviews, comments, or other content, you grant us a
          worldwide, royalty-free, non-exclusive license to use, reproduce, and
          publish such content. You are solely responsible for the legality and
          accuracy of the content you share.
        </p>

        {/* Section 9 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          9. Privacy
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Your use of the Platform is subject to our Privacy Policy, which
          explains how we collect, use, and safeguard your personal information.
          By using the Platform, you consent to such data practices.
        </p>

        {/* Section 10 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          10. Intellectual Property
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          All trademarks, logos, product names, and content displayed on the
          Platform are the property of GhoroaStore or its licensors. Unauthorized
          use, reproduction, or distribution is strictly prohibited.
        </p>

        {/* Section 11 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          11. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We shall not be liable for any indirect, incidental, or consequential
          damages arising from your use of the Platform. Our total liability
          shall not exceed the value of the order placed by you.
        </p>

        {/* Section 12 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          12. Termination
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We reserve the right to suspend or terminate your access to the
          Platform at any time, without prior notice, if you violate these Terms
          of Use or engage in unlawful activities.
        </p>

        {/* Section 13 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          13. Governing Law & Dispute Resolution
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          These Terms of Use shall be governed by the laws of India. Any
          disputes shall be resolved exclusively in the courts of [Insert City,
          State].
        </p>

        {/* Section 14 */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          14. Changes to Terms
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          We reserve the right to update, modify, or amend these Terms of Use at
          any time. Changes will be effective immediately upon posting on the
          Platform. Continued use of the Platform after changes constitutes your
          acceptance.
        </p>

        {/* Footer */}
        <p className="text-gray-600 mt-10 text-sm">
          By continuing to use this Platform, you acknowledge that you have read
          and understood these Terms of Use and agree to be bound by them.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
