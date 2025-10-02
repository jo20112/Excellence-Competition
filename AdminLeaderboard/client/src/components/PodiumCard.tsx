import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Crown, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PodiumCardProps {
  rank: 1 | 2 | 3;
  name: string;
  points: number;
  initials: string;
}

export default function PodiumCard({ rank, name, points, initials }: PodiumCardProps) {
  const crownColors = {
    1: "text-gold",
    2: "text-silver",
    3: "text-bronze",
  };

  const bgColors = {
    1: "bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border-gold/30",
    2: "bg-gradient-to-br from-silver/20 via-silver/10 to-silver/5 border-silver/30",
    3: "bg-gradient-to-br from-bronze/20 via-bronze/10 to-bronze/5 border-bronze/30",
  };

  const textColors = {
    1: "text-gold",
    2: "text-silver-foreground",
    3: "text-bronze",
  };

  const labels = {
    1: "المركز الأول",
    2: "المركز الثاني",
    3: "المركز الثالث",
  };

  const glowColors = {
    1: "shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]",
    2: "shadow-[0_0_20px_rgba(192,192,192,0.2)] hover:shadow-[0_0_30px_rgba(192,192,192,0.4)]",
    3: "shadow-[0_0_20px_rgba(205,127,50,0.2)] hover:shadow-[0_0_30px_rgba(205,127,50,0.4)]",
  };

  return (
    <Card
      className={cn(
        "p-6 text-center relative overflow-visible border-2 transition-all duration-500 group hover:scale-105",
        bgColors[rank],
        glowColors[rank],
        rank === 1 && "scale-110 md:scale-110"
      )}
      data-testid={`card-podium-${rank}`}
    >
      {rank === 1 && (
        <>
          <div className="absolute -top-2 -right-2 animate-pulse">
            <Sparkles className="h-5 w-5 text-gold" fill="currentColor" />
          </div>
          <div className="absolute -top-2 -left-2 animate-pulse delay-75">
            <Sparkles className="h-5 w-5 text-gold" fill="currentColor" />
          </div>
          <div className="absolute -bottom-2 -right-2 animate-pulse delay-150">
            <Star className="h-4 w-4 text-gold" fill="currentColor" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-pulse delay-200">
            <Star className="h-4 w-4 text-gold" fill="currentColor" />
          </div>
        </>
      )}

      <div className="absolute -top-8 left-1/2 -translate-x-1/2 transition-transform duration-300 group-hover:-translate-y-1">
        <div className={cn(
          "p-3 rounded-full bg-card border-2 shadow-xl relative",
          bgColors[rank],
          rank === 1 && "animate-bounce"
        )}>
          <Crown className={cn("h-8 w-8", crownColors[rank])} fill="currentColor" />
          {rank === 1 && (
            <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping" />
          )}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="relative">
          <Avatar className={cn(
            "h-24 w-24 mx-auto border-4 border-background shadow-2xl transition-all duration-300",
            "group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          )}>
            <AvatarFallback className={cn(
              "text-2xl font-bold",
              bgColors[rank],
              textColors[rank]
            )}>
              {initials}
            </AvatarFallback>
          </Avatar>
          {rank === 1 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-32 h-32 rounded-full bg-gold/10 animate-ping" />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary" data-testid={`text-podium-name-${rank}`}>
            {name}
          </h3>
          <p className={cn("text-sm font-semibold", textColors[rank])}>
            {labels[rank]}
          </p>
        </div>

        <div className="relative">
          <div className={cn(
            "text-5xl font-bold transition-all duration-300",
            textColors[rank],
            "group-hover:scale-110"
          )} data-testid={`text-podium-points-${rank}`}>
            {points}
          </div>
          <span className="text-sm text-muted-foreground font-semibold">نقطة</span>
          {rank === 1 && (
            <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-sm -z-10 animate-pulse" />
          )}
        </div>

        <div className={cn(
          "h-1 rounded-full mx-auto transition-all duration-500",
          rank === 1 ? "w-20 bg-gradient-to-r from-gold via-primary to-gold" :
          rank === 2 ? "w-16 bg-gradient-to-r from-silver to-muted" :
          "w-12 bg-gradient-to-r from-bronze to-muted"
        )} />
      </div>
    </Card>
  );
}
