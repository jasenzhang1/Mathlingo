import { formatPrice, studentPrice } from "../../lib/billing/tiers";

/**
 * A price, with the student discount shown as a struck-through original next
 * to the discounted amount. Free plans and non-students see the plain price.
 */
export function Price({
  amount,
  student,
  suffix,
  size = "lg",
}: {
  amount: number;
  student: boolean;
  /** e.g. "/month" or " for life". */
  suffix?: string;
  size?: "lg" | "sm";
}) {
  const discounted = student && amount > 0;
  const big = size === "lg" ? "font-display text-3xl" : "font-body font-semibold";
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5">
      {discounted && (
        <s className={`${size === "lg" ? "font-display text-xl" : "font-body"} text-[var(--ink-soft)]`} aria-label={`was ${formatPrice(amount)}`}>
          {formatPrice(amount)}
        </s>
      )}
      <span className={`${big} text-[var(--ink)]`}>{formatPrice(discounted ? studentPrice(amount) : amount)}</span>
      {suffix && <span className="font-body text-sm text-[var(--ink-soft)]">{suffix}</span>}
    </span>
  );
}
