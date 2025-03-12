import React from 'react';
import Head from 'next/head';

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
  selectedBudget?: string;
  selectedContactReason?: string;
};

export default function ContactFormEmail({
  message,
  senderEmail,
  selectedBudget,
  selectedContactReason,
}: ContactFormEmailProps) {
  return (
    <html>
      <Head>
        <title>New Contact Form Submission</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </Head>
      <body
        style={{
          backgroundColor: '#f9fafb',
          color: '#374151',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ color: '#111827' }}>New Message Received</h2>
          <p style={{ color: '#4b5563' }}>{message}</p>
          <hr style={{ border: '1px solid #e5e7eb', margin: '20px 0' }} />
          <p style={{ color: '#6b7280' }}>
            <strong>Sender&apos;s Email:</strong> {senderEmail}
          </p>

          <hr style={{ border: '1px solid #e5e7eb', margin: '20px 0' }} />
          {selectedContactReason ? (
            <p style={{ color: '#6b7280', marginTop: '10px' }}>
              <strong>Contact Reason:</strong> {selectedContactReason}
            </p>
          ) : (
            <p
              style={{
                color: '#6b7280',
                marginTop: '10px',
                fontStyle: 'italic',
              }}
            >
              Contact reason not provided.
            </p>
          )}
          {selectedBudget ? (
            <p style={{ color: '#6b7280', marginTop: '10px' }}>
              <strong>Budget:</strong> {selectedBudget}
            </p>
          ) : (
            <p
              style={{
                color: '#6b7280',
                marginTop: '10px',
                fontStyle: 'italic',
              }}
            >
              Budget information not provided.
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
