declare module 'args-parser' {
  export default function argsParser(
    args?: string[] | string,
    options?: Record<string, any>
  ): Record<string, any>;
}