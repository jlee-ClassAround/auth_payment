import { AdminDataTable } from "@/app/(admin)/_components/admin-data-table";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { userColumns } from "./columns";
import { DownloadCsvButton } from "./_components/download-csv-button";

export default async function AllUsersPage() {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">모든 사용자</h1>
      </div>
      <Card className="p-8">
        <div className="flex items-center justify-end pb-4">
          <DownloadCsvButton users={users} />
        </div>
        <AdminDataTable
          columns={userColumns}
          data={users}
          searchPlaceholder="원하는 정보를 검색해보세요."
        />
      </Card>
    </div>
  );
}
