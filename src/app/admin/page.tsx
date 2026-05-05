"use client";

import { useState, useEffect } from "react";
import { Home, Settings, Image, Calendar, PackageCheck, RefreshCw, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminAuth from "@/features/admin/components/AdminAuth";
// import ImageUpload from "@/features/admin/components/ImageUpload";
import BookingsList from "@/features/admin/components/BookingsList";
// import PackagesManager from "@/features/admin/components/PackagesManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("bookings");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Check session on mount
    if (sessionStorage.getItem("photobin-admin") === "authenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("photobin-admin");
    setIsAuthenticated(false);
    setActiveTab("bookings");
  };

  const refreshDashboard = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return (
    <>
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="section-container h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Home className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1
                className="font-semibold text-base"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Photobin Admin
              </h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={refreshDashboard}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="h-8 px-2"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="min-h-screen pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="section-container pt-8 pb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="packages">
              <PackageCheck className="w-4 h-4 mr-2" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="images">
              <Image className="w-4 h-4 mr-2" />
              Images
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Bookings */}
          <TabsContent value="bookings" className="space-y-6 mt-2">
            <BookingsList key={`bookings-${refreshKey}`} />
          </TabsContent>

          {/* Packages
          <TabsContent value="packages" className="space-y-6 mt-2">
            <PackagesManager key={`packages-${refreshKey}`} />
          </TabsContent>

          {/* Gallery Upload */}
          {/* <TabsContent value="images" className="space-y-6 mt-2">
            <ImageUpload key={`images-${refreshKey}`} onUploaded={refreshDashboard} />
          </TabsContent> */} 

          {/* Settings - placeholder */}
          <TabsContent value="settings" className="space-y-6 mt-2">
            <Card>
              <CardContent className="p-8 text-center py-16">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1">Settings Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Additional configuration options will be available here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

