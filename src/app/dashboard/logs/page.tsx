"use client";

import { useState, useEffect } from "react";
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
  Calendar,
  User,
  Package,
  ShoppingCart,
  CreditCard,
  Truck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock log data
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
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(mockLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [resourceFilter, setResourceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Get unique resources for filter dropdown
  const resources = ["all", ...new Set(mockLogs.map((log) => log.resource))];

  // Filter logs based on criteria
  useEffect(() => {
    let result = logs;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (log) =>
          log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply level filter
    if (levelFilter !== "all") {
      result = result.filter((log) => log.level === levelFilter);
    }

    // Apply resource filter
    if (resourceFilter !== "all") {
      result = result.filter((log) => log.resource === resourceFilter);
    }

    // Apply date filter (simplified for demo)
    if (dateFilter !== "all") {
      const today = new Date();
      result = result.filter((log) => {
        const logDate = new Date(log.timestamp);
        switch (dateFilter) {
          case "today":
            return logDate.toDateString() === today.toDateString();
          case "yesterday":
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return logDate.toDateString() === yesterday.toDateString();
          case "last7":
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return logDate >= sevenDaysAgo;
          default:
            return true;
        }
      });
    }

    setFilteredLogs(result);
  }, [searchQuery, levelFilter, resourceFilter, dateFilter, logs]);

  const handleExportLogs = () => {
    // In a real app, this would export the logs to a file
    alert("Logs exported successfully!");
  };

  const getLevelIcon = (level: string) => {
    const Icon = levelIcons[level as keyof typeof levelIcons] || Info;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
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
              <Button variant="outline" size="sm" onClick={handleExportLogs}>
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
                                  <SelectItem value="info">Info</SelectItem>
                                  <SelectItem value="success">
                                    Success
                                  </SelectItem>
                                  <SelectItem value="warning">
                                    Warning
                                  </SelectItem>
                                  <SelectItem value="error">Error</SelectItem>
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
                                  {resources.map((resource) => (
                                    <SelectItem key={resource} value={resource}>
                                      {resource === "all"
                                        ? "All Resources"
                                        : resource}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">
                              Date Range
                            </label>
                            <Select
                              value={dateFilter}
                              onValueChange={setDateFilter}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Date Range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="yesterday">
                                  Yesterday
                                </SelectItem>
                                <SelectItem value="last7">
                                  Last 7 Days
                                </SelectItem>
                                <SelectItem value="last30">
                                  Last 30 Days
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setLevelFilter("all");
                                setResourceFilter("all");
                                setDateFilter("all");
                                setSearchQuery("");
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
              <Table className="overflow-x-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getLevelIcon(log.level)}
                          {levelBadges[
                            log.level as keyof typeof levelBadges
                          ] || <Badge>{log.level}</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell className="max-w-md truncate">
                        {log.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
