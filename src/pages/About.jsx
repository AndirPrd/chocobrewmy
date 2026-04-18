import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import cafeLayoutImg from '../assets/images/about/cafelayout.png'
import firstBranchImg from '../assets/images/about/firstbranch.png'
import secondBranchImg from '../assets/images/about/secondbranch.png'
import thirdBranchImg from '../assets/images/about/thirdbranch.png'
import swirlTexture from '../assets/images/textures/texture.png'

const branchStory = [
  {
    id: 'first-branch',
    title: 'First Branch',
    year: '2022',
    location: 'Jomokerto Old Town',
    description:
      'Chocobrewmy began with one cozy counter serving signature dark chocolate and vanilla latte to local students and families.',
    image: firstBranchImg,
  },
  {
    id: 'second-branch',
    title: 'Second Branch',
    year: '2024',
    location: 'Riverside Walk',
    description:
      'Our second branch expanded into coffee craft and iced menu favorites, creating a warm social corner for evening gatherings.',
    image: secondBranchImg,
  },
  {
    id: 'third-branch',
    title: 'Third Branch',
    year: '2026',
    location: 'Sunset District',
    description:
      'The third branch introduced creamy ice cream lines and a full dessert-forward drink experience while keeping our cozy identity.',
    image: thirdBranchImg,
  },
]

function About() {
  const timelineRef = useRef(null)
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })
  const lineScaleY = useTransform(timelineProgress, [0, 1], [0, 1])

  const heroRef = useRef(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  })

  // Hero animations
  const imgScale = useTransform(heroProgress, [0, 1], [1, 1.1])
  const titleY = useTransform(heroProgress, [0, 0.25], [0, -40])
  const titleOpacity = useTransform(heroProgress, [0, 0.25], [1, 0])
  const textOpacity = useTransform(heroProgress, [0.15, 0.35], [0, 1])
  const textY = useTransform(heroProgress, [0.15, 0.35], [40, 0])

  return (
    <div className="flex flex-col">
      <section
        id="about-hero-sequence"
        ref={heroRef}
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-28 w-screen"
        style={{ height: '500vh' }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-[#4A3B32]">
          <motion.img
            src={cafeLayoutImg}
            alt="Chocobrewmy Cafe Layout"
            className="absolute inset-0 h-full w-full object-cover origin-center"
            style={{ scale: imgScale }}
          />
          {/* Dark overlay to make the text pop */}
          <div className="absolute inset-0 bg-[#4A3B32]/50" />

          <div className="relative flex h-full flex-col items-center justify-center space-y-8 px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              style={{ opacity: titleOpacity, y: titleY }}
              className="text-6xl font-bold tracking-tight text-[#fbf5ee] drop-shadow-2xl sm:text-7xl md:text-8xl"
            >
              Get to know us
            </motion.h1>

            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="max-w-3xl text-[#E5D7C5]"
            >
              <p className="text-xl leading-relaxed md:text-2xl lg:text-3xl font-medium drop-shadow-lg shadow-black/50">
                What started as a humble single counter simply serving hot chocolate and lattes
                very quickly captured the hearts of the town. Thanks to our beloved local patrons,
                our little shop grew into three vibrant branches in just a few short years, spreading
                our passion for the perfect brew across Jomokerto.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5D7C5] bg-[#fbf5ee] p-8 md:p-12 z-10 relative mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9A8A78]">Our History</p>
        <h1 className="mt-2 text-4xl font-bold text-[#4A3B32]">Chocobrewmy Timeline</h1>
        <p className="mt-3 max-w-2xl text-[#6B5A4B]">
          Scroll down to follow our branch story from the first cozy store to our latest expansion.
        </p>
      </section>

      <section ref={timelineRef} className="relative py-32 bg-[#fbf5ee]">
        {/* Background Texture Overlay only for Timeline section */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-50"
          style={{
            backgroundImage: `url(${swirlTexture})`,
            backgroundRepeat: 'repeat'
          }}
        />

        {/* Main Track Background */}
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-2 -translate-x-1/2 rounded-full bg-[#E5D7C5] md:block" />

        {/* Active Scale Track */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-2 -translate-x-1/2 origin-top rounded-full bg-[#8C6B55] md:block"
          style={{ scaleY: lineScaleY }}
        />

        {/* The Slider Handle moving down */}
        <motion.div
          className="pointer-events-none absolute left-1/2 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#fbf5ee] bg-[#5C4535] shadow-lg md:flex z-10"
          style={{
            top: useTransform(timelineProgress, [0, 1], ['0%', '100%']),
            marginTop: '-20px'
          }}
        >
          <div className="h-3 w-3 rounded-full bg-[#fbf5ee]" />
        </motion.div>

        <div className="space-y-64">
          {branchStory.map((branch, index) => {
            const isLeft = index % 2 === 0
            return (
              <motion.article
                key={branch.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`grid items-center gap-6 md:grid-cols-2 ${isLeft ? '' : 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
                  }`}
              >
                <div className={`flex ${isLeft ? 'justify-end' : 'justify-start'} md:px-12`}>
                  <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-[#E5D7C5] bg-white shadow-xl transition-transform hover:-translate-y-1">
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={branch.image}
                        alt={branch.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-8">
                      <div className="mb-4 inline-block rounded-full bg-[#E5D7C5] px-4 py-1 text-sm font-bold text-[#5C4535]">
                        {branch.year}
                      </div>
                      <h2 className="text-3xl font-bold text-[#4A3B32]">{branch.title}</h2>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[#9A8A78]">{branch.location}</p>
                      <p className="mt-4 leading-relaxed text-[#6B5A4B]">{branch.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center md:block relative">
                  {/* Static connection line on the track */}
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#E5D7C5] -z-10 hidden md:block" />

                  {/* Year Badge replacing the dot */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-[4px] border-[#fbf5ee] bg-[#8C6B55] shadow-md md:mx-auto relative z-0">
                    <span className="text-sm font-bold tracking-wider text-[#fbf5ee]">{branch.year}</span>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* Extra space with Thank You Card at the end */}
      <div className="min-h-[40vh] w-full bg-[#fbf5ee] relative z-0 flex items-center justify-center p-8 md:p-12 pb-32">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-50"
          style={{
            backgroundImage: `url(${swirlTexture})`,
            backgroundRepeat: 'repeat'
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 max-w-3xl rounded-2xl border border-[#E5D7C5] bg-white p-10 text-center shadow-2xl md:p-16"
        >
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5D7C5] text-[#5C4535]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-[#4A3B32] md:text-5xl">Thank You!</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#6B5A4B] md:text-xl">
            None of this magical journey would be possible without the incredible support and love from all of you since our very first cup. Your smiles and loyal visits fuel our passion for brewing every single day. Here’s to many more cozy corners and delightful sips together!
          </p>
          <p className="mt-8 font-bold uppercase tracking-[0.2em] text-[#9A8A78]">
            — The Chocobrewmy Team
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default About
