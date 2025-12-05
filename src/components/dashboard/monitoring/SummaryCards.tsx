"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function SummaryCards() {
    const cards = [
        {
            id: "accuracy",
            label: "Accuracy",
            value: "85%",
            img: "/monitoring/accuracy.png",
            bg: "from-primary to-primary/80",
            labelClass: "text-2xl font-semibold text-slate-900",
            valueClass: "text-2xl font-semibold text-slate-900",
        },
        {
            id: "predictions",
            label: "Predictions Count",
            value: "12",
            img: "/monitoring/predictions-count.png",
            bg: "from-emerald-500 to-emerald-500/80",
            labelClass: "text-sm font-medium text-slate-700",
            valueClass: "mt-2 text-2xl font-semibold text-slate-900",
        },
        {
            id: "errors",
            label: "Errors",
            value: "5%",
            img: "/monitoring/error.png",
            bg: "from-sky-400 to-sky-400/80",
            labelClass: "text-sm font-medium text-slate-700",
            valueClass: "mt-2 text-2xl font-semibold text-slate-900",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cards.map((c) => (
                <Card key={c.id} className="rounded-2xl">
                    <CardHeader className="pb-0">
                        <div className="flex items-start gap-4">
                            <div className={`h-[42px] max-w-[42px] w-full rounded-[100%] bg-linear-to-br ${c.bg} text-white flex items-center justify-center`}>
                                <div className="h-[22px] w-[22px] relative">
                                    <Image src={c.img} alt={c.label} fill />
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className={c.labelClass}>{c.label}</p>
                                <p className={c.valueClass}>{c.value}</p>
                            </div>

                            <div className="ml-auto flex items-end">
                                <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-sm text-white">
                                    <span>Month</span>
                                    <ChevronDown className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent />
                </Card>
            ))}
        </div>
    );
}
