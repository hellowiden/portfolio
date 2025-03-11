import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

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
    <Html>
      <Head />
      <Preview>New Contact Form Submission</Preview>
      <Tailwind>
        <Body className="bg-gray-50 text-gray-800">
          <Container className="mx-auto max-w-lg p-6">
            <Section className="bg-white shadow-md rounded-lg p-6">
              <Heading className="text-xl font-semibold text-gray-900 mb-4">
                New Message Received
              </Heading>
              <Text className="text-gray-700 mb-6">{message}</Text>
              <Hr className="border-t border-gray-300 my-4" />
              <Text className="text-gray-600">
                <span className="font-medium">Sender's Email:</span>{' '}
                {senderEmail}
              </Text>
              <Hr className="border-t border-gray-300 my-4" />
              {selectedContactReason ? (
                <Text className="text-gray-600 mt-2">
                  <span className="font-medium">Contact Reason:</span>{' '}
                  {selectedContactReason}
                </Text>
              ) : (
                <Text className="text-gray-600 mt-2 italic">
                  Contact reason not provided.
                </Text>
              )}
              {selectedBudget ? (
                <Text className="text-gray-600 mt-2">
                  <span className="font-medium">Budget:</span> {selectedBudget}
                </Text>
              ) : (
                <Text className="text-gray-600 mt-2 italic">
                  Budget information not provided.
                </Text>
              )}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
