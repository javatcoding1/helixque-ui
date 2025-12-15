"use client";

import { useNavigation } from "@/contexts/navigation-context";
import * as React from "react";
import { Spinner, type SpinnerProps } from "@workspace/ui/components/kibo-ui/spinner";


const variant: SpinnerProps["variant"][]=["infinite"]
export default function Page() {
  const { activeSection, activeSubSection } = useNavigation();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        {activeSubSection || activeSection}
      </h1>
      <p className="text-muted-foreground mt-2 text-sm md:text-base">
        {activeSubSection
          ? `Explore ${activeSubSection} in ${activeSection}`
          : `Welcome to ${activeSection}`}
      </p>

      {isLoading ? (
        <div className="bg-gradient-to-b from-muted/30 to-muted/50 mt-6 rounded-xl overflow-hidden h-96 flex items-center justify-center border border-border/50">
          <Spinner variant={variant[0]} />
        </div>
      ) : (
        <div className="bg-muted/50 mt-6 rounded-xl overflow-auto h-96" />
      )}
    </div>
  );
}
