import { Skeleton } from "@/components/ui/skeleton";
import Head from "next/head";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main>
      <Head>
        <title>Electric Cars, Solar & Clean Energy | Tesla</title>
      </Head>
      <div
        className="overflow-y-scroll h-screen snap-y snap-mandatory scroll-snap-type"
        style={{ WebkitOverflowScrolling: "touch" }}>
        <Skeleton />
      </div>
    </main>
  );
}
