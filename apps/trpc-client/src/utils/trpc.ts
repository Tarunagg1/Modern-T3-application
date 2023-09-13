import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../node-trpc-server/src/app';


export const trpc = createTRPCReact<AppRouter>();
