import Link from "next/link";
import { articles } from "@/app/blog/articles";

export default function GuidesSection() {
  const liste = [...articles].slice(0, 12);

  return (
    <section id="rehberler" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Hesap ve <span className="text-primary">Bahis Rehberleri</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Üyelik açmaktan para çekmeye, kupon kurmaktan hesap doğrulamaya kadar sık karşılaşılan konuları adım adım anlattık. Her rehber tek bir soruya odaklanır ve işlemi baştan sona kapsar; kural ezberlemek yerine neden öyle olduğunu anlamanızı hedefler.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liste.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block p-5 rounded-xl bg-card-bg border border-card-border hover:border-primary transition"
            >
              <h3 className="font-bold text-sm mb-2 leading-snug">{a.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                {a.description}
              </p>
              <span className="inline-block mt-3 text-primary text-xs font-semibold">
                Oku →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/10 transition"
          >
            Tüm rehberleri gör
          </Link>
        </div>
      </div>
    </section>
  );
}
