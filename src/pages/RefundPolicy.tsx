import React from 'react';

export const RefundPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Refund Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Last updated: {new Date().toISOString().split('T')[0]}
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          We want you to be satisfied. If you experience an issue, please contact support within 7 days of purchase.
        </p>
        <h2>Eligibility</h2>
        <p>
          Refunds are considered for duplicate charges or technical issues preventing access.
        </p>
        <h2>How to Request</h2>
        <p>
          Email billing@algogo.app with your account email, receipt, and description of the issue.
        </p>
        <h2>Processing Time</h2>
        <p>
          Approved refunds are processed to the original payment method within 5-10 business days.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;


