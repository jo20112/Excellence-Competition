import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, TrendingUp, Calendar, Award, LogIn, Search, Filter, Sparkles, Trophy, Medal } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import StatsCard from "@/components/StatsCard";
import PodiumCard from "@/components/PodiumCard";
import RewardsSection from "@/components/RewardsSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { fetchPublicAdmins, PublicAdmin } from "@/lib/adminService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Leaderboard() {
  const [, setLocation] = useLocation();
  const [admins, setAdmins] = useState<PublicAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const data = await fetchPublicAdmins();
      setAdmins(data);
    } catch (error) {
      console.error('Error loading admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === "all" || 
      (filterBy === "top10" && admins.indexOf(admin) < 10) ||
      (filterBy === "top3" && admins.indexOf(admin) < 3);
    return matchesSearch && matchesFilter;
  });

  const topThree = admins.slice(0, 3);
  const totalAdmins = admins.length;
  const totalPoints = admins.reduce((sum, admin) => sum + admin.total_points, 0);

  const competitionStartDate = new Date('2025-10-01T00:00:00');
  const now = new Date();
  const daysPassed = Math.max(0, Math.floor((now.getTime() - competitionStartDate.getTime()) / (1000 * 60 * 60 * 24)));
  const daysInCurrentCycle = ((daysPassed % 10) + 10) % 10;
  const daysRemaining = daysInCurrentCycle === 0 ? 10 : 10 - daysInCurrentCycle;
  const periodDisplay = `${daysRemaining} ${daysRemaining === 1 ? 'يوم' : 'أيام'}`;

  const getRankBadge = (index: number) => {
    if (index === 0)
      return (
        <Badge className="bg-gold/20 text-gold border-gold/30 gap-1 animate-pulse" data-testid="badge-rank-1">
          <Trophy className="h-3 w-3" fill="currentColor" />1
        </Badge>
      );
    if (index === 1)
      return (
        <Badge className="bg-silver/20 text-silver-foreground border-silver/30 gap-1" data-testid="badge-rank-2">
          <Medal className="h-3 w-3" />2
        </Badge>
      );
    if (index === 2)
      return (
        <Badge className="bg-bronze/20 text-bronze border-bronze/30 gap-1" data-testid="badge-rank-3">
          <Medal className="h-3 w-3" />3
        </Badge>
      );
    return (
      <span className="text-sm font-semibold text-muted-foreground" data-testid={`text-rank-${index + 1}`}>
        #{index + 1}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-gold/20 to-primary/20 shadow-lg">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-l from-primary to-gold bg-clip-text text-transparent" data-testid="text-page-title">
                  لوحة المسابقة
                </h1>
                <p className="text-sm text-muted-foreground">
                  نظام تتبع أداء المشرفين
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setLocation("/login")}
                className="gap-2 hover:bg-primary/10 hover:border-primary transition-all"
                data-testid="button-admin-login"
              >
                <LogIn className="h-4 w-4" />
                تسجيل الدخول
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-gold/5 to-primary/5 p-8 border-2 border-primary/20 shadow-xl">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-gold animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold">مسابقة أكتوبر 2025</h2>
              <Sparkles className="h-6 w-6 text-gold animate-pulse" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              تنافس على المراكز الأولى واحصل على جوائز قيمة كل 10 أيام
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="px-6 py-3 rounded-xl bg-card/80 backdrop-blur border">
                <p className="text-sm text-muted-foreground">الوقت المتبقي</p>
                <p className="text-2xl font-bold text-primary">{periodDisplay}</p>
              </div>
              <div className="px-6 py-3 rounded-xl bg-card/80 backdrop-blur border">
                <p className="text-sm text-muted-foreground">الجائزة الكبرى</p>
                <p className="text-2xl font-bold text-gold">30,000 نقطة</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="إجمالي المشرفين"
            value={totalAdmins}
            icon={Users}
            trend="نشط"
          />
          <StatsCard
            title="إجمالي النقاط"
            value={totalPoints}
            icon={TrendingUp}
            trend="موزعة"
          />
          <StatsCard
            title="الفترة النشطة"
            value={periodDisplay}
            icon={Calendar}
            trend="متبقية"
          />
          <StatsCard
            title="الجائزة القادمة"
            value="30K"
            icon={Award}
            trend="نقطة"
          />
        </div>

        <div className="bg-gradient-to-b from-card via-primary/5 to-card rounded-2xl p-8 border-2 shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-l from-gold via-primary to-gold bg-clip-text text-transparent" data-testid="text-section-podium">
            🏆 المراكز الثلاثة الأولى
          </h2>
          
          {topThree.length >= 3 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
              <div className="md:order-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                <PodiumCard
                  rank={2}
                  name={topThree[1].name}
                  points={topThree[1].total_points}
                  initials={topThree[1].initials}
                />
              </div>
              <div className="md:order-2 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <PodiumCard
                  rank={1}
                  name={topThree[0].name}
                  points={topThree[0].total_points}
                  initials={topThree[0].initials}
                />
              </div>
              <div className="md:order-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <PodiumCard
                  rank={3}
                  name={topThree[2].name}
                  points={topThree[2].total_points}
                  initials={topThree[2].initials}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              لا يوجد عدد كافٍ من المشرفين لعرض المنصة
            </div>
          )}
        </div>

        <RewardsSection />

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="text-3xl font-bold" data-testid="text-section-leaderboard">
              جدول الترتيب الكامل
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن مشرف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue placeholder="تصفية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="top3">أفضل 3</SelectItem>
                  <SelectItem value="top10">أفضل 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-2 rounded-xl overflow-hidden shadow-lg bg-card" data-testid="table-leaderboard">
            <Table>
              <TableHeader className="bg-gradient-to-l from-primary/10 to-gold/10 sticky top-0 z-10 backdrop-blur">
                <TableRow className="border-b-2">
                  <TableHead className="text-right w-20 font-bold">الترتيب</TableHead>
                  <TableHead className="text-right font-bold">المشرف</TableHead>
                  <TableHead className="text-right font-bold">إجمالي النقاط</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.length > 0 ? (
                  filteredAdmins.map((admin, index) => (
                    <TableRow
                      key={admin.id}
                      className="hover:bg-primary/5 transition-all duration-200 border-b group"
                      data-testid={`row-admin-${admin.id}`}
                    >
                      <TableCell className="font-medium">{getRankBadge(admins.indexOf(admin))}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-primary/20 group-hover:border-primary/50 transition-all">
                            {admin.avatar_url && <AvatarImage src={admin.avatar_url} alt={admin.name} />}
                            <AvatarFallback className="text-sm font-bold bg-gradient-to-br from-primary/20 to-gold/20">
                              {admin.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-lg" data-testid={`text-admin-name-${admin.id}`}>
                            {admin.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-l from-primary to-gold bg-clip-text text-transparent" data-testid={`text-points-${admin.id}`}>
                            {admin.total_points}
                          </span>
                          <span className="text-sm text-muted-foreground">نقطة</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12 text-muted-foreground">
                      لا توجد نتائج
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="bg-gradient-to-br from-muted/50 to-primary/5 rounded-xl p-6 border-2 shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            ملاحظات هامة
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>يتم حساب النقاط تلقائياً بناءً على الحضور والالتزام والنشاط</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>المراكز الثلاثة الأولى يتم تحديثها فوراً عند تغيير النقاط</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>الجوائز توزع كل 10 أيام حسب الترتيب النهائي</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>الفائز لا يمكنه الترشح مرة أخرى إلا بعد مرور 20 يوم</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
