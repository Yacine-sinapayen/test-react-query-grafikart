import { useCallback, useState } from "react";

export function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue);

  return [
    state,
    useCallback(() => setState((v) => !v), []),
    useCallback(() => setState(initialValue), []),
  ];
}
