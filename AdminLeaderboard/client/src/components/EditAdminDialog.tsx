import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { Admin } from "@/lib/adminService";

interface EditAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: Admin | null;
  onUpdate: (id: string, name: string, adminId?: string, avatarUrl?: string) => void;
}

export default function EditAdminDialog({ open, onOpenChange, admin, onUpdate }: EditAdminDialogProps) {
  const [name, setName] = useState("");
  const [adminId, setAdminId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    if (admin) {
      setName(admin.name);
      setAdminId(admin.admin_id || "");
      setAvatarUrl(admin.avatar_url || "");
    }
  }, [admin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (admin && name.trim()) {
      const initials = name.split(" ").map(n => n[0]).join("");
      onUpdate(admin.id, name.trim(), adminId.trim() || undefined, avatarUrl || undefined);
      onOpenChange(false);
    }
  };

  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-edit-admin">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            تعديل بيانات المشرف
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-right block">
                اسم المشرف
              </Label>
              <Input
                id="edit-name"
                placeholder="أدخل اسم المشرف"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-right"
                data-testid="input-edit-admin-name"
                autoFocus
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-adminId" className="text-right block">
                الرقم التعريفي (ID) - اختياري
              </Label>
              <Input
                id="edit-adminId"
                placeholder="مثال: ADM001"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="text-right"
                data-testid="input-edit-admin-id"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-right block">
                صورة المشرف (اختياري)
              </Label>
              <ImageUpload
                currentImageUrl={avatarUrl}
                onImageUploaded={setAvatarUrl}
                initials={name.split(" ").map(n => n[0]).join("") || admin.initials}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel-edit"
            >
              إلغاء
            </Button>
            <Button type="submit" data-testid="button-submit-edit">
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
