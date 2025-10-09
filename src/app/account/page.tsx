"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Bell,
  CreditCard,
  Save,
  Camera,
  Key,
} from "lucide-react";

export default function AccountPage() {
  // Mock user data
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@ktcomputersupply.com",
    phone: "+250 788 123 456",
    avatar: "/avatars/admin.jpg",
    role: "Administrator",
    joinDate: "2023-01-15",
    lastLogin: "2025-10-08 14:30:22",
  });

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: "Store administrator for KT Computer Supply",
  });

  // Security form state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailMarketing: false,
    emailUpdates: true,
    pushOrders: true,
    pushMarketing: false,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    setUser({
      ...user,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
    });
    alert("Profile updated successfully!");
  };

  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would make an API call here
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (securityForm.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    alert("Password updated successfully!");
    setSecurityForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleNotificationUpdate = () => {
    // In a real app, you would make an API call here
    alert("Notification preferences updated!");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Header */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full p-2"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Last login: {user.lastLogin}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and bio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm({
                              ...profileForm,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileForm.bio}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            bio: e.target.value,
                          })
                        }
                        rows={4}
                      />
                    </div>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Update your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSecurityUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={(e) =>
                          setSecurityForm({
                            ...securityForm,
                            currentPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={securityForm.newPassword}
                        onChange={(e) =>
                          setSecurityForm({
                            ...securityForm,
                            newPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={(e) =>
                          setSecurityForm({
                            ...securityForm,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Button type="submit">
                      <Lock className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </form>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Order Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about your orders
                          </p>
                        </div>
                        <Select
                          value={notifications.emailOrders ? "on" : "off"}
                          onValueChange={(value) =>
                            setNotifications({
                              ...notifications,
                              emailOrders: value === "on",
                            })
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on">On</SelectItem>
                            <SelectItem value="off">Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional emails
                          </p>
                        </div>
                        <Select
                          value={notifications.emailMarketing ? "on" : "off"}
                          onValueChange={(value) =>
                            setNotifications({
                              ...notifications,
                              emailMarketing: value === "on",
                            })
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on">On</SelectItem>
                            <SelectItem value="off">Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>System Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about system updates
                          </p>
                        </div>
                        <Select
                          value={notifications.emailUpdates ? "on" : "off"}
                          onValueChange={(value) =>
                            setNotifications({
                              ...notifications,
                              emailUpdates: value === "on",
                            })
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on">On</SelectItem>
                            <SelectItem value="off">Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Push Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Order Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications about your orders
                          </p>
                        </div>
                        <Select
                          value={notifications.pushOrders ? "on" : "off"}
                          onValueChange={(value) =>
                            setNotifications({
                              ...notifications,
                              pushOrders: value === "on",
                            })
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on">On</SelectItem>
                            <SelectItem value="off">Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Marketing Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional push notifications
                          </p>
                        </div>
                        <Select
                          value={notifications.pushMarketing ? "on" : "off"}
                          onValueChange={(value) =>
                            setNotifications({
                              ...notifications,
                              pushMarketing: value === "on",
                            })
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="on">On</SelectItem>
                            <SelectItem value="off">Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleNotificationUpdate}>
                    <Bell className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-8 w-8 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/2027
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-8 w-8 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            Mastercard ending in 8765
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires 06/2026
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>

                    <Button className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-3">
                        Billing Address
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>123 Tech Street, Kigali, Rwanda</span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Edit Address
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
