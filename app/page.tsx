import { ApiTester } from "@/components/api-tester"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">REST Explorer</h1>
      <ApiTester />
    </div>
  )
}
