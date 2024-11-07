export interface Report {
    reportId?: number;
    reportTypeId: number;
    reporterId: number;
    reportedId: number;
    createdAt?: string;
}

export interface ReportList {
    id: number;
    title: string;
    reporterFullName: string;
    reportedFullName: string;
    createdAt: string;
}

