'use server';

import React from 'react';
import { Resend } from 'resend';
import { validateString } from '@/utils/utils';
import ContactFormEmail from '@/email/ContactEmailTemplate';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const MAX_LENGTHS = {
  email: 500,
  message: 3000,
  contactReason: 100,
  budget: 50,
};
const THROTTLE_TIME = 60 * 60 * 1000;
const MAX_RETRIES = 3;

const RESEND_API_KEY =
  process.env.RESEND_API_KEY ?? throwEnvError('RESEND_API_KEY');
const FROM_EMAIL =
  process.env.FROM_EMAIL || 'Contact Form <onboarding@resend.dev>';

const resend = new Resend(RESEND_API_KEY);
const emailThrottleCache: Record<string, number> = {};

function throwEnvError(variableName: string): never {
  throw new Error(`${variableName} is missing in environment variables.`);
}

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sanitizeInput = (input: string): string =>
  input.replace(/[<>"'/]/g, (char) => `&#${char.charCodeAt(0)};`);

const validateInput = (
  field: string,
  value: string,
  maxLength: number
): string | null =>
  !validateString(value, maxLength)
    ? `${field} is invalid or exceeds the maximum length of ${maxLength}.`
    : null;

interface ContactFormEmailProps {
  message: string;
  senderEmail: string;
  selectedContactReason: string;
  selectedBudget: string;
  emailUUID: string;
}

export const sendEmail = async (
  formData: FormData
): Promise<{
  success: boolean;
  error?: string;
  data?: unknown;
  uuid?: string;
}> => {
  const senderEmail = formData.get('senderEmail')?.toString() || '';
  const message = formData.get('message')?.toString() || '';
  const selectedContactReason =
    formData.get('Contact Reason')?.toString() || '';
  const selectedBudget = formData.get('Budget')?.toString() || '';

  const errors = [
    validateInput('Sender email', senderEmail, MAX_LENGTHS.email) ||
      (!isValidEmail(senderEmail) && 'Sender email is invalid.'),
    validateInput('Message', message, MAX_LENGTHS.message),
    validateInput(
      'Contact Reason',
      selectedContactReason,
      MAX_LENGTHS.contactReason
    ),
    validateInput('Budget', selectedBudget, MAX_LENGTHS.budget),
  ].filter(Boolean);

  if (errors.length) {
    return { success: false, error: errors.join(' ') };
  }

  const currentTime = Date.now();
  if (
    emailThrottleCache[senderEmail] &&
    currentTime - emailThrottleCache[senderEmail] < THROTTLE_TIME
  ) {
    return {
      success: false,
      error: 'You can send another email after 1 hour.',
    };
  }
  emailThrottleCache[senderEmail] = currentTime;

  const sanitizedMessage = sanitizeInput(message);
  const emailUUID = uuidv4();

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const data = await resend.emails.send({
        from: FROM_EMAIL,
        to: 'hellowiden@gmail.com',
        subject: `Message from contact form - ID: ${emailUUID}`,
        reply_to: senderEmail,
        react: React.createElement(ContactFormEmail, {
          message: sanitizedMessage,
          senderEmail,
          selectedContactReason,
          selectedBudget,
          emailUUID,
        } as ContactFormEmailProps),
      });

      return { success: true, data, uuid: emailUUID };
    } catch (error) {
      if (attempt === MAX_RETRIES - 1) {
        const errorMsg =
          error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Failed to send email:', {
          error: errorMsg,
          uuid: emailUUID,
        });
        return { success: false, error: errorMsg, uuid: emailUUID };
      }
    }
  }

  return {
    success: false,
    error: 'Unexpected error occurred',
    uuid: emailUUID,
  };
};
