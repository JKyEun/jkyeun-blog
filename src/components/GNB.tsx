import Link from 'next/link';

const GNBList = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

export default function GNB() {
  return (
    <header className="bg-neutral-800 text-white">
      <nav className="flex items-center gap-5 max-w-[980px] mx-auto px-5">
        <h1>
          <Link href="/">LOGO</Link>
        </h1>
        <ul className="flex justify-around gap-2.5 w-full py-5">
          {GNBList.map((item) => (
            <li key={item}>
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
