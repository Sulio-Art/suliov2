"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, FileText, Globe, Mail } from "lucide-react";
import { Button } from "../Components/ui/button";
import { Separator } from "../Components/ui/separator";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 pl-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Button>
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-400">
            <Shield className="w-4 h-4" />
            <span>Secure & Private</span>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Document Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Document Header - 1 Shade Darker (bg-slate-100) */}
          <div className="bg-slate-100 p-8 md:p-12 relative overflow-hidden border-b border-slate-200">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm">
                <FileText className="w-3 h-3" />
                OFFICIAL DOCUMENT
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
                Privacy Policy
              </h1>
              <p className="text-slate-500 text-lg font-medium">
                Sulio Art Co., Ltd.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-12 text-sm text-slate-500 border-t border-slate-300/50 pt-6">
                <div>
                  <span className="block text-slate-400 uppercase text-xs tracking-wider mb-1 font-semibold">
                    Effective Date
                  </span>
                  <span className="text-slate-900 font-medium">
                    December 26, 2025
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 uppercase text-xs tracking-wider mb-1 font-semibold">
                    Replaces
                  </span>
                  <span className="text-slate-900 font-medium">
                    Version dated Feb 4, 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Background Pattern */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-[0.05]">
              <Shield className="w-64 h-64 text-slate-900" />
            </div>
          </div>

          {/* Document Content */}
          <div className="p-8 md:p-16 space-y-12 leading-relaxed text-lg">
            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  1
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Introduction
                </h2>
              </div>
              <p className="mb-4">
                Sulio Art Co., Ltd. (“the Company,” “we,” “us,” or “our”)
                operates the Sulio AI Chatbot and related digital tools (“the
                Service”), designed to support artists, galleries, and creative
                professionals in communication automation, artwork
                recommendation, lead management, verification workflows, and
                fraud prevention.
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
                <p className="font-semibold text-slate-900 mb-3">
                  This Privacy Policy explains:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 list-disc pl-5 text-base text-slate-700">
                  <li>What personal data we collect</li>
                  <li>How we use and protect it</li>
                  <li>Legal bases for processing</li>
                  <li>How long we retain data</li>
                  <li>With whom we share data</li>
                  <li>Your rights under international privacy regulations</li>
                </ul>
              </div>
              <p className="text-sm text-slate-500 italic">
                The Service is not intended for individuals under 18 years of
                age. We do not knowingly process children&apos;s data. By using
                the Service, you acknowledge and accept the practices described
                in this Policy.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  2
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Scope of This Policy
                </h2>
              </div>
              <p className="mb-4">This Policy applies to:</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  <span>
                    Artists who connect Instagram, Facebook, WhatsApp, LINE, or
                    other platforms
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  <span>
                    Potential collectors and visitors interacting with artists
                    through the chatbot
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  <span>Users who access our website, dashboard, or tools</span>
                </li>
              </ul>
              <p>
                This Policy also applies to data processed on behalf of artists
                using their connected social media accounts.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  3
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Categories of Data We Collect
                </h2>
              </div>
              <p className="mb-4">
                We collect data either directly from you or automatically
                through use of the Service.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">
                    3.1 Data You Provide Directly
                  </h3>

                  <div className="ml-4 space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">
                        a. Social Media / Meta Platform Data
                      </h4>
                      <p className="mb-2">
                        When connecting Instagram or Facebook through authorized
                        Meta APIs, we may receive:
                      </p>
                      <ul className="list-disc pl-5 mb-2 text-base text-slate-700">
                        <li>
                          Basic profile information (name, username, profile
                          picture, email)
                        </li>
                        <li>Permissions and access scopes</li>
                        <li>Public engagement metrics (likes, comments)</li>
                        <li>
                          Instagram Direct Messages processed only in real time
                          for automated replies
                        </li>
                      </ul>
                      <div className="bg-blue-50 text-blue-800 text-sm px-4 py-3 rounded-lg flex items-start gap-2 mt-3">
                        <Shield className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>
                          We do not store Instagram messages long-term, nor do
                          we use them for AI training.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">
                        b. Artist-Provided Content
                      </h4>
                      <p className="mb-2">Artists may upload:</p>
                      <ul className="list-disc pl-5 mb-2 text-base text-slate-700">
                        <li>Artwork images, captions, videos</li>
                        <li>Creative notes, artwork descriptions</li>
                        <li>Pricing information</li>
                        <li>Availability, booking, and sales details</li>
                      </ul>
                      <p className="text-sm text-slate-500">
                        This content is used to enable personalized AI responses
                        and relevant inquiry handling.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">
                        c. Payment and Billing Information
                      </h4>
                      <p className="mb-2">
                        For subscription purchases, we collect:
                      </p>
                      <ul className="list-disc pl-5 mb-2 text-base text-slate-700">
                        <li>Billing name</li>
                        <li>Country and address</li>
                        <li>Transaction ID and invoice data</li>
                      </ul>
                      <p className="text-sm text-slate-500">
                        We do not store credit card information. All payment
                        data is processed by Paddle (Merchant of Record) or
                        PayPal, both PCI DSS–compliant processors.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 border-l-4 border-yellow-400 pl-3">
                    3.2 Data Collected Automatically
                  </h3>
                  <p className="mb-2">We automatically collect:</p>
                  <ul className="list-disc pl-5 mb-2 text-base text-slate-700">
                    <li>IP address</li>
                    <li>Browser type and device information</li>
                    <li>Operating system</li>
                    <li>Access timestamps</li>
                    <li>Usage logs and clickstream data</li>
                    <li>Cookie identifiers</li>
                  </ul>
                  <Link href="/cookie-policy">
                    <Button
                      variant="link"
                      className="px-0 text-blue-600 h-auto font-semibold"
                    >
                      See Section 11 for the Cookie Policy reference &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  4
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  How We Use Your Data
                </h2>
              </div>
              <p className="mb-4">
                We process your personal data for the following purposes:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2">
                    4.1 Service Provision
                  </h3>
                  <p className="text-sm mb-2">
                    To provide and maintain the Service, including:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                    <li>Automated DM replies</li>
                    <li>Artwork information retrieval</li>
                    <li>Lead qualification</li>
                    <li>Collector communication support</li>
                    <li>Fraud analysis and detection</li>
                    <li>System performance and functionality</li>
                  </ul>
                  <p className="text-sm mt-2 italic">
                    Processing is necessary to perform the contract with you.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2">
                    4.2 Contextual Personalization
                  </h3>
                  <p className="text-sm mb-2">
                    We may analyze your content to:
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                    <li>Recommend artworks</li>
                    <li>Improve the accuracy of chatbot responses</li>
                    <li>Deliver artist-specific conversational logic</li>
                    <li>Provide better audience experiences</li>
                  </ul>
                  <p className="text-sm mt-2 italic">
                    All such processing is done within your authorized scope.
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm mb-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-yellow-500" />
                  4.3 AI Processing Clarification
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="font-bold text-red-600 mb-2 text-sm uppercase tracking-wider">
                      We DO NOT:
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-red-400 font-bold">×</span> Use
                        Instagram or Meta data for AI model training
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-400 font-bold">×</span> Build
                        personality profiles or behavioral profiles
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-400 font-bold">×</span>{" "}
                        Perform fine-tuning on user content
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-400 font-bold">×</span> Store
                        DM content beyond temporary inference
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-green-600 mb-2 text-sm uppercase tracking-wider">
                      We DO:
                    </p>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-green-500 font-bold">✓</span> Use
                        trusted AI Providers (e.g., Groq + Llama 3.3)
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500 font-bold">✓</span>{" "}
                        Process messages only for real-time AI inference
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500 font-bold">✓</span> Use
                        artist-provided data for knowledge-base personalization
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-500 font-bold">✓</span>{" "}
                        Allow opt-out from certain automated features
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    4.4 Communication & Support
                  </h3>
                  <p className="text-base">
                    We may use your information to respond to inquiries, provide
                    customer support, and send service updates and important
                    notifications. Marketing emails are sent only with your
                    explicit consent.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    4.5 Non-Commercial Game-Like Features (“Mood Cards”)
                  </h3>
                  <p className="text-base">
                    Certain creative features may use artist-provided content to
                    generate non-commercial illustrations. These features do not
                    create new intellectual property rights over your artwork,
                    do not use data for model training, and can be disabled by
                    request.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* Section 5 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  5
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Legal Basis for Processing (GDPR)
                </h2>
              </div>
              <p className="mb-2">
                We process personal data under the following legal bases:
              </p>
              <ul className="list-disc pl-5 text-base space-y-2 text-slate-700">
                <li>
                  <strong>Contract Necessity</strong> — to provide the Service
                </li>
                <li>
                  <strong>Legitimate Interests</strong> — fraud prevention,
                  analytics, security
                </li>
                <li>
                  <strong>Consent</strong> — marketing communications, optional
                  features
                </li>
                <li>
                  <strong>Legal Obligation</strong> — financial and tax
                  compliance
                </li>
              </ul>
            </section>

            <Separator className="bg-slate-100" />

            {/* Section 6 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  6
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  How We Share Your Data
                </h2>
              </div>
              <p className="mb-2">
                We do not sell personal data. We share data strictly as
                necessary for operational purposes:
              </p>
              <ul className="list-disc pl-5 space-y-3 text-base text-slate-700">
                <li>
                  <strong>6.1 Service Providers (Processors):</strong> We engage
                  trusted providers who process data on our behalf, including
                  Groq, Inc. (AI inference), AWS/EU cloud vendors (hosting),
                  Paddle (billing), and PayPal – payment processing / Email
                  delivery services / Customer support platforms. adhere to data
                  protection obligations under contractual agreements.
                </li>
                <li>
                  <strong>6.2 Meta Platforms (Instagram / Facebook):</strong>{" "}
                  Data is exchanged with Meta only when required for API
                  functionality and within authorized permissions.
                </li>
                <li>
                  <strong>6.3 Legal Requirements:</strong> We may disclose data
                  when legally required, such as law enforcement requests, court
                  orders, or regulatory obligations.
                </li>
                <li>
                  <strong>6.4 Business Transfers:</strong> In case of merger,
                  acquisition, or asset sale, personal data may be transferred
                  with notice.
                </li>
              </ul>
            </section>

            <Separator className="bg-slate-100" />

            {/* Section 7 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  7
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Data Storage, Security & Retention
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    7.1 Storage Location
                  </h3>
                  <p className="text-base">
                    Data is stored primarily in EU-based cloud infrastructure
                    (default) and additional secure regions depending on service
                    optimization.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    7.2 Security Measures
                  </h3>
                  <p className="text-base">
                    We employ industry-standard protections: AES-256 encryption
                    at rest, TLS encryption in transit, MFA, RBAC, access
                    logging, automated intrusion detection, and regular security
                    audits.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    7.3 Retention Periods
                  </h3>
                  <ul className="list-disc pl-5 text-base text-slate-700 space-y-1">
                    <li>Account data: retained up to 3 years of inactivity</li>
                    <li>
                      Instagram messages: not stored; transient processing only
                    </li>
                    <li>Logs: retained between 90 and 365 days</li>
                    <li>
                      Transaction data: retained 5–7 years as required by law
                    </li>
                    <li>Referral data: retained only as long as needed</li>
                  </ul>
                  <p className="text-sm mt-1 text-slate-500">
                    After expiry, data is deleted or anonymized.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* Section 8 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  8
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  International Data Transfers
                </h2>
              </div>
              <p className="text-base">
                Where data must be transferred outside the EU, we rely on
                Standard Contractual Clauses (SCCs), GDPR-approved safeguards,
                and additional encryption and security measures.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* Section 9 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  9
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Your Rights
                </h2>
              </div>
              <p className="mb-6">
                Depending on your jurisdiction (GDPR, CCPA, PIPL), you may have
                the right to:
              </p>
              <ul className="grid md:grid-cols-2 gap-2 list-disc pl-5 mb-6 text-base text-slate-700">
                <li>Access your data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion</li>
                <li>Restrict processing</li>
                <li>Object to specific processing</li>
                <li>Withdraw consent</li>
                <li>Request data portability</li>
                <li>File a complaint with a supervisory authority</li>
              </ul>

              <div className="bg-slate-900 text-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
                <div>
                  <h4 className="font-bold text-white mb-1">
                    Exercise your rights
                  </h4>
                  <p className="text-sm text-slate-400">
                    To exercise these rights, contact us. We will respond within
                    30 days.
                  </p>
                </div>
                <a href="mailto:service@sulio-art.com">
                  <Button
                    variant="secondary"
                    className="whitespace-nowrap font-semibold"
                  >
                    service@sulio-art.com
                  </Button>
                </a>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* Sections 10-14 */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    10
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Automated Decision-Making & Human Intervention
                  </h2>
                </div>
                <p className="text-base">
                  AI responses are automated but do not create legal or
                  significant effects. Users may request human review or opt-out
                  from automated features where feasible.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    11
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Cookies & Tracking Technologies
                  </h2>
                </div>
                <p className="text-base mb-2">
                  We use necessary, functional, analytics, and marketing cookies
                  (with explicit consent).
                </p>
                <p className="text-base">
                  Users can manage cookie preferences via browser settings, our
                  Cookie Banner, or our standalone Cookie Policy (see website
                  footer).
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    12
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Subscription & Refund Policy
                  </h2>
                </div>
                <p className="text-base mb-2">
                  Subscription and refund terms are governed by the Terms of
                  Service and Paddle’s policies.
                </p>
                <ul className="list-disc pl-5 text-base text-slate-700">
                  <li>Monthly plans: non-refundable</li>
                  <li>
                    Annual plans: refundable for unused months minus one-month
                    fee
                  </li>
                  <li>
                    Refund processing times depend on the payment processor.
                  </li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    13
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Referral Program Data
                  </h2>
                </div>
                <p className="text-base">
                  We process referral codes, referral activity logs, and reward
                  qualification metrics. Data is retained only as long as
                  necessary and is not sold or shared externally.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    14
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Updates to This Policy
                  </h2>
                </div>
                <p className="text-base">
                  We may update this Policy to reflect service improvements,
                  legal changes, or security requirements. Significant changes
                  will be communicated via email or dashboard notification.
                  Continued use of the Service after updates constitutes
                  acceptance of the revised Policy.
                </p>
              </section>
            </div>

            <Separator className="bg-slate-100" />

            {/* Section 15 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  15
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Contact Us
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <Globe className="w-5 h-5 text-slate-400 mb-3" />
                  <h3 className="font-bold text-slate-900 mb-1">
                    Sulio Art Co., Ltd.
                  </h3>
                  <p className="text-sm text-slate-500">
                    No. 143, Yanqing St., Sanmin Dist.
                    <br />
                    Kaohsiung City 807015, Taiwan (R.O.C.)
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <Mail className="w-5 h-5 text-slate-400 mb-3" />
                  <h3 className="font-bold text-slate-900 mb-1">
                    Privacy Support
                  </h3>
                  <a
                    href="mailto:service@sulio-art.com"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    service@sulio-art.com
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    Service Hours: Mon–Fri, 9 AM – 6 PM (UTC+8)
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-700 mb-2">Sulio Art</p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            &copy; 2025 Sulio Art Co., Ltd. Trademarks, product names, logos and
            other marks and designs are trademarks of Sulio Art Co., Ltd or its
            subsidiaries.
          </p>
        </div>
      </footer>
    </div>
  );
}
