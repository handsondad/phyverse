import { accelForceStep } from './accel-force-step';
import { atomSize } from './atom-size';
import { aurora } from './aurora';
import { ballThrow } from './ball-throw';
import { beachSand } from './beach-sand';
import { bentChopsticks } from './bent-chopsticks';
import { birdWire } from './bird-wire';
import { blackHole } from './black-hole';
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
import { earPop } from './ear-pop';
import { echoValley } from './echo-valley';
import { eclipse } from './eclipse';
import { emptyAtom } from './empty-atom';
import { emfStep } from './emf-step';
import { energyStep } from './energy-step';
import { featherHammer } from './feather-hammer';
import { flagPulley } from './flag-pulley';
import { fridgeRoom } from './fridge-room';
import { glassSing } from './glass-sing';
import { gpsTime } from './gps-time';
import { guitarPitch } from './guitar-pitch';
import { handGenerator } from './hand-generator';
import { homeCircuit } from './home-circuit';
import { iceSlide } from './ice-slide';
import { leverRock } from './lever-rock';
import { lightningRod } from './lightning-rod';
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
import { ownVoice } from './own-voice';
import { phoneSignal } from './phone-signal';
import { photoelectricStep } from './photoelectric-step';
import { moziPinhole } from './mozi-pinhole';
import { archimedesCrown } from './archimedes-crown';
import { galileoRampStory } from './galileo-ramp';
import { newtonApple } from './newton-apple';
import { faradayRing } from './faraday-ring';
import { curieRadium } from './curie-radium';
import { einsteinLight } from './einstein-light';
import { wuMirror } from './wu-mirror';
import { dongfanghong } from './dongfanghong';
import { planeLift } from './plane-lift';
import { platformLine } from './platform-line';
import { powerPlant } from './power-plant';
import { pressureCooker } from './pressure-cooker';
import { projectileStep } from './projectile-step';
import { rainbow } from './rainbow';
import { rocketPush } from './rocket-push';
import { rollerCoaster } from './roller-coaster';
import { saltyEgg } from './salty-egg';
import { seasons } from './seasons';
import { seeDark } from './see-dark';
import { selfInductionStep } from './self-induction-step';
import { shadowLength } from './shadow-length';
import { shoeGrip } from './shoe-grip';
import { sirenPass } from './siren-pass';
import { soapBubble } from './soap-bubble';
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
import { wirelessCharge } from './wireless-charge';
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
  rocketPush,
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
  earPop,
  leverRock,
  flagPulley,
  bouncyBall,
  mountainRoad,
  stairsPower,
  rollerCoaster,
  bowlingNose,
  powerPlant,
  energyStep,
  sweatCool,
  whiteSteam,
  coldCupSweat,
  sweaterWarm,
  metalCold,
  pressureCooker,
  beachSand,
  fridgeRoom,
  brownianStep,
  thunderLater,
  spaceSilent,
  cupPhone,
  echoValley,
  noiseBlock,
  guitarPitch,
  glassSing,
  sirenPass,
  ownVoice,
  seeDark,
  shadowLength,
  mirrorFlip,
  bentChopsticks,
  rainbow,
  blueSky,
  magnifierFire,
  myopia,
  soapBubble,
  staticShock,
  homeCircuit,
  bulbBright,
  birdWire,
  chargerWarm,
  breakerTrip,
  lightningRod,
  emfStep,
  capacitorStep,
  compassNorth,
  magnetPick,
  currentFieldStep,
  motorSpin,
  speakerCone,
  handGenerator,
  aurora,
  wirelessCharge,
  selfInductionStep,
  moonPhase,
  moonFollows,
  seasons,
  eclipse,
  starlightOld,
  moonOrbit,
  spaceFloat,
  tides,
  blackHole,
  atomSize,
  emptyAtom,
  phoneSignal,
  microwave,
  xRay,
  nuclearPlant,
  sunShine,
  gpsTime,
  photoelectricStep,
  moziPinhole,
  archimedesCrown,
  galileoRampStory,
  newtonApple,
  faradayRing,
  curieRadium,
  einsteinLight,
  wuMirror,
  dongfanghong,
];

const bySlug = new Map(stories.map(story => [story.slug, story]));

export function findStory(slug: string): Story | undefined {
  return bySlug.get(slug);
}
