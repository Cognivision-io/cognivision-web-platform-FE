import Link from "next/link";
import {
  BarChart3,
  ChevronRight,
  Factory,
  HardHat,
  Microscope,
  ShieldCheck,
  Sprout,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCaseTemplates } from "@/data/use-case-templates";

const upcomingUseCases = [
  {
    title: "Construction",
    description:
      "Verify 3D scans, monitor safety zones, and validate site progress.",
    icon: HardHat,
  },
  {
    title: "Agriculture",
    description:
      "Detect crop health, yield, and ripeness directly from field footage.",
    icon: Sprout,
  },
  {
    title: "Manufacturing",
    description:
      "Catch defects on assembly lines with high-speed anomaly detection.",
    icon: Factory,
  },
  {
    title: "Life Sciences",
    description: "Automate microscopy analytics with multi-class segmentation.",
    icon: Microscope,
  },
  {
    title: "Security",
    description:
      "Power ethical surveillance with redaction and context alerts.",
    icon: ShieldCheck,
  },
];

const DashboardPage = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-10 px-6 py-8 lg:px-10">
      <section className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
            Explore templates
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Pick a use case template
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose the industry workflow you want to launch—each option opens a
            tailored Cognivision experience.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {useCaseTemplates.map((useCase) => (
            <Link
              key={useCase.id}
              href={`/dashboard/usecase/${useCase.id}`}
              className="group rounded-3xl border border-border bg-white p-5 text-left transition-all hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ecebed] bg-white text-primary">
                  <useCase.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{useCase.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Tap to explore workflow
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {useCase.description}
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                <span>Open template</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center gap-3">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Upcoming use cases</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {upcomingUseCases.map((useCase) => (
            <Card
              key={useCase.title}
              className="transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-3 flex h-24 w-full items-center justify-center rounded-lg bg-muted">
                  <useCase.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-base">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  {useCase.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
