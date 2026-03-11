import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const AuthFormWrapper = ({
  children,
  headerLabel,
  headerDescription,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: AuthFormWrapperProps) => {
  return (
    <Card className="w-full max-w-md shadow-lg border-muted">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-3xl font-bold tracking-tight text-center">
            {headerLabel}
          </h1>
          {headerDescription && (
            <p className="text-muted-foreground text-sm text-center">
              {headerDescription}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          {/* We'll add a separate Social component later or embed it directly in SignIn */}
        </CardFooter>
      )}
      <CardFooter className="flex flex-col gap-2 w-full">
        <Button
          variant="link"
          className="font-normal w-full"
          size="sm"
          asChild
        >
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
