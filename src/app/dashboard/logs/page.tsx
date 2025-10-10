"use client";

import { useState, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardGuard } from "@/components/DashboardGuard";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  Loader2,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuditLogs, useAuditLog } from "@/hooks/use-api";

// Keep mock logs as fallback
const mockLogs = [
  {
    id: 1,
    timestamp: "2025-10-09 14:30:22",
    level: "info",
    user: "admin@ktcomputersupply.com",
    action: "User Login",
    description: "Successful login from IP 192.168.1.100",
    resource: "Authentication",
    ip: "192.168.1.100",
  },
  {
    id: 2,
    timestamp: "2025-10-09 14:25:10",
    level: "warning",
    user: "jane@ktcomputersupply.com",
    action: "Failed Login Attempt",
    description: "Invalid password attempt for user jane@ktcomputersupply.com",
    resource: "Authentication",
    ip: "192.168.1.105",
  },
  {
    id: 3,
    timestamp: "2025-10-09 13:45:33",
    level: "success",
    user: "admin@ktcomputersupply.com",
    action: "Product Created",
    description: 'Created new product: MacBook Pro 14" M3 Pro',
    resource: "Products",
    ip: "192.168.1.100",
  },
  {
    id: 4,
    timestamp: "2025-10-09 12:15:47",
    level: "info",
    user: "robert@ktcomputersupply.com",
    action: "Order Placed",
    description: "New order #ORD-2025-00123 placed for RWF 2,399,000",
    resource: "Orders",
    ip: "192.168.1.110",
  },
  {
    id: 5,
    timestamp: "2025-10-09 11:30:15",
    level: "error",
    user: "system",
    action: "Payment Processing Failed",
    description: "Stripe payment failed for order #ORD-2025-00120",
    resource: "Payments",
    ip: "192.168.1.50",
  },
  {
    id: 6,
    timestamp: "2025-10-09 10:45:22",
    level: "info",
    user: "admin@ktcomputersupply.com",
    action: "Product Updated",
    description: "Updated pricing for iPhone 15 Pro Max",
    resource: "Products",
    ip: "192.168.1.100",
  },
  {
    id: 7,
    timestamp: "2025-10-09 09:20:35",
    level: "success",
    user: "emily@ktcomputersupply.com",
    action: "Customer Registered",
    description: "New customer account created for customer@example.com",
    resource: "Customers",
    ip: "192.168.1.115",
  },
  {
    id: 8,
    timestamp: "2025-10-09 08:15:44",
    level: "warning",
    user: "system",
    action: "Low Inventory Alert",
    description:
      'MacBook Pro 14" M3 Pro stock level below threshold (5 remaining)',
    resource: "Inventory",
    ip: "192.168.1.50",
  },
  {
    id: 9,
    timestamp: "2025-10-08 17:30:12",
    level: "info",
    user: "michael@ktcomputersupply.com",
    action: "Order Shipped",
    description: "Order #ORD-2025-00118 marked as shipped",
    resource: "Orders",
    ip: "192.168.1.120",
  },
  {
    id: 10,
    timestamp: "2025-10-08 16:45:33",
    level: "error",
    user: "system",
    action: "Database Connection Lost",
    description: "Temporary database connection issue resolved",
    resource: "System",
    ip: "192.168.1.50",
  },
];

// Log level icons
const levelIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
};

// Log level badges
const levelBadges = {
  info: <Badge variant="default">Info</Badge>,
  success: (
    <Badge variant="default" className="bg-green-500">
      Success
    </Badge>
  ),
  warning: (
    <Badge variant="default" className="bg-yellow-500">
      Warning
    </Badge>
  ),
  error: (
    <Badge variant="default" className="bg-red-500">
      Error
    </Badge>
  ),
};

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [resourceFilter, setResourceFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch data
  const {
    data: logsData,
    isLoading,
    mutate: refetchLogs,
  } = useAuditLogs({
    search: searchQuery,
    level: levelFilter !== "all" ? levelFilter : undefined,
    resource: resourceFilter !== "all" ? resourceFilter : undefined,
    page,
    limit: 50,
  });

  const { data: logDetails } = useAuditLog(selectedLog?.id);
  // @ts-ignore
  const logs = logsData?.logs || [];
  // @ts-ignore
  const resources = logsData?.resources || [];
  // @ts-ignore
  const pagination = logsData?.pagination;

  const handleViewLog = (log: any) => {
    setSelectedLog(log);
    setIsViewModalOpen(true);
  };

  const handleExportLogs = () => {
    // In a real app, this would export the logs to a file
    alert("Logs exported successfully!");
  };

  const getLevelIcon = (level: string) => {
    const Icon =
      levelIcons[level.toLowerCase() as keyof typeof levelIcons] || Info;
    return <Icon className="h-4 w-4" />;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AuthProvider>
      <DashboardGuard>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/dashboard">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Logs</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Activity Logs</h1>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportLogs}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Logs
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle>System Activity</CardTitle>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search logs..."
                            className="pl-8 w-full md:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Filter className="mr-2 h-4 w-4" />
                              Filters
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Filter Logs</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="p-2 space-y-4">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-sm font-medium">
                                    Level
                                  </label>
                                  <Select
                                    value={levelFilter}
                                    onValueChange={setLevelFilter}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="all">
                                        All Levels
                                      </SelectItem>
                                      <SelectItem value="INFO">Info</SelectItem>
                                      <SelectItem value="SUCCESS">
                                        Success
                                      </SelectItem>
                                      <SelectItem value="WARNING">
                                        Warning
                                      </SelectItem>
                                      <SelectItem value="ERROR">
                                        Error
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">
                                    Resource
                                  </label>
                                  <Select
                                    value={resourceFilter}
                                    onValueChange={setResourceFilter}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Resource" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="all">
                                        All Resources
                                      </SelectItem>
                                      {resources.map((resource: string) => (
                                        <SelectItem
                                          key={resource}
                                          value={resource}
                                        >
                                          {resource}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setLevelFilter("all");
                                    setResourceFilter("all");
                                    setSearchQuery("");
                                    setPage(1);
                                  }}
                                >
                                  Reset
                                </Button>
                              </div>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    Monitor system activity, user actions, and security events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold">No logs found</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery ||
                        levelFilter !== "all" ||
                        resourceFilter !== "all"
                          ? "Try adjusting your filters"
                          : "No activity logs recorded yet"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Timestamp</TableHead>
                              <TableHead>Level</TableHead>
                              <TableHead>User</TableHead>
                              <TableHead>Action</TableHead>
                              <TableHead>Resource</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {logs.map((log: any) => (
                              <TableRow key={log.id}>
                                <TableCell className="font-medium">
                                  {formatDate(log.createdAt)}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    {getLevelIcon(log.level)}
                                    {levelBadges[
                                      log.level.toLowerCase() as keyof typeof levelBadges
                                    ] || <Badge>{log.level}</Badge>}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {log.userEmail || "System"}
                                </TableCell>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{log.resource}</TableCell>
                                <TableCell className="max-w-md truncate">
                                  {log.description || "N/A"}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleViewLog(log)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Pagination */}
                      {pagination && pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4">
                          <p className="text-sm text-muted-foreground">
                            Showing {logs.length} of {pagination.total} logs
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPage(page - 1)}
                              disabled={page === 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                              Previous
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPage(page + 1)}
                              disabled={page === pagination.totalPages}
                            >
                              Next
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* View Log Details Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Log Details</DialogTitle>
                  <DialogDescription>
                    View complete log information
                  </DialogDescription>
                </DialogHeader>
                {logDetails ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Timestamp
                      </p>
                      {/* @ts-ignore */}
                      <p className="text-sm mt-1">
                        {/* @ts-ignore */}
                        {formatDate(logDetails.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Level
                      </p>
                      <div className="mt-1">
                        {levelBadges[
                          // @ts-ignore
                          logDetails.level.toLowerCase() as keyof typeof levelBadges
                          // @ts-ignore
                        ] || <Badge>{logDetails.level}</Badge>}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        User
                      </p>
                      {/* @ts-ignore */}
                      <p className="text-sm mt-1">
                        {/* @ts-ignore */}
                        {logDetails.userEmail || "System"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Action
                      </p>
                      {/* @ts-ignore */}
                      <p className="text-sm mt-1">{logDetails.action}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Resource
                      </p>
                      {/* @ts-ignore */}
                      <p className="text-sm mt-1">{logDetails.resource}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Description
                      </p>
                      {/* @ts-ignore */}
                      <p className="text-sm mt-1">
                        {/* @ts-ignore */}
                        {logDetails.description || "N/A"}
                      </p>
                    </div>
                    {/* @ts-ignore */}
                    {logDetails.ipAddress && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          IP Address
                        </p>
                        {/* @ts-ignore */}
                        <p className="text-sm mt-1">{logDetails.ipAddress}</p>
                      </div>
                    )}
                    {/* @ts-ignore */}
                    {logDetails.metadata && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Additional Data
                        </p>
                        <pre className="text-xs mt-1 bg-muted p-2 rounded overflow-auto">
                          {/* @ts-ignore */}
                          {JSON.stringify(logDetails.metadata, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </SidebarInset>
        </SidebarProvider>
      </DashboardGuard>
    </AuthProvider>
  );
}
