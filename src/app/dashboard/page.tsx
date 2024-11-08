import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const results = await db.select().from(Invoices);

  return (
    <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p>
          <Button className="inline-flex gap-2" variant="ghost">
            <Link href="/invoices/new">
              <CirclePlus className="h-4 w-4" />
              Create Invoice
            </Link>
          </Button>
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => {
            return (
              <TableRow key={result.id}>
                <TableCell className="font-medium text-left p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold p-4 block"
                  >
                    {new Date(result.createTs).toLocaleDateString("de-DE")}
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold p-4 block"
                  >
                    Dimitar Mandarliev
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link href={`/invoices/${result.id}`} className="p-4 block">
                    mandarliev@gmail.com
                  </Link>
                </TableCell>
                <TableCell className="text-center p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold p-4 block"
                  >
                    <Badge className="rounded-full">{result.status}</Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-0">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold p-4 block"
                  >
                    $ {(result.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
