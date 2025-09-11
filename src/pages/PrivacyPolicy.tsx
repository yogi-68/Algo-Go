import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Last updated: {new Date().toISOString().split('T')[0]}
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          We respect your privacy. This policy explains what data we collect, how we use it, and your rights.
        </p>
        <h2>Information We Collect</h2>
        <p>
          Account information, usage data, and cookies to improve our services.
        </p>
        <h2>How We Use Information</h2>
        <p>
          To provide and improve the service, personalize content, and communicate with you.
        </p>
        <h2>Data Sharing</h2>
        <p>
          We do not sell your data. We may share with service providers under strict agreements.
        </p>
        <h2>Security</h2>
        <p>
          We use industry-standard measures to protect your data.
        </p>
        <h2>Your Rights</h2>
        <p>
          You may access, correct, or delete your personal data by contacting support.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy inquiries, contact privacy@algogo.app.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


