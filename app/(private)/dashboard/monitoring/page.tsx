import SummaryCards from "@/components/dashboard/monitoring/SummaryCards";
import AnnotationCard from "@/components/dashboard/monitoring/AnnotationCard";
import VersionTable from "@/components/dashboard/monitoring/VersionTable";

export default function MonitoringPage() {
    return (
        <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-8 lg:px-10">
            <section>
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold">Monitoring</h1>
                    <p className="text-sm text-muted-foreground">Overview of model health and recent activity</p>
                </div>

                <SummaryCards />
            </section>

            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-3">
                    <AnnotationCard />
                </div>

                <div className="lg:col-span-3">
                    <VersionTable />
                </div>
            </section>
        </div>
    );
}
