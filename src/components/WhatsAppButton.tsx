import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Props = {
  message: string;
  className?: string;
  variant?: "primary" | "ghost" | "outline" | "wa";
  size?: "sm" | "md" | "lg";
  label?: string;
  iconOnly?: boolean;
};

const sizeMap = {
  sm: "px-3 py-2 text-xs gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-5 py-3 text-sm gap-2",
};

const variantMap = {
  primary: "bg-primary text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90",
  ghost: "text-foreground hover:bg-secondary",
  outline: "border border-border bg-card text-foreground hover:bg-secondary",
  wa: "bg-[#25D366] text-white hover:opacity-90",
};

export function WhatsAppButton({
  message,
  className,
  variant = "primary",
  size = "md",
  label = "Pesan via WhatsApp",
  iconOnly = false,
}: Props) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-semibold transition-opacity",
        sizeMap[size],
        variantMap[variant],
        className,
      )}
    >
      <MessageCircle className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {!iconOnly && <span>{label}</span>}
    </a>
  );
}
