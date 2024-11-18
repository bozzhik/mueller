import {H2, H6, P} from '~/UI/Typography'

export default function Advantages({data}: {data: string[]}) {
  return (
    <section data-section="details-advantages-index">
      <div className="py-10 text-white sm:px-5 sm:py-4 xl:py-8 px-7 bg-blue">
        <H2 className="sm:max-w-[20ch]">НАШИ ПРЕИМУЩЕСТВА</H2>
      </div>

      <div className="divide-y divide-gray">
        {data.map((item, idx) => (
          <div key={idx} className="flex px-10 sm:pl-3 sm:pr-6 gap-7 xl:gap-6 py-14 xl:py-10 sm:py-7">
            <H6 className="text-3xl !leading-none xl:text-2xl sm:text-xl">{idx + 1}</H6>
            <P className="uppercase">{item}</P>
          </div>
        ))}
      </div>
    </section>
  )
}
