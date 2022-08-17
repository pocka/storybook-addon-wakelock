interface PresetOptions {
  polyfill: boolean;
}

const defaultOptions: PresetOptions = {
  polyfill: false,
};

export function managerEntries(entries: unknown[] = [], options: Partial<PresetOptions>) {
  const {}: PresetOptions = {
    polyfill: options.polyfill ?? defaultOptions.polyfill,
  };

  // TODO: Load manager entry with polyfill when `polyfill` option is active
  return [...entries, require.resolve("../esm/manager")];
}
