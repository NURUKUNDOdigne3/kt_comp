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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Store,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Palette,
  Save,
  User,
} from "lucide-react";

export default function SettingsPage() {
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
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Settings</h1>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  General
                </CardTitle>
                <CardDescription>Manage your store information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="KT Computer Supply" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-description">Store Description</Label>
                  <Textarea
                    id="store-description"
                    defaultValue="Your trusted supplier for computers, phones, printers, and accessories in Rwanda."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-email">Contact Email</Label>
                  <Input
                    id="store-email"
                    type="email"
                    defaultValue="info@ktcomputersupply.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-phone">Contact Phone</Label>
                  <Input id="store-phone" defaultValue="+250 788 123 456" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payments
                </CardTitle>
                <CardDescription>
                  Configure payment methods and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mobile Money</Label>
                    <p className="text-sm text-muted-foreground">
                      Accept payments via mobile money
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Bank Transfer</Label>
                    <p className="text-sm text-muted-foreground">
                      Accept bank transfers
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cash on Delivery</Label>
                    <p className="text-sm text-muted-foreground">
                      Accept cash payments upon delivery
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping
                </CardTitle>
                <CardDescription>
                  Manage shipping options and rates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="shipping-cost">
                    Standard Shipping Cost (RWF)
                  </Label>
                  <Input id="shipping-cost" type="number" defaultValue="2500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="free-shipping-threshold">
                    Free Shipping Threshold (RWF)
                  </Label>
                  <Input
                    id="free-shipping-threshold"
                    type="number"
                    defaultValue="50000"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Express Shipping</Label>
                    <p className="text-sm text-muted-foreground">
                      Offer express delivery option
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Order Confirmations</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email when orders are placed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Shipping Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email when orders are shipped
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Newsletter</Label>
                    <p className="text-sm text-muted-foreground">
                      Send promotional emails
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
