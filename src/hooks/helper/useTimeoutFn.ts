// hooks/useTimeoutFn.ts
import { useCallback, useEffect, useRef } from 'react'

export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

export default function useTimeoutFn(
    fn: Function,
    ms: number = 0
): UseTimeoutFnReturn {
    const ready = useRef<boolean | null>(false)
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const callback = useRef(fn)

    // Update callback ref when fn changes
    useEffect(() => {
        callback.current = fn
    }, [fn])

    const set = useCallback(() => {
        ready.current = false
        // Clear existing timeout
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        // Set new timeout
        timeout.current = setTimeout(() => {
            ready.current = true
            callback.current()
        }, ms)
    }, [ms])

    const clear = useCallback(() => {
        ready.current = null
        if (timeout.current) {
            clearTimeout(timeout.current)
            timeout.current = null
        }
    }, [])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    // Set timeout on mount and clear on unmount
    useEffect(() => {
        set()
        return clear
    }, [ms, set, clear])

    const isReady = useCallback(() => ready.current, [])

    return [isReady, clear, reset]
}