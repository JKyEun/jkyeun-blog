export default function PageContainer({ children }: { children: React.ReactNode }) {
  return <main className="max-w-[1200px] mx-auto px-8 py-16">{children}</main>;
}
