"use client";

import { useState } from "react";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  Search,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Users,
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

// FAQ data
const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I add a new product?",
        answer:
          "You can add a new product by navigating to the Products page and clicking the 'Add Product' button. Fill in all required fields including product name, description, price, category, and upload images. You can also use the AI Document Scanner to extract product information from supplier documents.",
      },
      {
        question: "What is the AI Document Scanner?",
        answer:
          "The AI Document Scanner allows you to upload scanned supplier forms and documents. Our AI automatically extracts product information, pricing, and inventory data from invoices and supplier forms, saving you time on manual data entry.",
      },
      {
        question: "How do I view my store analytics?",
        answer:
          "Navigate to the Analytics page from the sidebar to see your store performance dashboard. You'll find metrics like sales revenue, order volume, customer acquisition, and inventory turnover rates.",
      },
    ],
  },
  {
    category: "Product Management",
    questions: [
      {
        question: "How do I search for a specific product?",
        answer:
          "On the Products page, use the search bar to find products by name, SKU, or category. You can also filter by brand, price range, and stock status using the filter dropdowns.",
      },
      {
        question: "Can I edit product information?",
        answer:
          "Yes, click on any product row in the table to open the edit modal. From there, you can update product details, pricing, inventory levels, and images. All changes are logged in your activity history.",
      },
      {
        question: "What happens when a product goes out of stock?",
        answer:
          "Out of stock products are automatically marked with a red 'Out of Stock' badge. You'll receive notifications for products with low inventory levels so you can reorder in time.",
      },
    ],
  },
  {
    category: "Orders & Customers",
    questions: [
      {
        question: "How do I process a new order?",
        answer:
          "Orders are automatically created when customers place them on your storefront. You can view and manage all orders from the Orders page, where you can update status from pending to processing to shipped.",
      },
      {
        question: "How do I manage customer accounts?",
        answer:
          "Navigate to the Customers page to view all registered customers. You can update customer information, view order history, and manage customer groups for targeted marketing campaigns.",
      },
      {
        question: "Can I export order data?",
        answer:
          "Yes, use the Export button on the Orders page to download your order history as a CSV file. You can also generate detailed sales reports from the Analytics page in various formats.",
      },
    ],
  },
  {
    category: "Account & Security",
    questions: [
      {
        question: "How do I change my password?",
        answer:
          "Go to Account Settings from the user menu, then click 'Change Password' in the Security section. Enter your current password and your new password (minimum 8 characters).",
      },
      {
        question: "Can I update my profile information?",
        answer:
          "Yes, visit the Account page and click 'Edit Profile'. You can update your name, email, phone number, and profile picture. Role and permissions are managed by your administrator.",
      },
      {
        question: "Where can I view my activity history?",
        answer:
          "Click on 'Logs' in the sidebar to view your complete activity history, including product updates, order processing, report generations, and login events.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqCategories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        searchQuery === "" ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

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
                  <BreadcrumbPage>Support</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Support</h1>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 px-4 lg:grid-cols-3 lg:px-6">
            {/* FAQ Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFAQs.map(
                    (category) =>
                      category.questions.length > 0 && (
                        <div key={category.category} className="mb-6 last:mb-0">
                          <h3 className="mb-3 text-lg font-semibold">
                            {category.category}
                          </h3>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            {category.questions.map((faq, index) => (
                              <AccordionItem
                                key={index}
                                value={`${category.category}-${index}`}
                              >
                                <AccordionTrigger className="text-left">
                                  {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-muted-foreground">
                                    {faq.answer}
                                  </p>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      )
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Support Sidebar */}
            <div className="space-y-6">
              {/* About Lerony */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>About Lerony</CardTitle>
                      <CardDescription className="text-xs">
                        Innovation in Business
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    Lerony is a leading technology company specializing in
                    business management solutions. We empower organizations with
                    innovative tools for customer management, analytics, and
                    automation.
                  </p>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="size-4 mr-2" />
                    Visit Website
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get help from our team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="size-4 mr-2" />
                    support@lerony.com
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="size-4 mr-2" />
                    +250 788 123 456
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="size-4 mr-2" />
                    Live Chat
                  </Button>
                </CardContent>
              </Card>

              {/* Support Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Support Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Monday - Friday
                    </span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
