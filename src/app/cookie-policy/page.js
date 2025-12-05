"use client";

import React from "react";
import Link from "next/link";
// Aliased imports to prevent "Illegal constructor" and naming conflicts
import {
  ArrowLeft,
  Shield,
  Cookie as CookieIcon,
  Settings as SettingsIcon,
  Eye as EyeIcon,
  FileText,
  Globe,
  Mail,
  Lock,
  LayoutDashboard,
  Monitor,
} from "lucide-react";
import { Button } from "../Components/ui/button";
import { Separator } from "../Components/ui/separator";

export default function CookiePolicy() {
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
            <CookieIcon className="w-4 h-4" />
            <span>Tracking & Data</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Document Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Document Header - 1 Shade Darker (bg-slate-100) */}
          <div className="bg-slate-100 p-8 md:p-12 relative overflow-hidden border-b border-slate-200">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm">
                <FileText className="w-3 h-3" />
                POLICY DOCUMENT
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
                Cookie Policy
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
                    Applies To
                  </span>
                  <span className="text-slate-900 font-medium">
                    sulio-art.com, Sulio AI Chatbot, dashboards, and associated
                    web properties
                  </span>
                </div>
              </div>
            </div>

            {/* Pattern */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-[0.05]">
              <CookieIcon className="w-64 h-64 text-slate-900" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-16 space-y-12 leading-relaxed text-lg">
            {/* 1. Introduction */}
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
                This Cookie Policy explains how Sulio Art Co., Ltd. (“we,” “us,”
                or “our”) uses cookies and similar tracking technologies when
                you visit our website, use our dashboard, or interact with our
                tools.
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <p className="mb-2 font-semibold text-slate-900">
                  This Policy describes:
                </p>
                <ul className="list-disc pl-5 text-base text-slate-700 space-y-1">
                  <li>What cookies are</li>
                  <li>Which cookies we use</li>
                  <li>Why we use them</li>
                  <li>How you can manage or disable cookies</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-200 text-sm">
                  This Cookie Policy should be read together with our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* 2. What are cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  2
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  What Are Cookies?
                </h2>
              </div>
              <p className="text-base mb-4">
                Cookies are small text files stored on your device when you
                visit a website. They serve various purposes, such as enabling
                website functionality, remembering preferences, measuring
                performance, and supporting analytics and security.
              </p>
              <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-100">
                <p className="text-sm font-semibold mb-2">
                  We also use similar technologies like:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                  <li>Local Storage</li>
                  <li>Session Storage</li>
                  <li>Web beacons and pixels</li>
                </ul>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* 3. Types of Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  3
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Types of Cookies We Use
                </h2>
              </div>
              <p className="mb-6">We categorize our cookies as follows:</p>

              <div className="space-y-6">
                {/* 3.1 Necessary */}
                <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-slate-900 text-lg">
                      3.1 Strictly Necessary Cookies
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 italic mb-3">
                    (Required for website and dashboard functionality)
                  </p>
                  <p className="text-sm mb-4">
                    These cookies enable login and authentication,
                    account/session management, security and fraud prevention,
                    and payment flow (Paddle / PayPal). Because they are
                    essential, you cannot disable them in our cookie banner.
                  </p>

                  <div className="overflow-x-auto bg-slate-50 rounded-lg border border-slate-100">
                    <table className="min-w-full text-sm text-left">
                      <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Cookie Name</th>
                          <th className="p-3">Purpose</th>
                          <th className="p-3">Provider</th>
                          <th className="p-3">Expiry</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr>
                          <td className="p-3 font-mono text-xs">session_id</td>
                          <td className="p-3">Maintain login state</td>
                          <td className="p-3">Sulio Art</td>
                          <td className="p-3">Session</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-xs">
                            paddle_checkout
                          </td>
                          <td className="p-3">Enable subscription checkout</td>
                          <td className="p-3">Paddle</td>
                          <td className="p-3">Varies</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-xs">csrf_token</td>
                          <td className="p-3">Protect against CSRF attacks</td>
                          <td className="p-3">Sulio Art</td>
                          <td className="p-3">Session</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3.2 Functional */}
                <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <SettingsIcon className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-slate-900 text-lg">
                      3.2 Functional Cookies
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 italic mb-2">
                    (Enhance user experience)
                  </p>
                  <p className="text-base">
                    These cookies remember language preferences, layout
                    settings, and saved form inputs. If disabled, certain
                    features may not work properly.
                  </p>
                </div>

                {/* 3.3 Analytics */}
                <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <EyeIcon className="w-5 h-5 text-purple-500" />
                    <h3 className="font-bold text-slate-900 text-lg">
                      3.3 Analytics Cookies
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 italic mb-2">
                    (Used only with explicit consent)
                  </p>
                  <p className="text-base mb-2">
                    These cookies help us understand which pages are accessed,
                    how users navigate the dashboard, and where performance
                    bottlenecks occur.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-slate-600">
                    <li>
                      Common tools: Google Analytics (consent required),
                      Privacy-friendly analytics (e.g., Plausible).
                    </li>
                    <li>Analytics data is anonymized and aggregated.</li>
                  </ul>
                </div>

                {/* 3.4 Marketing */}
                <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-green-500" />
                    <h3 className="font-bold text-slate-900 text-lg">
                      3.4 Marketing & Personalization Cookies
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 italic mb-2">
                    (Used only if you explicitly opt-in)
                  </p>
                  <p className="text-base mb-2">
                    These cookies support advertising relevance, audience
                    measurement, and retargeting campaigns. We only place
                    marketing cookies after you give explicit consent.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-slate-600">
                    <li>Examples: Meta Pixel, Google Ads Conversion Tags.</li>
                    <li>You can withdraw consent anytime.</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* 4. Third Parties */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  4
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Cookies Placed by Third Parties
                </h2>
              </div>
              <p className="mb-2">
                Some cookies may be set by external providers we integrate with.
                We may use cookies from:
              </p>
              <ul className="list-disc pl-5 text-base text-slate-700 space-y-1">
                <li>Paddle (payments & VAT compliance)</li>
                <li>PayPal (alternative payment flow)</li>
                <li>
                  Meta / Instagram (pixel or social plugins, only if enabled)
                </li>
                <li>Analytics providers (optional, consent-based)</li>
              </ul>
              <p className="mt-2 text-sm text-slate-500">
                These providers have their own privacy/cookie policies that
                govern use of their cookies.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* 5. Why We Use Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  5
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Why We Use Cookies
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc pl-5 text-base text-slate-700 space-y-1">
                  <li>Provide smooth and secure login sessions</li>
                  <li>Support subscription payments</li>
                  <li>Authenticate API interactions</li>
                  <li>Improve chatbot and dashboard performance</li>
                </ul>
                <ul className="list-disc pl-5 text-base text-slate-700 space-y-1">
                  <li>Measure usage and improve product features</li>
                  <li>Conduct optional analytics</li>
                  <li>Support optional advertising campaigns</li>
                  <li>
                    We provide these links in our dashboard when applicable.
                  </li>
                </ul>
              </div>
              <p className="mt-4 font-bold text-slate-900">
                We do not use cookies to sell personal data.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* 6. Legal Basis */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  6
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Legal Basis for Using Cookies
                </h2>
              </div>
              <p className="mb-4">Under GDPR and ePrivacy Directive:</p>
              <div className="flex flex-wrap gap-2 text-sm mb-4">
                <span className="px-4 py-2 bg-slate-100 rounded-lg font-medium text-slate-800">
                  Necessary: Legitimate Interest
                </span>
                <span className="px-4 py-2 bg-slate-100 rounded-lg font-medium text-slate-800">
                  Functional: Legitimate Interest / Consent
                </span>
                <span className="px-4 py-2 bg-slate-100 rounded-lg font-medium text-slate-800">
                  Analytics: Consent
                </span>
                <span className="px-4 py-2 bg-slate-100 rounded-lg font-medium text-slate-800">
                  Marketing: Consent
                </span>
              </div>
              <p className="text-sm">
                In jurisdictions with “Do Not Sell” regulations such as CCPA,
                users may opt out at any time.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* 7. Managing Preferences */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  7
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Managing Cookie Preferences
                </h2>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-6 text-base">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    7.1 Through Our Cookie Banner
                  </h3>
                  <p className="text-sm">
                    On your first visit, a banner allows you to Accept all
                    cookies, Reject all non-essential cookies, or Customize
                    cookie preferences. You may reopen the cookie settings at
                    any time via our website footer.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    7.2 Through Browser Settings
                  </h3>
                  <p className="text-sm">
                    You can block or delete cookies directly in your browser
                    (Chrome, Safari, Edge, Firefox). Blocking necessary cookies
                    may limit access to the dashboard or subscription checkout.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    7.3 Opt-Out Links for Third-Party Cookies
                  </h3>
                  <p className="text-sm">
                    Relevant tools may provide opt-out links: Google Analytics
                    opt-out, Meta Ads Preferences, PayPal cookie preferences.
                  </p>
                </div>
              </div>
            </section>

            <Separator className="bg-slate-100" />

            {/* 8. Dashboard vs Public */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  8
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Cookies on Dashboard vs. Public Website
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <LayoutDashboard className="w-5 h-5 text-slate-500" />
                    <h3 className="font-bold text-slate-900">
                      Dashboard (App)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-2 font-mono">
                    app.sulio-art.com
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Necessary cookies</li>
                    <li>Functional cookies</li>
                    <li>Login/session cookies</li>
                    <li>Payment flow cookies</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Monitor className="w-5 h-5 text-slate-500" />
                    <h3 className="font-bold text-slate-900">Public Website</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-2 font-mono">
                    sulio-art.com
                  </p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Analytics cookies (consent required)</li>
                    <li>Marketing cookies (consent required)</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm italic text-slate-500">
                The dashboard will never run third-party marketing cookies
                without consent.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* 9. Retention */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  9
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Retention of Cookies
                </h2>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-900 font-semibold">
                    <tr>
                      <th className="px-4 py-3">Cookie Type</th>
                      <th className="px-4 py-3">Typical Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 font-medium">Session cookies</td>
                      <td className="px-4 py-3">Deleted when browser closes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Functional cookies
                      </td>
                      <td className="px-4 py-3">Up to 12 months</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Analytics cookies
                      </td>
                      <td className="px-4 py-3">6–14 months</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">
                        Marketing cookies
                      </td>
                      <td className="px-4 py-3">3–12 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                You may delete cookies at any time via browser settings.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* 10. Updates */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  10
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Updates to This Cookie Policy
                </h2>
              </div>
              <p className="mb-2">
                We may update this Policy to reflect legal changes, feature
                updates, or analytics changes.
              </p>
              <p className="mb-2">
                We will notify users of significant updates through: Website
                banner, Email notice, or Account dashboard notification.
              </p>
              <p className="font-semibold text-slate-800">
                Continued use after updates constitutes acceptance.
              </p>
            </section>

            <Separator className="bg-slate-100" />

            {/* 11. Contact */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-900 font-bold text-sm">
                  11
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Contact Information
                </h2>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-start gap-4">
                <Mail className="w-6 h-6 text-slate-400 mt-1" />
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
                    Service Hours: Mon–Fri, 9 AM – 6 PM (UTC+8)
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
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
