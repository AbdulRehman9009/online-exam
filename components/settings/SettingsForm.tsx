"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { updateUserSettings } from "@/lib/auth-actions";

const SettingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters").optional().or(z.literal("")),
});

interface SettingsFormProps {
  user: any;
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(async () => {
      const data = await updateUserSettings(values);

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        form.setValue("currentPassword", "");
        form.setValue("newPassword", "");
      }
    });
  };

  return (
    <Card className="max-w-2xl mx-auto border-primary/20 bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                disabled={isPending}
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                disabled={true} // Email usually fixed or needs special verification
                {...form.register("email")}
              />
              <p className="text-[10px] text-muted-foreground">Contact admin to change your registered email.</p>
            </div>

            <hr className="border-primary/10" />

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                disabled={isPending}
                {...form.register("currentPassword")}
              />
              {form.formState.errors.currentPassword && (
                <p className="text-xs text-destructive">{form.formState.errors.currentPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password (Leave blank to keep current)</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                disabled={isPending}
                {...form.register("newPassword")}
              />
              {form.formState.errors.newPassword && (
                <p className="text-xs text-destructive">{form.formState.errors.newPassword.message}</p>
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
