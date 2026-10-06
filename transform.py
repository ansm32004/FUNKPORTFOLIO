import re

file_path = "src/components/GovtElectionCaseStudy.jsx"
with open(file_path, "r") as f:
    content = f.read()

# We need to find the <main> block for the editorial case study.
# It starts at: <main className="max-w-5xl mx-auto px-6 sm:px-8 py-16 space-y-24 sm:space-y-32">
# and ends right before: {/* LIGHTBOX MODAL */}

start_marker = '        <main className="max-w-5xl mx-auto px-6 sm:px-8 py-16 space-y-24 sm:space-y-32">'
end_marker = '      {/* LIGHTBOX MODAL */}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find markers")
    exit(1)

editorial_content = content[start_idx:end_idx]

# We will apply a series of regex replacements to transform the sections into the zig-zag layout.
# 1. Update the main tag class
editorial_content = editorial_content.replace(
    '<main className="max-w-5xl mx-auto px-6 sm:px-8 py-16 space-y-24 sm:space-y-32">',
    '<main className="max-w-7xl mx-auto px-4 sm:px-8 py-24 space-y-32 sm:space-y-48 relative z-10">'
)

# Replace the Hero Section (01)
# Center align it, make text very large
hero_pattern = r'\{/\* 01 — EDITORIAL HERO SECTION \*/\}.*?\{/\* Compact Metadata Row \*/\}.*?</section>'
def replace_hero(match):
    text = match.group(0)
    # Make hero centered and bigger
    text = text.replace('max-w-4xl pt-4', 'max-w-4xl mx-auto text-center pt-12 flex flex-col items-center')
    text = text.replace('text-4xl sm:text-6xl', 'text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]')
    text = text.replace('text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-2xl pt-1', 'text-lg sm:text-2xl text-slate-600 font-medium leading-relaxed max-w-3xl pt-4')
    text = text.replace('grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs', 'flex flex-wrap justify-center gap-8 text-xs bg-white/40 backdrop-blur-md px-8 py-6 rounded-full shadow-lg border border-white/60')
    text = text.replace('border-t border-slate-200/60 ', '')
    return text
editorial_content = re.sub(hero_pattern, replace_hero, editorial_content, flags=re.DOTALL)


# Replace Overview (02) - Make it huge center text like "Imagine having an assistant..."
overview_pattern = r'\{/\* 02 — PROJECT OVERVIEW \*/\}.*?\{/\* 03 — THE PROBLEM \*/\}'
def replace_overview(match):
    return """{/* 02 — PROJECT OVERVIEW */}
          <section id="overview" className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-800 leading-tight">
              A case study of the design decisions, structural refinements, and product-focused enhancements made during the election monitoring dashboard project 🗳️ — grounded in PRD analysis and focused on geospatial reporting verification at scale 🌍.
            </h2>
            <p className="text-lg sm:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
              After analyzing the PRD and validating core user workflows, the dashboard was refined into a heatmap-first interface where the map acts as the primary navigation layer and the right panel surfaces contextual insights for the selected geography.
            </p>
          </section>

          {/* 03 — THE PROBLEM */}"""
editorial_content = re.sub(overview_pattern, replace_overview, editorial_content, flags=re.DOTALL)


# For the rest of the sections (03 to 19), let's define a function to format them as ZigZag
def format_zigzag(section_text, section_num, is_left_text):
    # Extract title, badge/pill, and main text/desc
    pill_match = re.search(r'<span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">(.*?)</span>', section_text)
    title_match = re.search(r'<h2.*?>(.*?)</h2>', section_text, re.DOTALL)
    
    # Try to find a paragraph right under the title for the desc
    desc_match = re.search(r'<p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">(.*?)</p>', section_text, re.DOTALL)
    if not desc_match:
        # Check for max-w-3xl space-y-4 paragraph
        desc_match = re.search(r'<div className="max-w-3xl space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">.*?<p>(.*?)</p>', section_text, re.DOTALL)
    
    pill = pill_match.group(1).split("—")[-1].strip() if pill_match else f"SECTION {section_num}"
    title = title_match.group(1).strip() if title_match else ""
    desc = desc_match.group(1).strip() if desc_match else ""
    
    # Remove the extracted parts from the original content to put the rest in the card
    rest = section_text
    if pill_match: rest = rest.replace(pill_match.group(0), "")
    if title_match: rest = rest.replace(title_match.group(0), "")
    if desc_match: rest = rest.replace(desc_match.group(0), "")
    
    # Also clean up the wrapping divs of the header
    rest = re.sub(r'<div className="space-y-[0-9]+ max-w-[0-9a-zA-Z]+">\s*</div>', '', rest, flags=re.DOTALL)
    rest = re.sub(r'<div className="space-y-[0-9]+">\s*</div>', '', rest, flags=re.DOTALL)
    rest = re.sub(r'<section.*?id="(.*?)".*?>', r'<section id="\1" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">', rest, count=1, flags=re.DOTALL)
    if not 'className="grid' in rest:
        rest = re.sub(r'<section.*?>', r'<section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">', rest, count=1, flags=re.DOTALL)

    text_block = f'''
              <div className="space-y-6 lg:max-w-lg { "lg:order-1" if is_left_text else "lg:order-2" }">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] tracking-wider uppercase shadow-sm">
                  {pill}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {title}
                </h2>
                {f'<p className="text-lg text-slate-600 font-medium leading-relaxed">{desc}</p>' if desc else ''}
              </div>
'''

    card_block = f'''
              <div className="bg-white/60 backdrop-blur-xl p-8 sm:p-12 rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white { "lg:order-2" if is_left_text else "lg:order-1" }">
'''
    
    # Replace the <section...> tag with the grid container and text block, then wrap the rest in the card
    # Find the closing </section>
    end_idx = rest.rfind('</section>')
    content_inside = rest[rest.find('>')+1:end_idx].strip()
    
    section_tag = rest[:rest.find('>')+1]
    
    return f"{section_tag}\n{text_block}\n{card_block}\n{content_inside}\n</div>\n</section>"

def process_section(section_text, section_num):
    is_left = (section_num % 2 != 0) # odd numbers have text on left
    return format_zigzag(section_text, section_num, is_left)

# We will manually split and process each section from 03 to 19
for i in range(3, 20):
    start_tag = f'{{/* {i:02d} —'
    end_tag = f'{{/* {i+1:02d} —'
    if i == 19:
        end_tag = '{/* 20 —'
        
    s_idx = editorial_content.find(start_tag)
    e_idx = editorial_content.find(end_tag)
    
    if s_idx != -1 and e_idx != -1:
        section_text = editorial_content[s_idx:e_idx]
        new_section_text = process_section(section_text, i)
        editorial_content = editorial_content[:s_idx] + new_section_text + "\n\n          " + editorial_content[e_idx:]

# Update the footer (20) to be floating
footer_pattern = r'\{/\* 20 — FOOTER \*/\}.*?</main>'
def replace_footer(match):
    text = match.group(0)
    text = text.replace('<footer className="border-t border-slate-200/60 pt-16 text-center space-y-6">', '<footer className="pt-32 pb-16 text-center space-y-8 flex flex-col items-center">')
    text = text.replace('text-2xl font-bold', 'text-4xl sm:text-5xl font-extrabold')
    text = text.replace('text-xs text-slate-400 font-normal', 'text-base text-slate-500 font-medium')
    text = text.replace('bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-full text-xs transition-all shadow-sm', 'bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-full text-sm transition-all shadow-xl shadow-blue-600/30')
    return text
editorial_content = re.sub(footer_pattern, replace_footer, editorial_content, flags=re.DOTALL)

# Update the root div background
content = content.replace(
    '<div className="min-h-screen bg-[#FAFBFD] text-slate-800 font-poppins pb-40 selection:bg-blue-600 selection:text-white relative overflow-hidden">',
    '<div className="min-h-screen bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#ffffff] text-slate-800 font-poppins pb-40 selection:bg-blue-600 selection:text-white relative overflow-hidden">'
)
# Make blobs white/blue for clouds
content = content.replace('bg-blue-300/30', 'bg-white/60')
content = content.replace('bg-indigo-300/30', 'bg-sky-200/40')
content = content.replace('bg-teal-300/30', 'bg-white/50')

# Merge back
new_content = content[:start_idx] + editorial_content + content[end_idx:]

with open(file_path, "w") as f:
    f.write(new_content)

print("Done transforming")
