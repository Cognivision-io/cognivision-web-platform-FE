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
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, CheckCircle2, AlertCircle } from "lucide-react"

export default function ReferencesPage() {
                    return (
                                        <div className="space-y-6 pb-12 px-6">
                                                            <DocPageHeader
                                                                                heading="Developer References"
                                                                                text="Technical specifications, limits, and system status."
                                                            />

                                                            <div className="space-y-8">
                                                                                {/* Status Dashboard Widget Mock */}
                                                                                <section id="status" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        System Status
                                                                                                    </h3>
                                                                                                    <div className="rounded-lg border p-4 bg-muted/50">
                                                                                                                        <div className="flex items-center justify-between mb-4">
                                                                                                                                            <h4 className="font-medium">Current Status</h4>
                                                                                                                                            <Badge variant="outline" className="border-green-500 text-green-500 bg-green-500/10">
                                                                                                                                                                All Systems Operational
                                                                                                                                            </Badge>
                                                                                                                        </div>
                                                                                                                        <div className="grid gap-4 md:grid-cols-3">
                                                                                                                                            <div className="flex items-center gap-2">
                                                                                                                                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                                                                                                                <span className="text-sm">API Gateway</span>
                                                                                                                                            </div>
                                                                                                                                            <div className="flex items-center gap-2">
                                                                                                                                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                                                                                                                <span className="text-sm">Image Processor</span>
                                                                                                                                            </div>
                                                                                                                                            <div className="flex items-center gap-2">
                                                                                                                                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                                                                                                                <span className="text-sm">Database</span>
                                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                    </div>
                                                                                </section>

                                                                                <Separator />

                                                                                <section id="error-codes" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Error Codes
                                                                                                    </h3>
                                                                                                    <p className="leading-7 text-muted-foreground">
                                                                                                                        When the API encounters an error, it returns a standard HTTP response code along with a JSON object containing more details.
                                                                                                    </p>
                                                                                                    <div className="rounded-md border">
                                                                                                                        <Table>
                                                                                                                                            <TableHeader>
                                                                                                                                                                <TableRow>
                                                                                                                                                                                    <TableHead className="w-[100px]">Code</TableHead>
                                                                                                                                                                                    <TableHead>Type</TableHead>
                                                                                                                                                                                    <TableHead>Description</TableHead>
                                                                                                                                                                </TableRow>
                                                                                                                                            </TableHeader>
                                                                                                                                            <TableBody>
                                                                                                                                                                <TableRow>
                                                                                                                                                                                    <TableCell className="font-mono font-medium">400</TableCell>
                                                                                                                                                                                    <TableCell>Bad Request</TableCell>
                                                                                                                                                                                    <TableCell>The request was unacceptable, often due to missing a required parameter.</TableCell>
                                                                                                                                                                </TableRow>
                                                                                                                                                                <TableRow>
                                                                                                                                                                                    <TableCell className="font-mono font-medium">401</TableCell>
                                                                                                                                                                                    <TableCell>Unauthorized</TableCell>
                                                                                                                                                                                    <TableCell>No valid API key provided.</TableCell>
                                                                                                                                                                </TableRow>
                                                                                                                                                                <TableRow>
                                                                                                                                                                                    <TableCell className="font-mono font-medium">402</TableCell>
                                                                                                                                                                                    <TableCell>Request Failed</TableCell>
                                                                                                                                                                                    <TableCell>The parameters were valid but the request failed.</TableCell>
                                                                                                                                                                </TableRow>
                                                                                                                                                                <TableRow>
                                                                                                                                                                                    <TableCell className="font-mono font-medium">404</TableCell>
                                                                                                                                                                                    <TableCell>Not Found</TableCell>
                                                                                                                                                                                    <TableCell>The requested resource doesn't exist.</TableCell>
                                                                                                                                                                </TableRow>
                                                                                                                                                                <TableRow>
                                                                                                                                                                                    <TableCell className="font-mono font-medium">429</TableCell>
                                                                                                                                                                                    <TableCell>Too Many Requests</TableCell>
                                                                                                                                                                                    <TableCell>Too many requests hit the API too quickly.</TableCell>
                                                                                                                                                                </TableRow>
                                                                                                                                                                <TableRow>
                                                                                                                                                                                    <TableCell className="font-mono font-medium">500</TableCell>
                                                                                                                                                                                    <TableCell>Server Error</TableCell>
                                                                                                                                                                                    <TableCell>Something went wrong on our end.</TableCell>
                                                                                                                                                                </TableRow>
                                                                                                                                            </TableBody>
                                                                                                                        </Table>
                                                                                                    </div>
                                                                                </section>

                                                                                <section id="limits" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                                                                                                        Rate Limits
                                                                                                    </h3>
                                                                                                    <Alert>
                                                                                                                        <Terminal className="h-4 w-4" />
                                                                                                                        <AlertTitle>Heads up!</AlertTitle>
                                                                                                                        <AlertDescription>
                                                                                                                                            We enforce rate limits to ensure stability for all users. If you exceed these limits, you will receive a 429 error.
                                                                                                                        </AlertDescription>
                                                                                                    </Alert>
                                                                                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
                                                                                                                        <div className="rounded-xl border bg-card text-card-foreground shadow">
                                                                                                                                            <div className="p-6 pt-0 mt-4">
                                                                                                                                                                <div className="text-2xl font-bold">Free</div>
                                                                                                                                                                <p className="text-xs text-muted-foreground">For hobbyists</p>
                                                                                                                                                                <div className="mt-4 text-3xl font-bold">100</div>
                                                                                                                                                                <p className="text-xs text-muted-foreground">requests/min</p>
                                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className="rounded-xl border bg-card text-card-foreground shadow">
                                                                                                                                            <div className="p-6 pt-0 mt-4">
                                                                                                                                                                <div className="text-2xl font-bold">Pro</div>
                                                                                                                                                                <p className="text-xs text-muted-foreground">For startups</p>
                                                                                                                                                                <div className="mt-4 text-3xl font-bold">1,000</div>
                                                                                                                                                                <p className="text-xs text-muted-foreground">requests/min</p>
                                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                    </div>
                                                                                </section>

                                                                                <section id="webhooks" className="space-y-4">
                                                                                                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Webhooks</h3>
                                                                                                    <p className="text-muted-foreground">
                                                                                                                        Listen for events on your account so your integration can automatically trigger reactions.
                                                                                                    </p>
                                                                                                    <div className="rounded-md bg-muted p-4">
                                                                                                                        <pre className="text-sm font-mono overflow-auto">
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
                                                            </div>
                                        </div>
                    )
}
