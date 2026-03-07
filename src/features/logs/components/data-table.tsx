'use client';

import { DataTable } from "@/components/common/data-table";
import { useSearchParams } from "next/navigation";
import { useAccessLogList } from "../api";
import * as React from "react";
import PageLogsFilterTable from "@/features/logs/components/filter-table";
import { columns } from "@/features/logs/components/column-table";
import { AccessLogResponse } from "../types";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export function PageLogsDataTable({ className, ...props }: React.ComponentProps<"div">) {
	const searchParams = useSearchParams();

	// ✅ Memoized request (IMPORTANT: prevent infinite SWR re-fetch)
	const request = React.useMemo(() => ({
		page: Number(searchParams.get("page") ?? 1),
		perPage: Number(searchParams.get("perPage") ?? 10),
		filter: searchParams.get("filter"),
		expands: "user",
	}), [searchParams]);

	const { data: response, isLoading, isError } = useAccessLogList(request);

	// Dialog states
	const [selectedLog, setSelectedLog] = React.useState<AccessLogResponse | null>(null);
	const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);

	const handleViewDetails = (log: AccessLogResponse) => {
		setSelectedLog(log);
		setIsDetailsDialogOpen(true);
	};

	const logColumns = React.useMemo(() =>
		columns({ onViewDetails: handleViewDetails }),
		[]
	);

	return (
		<div className={className} {...props}>
			<div className="flex justify-between items-center mb-4">
				<PageLogsFilterTable className="my-0" />
			</div>

			{isLoading && (
				<div>Loading...</div>
			)}

			{isError && (
				<div>Something went wrong.</div>
			)}

			{!isLoading && response?.success && (
				<>
					<DataTable
						data={response.data}
						columns={logColumns}
						pagination={response.pagination}
					/>

					{/* Details Dialog */}
					<Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
						<DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle>Access Log Details</DialogTitle>
							</DialogHeader>
							{selectedLog && (
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-sm text-muted-foreground">ID</p>
											<p className="font-medium">{selectedLog.id}</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">HTTP Method</p>
											<Badge variant="outline">{selectedLog.httpMethod}</Badge>
										</div>
									</div>

									<div>
										<p className="text-sm text-muted-foreground">URI</p>
										<p className="font-medium">{selectedLog.uri}</p>
									</div>

									{selectedLog.queryParams && (
										<div>
											<p className="text-sm text-muted-foreground">Query Params</p>
											<p className="font-mono text-sm">{selectedLog.queryParams}</p>
										</div>
									)}

									{selectedLog.requestBody && (
										<div>
											<p className="text-sm text-muted-foreground">Request Body</p>
											<pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
												{selectedLog.requestBody}
											</pre>
										</div>
									)}

									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-sm text-muted-foreground">Status Code</p>
											<p className={`font-medium ${selectedLog.statusCode >= 400 ? 'text-red-500' : 'text-green-500'}`}>
												{selectedLog.statusCode}
											</p>
										</div>
										<div>
											<p className="text-sm text-muted-foreground">Response Time</p>
											<p className="font-medium">{selectedLog.responseTimeMs} ms</p>
										</div>
									</div>

									<div>
										<p className="text-sm text-muted-foreground">IP Address</p>
										<p className="font-medium">{selectedLog.ipAddress}</p>
									</div>

									<div>
										<p className="text-sm text-muted-foreground">User Agent</p>
										<p className="text-sm">{selectedLog.userAgent}</p>
									</div>

									{selectedLog.errorMessage && (
										<div>
											<p className="text-sm text-muted-foreground">Error Message</p>
											<p className="text-red-500">{selectedLog.errorMessage}</p>
										</div>
									)}

									<div>
										<p className="text-sm text-muted-foreground">User</p>
										<p className="font-medium">{selectedLog.user?.name ?? 'Anonymous'}</p>
										<p className="text-sm text-muted-foreground">{selectedLog.user?.email ?? '-'}</p>
									</div>

									<div>
										<p className="text-sm text-muted-foreground">Timestamp</p>
										<p className="font-medium">
											{new Date(selectedLog.createdAt).toLocaleString("id-ID")}
										</p>
									</div>
								</div>
							)}
						</DialogContent>
					</Dialog>
				</>
			)}
		</div>
	);
}
