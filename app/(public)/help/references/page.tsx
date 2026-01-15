import { DocPageHeader } from "@/components/docs/DocPageHeader"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ReferencesPage() {
  return (
    <div className="space-y-10 pb-16">
      <DocPageHeader
        id="general"
        className="scroll-mt-32"
        heading="Developer References"
        text="Technical specifications, limits, and system status."
      />

      <section id="status" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-lg font-semibold text-[#111827]">
          System Status
        </h3>
        <div className="rounded-2xl border border-[#e6e8f2] bg-[#f6f7fb] p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[#111827]">
              Current Status
            </h4>
            <span className="rounded-full border border-[#5b2fe8] px-3 py-1 text-[11px] font-semibold text-[#5b2fe8]">
              All Systems Operational
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-6 text-[13px] text-[#111827]">
            {["API Gateway", "Image Processor", "Database"].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border border-[#5b2fe8] bg-white" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-[#ececf5]" />

      <section id="support" className="scroll-mt-32 space-y-3">
        <h3 className="scroll-m-20 text-lg font-semibold text-[#111827]">
          Support
        </h3>
        <p className="text-sm text-[#6b7280]">
          Reach our technical team for onboarding help, troubleshooting, and
          escalation guidance.
        </p>
        <div className="rounded-2xl border border-[#e6e8f2] bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-sm font-semibold text-[#111827]">
                Priority Support
              </div>
              <div className="text-xs text-[#6b7280]">
                Average response time under 2 hours.
              </div>
            </div>
            <span className="text-xs font-semibold text-[#5b2fe8]">
              support@cognivision.ai
            </span>
          </div>
        </div>
      </section>

      <section id="api" className="scroll-mt-32 space-y-2">
        <h3 className="scroll-m-20 text-lg font-semibold text-[#111827]">
          API
        </h3>
        <p className="text-sm text-[#6b7280]">
          Response codes, usage limits, and versioning for stable integrations.
        </p>
      </section>

      <section id="error-codes" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-lg font-semibold text-[#111827]">
          Error Codes
        </h3>
        <p className="text-sm text-[#6b7280]">
          When the API encounters an error, it returns a standard HTTP response
          code along with a JSON object containing more details.
        </p>
        <div className="rounded-2xl border border-[#c9bdf7] bg-white">
          <Table className="text-[13px]">
            <TableHeader className="[&_tr]:border-[#ececf5]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[90px] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5b2fe8]">
                  Code
                </TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5b2fe8]">
                  Type
                </TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5b2fe8]">
                  Description
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_tr]:border-[#ececf5]">
              {[
                {
                  code: "400",
                  type: "Bad Request",
                  desc: "The request was unacceptable, often due to missing a required parameter.",
                },
                {
                  code: "401",
                  type: "Unauthorized",
                  desc: "No valid API key provided.",
                },
                {
                  code: "402",
                  type: "Request Failed",
                  desc: "The parameters were valid but the request failed.",
                },
                {
                  code: "404",
                  type: "Not Found",
                  desc: "The requested resource doesn't exist.",
                },
                {
                  code: "429",
                  type: "Too Many Requests",
                  desc: "Too many requests hit the API too quickly.",
                },
                {
                  code: "500",
                  type: "Server Error",
                  desc: "Something went wrong on our end.",
                },
              ].map((row) => (
                <TableRow key={row.code} className="hover:bg-transparent">
                  <TableCell className="font-mono font-semibold text-[#111827]">
                    {row.code}
                  </TableCell>
                  <TableCell className="text-[#111827]">{row.type}</TableCell>
                  <TableCell className="text-[#6b7280]">{row.desc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section id="limits" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-lg font-semibold text-[#111827]">
          Rate Limits
        </h3>
        <div className="flex items-start gap-3 rounded-2xl border border-[#c9bdf7] bg-white p-4 text-sm">
          <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#5b2fe8] text-[12px] font-semibold text-[#5b2fe8]">
            &gt;
          </span>
          <div>
            <div className="text-sm font-semibold text-[#5b2fe8]">Heads up!</div>
            <p className="text-[13px] text-[#6b7280]">
              We enforce rate limits to ensure stability for all users. If you
              exceed these limits, you will receive a 429 error.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Free", subtitle: "For hobbyists", value: "100" },
            { title: "Pro", subtitle: "For startups", value: "1,000" },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-[#c9bdf7] bg-white p-4"
            >
              <div className="text-lg font-semibold text-[#111827]">
                {card.title}
              </div>
              <p className="text-xs text-[#9aa1b2]">{card.subtitle}</p>
              <div className="mt-3 text-2xl font-semibold text-[#111827]">
                {card.value}
              </div>
              <p className="text-xs text-[#9aa1b2]">requests/min</p>
            </div>
          ))}
        </div>
      </section>

      <section id="versioning" className="scroll-mt-32 space-y-3">
        <h3 className="scroll-m-20 text-lg font-semibold text-[#111827]">
          Versioning
        </h3>
        <p className="text-sm text-[#6b7280]">
          We follow semantic versioning with clear deprecation windows.
        </p>
        <div className="rounded-2xl border border-[#e6e8f2] bg-white p-4">
          <ul className="space-y-2 text-[13px] text-[#111827]">
            <li>Major releases introduce breaking API changes.</li>
            <li>Minor releases add backward-compatible features.</li>
            <li>Patch releases address bugs and performance updates.</li>
          </ul>
        </div>
      </section>

      <section id="integrations" className="scroll-mt-32 space-y-2">
        <h3 className="scroll-m-20 text-lg font-semibold text-[#111827]">
          Integrations
        </h3>
        <p className="text-sm text-[#6b7280]">
          Configure real-time integrations and SDK access across platforms.
        </p>
      </section>

      <section id="webhooks" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-lg font-semibold text-[#111827]">
          Webhooks
        </h3>
        <p className="text-sm text-[#6b7280]">
          Listen for events on your account so your integration can
          automatically trigger reactions.
        </p>
        <div className="rounded-2xl bg-[#f4f6fb] p-4">
          <pre className="overflow-auto text-xs font-mono text-[#111827]">
            {`{
  "id": "evt_123456789",
  "object": "event",
  "type": "analysis.completed",
  "data": {
    "object": {
      "id": "ana_123456",
      "status": "succeeded",
      ...
    }
  }
}`}
          </pre>
        </div>
      </section>

      <section id="sdks" className="scroll-mt-32 space-y-4">
        <h3 className="scroll-m-20 text-lg font-semibold text-[#111827]">
          SDKs
        </h3>
        <p className="text-sm text-[#6b7280]">
          Native SDKs for Kotlin, Swift, and React Native with parity features.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Kotlin", "Swift", "React Native"].map((sdk) => (
            <div
              key={sdk}
              className="rounded-2xl border border-[#e6e8f2] bg-white p-4 text-sm font-semibold text-[#111827]"
            >
              {sdk}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
