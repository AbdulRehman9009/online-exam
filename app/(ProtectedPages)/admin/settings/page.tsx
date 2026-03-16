import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, Shield, Bell, Database, Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground text-lg">
          Configure global parameters and security protocols for the examination platform.
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-sidebar-border/60">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>General Configuration</CardTitle>
            </div>
            <CardDescription>Institution details and global identity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inst-name">Institution Name</Label>
              <Input id="inst-name" defaultValue="SmartExam Digital University" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inst-email">Administrative Email</Label>
              <Input id="inst-email" type="email" defaultValue="admin@smartexam.edu" />
            </div>
            <Button className="w-full">
               <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-sidebar-border/60">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Security & Access</CardTitle>
            </div>
            <CardDescription>Authentication and role-based permissions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-accent/10">
                <div className="space-y-0.5">
                  <Label>Multi-Factor Auth</Label>
                  <p className="text-[10px] text-muted-foreground italic">Currently forced for all Admin accounts.</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500" />
             </div>
             <div className="space-y-2">
                <Label>Minimum Password Strength</Label>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[80%]" />
                </div>
             </div>
             <Button variant="outline" className="w-full">Manage Permission Matrix</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-sidebar-border/60">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notifications Center</CardTitle>
            </div>
            <CardDescription>Global broadcast settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Automatic report generation for Faculty</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                <div className="h-2 w-2 rounded-full bg-muted" />
                <span>SMS Notifications (Disabled)</span>
            </div>
            <Button variant="secondary" className="w-full">Configure Gateway</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-sidebar-border/60 border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Database className="h-5 w-5" />
              <CardTitle>System Health</CardTitle>
            </div>
            <CardDescription className="text-primary/70">Database and storage synchronization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold text-primary">All Systems Green</div>
             <p className="text-xs text-primary/60 italic">Last full sync: 3 minutes ago.</p>
             <div className="pt-2">
                <Button variant="ghost" className="text-xs h-8 text-primary hover:bg-primary/20">Trigger Manual Sync</Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
