export type Request = {
  headers?: Record<string, string | string[] | undefined>
  body?: unknown
  params?: Record<string, string | undefined>
};
