import * as mongodb from './providers/mongodb';

type ProviderName = 'mongodb';

type Provider = typeof mongodb;

const providers: Record<ProviderName, Provider> = {
  mongodb,
};

function resolveProviderName(): ProviderName {
  const value = process.env.DB_PROVIDER ?? 'mongodb';
  if (value === 'mongodb') return value;
  throw new Error(`Unsupported DB_PROVIDER: ${value}`);
}

const provider = providers[resolveProviderName()];

export const connectToDatabase = provider.connectToDatabase;
export const disconnectFromDatabase = provider.disconnectFromDatabase;
export const User = provider.User;
export const Message = provider.Message;
export const Project = provider.Project;
export const Experience = provider.Experience;
export const StatSnapshot = provider.StatSnapshot;

export const databaseProvider = provider;
