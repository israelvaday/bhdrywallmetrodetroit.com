import { Badge } from "@/components/ui/Badge";
import { Clock } from "lucide-react";

export function HoursBadge({ className }: { className?: string }) {
  return (
    <Badge tone="open" className={className}>
      <Clock className="h-3 w-3" />
      Mon–Sat service
    </Badge>
  );
}
