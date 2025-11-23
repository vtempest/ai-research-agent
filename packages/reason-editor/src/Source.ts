
export type SourceString = Source | string

/**
 * Enum representing the source of a change.
 */
export enum Source {
  api = 'api',
  user = 'user',
  history = 'history',
  input = 'input',
  paste = 'paste'
}
