// Mock data for Eng Debate Studio

const MOTIONS = [
  { id: '1', text: 'This House would ban the use of facial recognition technology by governments.', year: 2024, region: 'World', source: 'WUDC-style' },
  { id: '2', text: 'This House believes that social media companies should be held legally responsible for content posted on their platforms.', year: 2024, region: 'Europe', source: 'EUDC' },
  { id: '3', text: 'This House would require wealthy nations to pay climate reparations to developing countries.', year: 2023, region: 'Asia', source: 'QatarDebate' },
  { id: '4', text: 'This House supports the use of mandatory national service programmes.', year: 2023, region: 'World', source: 'WUDC' },
  { id: '5', text: 'This House would ban the production and sale of meat.', year: 2024, region: 'Middle East', source: 'QatarDebate' },
  { id: '6', text: 'This House believes that universities should prioritise vocational training over academic research.', year: 2023, region: 'Europe', source: 'EUDC' },
  { id: '7', text: 'This House would make voting compulsory.', year: 2024, region: 'Asia', source: 'Asian BP' },
  { id: '8', text: 'This House regrets the rise of the influencer economy.', year: 2023, region: 'World', source: 'WUDC-style' },
];

const TOURNAMENTS = [
  { id: '1', name: 'World Universities Debating Championship 2025', region: 'Panama', fee: 'Team fee varies', requirement: 'University team, qualified via regional', link: 'https://wudc2025.calicotab.com/', ongoing: true },
  { id: '2', name: 'National Middle School Debate Championship 2025', region: 'USA', fee: 'School registration', requirement: 'Middle school teams', link: 'https://nmdc2025.calicotab.com/', ongoing: true },
  { id: '3', name: 'Seasons Novice British Parliamentary 2025', region: 'Online', fee: 'Free / low fee', requirement: 'Novice debaters', link: 'https://seasons.calicotab.com/', ongoing: true },
  { id: '4', name: 'Asian British Parliamentary Championship', region: 'Asia', fee: '~$50–100 per team', requirement: 'Asian institution', ongoing: false },
  { id: '5', name: 'European Universities Debating Championship', region: 'Europe', fee: 'Varies by host', requirement: 'European university', ongoing: false },
];

const BP_SLOTS = [
  { id: 'OG-PM', role: 'Prime Minister', team: 'Opening Government' },
  { id: 'OG-DPM', role: 'Deputy PM', team: 'Opening Government' },
  { id: 'OO-LO', role: 'Leader of Opposition', team: 'Opening Opposition' },
  { id: 'OO-DLO', role: 'Deputy LO', team: 'Opening Opposition' },
  { id: 'CG-MG', role: 'Member of Government', team: 'Closing Government' },
  { id: 'CG-GW', role: 'Government Whip', team: 'Closing Government' },
  { id: 'CO-MO', role: 'Member of Opposition', team: 'Closing Opposition' },
  { id: 'CO-OW', role: 'Opposition Whip', team: 'Closing Opposition' },
];

function getMotionYears() {
  const set = new Set(MOTIONS.map(m => m.year));
  return [...set].sort((a, b) => b - a);
}

function getRegionsFromMotions() {
  const set = new Set(MOTIONS.map(m => m.region));
  return [...set].sort();
}

function getRegionsFromTournaments() {
  const set = new Set(TOURNAMENTS.map(t => t.region));
  return [...set].sort();
}
