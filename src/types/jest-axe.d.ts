/**
 * src/types/jest-axe.d.ts
 * Ambient typings for jest-axe, which ships as untyped CommonJS.
 *
 * NOTE: this file deliberately has no top-level import/export statements —
 * a .d.ts with top-level imports becomes a module, and `declare module`
 * inside it would be an *augmentation* of a package that has no types at
 * all. Inline `import('axe-core')` type queries keep this a script file so
 * the ambient declaration actually applies.
 */

declare module 'jest-axe' {
  type AxeResults = import('axe-core').AxeResults;
  type RunOptions = import('axe-core').RunOptions;
  type Spec = import('axe-core').Spec;

  export interface JestAxeConfigureOptions extends RunOptions {
    globalOptions?: Spec & { brand?: string; application?: string };
    /** jest-axe-specific: only violations with these impact levels are reported */
    impactLevels?: Array<'minor' | 'moderate' | 'serious' | 'critical'>;
  }

  export function configureAxe(
    options?: JestAxeConfigureOptions
  ): (el: HTMLElement) => Promise<AxeResults>;

  export function axe(el: HTMLElement): Promise<AxeResults>;

  export const toHaveNoViolations: Record<
    string,
    (result: AxeResults) => { pass: boolean; message: () => string }
  >;
}
