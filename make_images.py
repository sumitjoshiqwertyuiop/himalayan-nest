"""Generates the illustrative SVG artwork in /images. Run: python make_images.py
Replace any file with a real photo (same name, .jpg) and update the path in js/script.js."""
import random
def art(name, sky, ridges, motif=None, sun=True):
    random.seed(name); W,H=1200,800
    s=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{sky[0]}"/><stop offset="1" stop-color="{sky[1]}"/></linearGradient></defs><rect width="{W}" height="{H}" fill="url(#g)"/>'
    if sun: s+=f'<circle cx="{random.randint(250,950)}" cy="210" r="70" fill="#fff6d8" opacity=".85"/>'
    base=330
    for i,c in enumerate(ridges):
        y=base+i*95; pts=[f"0,{H}"]
        for x in range(0,W+101,100): pts.append(f"{x},{y-random.randint(0,110)-(60 if i==0 else 0)}")
        pts.append(f"{W},{H}"); s+=f'<polygon points="{" ".join(pts)}" fill="{c}"/>'
    if motif=="temple":
        s+='<g fill="#3a2a1e"><rect x="540" y="520" width="120" height="110"/><polygon points="525,520 600,400 675,520"/><rect x="594" y="375" width="12" height="30"/><rect x="570" y="570" width="30" height="60" fill="#e8d9b5"/></g>'
    if motif=="house":
        s+='<g><rect x="430" y="520" width="340" height="150" fill="#d8c3a0"/><polygon points="410,520 600,420 790,520" fill="#6b4a32"/><rect x="480" y="570" width="60" height="100" fill="#4a3322"/><rect x="620" y="560" width="90" height="60" fill="#f6e7b8"/></g>'
    if motif=="room":
        s+='<g><rect x="300" y="480" width="600" height="190" rx="14" fill="#f3ead6"/><rect x="340" y="430" width="240" height="120" rx="10" fill="#c9a96a"/><rect x="620" y="440" width="220" height="110" rx="8" fill="#9bc3d8"/></g>'
    if motif=="food":
        s+='<g><ellipse cx="600" cy="560" rx="230" ry="70" fill="#7b4a2a"/><ellipse cx="600" cy="540" rx="190" ry="50" fill="#f3ead6"/><circle cx="560" cy="535" r="26" fill="#e0a43a"/><circle cx="620" cy="540" r="26" fill="#7a9a4a"/><circle cx="660" cy="530" r="20" fill="#b5532f"/></g>'
    if motif=="trees":
        for x in range(60,1200,130): s+=f'<polygon points="{x},640 {x+40},520 {x+80},640" fill="#1f4a32"/>'
    open(f"images/{name}.svg","w").write(s+"</svg>")
sk=("#a9cbe0","#f6e7c8"); dusk=("#f3b98a","#fbe9c4"); mist=("#c7d8d6","#eef0e2")
G=["#9db7ad","#6f9585","#3f6b55","#1f4a32"]
for n,k,r,m in [("hero",dusk,G,None),("about",sk,G,"house"),("exterior",sk,G,"house"),("room-deluxe",sk,G,"room"),("room-family",mist,G,"room"),("room-kumaoni",dusk,G,"house"),
 ("dunagiri",mist,G,"temple"),("pandukholi",mist,G,"trees"),("kukuchina",sk,G,"trees"),("dwarahat-temples",dusk,G,"temple"),("jageshwar",mist,G,"temple"),("katarmal",dusk,G,"temple"),
 ("mountains",("#8fb5d6","#eaf1f5"),["#ffffff","#b9cde0","#7f9fb8","#3f6b55"],None),("food",dusk,G,"food"),("village",sk,G,"house"),("landscape",mist,G,"trees")]:
    art(n,k,r,m)
