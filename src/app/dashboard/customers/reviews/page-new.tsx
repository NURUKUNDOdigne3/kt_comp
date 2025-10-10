"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  Loader2,
  MessageSquare,
  Eye,
  Check,
  X,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useReviews,
  useReview,
  useUpdateReviewStatus,
  useDeleteReview,
} from "@/hooks/use-api";

export default function CustomerReviewsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch data
  const {
    data: reviewsData,
    isLoading,
    mutate: refetchReviews,
  } = useReviews({
    search,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit: 20,
  });

  const { data: reviewDetails } = useReview(selectedReview?.id);
  const { trigger: updateReviewStatus } = useUpdateReviewStatus(
    selectedReview?.id || ""
  );
  const { trigger: deleteReview } = useDeleteReview(selectedReview?.id || "");

  const reviews = reviewsData?.reviews || [];
  const pagination = reviewsData?.pagination;

  // Handlers
  const handleViewReview = (review: any) => {
    setSelectedReview(review);
    setIsViewModalOpen(true);
  };

  const handleApprove = async (review: any) => {
    try {
      await updateReviewStatus({ status: "APPROVED" });
      refetchReviews();
    } catch (error) {
      console.error("Failed to approve review:", error);
      alert("Failed to approve review");
    }
  };

  const handleReject = async (review: any) => {
    try {
      await updateReviewStatus({ status: "REJECTED" });
      refetchReviews();
    } catch (error) {
      console.error("Failed to reject review:", error);
      alert("Failed to reject review");
    }
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReview();
      setIsDeleteDialogOpen(false);
      setSelectedReview(null);
      refetchReviews();
    } catch (error) {
      console.error("Failed to delete review:", error);
      alert("Failed to delete review");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge variant="default">Approved</Badge>;
      case "PENDING":
        return <Badge variant="secondary">Pending</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/dashboard/customers">
                        Customers
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Reviews</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Customer Reviews</CardTitle>
                      <CardDescription>
                        Manage and moderate customer reviews
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Filters */}
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search reviews..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Table */}
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold">No reviews found</h3>
                      <p className="text-sm text-muted-foreground">
                        {search || statusFilter !== "all"
                          ? "Try adjusting your filters"
                          : "No reviews submitted yet"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Customer</TableHead>
                              <TableHead>Product</TableHead>
                              <TableHead>Rating</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {reviews.map((review: any) => (
                              <TableRow key={review.id}>
                                <TableCell className="font-medium">
                                  {review.user?.name || "N/A"}
                                </TableCell>
                                <TableCell>{review.product?.name}</TableCell>
                                <TableCell>{renderStars(review.rating)}</TableCell>
                                <TableCell>
                                  {formatDate(review.createdAt)}
                                </TableCell>
                                <TableCell>
                                  {getStatusBadge(review.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleViewReview(review)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    {review.status === "PENDING" && (
                                      <>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-green-600 hover:text-green-700"
                                          onClick={() => {
                                            setSelectedReview(review);
                                            handleApprove(review);
                                          }}
                                        >
                                          <Check className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-red-600 hover:text-red-700"
                                          onClick={() => {
                                            setSelectedReview(review);
                                            handleReject(review);
                                          }}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive"
                                      onClick={() => {
                                        setSelectedReview(review);
                                        setIsDeleteDialogOpen(true);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
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
                            Showing {reviews.length} of {pagination.total} reviews
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

            {/* View Review Details Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Review Details</DialogTitle>
                  <DialogDescription>
                    View complete review information
                  </DialogDescription>
                </DialogHeader>
                {reviewDetails ? (
                  <div className="space-y-4">
                    {/* Product Info */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Product
                      </p>
                      <p className="text-sm mt-1">{reviewDetails.product?.name}</p>
                    </div>

                    {/* Customer Info */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Customer
                      </p>
                      <p className="text-sm mt-1">
                        {reviewDetails.user?.name || "N/A"} (
                        {reviewDetails.user?.email})
                      </p>
                    </div>

                    {/* Rating */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Rating
                      </p>
                      <div className="mt-1">
                        {renderStars(reviewDetails.rating)}
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Comment
                      </p>
                      <p className="text-sm mt-1">
                        {reviewDetails.comment || "No comment provided"}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Status
                      </p>
                      <div className="mt-1">
                        {getStatusBadge(reviewDetails.status)}
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Submitted
                      </p>
                      <p className="text-sm mt-1">
                        {formatDate(reviewDetails.createdAt)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this review. This action cannot
                    be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setSelectedReview(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteReview}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SidebarInset>
        </SidebarProvider>
      </DashboardGuard>
    </AuthProvider>
  );
}
