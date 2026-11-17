import { accelForceStep } from './accel-force-step';
import { atomSize } from './atom-size';
import { aurora } from './aurora';
import { ballThrow } from './ball-throw';
import { beachSand } from './beach-sand';
import { bentChopsticks } from './bent-chopsticks';
import { birdWire } from './bird-wire';
import { blueSky } from './blue-sky';
import { bouncyBall } from './bouncy-ball';
import { bowlingNose } from './bowling-nose';
import { breakerTrip } from './breaker-trip';
import { brownianStep } from './brownian-step';
import { bulbBright } from './bulb-bright';
import { busBrake } from './bus-brake';
import { capacitorStep } from './capacitor-step';
import { centripetalStep } from './centripetal-step';
import { chargerWarm } from './charger-warm';
import { coldCupSweat } from './cold-cup-sweat';
import { compassNorth } from './compass-north';
import { cupPhone } from './cup-phone';
import { currentFieldStep } from './current-field-step';
import { deepDive } from './deep-dive';
import { echoValley } from './echo-valley';
import { eclipse } from './eclipse';
import { emptyAtom } from './empty-atom';
import { emfStep } from './emf-step';
import { energyStep } from './energy-step';
import { featherHammer } from './feather-hammer';
import { flagPulley } from './flag-pulley';
import { glassSing } from './glass-sing';
import { guitarPitch } from './guitar-pitch';
import { handGenerator } from './hand-generator';
import { homeCircuit } from './home-circuit';
import { iceSlide } from './ice-slide';
import { leverRock } from './lever-rock';
import { magnetPick } from './magnet-pick';
import { magnifierFire } from './magnifier-fire';
import { metalCold } from './metal-cold';
import { microwave } from './microwave';
import { mirrorFlip } from './mirror-flip';
import { moonFollows } from './moon-follows';
import { moonOrbit } from './moon-orbit';
import { moonPhase } from './moon-phase';
import { motorSpin } from './motor-spin';
import { mountainRoad } from './mountain-road';
import { myopia } from './myopia';
import { nailBed } from './nail-bed';
import { noiseBlock } from './noise-block';
import { nuclearPlant } from './nuclear-plant';
import { phoneSignal } from './phone-signal';
import { photoelectricStep } from './photoelectric-step';
import { planeLift } from './plane-lift';
import { platformLine } from './platform-line';
import { pressureCooker } from './pressure-cooker';
import { projectileStep } from './projectile-step';
import { rainbow } from './rainbow';
import { rollerCoaster } from './roller-coaster';
import { saltyEgg } from './salty-egg';
import { seasons } from './seasons';
import { seeDark } from './see-dark';
import { selfInductionStep } from './self-induction-step';
import { shadowLength } from './shadow-length';
import { shoeGrip } from './shoe-grip';
import { sirenPass } from './siren-pass';
import { spaceFloat } from './space-float';
import { spaceSilent } from './space-silent';
import { speakerCone } from './speaker-cone';
import { stairsPower } from './stairs-power';
import { starlightOld } from './starlight-old';
import { staticShock } from './static-shock';
import { steelShip } from './steel-ship';
import { strawDrink } from './straw-drink';
import { submarine } from './submarine';
import { sunShine } from './sun-shine';
import { sweatCool } from './sweat-cool';
import { sweaterWarm } from './sweater-warm';
import { thunderLater } from './thunder-later';
import { tides } from './tides';
import { tugOfWar } from './tug-of-war';
import type { Story } from './types';
import { whiteSteam } from './white-steam';
import { xRay } from './x-ray';

export type { Story, StoryShow, StoryTurn } from './types';

/** 已经写成「小念 × 爸爸」问答的课；3D 实验课没写的暂时沿用课件步骤装配的问答 */
export const stories: readonly Story[] = [
  busBrake,
  iceSlide,
  shoeGrip,
  tugOfWar,
  featherHammer,
  ballThrow,
  accelForceStep,
  projectileStep,
  centripetalStep,
  nailBed,
  deepDive,
  strawDrink,
  platformLine,
  steelShip,
  saltyEgg,
  submarine,
  planeLift,
  leverRock,
  flagPulley,
  bouncyBall,
  mountainRoad,
  stairsPower,
  rollerCoaster,
  bowlingNose,
  energyStep,
  sweatCool,
  whiteSteam,
  coldCupSweat,
  sweaterWarm,
  metalCold,
  pressureCooker,
  beachSand,
  brownianStep,
  thunderLater,
  spaceSilent,
  cupPhone,
  echoValley,
  noiseBlock,
  guitarPitch,
  glassSing,
  sirenPass,
  seeDark,
  shadowLength,
  mirrorFlip,
  bentChopsticks,
  rainbow,
  blueSky,
  magnifierFire,
  myopia,
  staticShock,
  homeCircuit,
  bulbBright,
  birdWire,
  chargerWarm,
  breakerTrip,
  emfStep,
  capacitorStep,
  compassNorth,
  magnetPick,
  currentFieldStep,
  motorSpin,
  speakerCone,
  handGenerator,
  aurora,
  selfInductionStep,
  moonPhase,
  moonFollows,
  seasons,
  eclipse,
  starlightOld,
  moonOrbit,
  spaceFloat,
  tides,
  atomSize,
  emptyAtom,
  phoneSignal,
  microwave,
  xRay,
  nuclearPlant,
  sunShine,
  photoelectricStep,
];

const bySlug = new Map(stories.map(story => [story.slug, story]));

export function findStory(slug: string): Story | undefined {
  return bySlug.get(slug);
}
