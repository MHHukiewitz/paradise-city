"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { houseCovers } from "@/lib/photos";
import { useLanguage } from "@/components/language-provider";

const IDS = ["rustico", "sunset", "romantico"] as const;

export function HouseCards() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {IDS.map((id) => {
        const house = t.houses[id];
        return (
          <Card key={id} className="stone-frame bg-card">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={houseCovers[id]} alt={house.name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <CardHeader>
              <Badge variant="secondary">{house.tag}</Badge>
              <CardTitle className="text-2xl">{house.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{house.summary}</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button render={<Link href={`/haeuser#${id}`} />} variant="outline">
                {t.nav.houses}
              </Button>
              <Button render={<Link href={`/kontakt?haus=${id}`} />}>{t.hero.cta}</Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
