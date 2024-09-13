import { type Request } from './Request';

export type AuthenticatedRequest = Request & { user: { id: string, name: string, email: string } };
