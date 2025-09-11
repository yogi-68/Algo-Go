import React from 'react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Last updated: {new Date().toISOString().split('T')[0]}
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Welcome to Algo-Go. By accessing or using our website and services, you agree to be bound by these Terms of Service.
        </p>
        <h2>Use of Service</h2>
        <p>
          You agree to use the service only for lawful purposes and in accordance with these terms.
        </p>
        <h2>Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and for all activities under your account.
        </p>
        <h2>Subscriptions and Payments</h2>
        <p>
          Paid plans renew automatically unless cancelled. Taxes may apply depending on your location.
        </p>
        <h2>Cancellation</h2>
        <p>
          You can cancel your subscription at any time. Your access remains until the end of the current billing period.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          All content and software are owned by Algo-Go or its licensors.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Algo-Go shall not be liable for any indirect or consequential damages.
        </p>
        <h2>Contact</h2>
        <p>
          For questions, contact us at support@algogo.app.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;


