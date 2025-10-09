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
import { Save, Truck } from "lucide-react";

export default function ShippingSettingsPage() {
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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard/settings">
                    Settings
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Shipping</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Shipping Settings</h1>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Options
              </CardTitle>
              <CardDescription>
                Configure shipping methods and rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="standard-shipping">
                    Standard Shipping Cost (RWF)
                  </Label>
                  <Input
                    id="standard-shipping"
                    type="number"
                    defaultValue="2500"
                  />
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
                <div className="grid gap-2">
                  <Label htmlFor="express-shipping">
                    Express Shipping Cost (RWF)
                  </Label>
                  <Input
                    id="express-shipping"
                    type="number"
                    defaultValue="5000"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Delivery Areas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Kigali City</Label>
                      <p className="text-sm text-muted-foreground">
                        Same-day delivery available
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Northern Province</Label>
                      <p className="text-sm text-muted-foreground">
                        2-3 business days
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Southern Province</Label>
                      <p className="text-sm text-muted-foreground">
                        3-4 business days
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Eastern Province</Label>
                      <p className="text-sm text-muted-foreground">
                        3-4 business days
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Western Province</Label>
                      <p className="text-sm text-muted-foreground">
                        3-5 business days
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
