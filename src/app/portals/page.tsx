
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Receipt, LineChart, Building2 } from "lucide-react";

export default function PortalsPage() {
  return (
    <div className="pt-[72px] bg-gray-50 min-h-screen flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="font-headline font-extrabold text-5xl mb-4 tracking-tighter uppercase">PROPRIETOR PORTALS</h1>
          <p className="text-gray-500 font-body text-lg">Real-time reporting and portfolio management for Aether Australia clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                <LineChart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Live Performance Metrics</h3>
                <p className="text-sm text-gray-500">Track your property's value and rental yield trends against Australian market benchmarks.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Receipt className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Expenditure Tracking</h3>
                <p className="text-sm text-gray-500">View real-time income and expenditure reports, maintenance costs, and tax-ready statements.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Compliance & Docs</h3>
                <p className="text-sm text-gray-500">Access all localized Australian state regulation documents and safety certificates in one place.</p>
              </div>
            </div>
          </div>

          <Card className="rounded-none border-none shadow-2xl overflow-hidden">
            <Tabs defaultValue="landlord" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-none bg-gray-100 p-0 h-16">
                <TabsTrigger value="landlord" className="rounded-none data-[state=active]:bg-white data-[state=active]:text-primary font-bold tracking-widest text-xs h-full">LANDLORD PORTAL</TabsTrigger>
                <TabsTrigger value="vendor" className="rounded-none data-[state=active]:bg-white data-[state=active]:text-primary font-bold tracking-widest text-xs h-full">VENDOR PORTAL</TabsTrigger>
              </TabsList>
              <CardHeader className="pt-10">
                <CardTitle className="font-headline font-bold text-2xl">Secure Login</CardTitle>
                <CardDescription>Enter your credentials to access your secure proprietor dashboard.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-10">
                <TabsContent value="landlord" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 tracking-widest">LANDLORD ID</label>
                    <Input className="rounded-none h-12 border-gray-200" placeholder="L-XXXX-XXXX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 tracking-widest">PASSWORD</label>
                    <Input className="rounded-none h-12 border-gray-200" type="password" />
                  </div>
                  <Button className="w-full bg-[#111111] hover:bg-black text-white font-bold h-14 rounded-none mt-4 uppercase tracking-widest">
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Access Dashboard
                  </Button>
                </TabsContent>
                <TabsContent value="vendor" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 tracking-widest">VENDOR ID</label>
                    <Input className="rounded-none h-12 border-gray-200" placeholder="V-XXXX-XXXX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 tracking-widest">PASSWORD</label>
                    <Input className="rounded-none h-12 border-gray-200" type="password" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-none mt-4 uppercase tracking-widest">
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Access Campaign Dashboard
                  </Button>
                </TabsContent>
                <div className="text-center pt-4">
                  <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot your password?</a>
                </div>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
