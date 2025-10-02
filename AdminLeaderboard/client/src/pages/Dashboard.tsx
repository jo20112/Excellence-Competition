import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Calendar, Award, UserPlus } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import StatsCard from "@/components/StatsCard";
import PodiumCard from "@/components/PodiumCard";
import LeaderboardTable from "@/components/LeaderboardTable";
import AddAdminDialog from "@/components/AddAdminDialog";
import { useToast } from "@/hooks/use-toast";
import { fetchAdmins, addAdmin, updateAdminPoints, Admin } from "@/lib/adminService";

export default function Dashboard() {
  const { toast } = useToast();
  
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const data = await fetchAdmins();
      setAdmins(data);
    } catch (error: any) {
      toast({
        title: "خطأ في تحميل البيانات",
        description: error.message || "حدث خطأ أثناء تحميل بيانات المشرفين",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (adminId: string, action: string, points: number) => {
    try {
      await updateAdminPoints(adminId, points, action, action);
      await loadAdmins();
      toast({
        title: points > 0 ? "تم إضافة النقاط" : "تم خصم النقاط",
        description: `${action}: ${points > 0 ? '+' : ''}${points} نقطة`,
        variant: points > 0 ? "default" : "destructive",
      });
    } catch (error: any) {
      toast({
        title: "خطأ في تحديث النقاط",
        description: error.message || "حدث خطأ أثناء تحديث النقاط",
        variant: "destructive",
      });
    }
  };

  const handleAddAdmin = async (name: string) => {
    try {
      const initials = name.split(" ").map(n => n[0]).join("");
      await addAdmin(name, initials);
      await loadAdmins();
      toast({
        title: "تم إضافة المشرف",
        description: `تمت إضافة ${name} بنجاح`,
      });
    } catch (error: any) {
      toast({
        title: "خطأ في إضافة المشرف",
        description: error.message || "حدث خطأ أثناء إضافة المشرف",
        variant: "destructive",
      });
    }
  };

  const topThree = admins.slice(0, 3);
  const totalAdmins = admins.length;
  const totalPoints = admins.reduce((sum, admin) => sum + admin.total_points, 0);

  const competitionStartDate = new Date('2025-10-01T00:00:00');
  const now = new Date();
  const daysPassed = Math.max(0, Math.floor((now.getTime() - competitionStartDate.getTime()) / (1000 * 60 * 60 * 24)));
  const daysInCurrentCycle = ((daysPassed % 10) + 10) % 10;
  const daysRemaining = daysInCurrentCycle === 0 ? 10 : 10 - daysInCurrentCycle;
  const periodDisplay = `${daysRemaining} ${daysRemaining === 1 ? 'يوم' : 'أيام'}`;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold" data-testid="text-page-title">
                  لوحة المسابقة
                </h1>
                <p className="text-sm text-muted-foreground">
                  نظام تتبع أداء المشرفين
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
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

        <div className="bg-gradient-to-b from-primary/5 to-transparent rounded-xl p-8 border">
          <h2 className="text-2xl font-bold mb-8 text-center" data-testid="text-section-podium">
            🏆 المراكز الثلاثة الأولى
          </h2>
          
          {topThree.length >= 3 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
              <div className="md:order-1">
                <PodiumCard
                  rank={2}
                  name={topThree[1].name}
                  points={topThree[1].total_points}
                  initials={topThree[1].initials}
                />
              </div>
              <div className="md:order-2">
                <PodiumCard
                  rank={1}
                  name={topThree[0].name}
                  points={topThree[0].total_points}
                  initials={topThree[0].initials}
                />
              </div>
              <div className="md:order-3">
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

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold" data-testid="text-section-leaderboard">
              جدول الترتيب الكامل
            </h2>
            <Button
              onClick={() => setShowAddDialog(true)}
              className="gap-2"
              data-testid="button-add-admin"
            >
              <UserPlus className="h-4 w-4" />
              إضافة مشرف
            </Button>
          </div>

          <LeaderboardTable admins={admins} onAction={handleAction} />
        </div>

        <div className="bg-muted/50 rounded-lg p-6 border">
          <h3 className="text-lg font-semibold mb-4">ملاحظات هامة</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• يتم حساب النقاط تلقائياً بناءً على الحضور والالتزام والنشاط</li>
            <li>• المراكز الثلاثة الأولى يتم تحديثها فوراً عند تغيير النقاط</li>
            <li>• الجوائز توزع كل 10 أيام حسب الترتيب النهائي</li>
            <li>• الفائز لا يمكنه الترشح مرة أخرى إلا بعد مرور 20 يوم</li>
          </ul>
        </div>
      </main>

      <AddAdminDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddAdmin}
      />
    </div>
  );
}
