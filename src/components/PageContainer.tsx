export default function PageContainer({ children }: { children: React.ReactNode }) {
  return <main className="max-w-[980px] min-h-[calc(100vh-150px)] mx-auto px-8 py-16">{children}</main>;
}
