"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  CreditCard,
  AlertTriangle,
  FileText,
  Globe,
  Mail,
} from "lucide-react";
import { Button } from "../Components/ui/button";
import { Separator } from "../Components/ui/separator";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600">
      {/* Navigation */}
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
            <Scale className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Document Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header - 1 Shade Darker (bg-slate-100) */}
          <div className="bg-slate-100 p-8 md:p-12 relative overflow-hidden border-b border-slate-200">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm">
                <Scale className="w-3 h-3" />
                TERMS OF SERVICE
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
                Sulio AI Chatbot
              </h1>
              <p className="text-slate-500 text-lg font-medium">
                Terms of Service (v1.4)
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-12 text-sm text-slate-500 border-t border-slate-300/50 pt-6">
                <div>
                  <span className="block text-slate-400 uppercase text-xs tracking-wider mb-1 font-semibold">
                    Effective Date
                  </span>
                  <span className="text-slate-900 font-medium">
                    December 25, 2025
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400 uppercase text-xs tracking-wider mb-1 font-semibold">
                    Last Updated
                  </span>
                  <span className="text-slate-900 font-medium">
                    December 26, 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Pattern */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-[0.05]">
              <Scale className="w-64 h-64 text-slate-900" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-16 space-y-12 leading-relaxed text-lg">
            {/* 1. Definitions */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  1
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Definitions
                </h2>
              </div>
              <p className="mb-4">For the purposes of these Terms:</p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <ul className="grid md:grid-cols-1 gap-4 text-base text-slate-700">
                  <li>
                    <strong>“Service”</strong> refers to Sulio AI Chatbot and
                    all related tools, interfaces, dashboards, modules,
                    websites, and features provided by Sulio Art Co., Ltd.
                  </li>
                  <li>
                    <strong>“Company,” “we,” “us,” or “our”</strong> refers to
                    Sulio Art Co., Ltd.
                  </li>
                  <li>
                    <strong>“User” or “you”</strong> refers to any individual or
                    entity accessing or using the Service.
                  </li>
                  <li>
                    <strong>“Account”</strong> refers to the registered profile
                    used to access the Service.
                  </li>
                  <li>
                    <strong>“User Content”</strong> means any data, text,
                    images, messages, or materials submitted or uploaded by the
                    User.
                  </li>
                  <li>
                    <strong>“AI Output”</strong> means any automated responses
                    generated by the Service’s AI infrastructure.
                  </li>
                  <li>
                    <strong>“Access Token”</strong> refers to Instagram
                    authentication credentials granted through the Instagram
                    Graph API.
                  </li>
                  <li>
                    <strong>“AI Providers”</strong> refers to third-party AI
                    infrastructures used by the Service, including but not
                    limited to Groq, Inc. (LLM inference) and Llama 3.3 70B
                    Versatile (model architecture used strictly for inference).
                  </li>
                  <li>
                    <strong>“Third-Party Platforms”</strong> refers to
                    Instagram, Meta products, LINE, Paddle, PayPal, cloud
                    vendors, and AI Providers.
                  </li>
                  <li>
                    <strong>“Subscription Plan”</strong> includes all paid or
                    free tiers: Free, Plus, Prem, and Pro.
                  </li>
                </ul>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* 2 & 3 Eligibility & Acceptance */}
            <div className="grid md:grid-cols-2 gap-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    2
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Eligibility
                  </h2>
                </div>
                <p className="mb-2">To use the Service, you must:</p>
                <ul className="list-disc pl-5 text-base space-y-1 text-slate-700">
                  <li>
                    Be at least 18 years old (required by Meta Platform Terms)
                  </li>
                  <li>Have legal capacity to enter a binding agreement</li>
                  <li>
                    If acting on behalf of an entity, have authority to bind
                    that entity
                  </li>
                </ul>
              </section>
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    3
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Acceptance of Terms
                  </h2>
                </div>
                <p className="text-base mb-2">
                  By accessing or using the Service, you acknowledge and agree
                  to:
                </p>
                <ul className="list-disc pl-5 text-base space-y-1 text-slate-700">
                  <li>These Terms of Service</li>
                  <li>The Privacy Policy</li>
                  <li>The Cookie Policy</li>
                  <li>The Data Processing Agreement (where applicable)</li>
                </ul>
                <p className="text-sm text-red-500 font-semibold mt-2">
                  If you do not agree, you must discontinue use immediately.
                </p>
              </section>
            </div>

            <Separator className="bg-slate-100" />

            {/* 4 & 5 Service & Meta */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  4
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Description of the Service
                </h2>
              </div>
              <p className="mb-2">
                The Service provides AI-driven tools including, without
                limitation:
              </p>
              <ul className="list-disc pl-5 text-base text-slate-700 mb-4">
                <li>Automated Instagram DM responses</li>
                <li>Audience segmentation</li>
                <li>Artwork recommendations and matching</li>
                <li>Lead qualification</li>
                <li>Fraud detection</li>
                <li>Sales funnel and CRM-like support</li>
                <li>After-sales automation (Pro Plan)</li>
              </ul>
              <p className="text-base font-semibold">
                AI processing is performed strictly via real-time inference. The
                Service does not train AI models on Instagram or User Content.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  5
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Relationship with Meta / Instagram
                </h2>
              </div>
              <p className="mb-4">
                The Service integrates with Instagram via the Meta Instagram
                Graph API. You acknowledge that:
              </p>
              <ul className="list-disc pl-5 text-base text-slate-700 mb-6">
                <li>The Company is independent from Meta Platforms, Inc.</li>
                <li>
                  Meta may modify API rules, permissions, and rate limits at any
                  time
                </li>
                <li>
                  Automated messaging may trigger Instagram’s automated
                  enforcement systems
                </li>
              </ul>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-4">
                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Risk Disclaimer
                </h3>
                <p className="text-sm text-blue-800 mb-2">
                  Your Instagram account may experience: Reduced reach,
                  Temporary restrictions, API throttling, Shadowbans, or Account
                  enforcement.
                </p>
                <p className="text-sm font-bold text-blue-900">
                  The Company is not liable for actions taken by Meta against
                  your account.
                </p>
              </div>
              <p className="text-base">
                Instagram content is: Used only for authorized features, Not
                stored long-term, Not used for AI training, Not exported to
                third parties beyond operational necessity.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* 6-11 Account & Responsibilities */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    6
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Account Authorization & Access Tokens
                  </h2>
                </div>
                <p className="text-base">
                  By connecting your Instagram account, you grant the Company a
                  limited right to process Instagram data within the scope
                  authorized by Meta. We will: Store Access Tokens in encrypted
                  form, Use Tokens solely to provide the Service, Cease
                  processing upon token expiration or revocation. You agree not
                  to share or transfer your Access Token.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    7
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Account Security
                  </h2>
                </div>
                <p className="text-base">
                  You are responsible for safeguarding your credentials and
                  preventing unauthorized use. We are not liable for losses
                  arising from unauthorized Account access.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    8
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    User Responsibilities
                  </h2>
                </div>
                <p className="mb-2">You may not use the Service to:</p>
                <ul className="list-disc pl-5 text-base text-slate-700 space-y-1">
                  <li>Harass, threaten, or defraud others</li>
                  <li>Send spam or unauthorized advertisements</li>
                  <li>Violate Meta or Instagram Platform Terms</li>
                  <li>Scrape or misuse personal data</li>
                  <li>Automate harmful activities</li>
                  <li>Train external AI systems using Service outputs</li>
                </ul>
                <p className="mt-2 text-base">
                  You assume full responsibility for all actions performed under
                  your Account.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    9
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    AI Output Disclaimer
                  </h2>
                </div>
                <p className="text-base">
                  You acknowledge that: AI Output may be incorrect, incomplete,
                  biased, or inappropriate. AI Output does not constitute legal,
                  medical, financial, or professional advice. You are solely
                  responsible for verifying AI Output before using it. The
                  Company disclaims liability for actions taken based on AI
                  Output.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    10
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Rate Limits & Fair Use
                  </h2>
                </div>
                <p className="text-base">
                  Instagram enforces strict rate limits. You agree not to
                  circumvent technical restrictions. Excessive activity may lead
                  to: Temporary loss of Service features, Account penalties
                  imposed by Meta. The Company may implement additional internal
                  rate limits.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                    11
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Service Availability
                  </h2>
                </div>
                <p className="text-base">
                  The Service depends on external providers, including: Meta
                  Graph API, AI Providers (e.g., Groq), Cloud hosting vendors,
                  Paddle / PayPal, Network infrastructure. We do not guarantee:
                  Continuous uptime, Uninterrupted availability, Compatibility
                  across all regions or devices. We are not responsible for
                  outages caused by third-party systems.
                </p>
              </section>
            </div>

            <Separator className="bg-slate-100" />

            {/* 12-19 Billing */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-slate-900" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Subscription & Billing
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    12. Subscription Plans
                  </h3>
                  <p className="text-base">
                    Subscription Plans differ in Feature access, Storage
                    allowances, Usage limits, AI capabilities. Plan details may
                    change over time with notice.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    13. Payment Processing (Paddle as Merchant of Record)
                  </h3>
                  <p className="text-base">
                    Payments are processed through Paddle, the Merchant of
                    Record, which manages: Billing, Taxes, Payment
                    authorization, Refunds. PayPal may be provided as an
                    alternative payment option.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">14. Taxes</h3>
                  <p className="text-base">
                    Taxes such as VAT/GST are applied based on your billing
                    country.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    15. Recurring Billing Authorization
                  </h3>
                  <p className="text-base">
                    By subscribing, you authorize Paddle (and applicable payment
                    processors) to charge your payment method on a recurring
                    basis until cancellation.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    16. Free-to-Paid Transition
                  </h3>
                  <p className="text-base">
                    Upgrades take effect immediately. Trials convert to paid
                    plans unless cancelled before expiration.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    17. Upgrades & Downgrades
                  </h3>
                  <p className="text-base">
                    Upgrades: effective immediately, prorated charges may apply.
                    Downgrades: effective at the next billing period. Feature
                    access may change with plan adjustments.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    18. Cancellation & Non-Payment
                  </h3>
                  <p className="text-base">
                    You may cancel anytime. Cancellation stops future charges
                    but does not guarantee refunds. Non-payment may result in:
                    Restricted features, Automatic downgrade, Data deletion
                    after 30 days.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    19. Refund Policy
                  </h3>
                  <p className="text-base">
                    Handled exclusively by Paddle. Monthly plans:
                    non-refundable. Annual plans: refundable for unused months
                    minus one monthly fee. Refund timeframes depend on the
                    payment processor.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* 20-22 Content & AI */}
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  20. User Content Restrictions
                </h2>
                <p className="text-base">
                  Prohibited uploads include: Illegal content,
                  Copyright-infringing materials, Malware, Harassment or hate
                  speech, Fraudulent or misleading information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  21. User Content License
                </h2>
                <p className="text-base">
                  You retain ownership of your User Content. You grant us a
                  limited, revocable, non-exclusive license to process such
                  content solely to operate the Service. Instagram messages: Are
                  processed only temporarily, Are not stored long-term, Are not
                  added to AI training datasets. This license terminates upon
                  Account deletion, subject to legal retention.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  22. Third-Party AI Providers
                </h2>
                <p className="text-base mb-2">
                  The Service uses third-party AI infrastructures (“AI
                  Providers”), including but not limited to:
                </p>
                <ul className="list-disc pl-5 text-base text-slate-700 mb-4">
                  <li>Groq, Inc. – LLM inference infrastructure</li>
                  <li>
                    Llama 3.3 70B Versatile – model architecture used only for
                    inference
                  </li>
                </ul>
                <p className="text-sm mb-2">You acknowledge and agree that:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>
                    AI Providers operate independently from the Company, and may
                    change performance, availability, or features at any time.
                  </li>
                  <li>
                    The Company does not control or guarantee AI Provider
                    uptime, response time, or accuracy.
                  </li>
                  <li>
                    No User Content or Instagram Content is used to train AI
                    models.
                  </li>
                  <li>
                    The Company may replace or add AI Providers at its
                    discretion, provided they meet GDPR and SCC requirements.
                  </li>
                  <li>
                    The Company is not liable for any damages arising from AI
                    Provider outages, inference errors, or model limitations.
                  </li>
                </ul>
                <p className="text-sm mt-2">
                  Use of the Service constitutes acceptance of these conditions.
                </p>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* 23-29 Legal Misc */}
            <div className="grid md:grid-cols-2 gap-8">
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  23. GDPR Compliance
                </h2>
                <p className="text-sm">
                  EU users retain rights to: Access, Rectification, Deletion,
                  Restriction, Objection, Data portability. Personal data may be
                  processed in or outside the EU under SCCs.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  24. Data Storage & Retention
                </h2>
                <p className="text-sm">
                  Account data: stored up to 3 years of inactivity. Instagram
                  messages: not stored; used transiently. Logs: retained 90–365
                  days. Transactional data: stored 5–7 years as required by law.
                  Deleted data cannot be recovered.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  25. Beta & Experimental Features
                </h2>
                <p className="text-sm">
                  Experimental or beta features: May be unstable, May change or
                  be removed, Are used at your own risk.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  26. Intellectual Property
                </h2>
                <p className="text-sm">
                  All Service components—including software, algorithms, UI/UX,
                  prompts, branding, and documentation—are the exclusive
                  property of the Company. You may not copy, reverse engineer,
                  or create derivative works without permission.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  27. Indemnification
                </h2>
                <p className="text-sm">
                  You agree to indemnify and hold the Company harmless from
                  claims arising out of: Your misuse of the Service, Your User
                  Content, Your violation of laws or third-party rules, Your
                  reliance on AI Output.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  28. Export Control
                </h2>
                <p className="text-sm">
                  You may not use the Service in violation of export control
                  laws, embargoes, or sanctions.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  29. Age Restrictions
                </h2>
                <p className="text-sm">
                  The Service is not intended for individuals under 18 years
                  old.
                </p>
              </section>
            </div>

            <Separator className="bg-slate-100" />

            {/* Legal Footer Section */}
            <section className="grid md:grid-cols-2 gap-8 text-sm">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  30. No Warranty ("AS IS")
                </h3>
                <p>
                  The Service is provided “AS IS” and “AS AVAILABLE”, without
                  warranties of any kind.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  31. Limitation of Liability
                </h3>
                <p>
                  To the maximum extent permitted by law: The Company is not
                  liable for indirect, incidental, or consequential damages.
                  Liability is capped at the total amount paid by you in the
                  past 12 months.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  32. Referral Program Terms
                </h3>
                <p>
                  Eligibility and rewards depend on: Active Sulio account, Valid
                  referral sign-ups, Anti-fraud measures. Rewards may be revoked
                  for abuse.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  33. Changes to Terms
                </h3>
                <p>
                  We may update these Terms at any time. Continued use
                  constitutes acceptance of updated Terms.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  34. Governing Law & Dispute Resolution
                </h3>
                <p>
                  These Terms are governed by the laws of Taiwan (R.O.C.),
                  unless otherwise required by applicable law. Disputes shall be
                  resolved in the courts of Taipei, Taiwan.
                </p>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* Contact */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                35. Contact Information
              </h2>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-start gap-4">
                <Globe className="w-6 h-6 text-slate-400 mt-1" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Sulio Art Co., Ltd.
                  </h3>
                  <p className="text-sm text-slate-500">
                    No. 143, Yanqing St., Sanmin Dist.
                    <br />
                    Kaohsiung City 807015, Taiwan (R.O.C.)
                  </p>
                  <p className="mt-2 text-sm">
                    <a
                      href="mailto:service@sulio-art.com"
                      className="text-blue-600 hover:underline"
                    >
                      service@sulio-art.com
                    </a>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Service Hours: Mon–Fri, 9 AM–6 PM (UTC+8)
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

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
