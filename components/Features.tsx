import {
  Activity,
  Hand,
  Move,
  ShieldCheck,
  SlidersHorizontal,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { product } from "@/config/product";

const iconMap: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  check: CheckCircle2,
  move: Move,
  hand: Hand,
  activity: Activity,
};

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 sm:py-14" aria-labelledby="features-heading">
      <h2 id="features-heading" className="text-2xl font-extrabold text-center mb-8">
        أهم المميزات
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.features.map((feature) => {
          const Icon = iconMap[feature.icon] ?? CheckCircle2;
          return (
            <div
              key={feature.title}
              className="flex items-start gap-3 rounded-xl border border-border-subtle p-4"
            >
              <span className="shrink-0 grid place-items-center size-10 rounded-lg bg-red-50 text-brand-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-sm">{feature.title}</h3>
                <p className="text-sm text-neutral-500 mt-0.5">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
