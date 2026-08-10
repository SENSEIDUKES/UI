"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react";

import { cn } from "../styles/cn";
import { seiLayer } from "../styles/layering";
import { focusRing, mobileTouchTarget, transitionSurface } from "../styles/variants";

export type SEIToastTone = "default" | "info" | "success" | "warning" | "danger";

export interface SEIToastRecord {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  tone: SEIToastTone;
  action?: ReactNode;
  /** Milliseconds before auto-dismiss. Use 0 to keep the toast until dismissed. */
  duration: number;
}

export type SEIToastInput = Omit<Partial<SEIToastRecord>, "id" | "title"> & {
  id?: string;
  title: ReactNode;
};

export type SEIToastAction =
  | { type: "add"; toast: SEIToastRecord; limit: number }
  | { type: "dismiss"; id: string }
  | { type: "clear" };

export function toastReducer(
  state: readonly SEIToastRecord[],
  action: SEIToastAction,
): SEIToastRecord[] {
  switch (action.type) {
    case "add": {
      const next = [action.toast, ...state.filter((toast) => toast.id !== action.toast.id)];
      return next.slice(0, action.limit);
    }
    case "dismiss":
      return state.filter((toast) => toast.id !== action.id);
    case "clear":
      return [];
    default:
      return [...state];
  }
}

interface SEIToastContextValue {
  toast: (input: SEIToastInput) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

const SEIToastContext = createContext<SEIToastContextValue | null>(null);

export interface SEIToastProviderProps {
  children: ReactNode;
  limit?: number;
  defaultDuration?: number;
}

let toastIdSeed = 0;

function nextToastId() {
  toastIdSeed += 1;
  return `sei-toast-${toastIdSeed}`;
}

export function SEIToastProvider({
  children,
  limit = 4,
  defaultDuration = 4200,
}: SEIToastProviderProps) {
  const [toasts, dispatch] = useReducer(toastReducer, []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dismiss = useCallback((id: string) => {
    dispatch({ type: "dismiss", id });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const toast = useCallback(
    (input: SEIToastInput) => {
      const id = input.id ?? nextToastId();
      dispatch({
        type: "add",
        limit,
        toast: {
          id,
          title: input.title,
          description: input.description,
          tone: input.tone ?? "default",
          action: input.action,
          duration: input.duration ?? defaultDuration,
        },
      });
      return id;
    },
    [defaultDuration, limit],
  );

  const value = useMemo(() => ({ toast, dismiss, clear }), [clear, dismiss, toast]);

  return (
    <SEIToastContext.Provider value={value}>
      {children}
      {mounted
        ? createPortal(<SEIToastViewport toasts={toasts} onDismiss={dismiss} />, document.body)
        : null}
    </SEIToastContext.Provider>
  );
}

export function useSEIToast() {
  const value = useContext(SEIToastContext);
  if (!value) {
    throw new Error("useSEIToast must be used within SEIToastProvider");
  }
  return value;
}

const toneClass: Record<SEIToastTone, string> = {
  default: "border-white/12 bg-[rgba(18,20,26,0.97)] text-[var(--sh-color-ivory)]",
  info: "border-[rgba(0,122,255,0.24)] bg-[rgba(8,16,30,0.97)] text-[var(--sh-color-ivory)]",
  success: "border-[rgba(52,199,89,0.26)] bg-[rgba(11,35,20,0.97)] text-[var(--sh-color-ivory)]",
  warning: "border-[rgba(255,159,10,0.3)] bg-[rgba(40,28,8,0.97)] text-[var(--sh-color-ivory)]",
  danger: "border-[rgba(255,69,58,0.32)] bg-[rgba(42,13,13,0.97)] text-[var(--sh-color-ivory)]",
};

const toneIcon = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: XCircle,
} as const;

const toneIconClass: Record<SEIToastTone, string> = {
  default: "text-[var(--sh-color-mist)]",
  info: "text-[var(--sh-interactive-text)]",
  success: "text-[var(--sh-color-success)]",
  warning: "text-[var(--sh-color-warning)]",
  danger: "text-[var(--sh-color-danger)]",
};

function SEIToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: readonly SEIToastRecord[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2",
        "pb-[var(--sh-safe-bottom)] sm:bottom-5 sm:right-5",
        seiLayer.toast,
      )}
    >
      {toasts.map((toast) => (
        <SEIToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function SEIToastItem({
  toast,
  onDismiss,
}: {
  toast: SEIToastRecord;
  onDismiss: (id: string) => void;
}) {
  const remainingMs = useRef(toast.duration);
  const startedAt = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const Icon = toneIcon[toast.tone];

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    if (startedAt.current != null) {
      remainingMs.current = Math.max(0, remainingMs.current - (Date.now() - startedAt.current));
      startedAt.current = null;
    }
    clearTimer();
  }, [clearTimer]);

  const resume = useCallback(() => {
    if (toast.duration <= 0 || remainingMs.current <= 0 || startedAt.current != null) return;
    clearTimer();
    startedAt.current = Date.now();
    timeoutRef.current = setTimeout(() => onDismiss(toast.id), remainingMs.current);
  }, [clearTimer, onDismiss, toast.duration, toast.id]);

  useEffect(() => {
    remainingMs.current = toast.duration;
    resume();
    return clearTimer;
  }, [clearTimer, resume, toast.duration]);

  return (
    <div
      role={toast.tone === "danger" ? "alert" : "status"}
      aria-live={toast.tone === "danger" ? "assertive" : "polite"}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      className={cn(
        "pointer-events-auto rounded-2xl border p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2",
        toneClass[toast.tone],
      )}
    >
      <div className="flex items-start gap-3">
        <Icon
          aria-hidden="true"
          className={cn("mt-0.5 size-4 shrink-0", toneIconClass[toast.tone])}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-white">{toast.title}</p>
          {toast.description ? (
            <p className="mt-1 text-sm leading-relaxed text-[var(--sh-color-cloud)]">
              {toast.description}
            </p>
          ) : null}
          {toast.action ? <div className="mt-3">{toast.action}</div> : null}
        </div>
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={() => onDismiss(toast.id)}
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[var(--sh-color-mist)] hover:bg-white/[0.08] hover:text-white",
            mobileTouchTarget,
            focusRing,
            transitionSurface,
          )}
        >
          <X aria-hidden="true" className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
