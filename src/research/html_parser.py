from bs4 import BeautifulSoup
import json

# ==== CONFIG ====
input_html_path = "research/zotero_export/publication.html"
output_json_path = "research/content.json"
# ================

with open(input_html_path, encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

content = {}

# Extract and group entries by year
for entry in soup.find_all('div', class_='csl-entry'):
    text = entry.get_text().strip()

    # Try to extract the year (4 digits, assumes it's in the citation)
    import re
    year_match = re.search(r'\b(19|20)\d{2}\b', text)
    year = year_match.group(0) if year_match else 'n.d.'

    if year not in content:
        content[year] = []

    content[year].append(text)

# Sort by year, descending
content = {y: content[y] for y in sorted(content, reverse=True)}

# Optional: sort entries alphabetically per year
for y in content:
    content[y].sort()

# Save to JSON
with open(output_json_path, 'w', encoding='utf-8') as f:
    json.dump(content, f, indent=2, ensure_ascii=False)

print(f"✅ Exported {sum(len(v) for v in content.values())} entries to {output_json_path}")
