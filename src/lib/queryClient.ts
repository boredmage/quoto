import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";

/**
 * Quotes change slowly, so keep them fresh for an hour and keep them around for
 * a week. Paired with the AsyncStorage persister below, this means Discover /
 * topic / home quotes render instantly from cache on the next view or launch.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
      retry: 2,
    },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "quoto.query-cache.v1",
});
