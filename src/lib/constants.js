export const Stats = {
  HP_P: 'HP%',
  ATK_P: 'ATK%',
  DEF_P: 'DEF%',
  SPD_P: 'SPD%',
  HP: 'HP',
  ATK: 'ATK',
  DEF: 'DEF',
  SPD: 'SPD',
  CD: 'CRIT DMG',
  CR: 'CRIT Rate',
  EHR: 'Effect Hit Rate',
  RES: 'Effect RES',
  BE: 'Break Effect',
  ERR: 'Energy Regeneration Rate',
  OHB: 'Outgoing Healing Boost',
  Physical_DMG: 'Physical DMG Boost',
  Fire_DMG: 'Fire DMG Boost',
  Ice_DMG: 'Ice DMG Boost',
  Lightning_DMG: 'Lightning DMG Boost',
  Wind_DMG: 'Wind DMG Boost',
  Quantum_DMG: 'Quantum DMG Boost',
  Imaginary_DMG: 'Imaginary DMG Boost'
}

export const MainStats = [
  Stats.HP_P,
  Stats.ATK_P,
  Stats.DEF_P,
  Stats.HP,
  Stats.ATK,
  Stats.SPD,
  Stats.CR,
  Stats.CD,
  Stats.EHR,
  Stats.BE,
  Stats.ERR,
  Stats.OHB,
  Stats.Physical_DMG,
  Stats.Fire_DMG,
  Stats.Ice_DMG,
  Stats.Lightning_DMG,
  Stats.Wind_DMG,
  Stats.Quantum_DMG,
  Stats.Imaginary_DMG,
]

export const MainStatsValues = {
  [Stats.HP_P]: { '5': { 'base': 6.912, 'increment': 2.4192 }, '4': { 'base': 5.5296, 'increment': 1.9354 }, '3': { 'base': 4.1472, 'increment': 1.4515 }, '2': { 'base': 2.7648, 'increment': 0.9677 } },
  [Stats.ATK_P]: { '5': { 'base': 6.912, 'increment': 2.4192 }, '4': { 'base': 5.5296, 'increment': 1.9354 }, '3': { 'base': 4.1472, 'increment': 1.4515 }, '2': { 'base': 2.7648, 'increment': 0.9677 } },
  [Stats.DEF_P]: { '5': { 'base': 8.64, 'increment': 3.024 }, '4': { 'base': 6.912, 'increment': 2.4192 }, '3': { 'base': 5.184, 'increment': 1.8144 }, '2': { 'base': 3.456, 'increment': 1.2096 } },
  [Stats.HP]: { '5': { 'base': 112.896, 'increment': 39.5136 }, '4': { 'base': 90.3168, 'increment': 31.61088 }, '3': { 'base': 67.7376, 'increment': 23.70816 }, '2': { 'base': 45.1584, 'increment': 15.80544 } },
  [Stats.ATK]: { '5': { 'base': 56.448, 'increment': 19.7568 }, '4': { 'base': 45.1584, 'increment': 15.80544 }, '3': { 'base': 33.8688, 'increment': 11.85408 }, '2': { 'base': 22.5792, 'increment': 7.90272 } },
  [Stats.SPD]: { '5': { 'base': 4.032, 'increment': 1.4 }, '4': { 'base': 3.226, 'increment': 1.1 }, '3': { 'base': 2.419, 'increment': 1.0 }, '2': { 'base': 1.613, 'increment': 1.0 } },
  [Stats.CR]: { '5': { 'base': 5.184, 'increment': 1.8144 }, '4': { 'base': 4.1472, 'increment': 1.4515 }, '3': { 'base': 3.1104, 'increment': 1.0886 }, '2': { 'base': 2.0736, 'increment': 0.7258 } },
  [Stats.CD]: { '5': { 'base': 10.368, 'increment': 3.6288 }, '4': { 'base': 8.2944, 'increment': 2.9030 }, '3': { 'base': 6.2208, 'increment': 2.1773 }, '2': { 'base': 4.1472, 'increment': 1.4515 } },
  [Stats.EHR]: { '5': { 'base': 6.912, 'increment': 2.4192 }, '4': { 'base': 5.5296, 'increment': 1.9354 }, '3': { 'base': 4.1472, 'increment': 1.4515 }, '2': { 'base': 2.7648, 'increment': 0.9677 } },
  [Stats.BE]: { '5': { 'base': 10.3680, 'increment': 3.6288 }, '4': { 'base': 8.2944, 'increment': 2.9030 }, '3': { 'base': 6.2208, 'increment': 2.1773 }, '2': { 'base': 4.1472, 'increment': 1.4515 } },
  [Stats.ERR]: { '5': { 'base': 3.1104, 'increment': 1.0886 }, '4': { 'base': 2.4883, 'increment': 0.8709 }, '3': { 'base': 1.8662, 'increment': 0.6532 }, '2': { 'base': 1.2442, 'increment': 0.4355 } },
  [Stats.OHB]: { '5': { 'base': 5.5296, 'increment': 1.9354 }, '4': { 'base': 4.4237, 'increment': 1.5483 }, '3': { 'base': 3.3178, 'increment': 1.1612 }, '2': { 'base': 2.2118, 'increment': 0.7741 } },
  [Stats.Physical_DMG]: { '5': { 'base': 6.2208, 'increment': 2.1773 }, '4': { 'base': 4.9766, 'increment': 1.7418 }, '3': { 'base': 3.7325, 'increment': 1.3064 }, '2': { 'base': 2.4883, 'increment': 0.8709 } },
  [Stats.Fire_DMG]: { '5': { 'base': 6.2208, 'increment': 2.1773 }, '4': { 'base': 4.9766, 'increment': 1.7418 }, '3': { 'base': 3.7325, 'increment': 1.3064 }, '2': { 'base': 2.4883, 'increment': 0.8709 } },
  [Stats.Ice_DMG]: { '5': { 'base': 6.2208, 'increment': 2.1773 }, '4': { 'base': 4.9766, 'increment': 1.7418 }, '3': { 'base': 3.7325, 'increment': 1.3064 }, '2': { 'base': 2.4883, 'increment': 0.8709 } },
  [Stats.Lightning_DMG]: { '5': { 'base': 6.2208, 'increment': 2.1773 }, '4': { 'base': 4.9766, 'increment': 1.7418 }, '3': { 'base': 3.7325, 'increment': 1.3064 }, '2': { 'base': 2.4883, 'increment': 0.8709 } },
  [Stats.Wind_DMG]: { '5': { 'base': 6.2208, 'increment': 2.1773 }, '4': { 'base': 4.9766, 'increment': 1.7418 }, '3': { 'base': 3.7325, 'increment': 1.3064 }, '2': { 'base': 2.4883, 'increment': 0.8709 } },
  [Stats.Quantum_DMG]: { '5': { 'base': 6.2208, 'increment': 2.1773 }, '4': { 'base': 4.9766, 'increment': 1.7418 }, '3': { 'base': 3.7325, 'increment': 1.3064 }, '2': { 'base': 2.4883, 'increment': 0.8709 } },
  [Stats.Imaginary_DMG]: { '5': { 'base': 6.2208, 'increment': 2.1773 }, '4': { 'base': 4.9766, 'increment': 1.7418 }, '3': { 'base': 3.7325, 'increment': 1.3064 }, '2': { 'base': 2.4883, 'increment': 0.8709 } },
}

export const SubStats = [
  Stats.HP_P,
  Stats.ATK_P,
  Stats.DEF_P,
  Stats.HP,
  Stats.ATK,
  Stats.DEF,
  Stats.SPD,
  Stats.CR,
  Stats.CD,
  Stats.EHR,
  Stats.RES,
  Stats.BE,
]

export const StatsToReadable = {
  [Stats.HP_P]: 'HP %',
  [Stats.ATK_P]: 'ATK %',
  [Stats.DEF_P]: 'DEF %',
  [Stats.SPD_P]: 'SPD %',
  [Stats.HP]: 'HP',
  [Stats.ATK]: 'ATK',
  [Stats.DEF]: 'DEF',
  [Stats.SPD]: 'SPD',
  [Stats.CR]: 'CRIT Rate',
  [Stats.CD]: 'CRIT DMG',
  [Stats.EHR]: 'Effect Hit Rate',
  [Stats.RES]: 'Effect RES',
  [Stats.BE]: 'Break Effect',
  [Stats.ERR]: 'Energy Regen',
  [Stats.OHB]: 'Healing Boost',
  [Stats.Physical_DMG]: 'Physical DMG',
  [Stats.Fire_DMG]: 'Fire DMG',
  [Stats.Ice_DMG]: 'Ice DMG',
  [Stats.Lightning_DMG]: 'Lightning DMG',
  [Stats.Wind_DMG]: 'Wind DMG',
  [Stats.Quantum_DMG]: 'Quantum DMG',
  [Stats.Imaginary_DMG]: 'Imaginary DMG'
}

export var StatsToIndex = {

}
let i = 0;
Object.values(Stats).map(x => StatsToIndex[x] = i++)

export const Parts = {
  Head: 'Head',
  Hands: 'Hands',
  Body: 'Body',
  Feet: 'Feet',
  PlanarSphere: 'PlanarSphere',
  LinkRope: 'LinkRope'
};
export const PartsToReadable = {
  [Parts.Head]: 'Head',
  [Parts.Hands]: 'Hands',
  [Parts.Body]: 'Body',
  [Parts.Feet]: 'Feet',
  [Parts.PlanarSphere]: 'Sphere',
  [Parts.LinkRope]: 'Rope'
};

export const PartsMainStats = {
  [Parts.Head]: [Stats.HP],
  [Parts.Hands]: [Stats.ATK],
  [Parts.Body]: [Stats.HP_P, Stats.ATK_P, Stats.DEF_P, Stats.CR, Stats.CD, Stats.OHB, Stats.EHR],
  [Parts.Feet]: [Stats.HP_P, Stats.ATK_P, Stats.DEF_P, Stats.SPD],
  [Parts.PlanarSphere]: [Stats.HP_P, Stats.ATK_P, Stats.DEF_P, Stats.Physical_DMG, Stats.Fire_DMG, Stats.Ice_DMG, Stats.Lightning_DMG, Stats.Wind_DMG, Stats.Quantum_DMG, Stats.Imaginary_DMG],
  [Parts.LinkRope]: [Stats.BE, Stats.ERR, Stats.HP_P, Stats.ATK_P, Stats.DEF_P],
}

export const SetsRelics = {
  'PasserbyOfWanderingCloud': 'Passerby of Wandering Cloud',
  'MusketeerOfWildWheat': 'Musketeer of Wild Wheat',
  'KnightOfPurityPalace': 'Knight of Purity Palace',
  'HunterOfGlacialForest': 'Hunter of Glacial Forest',
  'ChampionOfStreetwiseBoxing': 'Champion of Streetwise Boxing',
  'GuardOfWutheringSnow': 'Guard of Wuthering Snow',
  'FiresmithOfLavaForging': 'Firesmith of Lava-Forging',
  'GeniusOfBrilliantStars': 'Genius of Brilliant Stars',
  'BandOfSizzlingThunder': 'Band of Sizzling Thunder',
  'EagleOfTwilightLine': 'Eagle of Twilight Line',
  'ThiefOfShootingMeteor': 'Thief of Shooting Meteor',
  'WastelanderOfBanditryDesert': 'Wastelander of Banditry Desert',
  'LongevousDisciple': 'Longevous Disciple',
  'MessengerTraversingHackerspace': 'Messenger Traversing Hackerspace',
  'TheAshblazingGrandDuke': 'The Ashblazing Grand Duke',
  'PrisonerInDeepConfinement': 'Prisoner in Deep Confinement',
}

export const SetsOrnaments = {
  'SpaceSealingStation': 'Space Sealing Station',
  'FleetOfTheAgeless': 'Fleet of the Ageless',
  'PanCosmicCommercialEnterprise': 'Pan-Cosmic Commercial Enterprise',
  'BelobogOfTheArchitects': 'Belobog of the Architects',
  'CelestialDifferentiator': 'Celestial Differentiator',
  'InertSalsotto': 'Inert Salsotto',
  'TaliaKingdomOfBanditry': 'Talia: Kingdom of Banditry',
  'SprightlyVonwacq': 'Sprightly Vonwacq',
  'RutilantArena': 'Rutilant Arena',
  'BrokenKeel': 'Broken Keel',
  'FirmamentFrontlineGlamoth': 'Firmament Frontline: Glamoth',
  'PenaconyLandOfTheDreams': 'Penacony, Land of the Dreams',
}

export const Sets = {
  ...SetsRelics,
  ...SetsOrnaments
}

export const SetsRelicsNames = Object.values(SetsRelics)
export const SetsOrnamentsNames = Object.values(SetsOrnaments)

const OrnamentSetToIndex = {}
for (let i = 0; i < SetsOrnamentsNames.length; i++) {
  OrnamentSetToIndex[SetsOrnamentsNames[i]] = i
}

const RelicSetToIndex = {}
for (let i = 0; i < SetsRelicsNames.length; i++) {
  RelicSetToIndex[SetsRelicsNames[i]] = i
}

export const Constants = {
  Sets,
  Parts,
  Stats,
  MainStats,
  MainStatsValues,
  SubStats,
  StatsToIndex,
  SetsOrnaments,
  SetsRelics,
  SetsRelicsNames,
  SetsOrnamentsNames,
  StatsToReadable,
  PartsToReadable,
  PartsMainStats,
  RelicSetToIndex,
  OrnamentSetToIndex,
  // StatMaxes,
  MAX_INT: 2147483647,
}