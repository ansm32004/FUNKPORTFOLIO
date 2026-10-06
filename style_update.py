import re

file_path = "src/components/GovtElectionCaseStudy.jsx"
with open(file_path, "r") as f:
    content = f.read()

# 1. Background and Blobs
old_root = '<div className="min-h-screen bg-[#FAFBFD] text-slate-800 font-poppins pb-40 selection:bg-blue-600 selection:text-white">'
new_root = '''<div className="min-h-screen bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#ffffff] text-slate-800 font-poppins pb-40 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* ACTIVE BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Animated Clouds/Blobs */}
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-white/60 mix-blend-overlay filter blur-[100px] animate-blob" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-sky-200/50 mix-blend-overlay filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] rounded-full bg-white/70 mix-blend-overlay filter blur-[100px] animate-blob animation-delay-4000" />
      </div>
'''
content = content.replace(old_root, new_root)

# 2. Main container of Editorial Case Study
# We want it to be z-10 relative so it sits above the background
old_main = '<main className="max-w-5xl mx-auto px-6 sm:px-8 py-16 space-y-24 sm:space-y-32">'
new_main = '<main className="max-w-5xl mx-auto px-6 sm:px-8 py-24 space-y-32 sm:space-y-40 relative z-10">'
content = content.replace(old_main, new_main)

# 3. Hero Section
content = content.replace(
    '<section className="space-y-6 max-w-4xl pt-4">',
    '<section className="space-y-8 max-w-4xl mx-auto text-center flex flex-col items-center pt-12">'
)
content = content.replace(
    '<span className="text-xs font-mono font-medium tracking-widest text-slate-400 uppercase">',
    '<span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] tracking-wider uppercase shadow-sm">'
)
content = content.replace(
    '<h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-[1.12]">',
    '<h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">'
)
content = content.replace(
    '<p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-2xl pt-1">',
    '<p className="text-lg sm:text-2xl text-slate-600 font-medium leading-relaxed max-w-3xl pt-2">'
)
content = content.replace(
    '<div className="pt-6 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">',
    '<div className="pt-6 flex flex-wrap justify-center gap-8 text-xs bg-white/50 backdrop-blur-md px-8 py-6 rounded-[2rem] shadow-lg border border-white/60">'
)

# 4. Turn Sections into floating soft cards
# We replace <section id="..." className="border-t border-slate-200/60 pt-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
# and similar with floating cards.
# There are 3 types of section tags:
# - with id and grid
# - with id and space-y
# - without id and space-y
def replace_section(match):
    full_match = match.group(0)
    # Give every section the floating card styling
    full_match = re.sub(r'border-t border-slate-200/60 pt-16', 'bg-white/60 backdrop-blur-xl p-8 sm:p-12 rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white', full_match)
    return full_match

content = re.sub(r'<section[^>]*className="[^"]*border-t border-slate-200/60[^"]*"[^>]*>', replace_section, content)

# 5. Transform section headers into Pills
def replace_pill(match):
    # match.group(1) is the text
    return f'<span className="inline-block px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 font-bold text-[11px] tracking-wider uppercase shadow-sm mb-4">{match.group(1)}</span>'

content = re.sub(r'<span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">(.*?)</span>', replace_pill, content)


with open(file_path, "w") as f:
    f.write(content)

print("Styles updated")
