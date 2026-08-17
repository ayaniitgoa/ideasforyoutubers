import { FAQ_ITEMS } from "@/lib/faq";

export function SiteFaq() {
  return (
    <section
      className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6"
      aria-labelledby="faq-heading"
    >
      <div className="poster poster-white torn max-w-[72ch] p-5 sm:p-8">
        <p className="font-mono text-[0.75rem] font-medium tracking-[0.16em]">
          FAQ
        </p>
        <h2 id="faq-heading" className="mt-3 text-[1.5rem] font-bold">
          YouTube video ideas
        </h2>
        <dl className="mt-8 grid gap-8">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question}>
              <dt className="text-[1.05rem] font-bold leading-tight">
                {item.question}
              </dt>
              <dd className="mt-3 max-w-[72ch] text-[0.95rem]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
