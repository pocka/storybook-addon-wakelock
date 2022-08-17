interface PresetOptions {
  polyfill: boolean;
}

const defaultOptions: PresetOptions = {
  polyfill: false,
};

export function managerEntries(entries: unknown[] = [], options: Partial<PresetOptions>) {
  const { polyfill }: PresetOptions = {
    polyfill: options.polyfill ?? defaultOptions.polyfill,
  };

  return [...entries, polyfill ? require.resolve("../esm/manager-polyfill") : require.resolve("../esm/manager")];
}
