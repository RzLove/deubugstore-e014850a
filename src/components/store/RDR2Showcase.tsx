import { motion } from "framer-motion";

export function RDR2Showcase() {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-[#050507]">
      {/* Background with thematic colors */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#050507] to-[#050507] opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(circle_at_center,rgba(180,30,30,0.15),transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Main Cover Container */}
          <div className="relative mx-auto max-w-[1000px] aspect-[16/9] sm:aspect-video md:aspect-[21/9] lg:aspect-[2.5/1] overflow-hidden rounded-3xl border border-white/5 shadow-2xl transition-all duration-700 hover:border-[#b41e1e]/30 hover:shadow-[#b41e1e]/10">
            
            {/* The Image */}
            <img 
              src="https://drive.google.com/uc?export=view&id=1-jyC-sB4Jty704So0jkUqM6WLOLSJbhO" 
              alt="Red Dead Redemption 2 Showcase"
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Subtle Overlay for better visual integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
            
            {/* Thematic Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b41e1e] to-transparent opacity-50 shadow-[0_0_15px_rgba(180,30,30,0.5)]" />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#b41e1e]/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-[80px] rounded-full" />
        </motion.div>

        {/* Thematic Badge/Tag */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#b41e1e]/50" />
          <span className="text-xs font-black uppercase tracking-[0.4em] text-[#b41e1e] drop-shadow-[0_0_8px_rgba(180,30,30,0.4)]">
            OUTLAW FOR LIFE
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#b41e1e]/50" />
        </div>
      </div>
    </section>
  );
}
