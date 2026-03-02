"use client";

import { m } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Clock, Ticket, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CityData } from "@/constants/cities";

export function CityAttractions({ city }: { city: CityData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-3 mb-14"
        >
          <Badge
            variant="outline"
            className="w-fit rounded-full border-primary/30 bg-primary/5 text-primary px-4 py-1 text-sm"
          >
            🗺️ Places to Visit
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Top Attractions in{" "}
            <span className="text-secondary">{city.name}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
            Our drivers know every temple, ghat and hidden gem. All spots
            covered in our tour packages.
          </p>
        </m.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {city.attractions.map((place, i) => (
            <m.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <CardContent className="p-5 flex flex-col gap-4 h-full">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-3xl">{place.icon}</span>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {place.mustVisit && (
                        <Badge
                          variant="secondary"
                          className="text-xs rounded-full"
                        >
                          Must Visit
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs rounded-full">
                        {place.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="font-heading font-bold text-foreground text-base">
                      {place.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {place.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3 text-secondary" />
                        Timings
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        {place.timings}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Ticket className="h-3 w-3 text-secondary" />
                        Entry
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        {place.entryFee}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Timer className="h-3 w-3 text-secondary" />
                        Duration
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        {place.duration}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
