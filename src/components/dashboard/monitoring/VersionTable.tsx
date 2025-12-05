"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function VersionTable() {
    return (
        <Card>
            <CardHeader>
                <h3 className="text-base font-semibold">Model Version table</h3>
            </CardHeader>
            <CardContent>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left text-xs text-muted-foreground">
                            <th className="py-2">Field Name</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="py-3 text-sm font-medium">Version ID / Name</td>
                            <td className="py-3 text-sm text-muted-foreground">Auto-generated or user-labeled version identifier</td>
                            <td className="py-3 text-sm">v1</td>
                        </tr>

                        <tr className="border-t">
                            <td className="py-3 text-sm font-medium">Training Date</td>
                            <td className="py-3 text-sm text-muted-foreground">When this version was trained</td>
                            <td className="py-3 text-sm">2025-10-06</td>
                        </tr>

                        <tr className="border-t">
                            <td className="py-3 text-sm font-medium">Model Type</td>
                            <td className="py-3 text-sm text-muted-foreground">Type of model trained</td>
                            <td className="py-3 text-sm">Object Detection</td>
                        </tr>
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}
