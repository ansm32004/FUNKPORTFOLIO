with open("src/components/GovtElectionCaseStudy.jsx", "r") as f:
    lines = f.readlines()

for i in [1041, 1152, 1265, 1365, 1630, 1685]:
    lines[i] = lines[i].replace('"', '&quot;').replace("'", "&apos;")

with open("src/components/GovtElectionCaseStudy.jsx", "w") as f:
    f.writelines(lines)
