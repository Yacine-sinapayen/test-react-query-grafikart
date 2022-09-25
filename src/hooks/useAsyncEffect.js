import { useEffect } from "react";

export function useAsyncEffect(cb, deps = []) {
  useEffect(() => {
    cb();
  }, deps);
}
