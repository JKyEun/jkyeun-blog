export default function Footer() {
  return (
    <footer className="w-full py-8 border-t">
      <div className="container mx-auto px-8 flex justify-center items-center">
        <p className="text-sm text-gray-500">© 2024-{new Date().getFullYear()} JKyEun. All rights reserved.</p>
      </div>
    </footer>
  );
}
