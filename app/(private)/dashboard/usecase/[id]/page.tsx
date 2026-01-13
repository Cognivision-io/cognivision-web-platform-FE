"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CloudUpload,
  Cpu,
  Headphones,
  Play,
  Plus,
  PlusCircle,
  Server,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getUseCaseTemplate } from "@/data/use-case-templates";

const UseCaseDetailPage = () => {
  const params = useParams<{ id: string | string[] }>();

  // Normalize id in case it's ever an array
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const useCase = id ? getUseCaseTemplate(id) : undefined;

  if (!useCase) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to templates
        </Link>

        <section className="flex flex-1 items-center justify-center">
          <div className="max-w-md rounded-3xl border bg-white p-8 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
              Not found
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900">
              Use case template not found
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              The template you’re looking for doesn’t exist or may have been
              removed. Please go back to the templates list and try another one.
            </p>
            <div className="mt-6 flex justify-center">
              <Button asChild className="rounded-full px-6">
                <Link href="/dashboard">Back to templates</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-6 py-8 lg:px-10">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to templates
      </Link>

      <section className="rounded-[36px] border border-[#ebe7ff] bg-linear-to-br from-[#f8f5ff] via-white to-[#eff4ff] p-6 shadow-[0_40px_90px_rgba(71,53,211,0.08)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
              {useCase.tagline}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              {useCase.heroTitle}
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              {useCase.heroDescription}
            </p>

            <div className="flex flex-col gap-4 pt-2">
              <Button
                size="lg"
                type="button"
                asChild
                className="h-12 rounded-lg bg-primary px-6 text-base font-semibold text-white shadow-[0_18px_45px_rgba(91,33,255,0.45)] hover:bg-[#4b1fd8]"
              >
                <Link href="/dashboard/dataset">
                  <Plus className="h-5 w-5" />
                  Create new dataset
                </Link>
              </Button>
              <Button
                size="lg"
                type="button"
                variant="outline"
                asChild
                className="h-12 rounded-lg border-2 border-[#d7ccff] bg-white px-6 text-base font-semibold text-primary hover:border-[#b8a0ff] hover:bg-[#f7f3ff] hover:text-primary"
              >
                <Link href={`/dashboard/usecase/${id}/upload-dataset`}>
                  <CloudUpload className="h-5 w-5" />
                  Upload Pre-built dataset
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#ded7ff] bg-white/90 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
            <div className="rounded-3xl bg-[#0b0f2c] p-5 text-white shadow-[0_25px_55px_rgba(6,11,47,0.55)]">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>{useCase.videoTitle}</span>
                <span className="text-xs text-white/60">
                  {useCase.videoDuration}
                </span>
              </div>
              <div className="mt-8 flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 text-white">
                  <Play className="h-6 w-6" />
                </div>
                <p className="text-xs text-white/70">{useCase.videoSubtitle}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#ece4ff] bg-[#f8f6ff] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {useCase.serverStatus.label}
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      {useCase.serverStatus.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {useCase.serverStatus.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-[#ece4ff] bg-[#f8f6ff] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {useCase.modelStatus.label}
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      {useCase.modelStatus.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {useCase.modelStatus.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 overflow-hidden rounded-3xl border border-[#e7e1ff] bg-linear-to-br from-white via-[#f6f3ff] to-[#e1e9ff] p-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-muted-foreground">
                <span>{useCase.preview.label}</span>
                <span className="text-[11px] text-muted-foreground/70">
                  {useCase.preview.meta}
                </span>
              </div>
              <div className="h-44 w-full overflow-hidden rounded-2xl border border-white/70 bg-white shadow-inner">
                <Image
                  src={useCase.preview.image}
                  alt={`${useCase.title} preview`}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {useCase.preview.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCaseDetailPage;
