'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none space-y-6 text-black/70">
          <p>Last updated: May 4, 2026</p>
          <p>
            By accessing or using Webhouse Media's services, you agree to be bound by these Terms of Service.
          </p>
          <h2 className="text-2xl font-bold text-black mt-10 mb-4">1. Services</h2>
          <p>
            Webhouse Media provides digital marketing, website development, AI automation, and branding services. Each project is subject to specific scope agreements outlined in our service proposals.
          </p>
          <h2 className="text-2xl font-bold text-black mt-10 mb-4">2. Payments</h2>
          <p>
            Payments for services must be made according to the schedule agreed upon in the project proposal. Late payments may result in suspension of services.
          </p>
          <h2 className="text-2xl font-bold text-black mt-10 mb-4">3. Intellectual Property</h2>
          <p>
            Upon full payment, ownership of final deliverables (websites, brand assets, etc.) is transferred to the client, while Webhouse Media retains the right to showcase the work in its portfolio.
          </p>
          <h2 className="text-2xl font-bold text-black mt-10 mb-4">4. Liability</h2>
          <p>
            Webhouse Media is not liable for indirect or consequential damages arising from the use or inability to use our systems or services.
          </p>
        </div>
      </div>
    </div>
  );
}
