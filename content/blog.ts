// Blog post data + body content. Hand-written by the BH Drywall Metro Detroit team for SEO + customer value.
// Bodies use a very small markdown-ish dialect: lines starting with `## ` are H2, `### ` are H3,
// lines starting with `- ` are list items, blank lines split paragraphs.

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle?: string;
  excerpt: string;
  category: "Residential" | "Commercial" | "Safety" | "Security";
  readMinutes: number;
  date: string; // ISO
  heroImage: string;      // /blog/<slug>-hero.png
  heroAlt: string;
  secondaryImage: string; // /blog/<slug>-secondary.png
  secondaryAlt: string;
  body: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "basement-drywall-finishing-metro-detroit",
    title: "Basement Drywall Finishing in Metro Detroit: Moisture, Code, and a Clean Finish",
    metaTitle: "Basement Drywall Finishing Metro Detroit Guide",
    excerpt:
      "Finished basements add living space across Wayne, Oakland, and Macomb counties — but Michigan humidity and concrete walls demand the right board, insulation, and finishing sequence.",
    category: "Residential",
    readMinutes: 7,
    date: "2026-01-14",
    heroImage: "/blog/basement-drywall-finishing-metro-detroit-hero.png",
    heroAlt: "Crew hanging moisture-resistant drywall on framed basement walls in a Metro Detroit home",
    secondaryImage: "/blog/basement-drywall-finishing-metro-detroit-secondary.png",
    secondaryAlt: "Freshly mudded and sanded basement drywall ready for primer in Michigan",
    body: `
A finished basement is one of the smartest square-footage upgrades you can make in Metro Detroit. Whether you are building a family room in Sterling Heights, a home office in Royal Oak, or extra bedrooms in Livonia, drywall is what turns raw framing into a space that feels like the rest of the house. At BH Drywall Metro Detroit, we finish basements every week — and the difference between a project that stays flat for years and one that develops mold lines or cracked corners almost always comes down to prep, product choice, and sequencing.

Basements are not just another floor. Concrete foundations breathe, seasonal groundwater shifts, and Michigan winters drive humidity swings that upstairs walls never see. Before the first sheet goes up, we walk the job with homeowners and discuss how the space will be used, where heat runs, and whether a bathroom or wet bar is part of the plan. Those answers dictate fire taping, moisture-resistant board zones, and how aggressively we need to control vapor at the foundation.

## Start with framing and insulation — not drywall

Drywall only performs as well as what is behind it. In most Metro Detroit basements we see either steel stud or wood framing on standoffs from the foundation wall, with rigid or batt insulation in the cavity. Gaps at the sill plate, rim joist, and any plumbing chases must be sealed before board. Cold spots that are not addressed will show up later as ghosting or condensation stains on the finished surface. How [framing and drywall](/blog/framing-and-drywall-metro-detroit) fit together, including backing layout and soffit planning, is covered in its own guide.

We also verify ceiling height against local code and egress requirements if bedrooms are involved. Low soffits around ducts are common; we plan drywall breaks so joints land on backing and future cracks are minimized. Homeowners in Warren, Troy, and Dearborn often underestimate how much layout work happens before mud touches the wall.

### Moisture-resistant board where it matters

Not every basement wall needs green board, but any surface near a shower, laundry, or bar sink should be moisture-resistant gypsum. We still insist on proper waterproofing behind tile in wet areas — board alone is not a tank. For general living walls, standard drywall paired with a continuous vapor strategy and dehumidification is usually appropriate when the exterior drainage and foundation are in reasonable shape.

If you have had seepage or active leaks, drywall is the last step, not the first. We will tell you plainly to fix water entry before we hang a single panel. Covering a problem only delays bigger repair bills.

## Hanging strategy for below-grade walls

Basement ceilings are often a mix of main beams, soffits, and recessed can lights. We stagger joints, use the right screw spacing, and keep edge distances consistent so tape has a fair chance to hide movement. Long walls without control joints can telegraph cracks when the house settles; we discuss where reasonable breaks belong so you are not surprised a year later.

Around windows and bulkheads, we build out square and true even when the concrete is not. That extra time at hang is what makes trim and paint look intentional instead of wavy.

## Finishing levels and paint readiness

Most living-space basements in Michigan homes call for a Level 4 finish at minimum — embedded tape, two coats of compound, sanding ready for flat or eggshell paint. If you are planning glossy paint, strong raking light, or a media wall with side lighting, ask about Level 5 skim options. We explain the tradeoff in cost versus how perfect the wall reads under LED strips or large-screen glare.

Corners receive metal or paper-faced bead depending on traffic and abuse tolerance. Kids, hockey bags, and furniture moves punish outside corners; we beef those up where it makes sense.

## Mechanical, electrical, and inspections

Basement projects frequently trigger permit and inspection paths depending on municipality — Detroit, Ferndale, Clinton Township, and others each have their own timelines. We coordinate hang and finish around rough inspections so you are not tearing off completed work. Fireblocking at soffits and around stair enclosures must be correct before close-in.

## Working with BH Drywall Metro Detroit

Our crews serve homeowners across Metro Detroit MI with hang, tape, texture match, and repair. We give clear scopes: hang only, hang and finish, or full turn-key ready for primer. You get straight answers about timeline, dust control, and what you should handle before we arrive — insulation, framing inspection, HVAC final placement.

Ready to turn unused basement footage into usable rooms? Call BH Drywall Metro Detroit at (313) 236-4558. We will schedule a walkthrough, confirm board types and finish level, and build a schedule that respects Michigan weather and your move-in goals.
`,
  },

  {
    slug: "level-5-smooth-walls-michigan-homes",
    title: "Level 5 Smooth Walls for Michigan Homes: When Skim Coats Are Worth It",
    metaTitle: "Level 5 Drywall Finish Michigan Homes",
    excerpt:
      "Raking light and bold paint colors expose every joint. Here is how a Level 5 skim coat changes the look of great rooms, stair halls, and open floor plans in Metro Detroit.",
    category: "Residential",
    readMinutes: 8,
    date: "2026-02-03",
    heroImage: "/blog/level-5-smooth-walls-michigan-homes-hero.png",
    heroAlt: "Sunlight across a perfectly smooth Level 5 drywall wall in a Michigan great room",
    secondaryImage: "/blog/level-5-smooth-walls-michigan-homes-secondary.png",
    secondaryAlt: "Drywall finisher applying a skim coat with a wide knife in Metro Detroit",
    body: `
Walk into a newly built or remodeled home in Birmingham, Canton, or Grosse Pointe with floor-to-ceiling windows and the first thing your eye catches is the quality of the walls. Under natural light, standard Level 4 drywall can show faint joint bands and tool marks — not defects, just physics. Homeowners who choose deep grays, pure whites, or high-gloss trim often want better. That is where Level 5 comes in: a thin skim coat over the entire surface so paint sees one uniform texture.

BH Drywall Metro Detroit finishes hundreds of walls each year. We are honest when Level 4 is enough and when skipping Level 5 will haunt you after the first coat of paint.

## What Level 4 versus Level 5 actually means

Drywall finishing levels are industry definitions, not marketing labels. Level 4 means embedded tape, multiple coats on joints and fasteners, and sanding suitable for flat, eggshell, or light texture under normal lighting. Level 4 is the default for most bedrooms, closets, and secondary halls in Michigan production and custom work alike.

Level 5 adds a full-surface skim — typically roller-applied compound or troweled skim — then sanded smooth. The goal is to eliminate the slight porosity difference between joint compound and paper face so paint does not flash. In rooms with large windows, low-angle sun, or open sightlines across long walls, Level 5 is the difference between “nice” and “magazine.”

### Rooms that benefit most

- Two-story great rooms and stair walls with east or west exposure.
- Open kitchen and living areas with no breaks to hide imperfections.
- Home offices on video calls where ring lights rake the wall behind you.
- Any space getting dark paint, metallics, or high sheen on the gypsum itself.

Bedrooms with one small window and matte paint? Level 4 is usually fine and saves budget for other upgrades.

## How we execute Level 5 in Metro Detroit homes

Skim work is unforgiving. We start with Level 4 joints done right — if corners are wavy or fasteners are proud, a skim will not save you. Surfaces get a uniform primer or sealer coat compatible with our skim compound so absorption is even. We apply skim in manageable sections, keep wet edges organized, and sand with dust control because fine compound dust travels through HVAC returns fast.

Ceilings deserve the same conversation. Coffered and tray ceilings with LED coves show every bump. Matching ceiling Level 5 to wall Level 5 avoids a perfect wall meeting a “good enough” ceiling that still reads under light.

## Cost, schedule, and paint coordination

Level 5 adds labor and drying time. Michigan humidity in summer can extend skim cure windows; we plan coats so you are not trapping moisture under vinyl paint. We coordinate with your painter on primer spec — some painters prefer specific sealers over fresh skim. BH Drywall Metro Detroit documents finish level on the scope so everyone on the job speaks the same language.

Texture is the alternative when you want to hide variation without full skim. Knockdown, light orange peel, or hand texture can be beautiful in basements and secondary spaces. We match existing texture on repairs so patches disappear.

## Common mistakes we see on other jobs

Skipping primer before skim leads to pinholes and drag marks. Sanding through paper face creates fuzzy spots that telegraph forever. Mixing compound brands between coats causes bond issues. Hiring hang-only crews then asking a painter to “skim it” rarely yields true Level 5 — taping and skim are different trades with different touch.

## Repairs and partial Level 5

Remodels sometimes need Level 5 on one accent wall while the rest stays Level 4. We feather transitions at outside corners and casework so you do not see a “better wall” rectangle after paint. Insurance repairs after water damage often reset finish level in affected rooms only; we blend to undamaged areas when possible.

## Talk to our finish team

If you are building new in Macomb County, renovating in Midtown Detroit, or fixing a botched skim from a prior contractor, we can assess under your actual lighting — not just flashlight at noon. Bring paint samples and fixture plans if you have them.

Call BH Drywall Metro Detroit at (313) 236-4558 for Level 4 and Level 5 scopes, written timelines, and crews who treat smooth walls as craft work, not an upsell checkbox. Metro Detroit MI homeowners deserve walls that look as good at 6 p.m. in January as they do at noon in June.
`,
  },

  {
    slug: "drywall-hole-repair-vs-large-patch",
    title: "Drywall Hole Repair vs. Large Patch: Size, Structure, and When to Replace a Section",
    metaTitle: "Drywall Hole Repair vs Large Patch Michigan",
    excerpt:
      "Doorknob dents, plumbing access, and accident damage each need a different fix. Learn how BH Drywall Metro Detroit sizes repairs so patches never telegraph through paint.",
    category: "Residential",
    readMinutes: 6,
    date: "2026-02-21",
    heroImage: "/blog/drywall-hole-repair-vs-large-patch-hero.png",
    heroAlt: "Before and after drywall patch repair in a Metro Detroit hallway",
    secondaryImage: "/blog/drywall-hole-repair-vs-large-patch-secondary.png",
    secondaryAlt: "Drywall contractor installing a California patch with backing board",
    body: `
Every Metro Detroit home accumulates wall damage: door swings without stops, furniture moves in Taylor, kids practicing sports in the garage corridor, or a plumber cutting access in Southfield. The question is never “can this be fixed?” — it is whether a small repair, a structured patch, or a partial sheet replacement gives you a wall that disappears after paint. BH Drywall Metro Detroit handles everything from nail pops to entire wall resets; sizing the fix correctly up front saves money and callbacks.

## Small holes and surface dents

Holes roughly the size of a quarter or smaller — picture hangers, anchor pulls, minor impacts — often qualify for lightweight spackle or setting compound fills after confirming nothing behind the board is damaged. We remove loose paper, feather a few inches, sand, and prime. These repairs are quick and inexpensive when the surrounding wall is sound and finish level is standard.

Nail pops are not really holes but they behave like them in paint. We reset fasteners, add screws into framing if the original missed, spot compound, and sand. In older Detroit and Redford homes with plaster-over-board or multiple paint layers, we check for movement before cosmetically hiding chronic pops.

### When “small” still needs backing

If a hole is ping-pong-ball sized or larger, compound alone will sag or crack. We install backing — wood cleats or repair plates — so new gypsum has support. California patches (backer board with a fitted plug) work well for fist-sized damage without replacing a full sheet. Edges must be tight and tapered for tape to hide the seam.

## Medium patches and access cuts

Plumbers and electricians often leave rectangular cuts 8 to 16 inches wide. Those are patch jobs, not fill jobs. We square the opening, add backing at studs or cross blocking, insert a matching thickness board, tape with paper or mesh depending on stress, and feather compound wider than you think — often 12 to 16 inches each side under raking light.

Texture match matters as much as flatness. Metro Detroit homes from the 1970s through 2000s carry orange peel, knockdown, and skip trowel patterns. We duplicate pattern and density so the patch does not read as a smooth island in a textured field.

## Large damage: partial sheet replacement

When damage spans multiple studs, sat wet, or crumbled from impact, partial replacement is the right call. We cut back to the nearest stud centers, install full-height pieces where possible to minimize horizontal joints at eye level, and re-tape entire seams rather than spot-wadding compound on a bowed panel.

Water-stained but structurally dry board may still need replacement if the paper face is compromised — paint will not hold and mold risk rises in humid summers. We document moisture readings when staining is present so you know we are not sealing in a problem.

## Finish level and paint flashing

Repairs on Level 4 walls need feathering that matches porosity or primer will flash. On previously skimmed Level 5 walls, we skim the patch field or the whole wall section to uniform texture — partial Level 5 touch-up is an art. Homeowners planning bold colors should budget for primer sealer and sometimes full-wall repaint after major patches.

## Rental and resale scenarios

Landlords in Hamtramck and Dearborn Heights need durable fixes between tenants. We prioritize speed with correct technique: backing, tape, texture match, primer-ready surface. Sellers preparing listings in Rochester Hills or Plymouth benefit from repairs done before photography — phone cameras pick up bumps worse than the human eye.

## DIY limits

Store patch kits work for tiny holes. Beyond that, frustration rises: compound shrinks, tape bubbles, corners crack. Michigan seasons change indoor humidity; bad patches expand in summer. Calling a pro early often costs less than repainting twice.

## Get a clear scope from BH Drywall Metro Detroit

Send photos if you like — we still verify in person for texture and moisture. We quote by repair class: spot, backed patch, or sheet replacement, with texture and primer notes spelled out.

Dial (313) 236-4558 to schedule repair visits anywhere in Metro Detroit MI. We arrive with backing stock, compound, and the patience to feather until the wall is truly gone under your lights.
`,
  },

  {
    slug: "water-damage-flood-cut-michigan",
    title: "Water Damage and Flood Cuts: Drywall Steps After Michigan Basements and Burst Pipes",
    metaTitle: "Drywall Flood Cut Water Damage Michigan",
    excerpt:
      "After leaks and floods, how high do you cut drywall? BH Drywall Metro Detroit explains drying, mold prevention, and rebuild sequencing for Metro Detroit properties.",
    category: "Safety",
    readMinutes: 7,
    date: "2026-03-08",
    heroImage: "/blog/water-damage-flood-cut-michigan-hero.png",
    heroAlt: "Flood cut drywall removed along a basement wall showing clean studs in Michigan",
    secondaryImage: "/blog/water-damage-flood-cut-michigan-secondary.png",
    secondaryAlt: "New drywall installed after water damage restoration in Metro Detroit",
    body: `
Water in your walls is an emergency for both structure and health. Burst pipes in January, sump failures in Roseville, ice dam seepage in Ann Arbor suburbs, and appliance leaks in upstairs baths — each scenario leaves drywall soaked to different heights. BH Drywall Metro Detroit works alongside restoration contractors and homeowners daily to remove compromised board, confirm dry framing, and rebuild to a paint-ready finish across Metro Detroit MI.

The first priority is stopping the source and documenting for insurance if you are filing a claim. Our role begins when it is time to remove wet gypsum safely and replace it so mold does not get a foothold behind new paint.

## Why flood cuts exist

Gypsum core acts like a sponge. Once water wicks above the visible stain line, the paper face and core stay elevated in moisture long after floors look dry. Industry practice and restoration protocols often call for a **flood cut** — removing drywall 12 to 24 inches above the highest moisture reading or the documented water line — to expose the cavity for drying equipment and inspection.

In basements, cuts may run full height if saturation was total or if contamination (sewage or gray water) requires discard. Clean water on an upper floor might need only lower sections of wall removed if moisture meters on studs read dry within days.

### Who measures moisture?

Restoration companies typically log readings; we respect their cut lines when sequencing rebuild. If you are owner-managed, we still meter before hang. Installing new board against damp framing traps liability and odor. Michigan basements need dehumidification and airflow until wood moisture is in acceptable range — rushing hang is false economy.

## Safety and containment

Disturbed wet drywall can release spores if mold already started. Containment, HEPA filtration, and PPE belong on heavy jobs. We follow site safety plans when lead or asbestos surveys apply — older Detroit housing stock may require testing before aggressive demolition.

Electrical outlets in wet zones stay off until cleared. We coordinate with electricians to reset boxes and verify GFCI paths in kitchens, baths, and unfinished basement areas before close-in.

## Rebuild sequencing after dry-out

Once framing is dry and treated per restoration spec ( antimicrobial where required ), we hang replacement sheets, tape, and finish to match undamaged areas. Partial height replacements in living rooms need horizontal seams placed thoughtfully — sometimes we replace full sheets floor to ceiling on affected walls to avoid a visible “belt line” at 24 inches.

Insulation that sat wet must be replaced before drywall returns. Vapor barriers and sill areas in Metro Detroit basements are common failure points; we flag them even when scope is “drywall only.”

## Texture, color, and insurance scopes

Insurance adjusters often authorize “like kind and quality” repair. We document finish level and texture type so supplements are accurate. Orange peel match on a flood-cut wall in Warren should include primer sealer on new work to prevent flashing against older painted surfaces.

If only one wall in an open plan was damaged, full-wall repaint on adjacent walls may still be necessary for color uniformity — we tell you that before final coat so you are not surprised at touch-up day.

## Whole-home versus localized events

Whole-home pipe freezes can damage multiple levels. We phase work: main living areas first for occupancy, bedrooms next, garage and utility last. Commercial-style drying timelines still apply in houses — families need clear move-back dates.

## Prevention conversations

After rebuild, we talk about door sweeps, hose bib shutoffs, water alarms, and maintaining sump pumps — not as alarmism, but because repeat events destroy twice the drywall. Proper board type in wet zones and keeping paint sealed at baseboards reduces wicking.

## Call for damage assessment and rebuild

If you see swelling baseboards, soft drywall near tubs, or staining after a storm, do not wait for the smell to confirm mold risk. BH Drywall Metro Detroit responds to emergency cut-out and scheduled rebuild scopes with clear lines: demo, dry verification, hang, finish, texture.

Reach us at (313) 236-4558. We serve homeowners and property managers throughout Metro Detroit MI with water damage drywall removal and professional replacement that respects drying science, not just cosmetic cover-up.
`,
  },

  {
    slug: "commercial-tenant-drywall-detroit",
    title: "Commercial Tenant Drywall in Detroit: Build-Outs, Repairs, and Minimal Downtime",
    metaTitle: "Commercial Tenant Drywall Detroit Build-Outs",
    excerpt:
      "Retail, office, and medical tenant improvements need code-aware drywall, after-hours hang, and finishes that match your brand — across Metro Detroit corridors.",
    category: "Commercial",
    readMinutes: 7,
    date: "2026-04-02",
    heroImage: "/blog/commercial-tenant-drywall-detroit-hero.png",
    heroAlt: "Commercial drywall partition framing in a Detroit tenant build-out",
    secondaryImage: "/blog/commercial-tenant-drywall-detroit-secondary.png",
    secondaryAlt: "Finished commercial drywall with paint-ready walls in Metro Detroit office space",
    body: `
Detroit and the surrounding Metro Detroit MI market continue to see tenant churn — new restaurants in Midtown, clinics in Southfield, professional offices in Troy, and flex space along major corridors. Every lease turnover brings partition changes, soffit updates, and damage repair from prior tenants. BH Drywall Metro Detroit supports general contractors, property managers, and business owners with commercial hang, finish, and patch work sized for tight schedules and inspection requirements.

Commercial drywall is not “residential, but bigger.” Fire ratings, shaft walls, acoustic assemblies, and ADA path clearances drive board type and joint treatment. We read life-safety sheets and follow spec — Type X where required, proper stagger, and labeled photos for close-out packages when owners ask.

## Typical tenant improvement scopes

- Demising walls between suites with rated assemblies when drawings call for them.
- New conference rooms, manager offices, and reception features with glass-ready openings.
- Soffits for HVAC, lighting, and exposed structure concealment in loft-style spaces.
- Damage repair after fixture removal — anchor holes, cart impacts, prior tenant shortcuts.

We coordinate with electricians and sprinkler fitters so ceiling grid and drywall close-in order avoids rework. Night and weekend shifts are available when storefronts cannot shut down weekdays.

### Retail and hospitality pressures

Restaurants and bars in Detroit need grease-rated considerations near kitchens — drywall selection pairs with hood and MEP work we do not perform, but we respect clearance zones and fire wrap locations. Fast-turn paint-ready walls get primed scope notes so your painter hits opening week.

For retail, clean sightlines matter. Level 4 is standard; feature walls may get Level 5 or accent texture. We protect floors and fixtures when only a portion of the suite changes.

## Office and medical build-outs

Medical and dental tenants often need lead-lined partitions or enhanced acoustic privacy — those are engineered systems beyond standard gypsum. When plans specify multi-layer board or resilient channel, we install per detail and leave inspection access until sign-off.

Open offices with demountable partitions still need permanent drywall at cores, restrooms, and stair enclosures. We tie into existing slabs and decks with fire caulk at penetrations per code officials in different municipalities — Detroit, Highland Park, and suburban townships each have inspection habits we plan for.

## Property manager maintenance programs

Multi-tenant centers in Madison Heights, Oak Park, and along Eight Mile see recurring damage: loading dock hits, wayfinding anchor scars, water heater closet leaks. BH Drywall Metro Detroit offers response lists for managers who need consistent vendor paperwork — COI, W-9, and photo closeouts for asset files.

Matching decade-old orange peel in a hallway wing is slower than new hang but cheaper than repainting entire corridors. We sample texture and confirm under corridor LED before promising invisible patches.

## Budgeting TI allowances

Landlord work letters often cap TI dollars. We help prioritize: life-safety and wet-area board first, then public-facing walls, then back-of-house. Value engineering should not mean deleting fire tape or using improper fasteners on rated walls — failed inspection delays certificate of occupancy and costs more than doing it right once.

## Communication and phasing

Commercial clients get daily progress notes when requested, clear demarcation of areas still open to other trades, and dust control for occupied adjacent suites. We label rooms on invoices the way your drawings do — Suite 210 east wall — so billing matches GC pay apps.

## Partner with BH Drywall Metro Detroit

Whether you are a GC bidding a full build-out or an owner refreshing one bay, we bring crews experienced with metal stud, high ceilings, and inspection loops common in Metro Detroit commercial work.

Call (313) 236-4558 to discuss drawings, schedule windows, and fire-rated scopes. We translate architect language into hang dates and finish levels your painter and inspector can live with — without the downtime of learning on the job.
`,
  },

  {
    slug: "popcorn-ceiling-removal-metro-detroit",
    title: "Popcorn Ceiling Removal in Metro Detroit: Asbestos Era Homes and Modern Finishes",
    metaTitle: "Popcorn Ceiling Removal Metro Detroit",
    excerpt:
      "Textured ceilings date many Michigan ranches and split-levels. Learn testing, containment, skim options, and what BH Drywall Metro Detroit recommends before you scrape.",
    category: "Residential",
    readMinutes: 8,
    date: "2026-04-19",
    heroImage: "/blog/popcorn-ceiling-removal-metro-detroit-hero.png",
    heroAlt: "Worker removing popcorn ceiling texture in a Metro Detroit ranch home",
    secondaryImage: "/blog/popcorn-ceiling-removal-metro-detroit-secondary.png",
    secondaryAlt: "Smooth ceiling after skim coat following popcorn removal in Michigan",
    body: `
Popcorn ceilings — acoustic spray texture — cover thousands of Metro Detroit MI homes built from the 1950s through 1980s. They hid imperfect taping, added minor sound dampening, and were fashionable until they were not. Today’s buyers and owners want flat or lightly textured ceilings that read clean with recessed lights and open floor plans. BH Drywall Metro Detroit removes and resurfaces popcorn ceilings weekly in Livonia, Westland, St. Clair Shores, and inside the city limits — always with the right conversation about age, testing, and mess control first.

## Test before you scrape

In homes built before roughly 1980, popcorn may contain asbestos. Disturbing it without proper testing and abatement is illegal and unsafe. We stop projects until lab results or licensed abatement clearance says proceed. Negative tests still deserve plastic containment and HEPA vacuuming because fine dust travels through returns.

If abatement is required, a licensed abatement contractor removes material; we follow with skim, sand, and prime to paint-ready smooth or new texture. Do not let an handyman scrape first and ask questions later — disposal and air quality penalties are serious.

### Lead paint at ceiling/wall joints

Older homes may have lead painted trim and ceiling edges. EPA RRP rules apply to disturbed painted surfaces in pre-1978 housing. We work within certified practices when joint areas are affected, protecting occupants and workers.

## Removal methods that work

Wet scrape softens texture when asbestos is not present and material tests safe. We mist in sections, scrape to board or skim-coat base, bag debris, and keep floors protected. Dry scraping creates airborne dust — we avoid it on occupied homes.

After scrape, the ceiling rarely looks paint-ready. Paper may tear, joints expose, and fasteners pop. Skim coat — sometimes two passes — levels the field. Wide sanding follows with dust extraction. Primer sealer locks surface before your painter applies flat ceiling paint.

## Lighting and structural updates during removal

Popcorn removal is the perfect time to add recessed cans, move fixtures, or patch old hook scars. Electricians cut and mount; we patch and skim around each opening so rings sit flush. Beams and coffered details can be added in larger remodels — scope creep is manageable when trades sequence correctly.

Vaulted ceilings in two-story foyers need scaffold or lift access. We price access honestly so bids are not surprise change orders mid-job.

## Alternatives to full removal

Encapsulation with specialized coatings exists for some textured ceilings when removal is not feasible — not our primary service, but we tell owners when skim-over-texture after bonding primer works for low ceilings that cannot tolerate abatement cost. Results vary; sampling and adhesion tests matter.

Knockdown re-texture after skim can unify a home that still wants some pattern without popcorn’s dated look. We match sample boards on site before full application.

## Mess, move-out, and timing

Popcorn jobs are messy even when done right. Furniture covers, floor protection, and sealing doorways keep dust out of bedrooms. Many families leave for a long weekend while scrape and skim cure. Michigan humidity affects skim dry time — we schedule sand and primer when compound is actually ready, not when the calendar is impatient.

HVAC should be off or returns sealed during heavy work; we remind you before start day.

## Value and resale

Flat ceilings brighten rooms and help listings photograph better in Ferndale, Royal Oak, and suburban ranches. Disclosure rules apply to known asbestos history — keep test paperwork. Done properly, removal is a one-time upgrade with decades of payoff.

## Schedule with BH Drywall Metro Detroit

We walk ceilings, ask build year, recommend testing path, and quote scrape, skim, sand, and prime as integrated scope — not a low scrape number that hides skim reality. Full scope, containment detail, and example jobs live on our [popcorn ceiling removal](/services/popcorn-ceiling-removal/) service page.

Phone (313) 236-4558 for popcorn ceiling removal and resurfacing across Metro Detroit MI. You get straight talk on asbestos era homes, containment, and a ceiling that finally matches the walls you already upgraded.
`,
  },

  {
    slug: "hire-drywall-contractor-michigan-checklist",
    title: "How to Hire a Drywall Contractor in Michigan: Checklist Before You Sign",
    metaTitle: "Hire a Drywall Contractor Michigan Checklist",
    excerpt:
      "Licenses, insurance, scope clarity, and finish levels — use this BH Drywall Metro Detroit checklist so your next hang and finish job does not stall at inspection or paint.",
    category: "Safety",
    readMinutes: 6,
    date: "2026-05-06",
    heroImage: "/blog/hire-drywall-contractor-michigan-checklist-hero.png",
    heroAlt: "Homeowner reviewing drywall contract scope with contractor in Metro Detroit",
    secondaryImage: "/blog/hire-drywall-contractor-michigan-checklist-secondary.png",
    secondaryAlt: "Insured drywall crew with tools and protection at a Michigan job site",
    body: `
Drywall looks straightforward until joints telegraph, corners crack, or an inspector red-tags a commercial suite. Hiring the lowest hourly bid without a written scope is how Metro Detroit MI homeowners and business owners lose weeks and repainting budgets. BH Drywall Metro Detroit built this checklist so you can compare contractors fairly — and so you know what we will put in writing when you call (313) 236-4558.

## Verify business legitimacy

- Michigan business registration and a verifiable local address or established service area in Metro Detroit.
- General liability insurance and workers compensation — ask for current certificates; your project should not become your homeowner policy’s problem if someone is hurt.
- References or recent photos of similar work — repairs, new construction, commercial TI, not unrelated trades.

We provide documentation when general contractors and property managers require it. If a bidder refuses insurance proof, stop there.

### Written scope beats verbal promises

Your contract or proposal should state:

- Hang only versus hang and finish versus repair classification.
- Finish level — Level 4 or Level 5 — and rooms included.
- Texture type and match requirements for repairs.
- Who supplies board, compound, bead, and primer.
- Cleanup, disposal, and protection of floors and fixtures.
- Schedule milestones and weather or drying disclaimers where relevant.

Vague “tape and mud” language causes disputes when paint goes on and joints flash. Insist on room lists and square footage or linear foot notes for commercial work.

## Understand pricing models

Some contractors bid per sheet hung; others per square foot finished; repairs often per patch class. Each model is fine if assumptions are explicit — ceiling height, access, fire board upcharges, after-hours commercial premiums. Compare total number, not just unit rate.

Change orders happen when framing is out of plane or plans shift. Good contractors document extras before work, not at invoice surprise.

## Site readiness expectations

You save money when the job is ready:

- Framing straight, inspected if required, with backing at corners and openings.
- Electrical and plumbing rough complete before close-in where applicable.
- HVAC boots and cans placed; soffit lines marked.
- Heat or dehumidification running so compound cures in Michigan seasons.

We pre-walk jobs to flag unreadiness — better a one-week delay than cracked mud from freezing garages.

## Safety and occupied homes

Lead, asbestos, silica dust, and ladder work are real. Contractors should use dust control, proper PPE, and containment on demolition. Kids and pets need clear work zones. Night work in commercial spaces needs lighting and fire exit paths maintained.

BH Drywall Metro Detroit treats occupied residences with floor protection and daily vacuuming on repair jobs — ask any bidder how they control dust.

## Red flags

- Large upfront deposits with no schedule tied to progress.
- No mention of finish level or texture on repair quotes.
- Willingness to skim over wet water damage without metering.
- Cannot explain fire taping on commercial rated walls.
- Only accepts cash and provides no written warranty on workmanship.

Michigan law evolves; when permits are required, the contractor should facilitate inspection timing, not tell you to skip city contact.

## Warranty and punch list

Clarify workmanship warranty length — typically one year on labor for residential finish defects not caused by structural movement or exterior water. Punch walk before final payment: corners, screw pops visible in raking light, texture uniformity, ready for primer.

## Why homeowners choose BH Drywall Metro Detroit

We are specialists — not a side service from a handyman or unrelated trade. Our crews hang metal and wood stud, match textures across Oakland and Wayne county housing stock, and speak plainly when Level 5 is worth your money.

Use this checklist on every bid you collect. When you are ready, call (313) 236-4558 for a walkthrough and written scope aligned with how you will actually paint and use the space. Metro Detroit deserves drywall done once, done right.
`,
  },

  {
    slug: "new-construction-drywall-phases",
    title: "New Construction Drywall Phases: From First Board to Paint-Ready in Metro Detroit",
    metaTitle: "New Construction Drywall Phases Michigan",
    excerpt:
      "Hang, tape, sand, texture — sequencing matters on new builds and major additions. BH Drywall Metro Detroit breaks down phases so trades and inspections stay on track.",
    category: "Residential",
    readMinutes: 7,
    date: "2026-05-24",
    heroImage: "/blog/new-construction-drywall-phases-hero.png",
    heroAlt: "New construction home with drywall hung awaiting tape in Metro Detroit",
    secondaryImage: "/blog/new-construction-drywall-phases-secondary.png",
    secondaryAlt: "Finished taped and sanded drywall in a new Michigan home build",
    body: `
New construction and large additions across Metro Detroit MI — custom homes in Northville, subdivisions in Macomb Township, infill in Detroit neighborhoods — all share the same drywall rhythm. Miss a phase and painters stall, trim carpenters chip fresh corners, or inspectors hold certificates. BH Drywall Metro Detroit coordinates with builders and homeowners so hang, finish, and texture land in the right order with clear handoffs.

## Phase 1: Pre-hang verification

Before trucks arrive, we confirm:

- Framing inspection passed where required.
- Ceiling joists and studs aligned; backing at tub surrounds, corners, and heavy cabinetry walls.
- Moisture-sensitive areas identified — tubs, laundry, basement wet walls.
- Board delivery path and stock storage dry and flat.

We lay out sheet orientation to minimize butt joints on long walls visible from entries. Stagger vertical seams on high walls in two-story foyers. Fire tape locations on garage-to-house separations and rated walls get marked from plans — not guessed at hang day.

### Board hang and screw pattern

Hang crews install ceiling first, then walls, maintaining screw spacing per code and manufacturer spec. Excessive or missing fasteners cause future pops and failed inspections. Openings for windows and doors stay square for trim subs; we communicate with supers when rough openings need adjustment before board locks them in.

## Phase 2: Taping and embedding

Tapers embed tape on flats, inside corners, and outside bead. Quick-set compound may be used on first coats where drying speed helps; all-purpose on finish coats. Butt joints and angles get wider feathering than nail spots because they move more with seasonal humidity in Michigan.

Mold-resistant compound in wet zones pairs with board type from phase one. We keep mud out of tub pans and shower pans — waterproofing trades own those planes.

## Phase 3: Coat progression and sanding

Second and third coats build feather width. Sanding between coats finds highs and ridges before they become paint problems. Dust control matters in occupied adjacent areas; on new builds we sand before trim when possible to reduce damage to finished wood, or we protect trim if sequence demands mud after casing.

Window returns and sills get attention so painters do not chase gaps later. Garage fire separation joints receive listed systems when spec requires — not generic mud alone.

## Phase 4: Texture or Level 5 skim

Production builders often choose uniform orange peel or machine texture for speed. Custom homes may specify hand skip, knockdown, or Level 5 smooth in main living areas. Texture hides minor variation; Level 5 demands earlier commitment in budget and schedule.

We texture before trim when builder sequence allows — less masking. When trim installs first, we back-mask carefully and touch texture lines at base and casing.

## Phase 5: Primer readiness and painter handoff

Drywall is not done when it “looks good” at noon. We define done as: specified finish level achieved, sanded, vacuumed, primer-sealer compatible surface, punch items from superintendent walk closed. Painters should not have to skim-fix our work — if they do, scope was wrong or execution failed.

Touch-up after other trades is normal: plumbers cut access, electricians add cans. We return for labeled repair tickets rather than open-ended “come fix everything.”

## Additions and remodel tie-ins

Matching old and new drywall planes in Wyandotte or Grosse Pointe Park remodels requires blending thickness at transitions — furring or shaving so wallpaper or paint does not reveal a step. Texture match on existing wings is slower than new construction uniform spray.

## Weather and seasonal builds

Winter builds need heat for compound cure. Spring humidity extends dry times. We align coat schedules with HVAC startup so you are not sanding soft mud because the furnace was not running.

## Builder and homeowner communication

Weekly percent-complete updates help supers schedule trim, cabinet, and floor vendors. Homeowners on owner-builder projects get the same clarity — what rooms release to paint each Friday matters for move-in dreams.

## Work with BH Drywall Metro Detroit on new builds

From first sheet on a slab ranch to a 4,000-square-foot custom in Oakland County, we staff hang and finish crews who understand inspection loops and painter expectations.

Call (313) 236-4558 to bid your plans or walk your framing. Metro Detroit new construction deserves phased drywall executed in order — so the last thing you worry about at certificate of occupancy is the wall behind your family photos.
`,
  },

  {
    slug: "plaster-repair-vs-drywall-metro-detroit",
    title: "Drywall and Plaster Repair in Metro Detroit: What Older Walls Actually Need",
    metaTitle: "Drywall & Plaster Repair Metro Detroit Older Homes",
    excerpt:
      "Homes across Farmington Hills, Livonia, and Detroit were built before drywall existed. How to tell whether your plaster wall needs a patch, a skim coat, or new board.",
    category: "Residential",
    readMinutes: 8,
    date: "2026-08-16",
    heroImage: "/blog/plaster-repair-vs-drywall-metro-detroit-hero.jpg",
    heroAlt: "Contractor skim coating a cracked plaster wall beside exposed wood lath in an older Metro Detroit home",
    secondaryImage: "/blog/plaster-repair-vs-drywall-metro-detroit-secondary.jpg",
    secondaryAlt: "Wood lath exposed behind a removed section of failed plaster with a sheet of drywall ready alongside",
    body: `
If your house in Farmington Hills, Livonia, Redford, or the older neighborhoods of Detroit was built before roughly 1955, the walls behind your paint are probably not drywall. They are lath and plaster — thin wood strips nailed across the studs, with two or three coats of plaster troweled over them. It is a completely different material with completely different failure modes, and treating it like drywall is how homeowners end up paying twice.

We get called for this constantly, usually described as "cracks that keep coming back" or "a soft spot in the wall." The question underneath it is always the same: patch it, or tear it out and hang board? There is a real answer, and it depends on things you can check yourself in about ten minutes.

## Why so many Metro Detroit walls are plaster, not drywall

Drywall did not take over residential construction until the postwar building boom. Everything before that — the brick bungalows in Hamtramck and Highland Park, the colonials in Grosse Pointe and Royal Oak, the pre-war stock across Dearborn and Ferndale — went up as wood lath with a scratch coat, a brown coat, and a thin white finish coat on top.

That plaster is harder and denser than drywall, which is why it has lasted eighty or ninety years. It is also brittle, and it depends entirely on the "keys" — the ribbons of plaster that squeezed through the gaps between lath strips and hardened behind them. As long as the keys are intact, the wall is solid. When they snap, the plaster is being held up by paint and friction, and no amount of surface patching changes that.

Michigan's freeze-thaw swings work against those keys every single year. So does a century of doors slamming, floors settling, and radiators being replaced with forced air.

## What plaster failure actually looks like

Three patterns cover almost everything we see in Metro Detroit homes.

- **Hairline map cracking.** Fine cracks in a spiderweb pattern across a whole wall or ceiling. Almost always cosmetic — the finish coat shrinking and aging. The plaster underneath is fine.
- **Straight, recurring cracks.** Usually running from a door or window corner, or in a line across a ceiling. These follow framing movement. Patching without addressing what moves is why the crack returns every year.
- **Bulging, soft, or drummy areas.** Press gently with your palm. If the wall flexes, moves, or sounds hollow, the keys are broken and the plaster has separated from the lath. This is the one that matters.

That last test is the one to do before calling anybody. A wall that sounds hollow over a two-foot area is a completely different job than a wall with a crack in it, and guessing wrong sends the scope in the wrong direction before anyone picks up a knife.

## Repair the plaster or replace the wall with drywall?

Here is the honest breakdown we give homeowners on site.

**Repair the plaster when** the failure is under about a third of the wall, the rest is tight to the lath, and the room has original trim, plaster crown, or curved corners worth keeping. Re-anchoring loose plaster with washers, filling with setting-type compound, and skimming the surface preserves detail that drywall cannot reproduce. In houses in Grosse Pointe and the historic pockets of Detroit, that detail is a real part of the property's value.

**Replace with drywall when** the plaster is failing across most of the wall, when there has been sustained water damage from a roof or a burst pipe, or when the wall is coming apart anyway for wiring, insulation, or new plumbing. At that point plaster repair is more expensive than board and finishes no better. We hang, tape, and finish to match the surrounding rooms.

**The hybrid, which is what we actually do most often:** remove the failed section only, hang drywall inside that opening, and shim it out so the new board sits flush with the surrounding plaster. Old plaster runs thicker than half-inch board, so this only looks right if somebody accounts for the depth difference before hanging. Done properly the seam disappears. Done carelessly you get a visible ledge that shows up the first time afternoon light rakes across the wall.

## Blending new work into an old wall

This is where most plaster jobs are won or lost, and it is the part homeowners never think to ask about.

New drywall inside an old plaster wall creates a joint between two materials that expand at different rates. We bed that joint with mesh and setting-type compound rather than standard all-purpose mud, because setting compound is harder and shrinks less — it holds up where the two surfaces meet.

Then there is the surface itself. Ninety-year-old plaster is rarely flat and almost never smooth in the modern sense. It has a gentle roll to it and often a light hand-troweled texture. Dropping a dead-flat drywall patch into that wall reads as a patch forever, no matter how good the taping is. Getting it to disappear takes deliberate [texture matching](/services/texture-matching) across the transition, and on a feature wall it sometimes means skimming the whole surface to a [Level 5 smooth finish](/services/level-5-smooth-finish) so the eye has nothing to catch on.

If you are only dealing with a small opening — an old thermostat, a removed sconce, a doorknob strike — the sizing logic is the same as on any wall, and we walked through it in [drywall hole repair vs. large patch](/blog/drywall-hole-repair-vs-large-patch).

## Dust, lead paint, and living in the house while we work

Plaster demolition produces far more dust than drywall work, and it is a heavier, grittier dust that travels. We seal the room, mask returns, and run negative air rather than relying on a sheet taped over the doorway.

Two things need testing before anyone opens a wall in a pre-1978 house:

- **Lead paint.** Almost universal in Metro Detroit homes of this age. Disturbing painted plaster releases it, so the surface gets tested first and the containment plan matches what the test says. We will tell you what we find before work starts, not after.
- **Asbestos.** Less common in wall plaster than in ceiling texture, but some pre-1980 finish coats and joint compounds contain it. Testing settles it quickly. If you have textured ceilings in the same house, the same caution applies — see our guide to [popcorn ceiling removal in Metro Detroit](/blog/popcorn-ceiling-removal-metro-detroit).

Neither of these is a reason to panic or to leave a failing wall alone. They are a reason to test before demolition instead of finding out halfway through.

## Getting a straight answer on your walls

Do the palm test on the areas that worry you. Note whether the cracks are fine and spidery or straight and recurring. Take a photo in raking light — hold a phone flashlight flat against the wall and shoot along the surface, which shows bulges that head-on photos hide completely.

Then call BH Drywall Metro Detroit at (313) 236-4558. We handle [drywall and plaster repair](/services/drywall-repair) across Wayne, Oakland, and Macomb counties, and we will walk the wall with you and say plainly which of the three approaches your room needs. Sometimes that answer is a two-hour patch. Sometimes it is a full room. You should know which one you are buying before anyone starts.
`,
  },
  {
    slug: "framing-and-drywall-metro-detroit",
    title: "Framing and Drywall in Metro Detroit: What the Studs Decide Before the Board Goes Up",
    metaTitle: "Framing & Drywall Metro Detroit: Metal Stud Guide",
    excerpt:
      "Most drywall problems are framing problems nobody caught in time. Steel studs or wood, spacing, backing, and the checks worth doing before a single sheet gets hung in Wayne, Oakland, or Macomb county.",
    category: "Residential",
    readMinutes: 8,
    date: "2026-08-24",
    heroImage: "/blog/framing-and-drywall-metro-detroit-hero.jpg",
    heroAlt: "Crew standing metal studs for interior partition walls in a Metro Detroit basement before drywall goes up",
    secondaryImage: "/blog/framing-and-drywall-metro-detroit-secondary.jpg",
    secondaryAlt: "Plywood backing screwed between metal studs at TV mount height with wiring run through the stud knockouts",
    body: `
People search for "framing and drywall" as one phrase, and they are right to. On a real job the two are one continuous operation, and the first one sets the ceiling on how good the second can look. We can hang and finish carefully over bad framing and the wall will still read as wavy the first time afternoon light comes across it. There is no finish level that fixes a stud sitting out of plane.

So before you scope a basement in Sterling Heights, a partition in a Southfield office, or a bedroom split in Livonia, it is worth understanding what happens in the framing stage and which parts of it you can check yourself. Most of the callbacks we see on somebody else's drywall trace back to a decision made before the board ever arrived.

## Steel studs or wood: what really decides it here

Both work. The choice is usually made by the conditions, not by preference.

**Steel wins below grade and in commercial space.** Galvanized studs do not warp, cup, twist, rot, or feed mold, and they do not care about the humidity swings a Metro Detroit basement goes through between February and July. Wood studs sitting against a cool foundation wall are the ones that move a year later and telegraph a seam. For interior partitions carrying nothing but drywall, light gauge steel is dimensionally stable, non combustible, and lands straighter out of the bundle. It also arrives with knockouts already punched, so electrical and low voltage run without anyone drilling the framing.

**Wood still makes sense** on small residential jobs, where trim carpenters have to attach to it later, and where you need to hang real weight directly off the wall without planning ahead. Every trade that follows is comfortable with it, and for a single closet or one short wall it is often faster.

**Where people get it wrong** is treating gauge as an afterthought. Light 25 gauge steel is fine for a standard non load bearing partition. It is not fine for a wall that will carry cabinets, a heavy mirror wall, or a commercial door in constant use. Heavier gauge in those bays costs very little at framing time and is expensive to add once the wall is closed.

## The framing faults that show up in the finish

These are the ones that cost money later, in rough order of how often we find them.

- **Studs out of plane.** One stud sitting proud or shy of its neighbors by even a quarter inch produces a shadow line across the finished wall that no amount of mud hides. A straightedge held across the face of the framing finds it in seconds.
- **Bowed or twisted stock.** Common in wood, rare in steel. Crowning the lumber and running every crown the same direction is basic, and it gets skipped constantly.
- **Walls out of plumb.** Trim and doors are what expose this, usually after the drywall is painted.
- **Spacing too wide on the ceiling.** Framing at 24 inches on center under half inch board sags between the joists, especially with texture or a heavy paint build. Ceilings want tighter spacing or thicker board, and this is not the place to save money.
- **Nothing behind the joints.** Butt joints need backing. A seam floating between two studs is a seam that cracks.

You can check the first three yourself with a six foot level and ten minutes, before anyone hangs anything. If the framing is not right, that is the moment to fix it. Every hour after that is more expensive.

## Backing and blocking: the step nobody asks about

This is the part homeowners never think to raise and regret most.

Backing is solid material set between the studs so something can be screwed to the wall later. Once drywall is up the studs are invisible, and anything heavy that does not land on one is hanging off gypsum. Gypsum is not a structural material.

Plan backing before the wall closes for:

- Wall mounted televisions, especially full motion arms, which multiply the load as they extend
- Kitchen and laundry cabinets, floating shelves, and closet systems
- Grab bars and any bathroom accessory meant to take real weight, which have to hit solid material to be worth anything
- Handrails at basement stairs
- Headboards, heavy mirrors, and anything else going up at a fixed height

It takes minutes at framing, and it is the difference between a clean mount and cutting a finished wall open. When we frame, we ask where the television and the cabinets are going before we close a bay, because that conversation is free now and costly later.

## Soffits, bulkheads, and the Metro Detroit basement ceiling

Basements are where framing gets interesting, because nothing down there is straight. Ducts, beams, waste lines, and gas piping all run below the joists, and boxing them in is most of the framing labor on a typical finish.

Two things matter. First, keep soffits as tight to the obstruction as the trades allow, because every inch you give away is headroom you cannot get back, and headroom is the whole point of finishing a basement. Second, decide where the drywall joints will land on those soffits before framing them, so seams sit on solid backing instead of in mid air at an outside corner. Soffit corners crack when they are not backed properly, and they are awkward to repair once the room is painted.

Bottom track on a concrete slab needs the right fastener and a capillary break, so the framing is not wicking moisture off the floor. Wood going down against concrete needs to be pressure treated. Small detail, large problem avoided.

We also check ceiling height and egress against local requirements when bedrooms are part of the plan, and we sequence hang and finish around rough inspections so nothing finished gets opened back up. Detroit, Royal Oak, Warren, and Clinton Township each run their own timelines, and building around them is part of scheduling.

## What we frame, and what we do not

Worth being plain about this. We build non load bearing work: interior partitions, soffits and bulkheads, shaft and chase walls, backing and blocking layout, and sound rated assemblies. That covers the large majority of interior remodeling.

We do not remove or modify structure. If your plan involves taking out a wall that is carrying load, opening a bearing wall for a kitchen, or anything holding up the floor above, that needs a structural engineer and the appropriate trade, and we will say so on the walkthrough rather than afterward. Framing a partition and altering the frame of a house are different jobs, and only one of them is ours.

## Sound, and why steel helps

If the wall sits between a bedroom and a living room, or a basement theater and the stairs, framing is where sound performance gets decided. Once the board is on, the remaining options are expensive.

Steel studs outperform wood here, which surprises people. A light gauge steel stud flexes rather than passing vibration straight through, so a steel framed partition with insulation in the cavity is quieter than the same wall built in wood. Size the batt insulation to the cavity, seal the perimeter, and watch anything that penetrates the wall, because outlets set back to back in the same bay undo the rest of it. For a media room, a heavier assembly is worth discussing at framing and pointless to raise afterward.

## Getting the sequence right before fall

Basement projects across Wayne, Oakland, and Macomb counties cluster in fall and winter, which means the framing conversations are happening now for work landing between September and the holidays. The order matters more than people expect.

Framing goes first. Then electrical, plumbing, and HVAC rough in through the framed walls. Then insulation, then inspection where it applies, and only then does drywall arrive. Jobs that pull board in before the rough trades are finished end up cutting open finished walls, and the finish never quite recovers.

If you are planning a basement, the [basement drywall finishing guide](/blog/basement-drywall-finishing-metro-detroit) covers what happens after the framing stage, including moisture strategy and board selection. On a new build or a full gut, the whole sequence is laid out in [new construction drywall phases](/blog/new-construction-drywall-phases). For office and retail space, the build out version of this conversation is in [commercial tenant drywall in Detroit](/blog/commercial-tenant-drywall-detroit).

## Have somebody look at the framing first

If your walls are already framed and drywall is about to arrive, run a straightedge across the studs and a level on the corners before the board shows up. Photograph anything that looks off. It is a twenty minute check that heads off the single most common finish complaint we get called about.

If the framing has not happened yet, call BH Drywall Metro Detroit at (313) 236-4558. We handle [metal stud framing](/services/metal-stud-framing) and the hang and finish that follows across Wayne, Oakland, and Macomb counties, and running both with one crew removes the argument about whose stage caused the wavy wall. We will walk the space, mark where backing needs to go, and give you a sequence that fits the inspections and the other trades. If a wall you want gone is carrying load, we will tell you that on the first visit.
`,
  },
];

export function findPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
