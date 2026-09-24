// Playground pack: "Try it" calculators for equations and worked examples.
//   npm run merge -- content/playground.js   (adds a calculator only where an entry has none)
//
// Numbers are checked with: npm run check -- --calcs

const input = (key, label, unit, value, min, max, extra = {}) => ({ key, label, unit, value, min, max, ...extra });
const out = (label, unit, expr, extra = {}) => ({ label, unit, expr, ...extra });
const LOG = { log: true };
const INT = { integer: true };

export const CALCS = {
  // ---------------------------------------------------------------- relativity
  'sr-time-dilation': {
    inputs: [input('beta', 'Speed', '× c', 0.9, 0, 0.99999), input('tau', 'Time on the moving clock', 'years', 1, 0.01, 100, LOG)],
    outputs: [
      out('Lorentz factor γ', '', '1/sqrt(1 - beta^2)', { key: 'gamma', digits: 4 }),
      out('Time that passes at home', 'years', 'gamma*tau', { digits: 4 }),
      out('Distance travelled (home frame)', 'light-years', 'beta*gamma*tau', { digits: 4 }),
    ],
    note: 'Push the speed toward 1: a trip of a few years aboard can span centuries at home.',
  },
  'example-muon': {
    inputs: [input('beta', 'Muon speed', '× c', 0.998, 0.5, 0.99999)],
    outputs: [
      out('Lorentz factor γ', '', '1/sqrt(1 - beta^2)', { key: 'gamma', digits: 4 }),
      out('Typical range without time dilation', 'm', 'beta*c*2.1969811e-6', { prefix: true }),
      out('Typical range with time dilation', 'm', 'beta*c*gamma*2.1969811e-6', { prefix: true }),
      out('Share surviving 15 km — relativity', '', 'exp(-15000/(beta*c*gamma*2.1969811e-6))'),
      out('Share surviving 15 km — no time dilation', '', 'exp(-15000/(beta*c*2.1969811e-6))'),
    ],
  },
  'lorentz-transformations': {
    inputs: [input('w', 'Probe speed, measured on the rocket', '× c', 0.9, 0, 0.9999), input('v', 'Rocket speed', '× c', 0.9, 0, 0.9999)],
    outputs: [
      out('Probe speed seen from Earth', '× c', '(w + v)/(1 + w*v)', { digits: 5 }),
      out('What Galileo would say', '× c', 'w + v', { digits: 4 }),
      out('Rocket’s Lorentz factor', '', '1/sqrt(1 - v^2)', { digits: 4 }),
    ],
  },
  'four-momentum': {
    inputs: [input('m0', 'Rest energy mc²', 'MeV', 105.66, 0.511, 1e6, LOG), input('beta', 'Speed', '× c', 0.998, 0, 0.999999)],
    outputs: [
      out('γ', '', '1/sqrt(1 - beta^2)', { key: 'gamma', digits: 4 }),
      out('Total energy', 'eV', 'gamma*m0*1e6', { prefix: true }),
      out('Kinetic energy', 'eV', '(gamma - 1)*m0*1e6', { prefix: true }),
      out('Momentum × c', 'eV', 'gamma*beta*m0*1e6', { prefix: true }),
    ],
    note: 'Defaults are a cosmic-ray muon (105.66 MeV). Try 0.511 MeV for an electron, 938 MeV for a proton.',
  },
  'gravitational-time-dilation': {
    inputs: [input('M', 'Mass', 'Earth masses', 1, 1e-3, 1e13, LOG), input('r', 'Distance from the centre', 'km', 6371, 1, 1e9, LOG)],
    outputs: [
      out('Schwarzschild radius', 'm', '2*G*M*Mearth/c^2', { key: 'rs', prefix: true }),
      out('Clock rate compared with far away', '', 'sqrt(1 - rs/(r*1000))', { digits: 10 }),
      out('Time lost per day', 's', '(1 - sqrt(1 - rs/(r*1000)))*86400', { prefix: true }),
    ],
    note: 'Defaults: a clock on Earth’s surface. Inside the Schwarzschild radius there is no static clock, so the rate shows “—”.',
  },
  'example-gps': {
    inputs: [input('alt', 'Orbit altitude', 'km', 20200, 200, 40000)],
    outputs: [
      out('Orbital speed', 'm/s', 'sqrt(GMearth/(Rearth + alt*1000))', { key: 'v', prefix: true }),
      out('Gravity: clock gains per day', 's', 'GMearth/c^2*(1/Rearth - 1/(Rearth + alt*1000))*86400', { key: 'grav', prefix: true }),
      out('Speed: clock loses per day', 's', 'v^2/(2*c^2)*86400', { key: 'vel', prefix: true }),
      out('Net drift per day', 's', 'grav - vel', { key: 'net', prefix: true }),
      out('Light travel in that time', 'm', 'net*c', { prefix: true }),
    ],
    note: 'Lower the orbit to about 3,200 km and the two effects cancel exactly.',
  },
  'pound-rebka': {
    inputs: [input('height', 'Height difference', 'm', 22.5, 0.001, 1e5, LOG)],
    outputs: [out('Fractional frequency shift gh/c²', '', 'g0*height/c^2'), out('Seconds gained per year by the upper clock', 's', 'g0*height/c^2*yr', { prefix: true })],
    note: 'Uses surface gravity g, so it’s only accurate for heights much smaller than Earth.',
  },
  'schwarzschild-metric': {
    inputs: [input('M', 'Mass', 'solar masses', 1, 1e-7, 1e11, LOG)],
    outputs: [
      out('Schwarzschild radius r_s', 'm', '2*G*M*Msun/c^2', { key: 'rs', prefix: true }),
      out('Photon sphere (1.5 r_s)', 'm', '1.5*rs', { prefix: true }),
      out('Innermost stable orbit (3 r_s)', 'm', '3*rs', { prefix: true }),
      out('Average density inside r_s', 'kg/m³', 'M*Msun/(4/3*pi*rs^3)'),
    ],
    note: 'Heavier black holes are less dense: past about 140 million suns, the average density is below water’s.',
  },
  'hawking-radiation': {
    inputs: [input('M', 'Black hole mass', 'solar masses', 1, 1e-20, 1e10, LOG)],
    outputs: [
      out('Hawking temperature', 'K', 'hbar*c^3/(8*pi*G*M*Msun*kB)', { key: 'T', prefix: true }),
      out('Compared with the CMB (2.7 K)', '', 'T/2.7255'),
      out('Time to evaporate', 'years', '5120*pi*G^2*(M*Msun)^3/(hbar*c^4)/yr'),
      out('Mass in kilograms', 'kg', 'M*Msun'),
    ],
    note: 'A black hole of about 10¹¹–10¹² kg — a small mountain — formed in the Big Bang would be finishing its evaporation around now.',
  },
  'holographic-principle': {
    inputs: [input('M', 'Black hole mass', 'solar masses', 1, 1e-10, 1e10, LOG)],
    outputs: [
      out('Horizon area', 'm²', '4*pi*(2*G*M*Msun/c^2)^2', { key: 'A' }),
      out('Entropy S/k_B = A/4ℓ_P²', '', 'A*c^3/(4*G*hbar)', { key: 'S' }),
      out('Information it could hold', 'bits', 'S/ln(2)'),
    ],
  },
  'newtonian-gravity': {
    inputs: [input('M', 'Mass', 'Earth masses', 1, 1e-4, 1e6, LOG), input('r', 'Distance from the centre', 'km', 6371, 1, 1e9, LOG)],
    outputs: [
      out('Gravity g', 'm/s²', 'G*M*Mearth/(r*1000)^2', { digits: 3 }),
      out('Circular orbit speed', 'm/s', 'sqrt(G*M*Mearth/(r*1000))', { prefix: true }),
      out('Escape speed', 'm/s', 'sqrt(2*G*M*Mearth/(r*1000))', { prefix: true }),
      out('Orbital period', 'hours', '2*pi*sqrt((r*1000)^3/(G*M*Mearth))/3600', { digits: 4 }),
    ],
    note: 'Try r = 42,164 km: a 24-hour, geostationary orbit. Or M = 317.8 for Jupiter.',
  },
  'gravitational-lensing': {
    inputs: [input('M', 'Lens mass', 'solar masses', 1, 1e-6, 1e15, LOG), input('b', 'Closest approach of the light', 'solar radii', 1, 1, 1e12, LOG)],
    outputs: [
      out('Deflection angle', 'arcsec', '4*G*M*Msun/(c^2*b*Rsun)*206264.806', { digits: 3 }),
      out('Newton’s prediction (half)', 'arcsec', '2*G*M*Msun/(c^2*b*Rsun)*206264.806', { digits: 3 }),
    ],
    note: 'Valid for small angles. A galaxy cluster is ~10¹⁵ suns.',
  },
  'example-mercury-perihelion': {
    inputs: [input('a', 'Orbit size (semi-major axis)', 'AU', 0.387, 0.01, 50, LOG), input('e', 'Eccentricity', '', 0.2056, 0, 0.95)],
    outputs: [
      out('Orbital period', 'days', '2*pi*sqrt((a*AU)^3/(G*Msun))/day', { key: 'T', digits: 4 }),
      out('Extra turn per orbit', 'arcsec', '6*pi*G*Msun/(c^2*a*AU*(1 - e^2))*206264.806', { key: 'dphi', digits: 3 }),
      out('Extra turn per century', 'arcsec', 'dphi*36525/T', { digits: 3 }),
    ],
    note: 'Earth: a = 1, e = 0.0167 gives about 3.8″ per century.',
  },
  'gravitational-waves': {
    inputs: [input('hs', 'Strain h', '', 1e-21, 1e-25, 1e-15, LOG), input('L', 'Detector arm length', 'km', 4, 0.001, 2.5e6, LOG)],
    outputs: [
      out('Change in arm length ΔL = hL', 'm', 'hs*L*1000', { prefix: true }),
      out('In proton diameters (1.7 fm)', '', 'hs*L*1000/1.7e-15'),
    ],
    note: 'LIGO’s arms are 4 km; the planned space detector LISA’s are 2.5 million km.',
  },
  'expanding-universe': {
    inputs: [input('H0', 'Hubble constant', 'km/s per Mpc', 70, 50, 90), input('d', 'Distance to the galaxy', 'Mpc', 100, 1, 5000, LOG)],
    outputs: [
      out('Recession speed', 'km/s', 'H0*d', { digits: 4 }),
      out('As a fraction of c', '', 'H0*d*1000/c'),
      out('Hubble time 1/H₀', 'billion years', 'Mpc/(H0*1000)/yr/1e9'),
      out('Critical density', 'kg/m³', '3*(H0*1000/Mpc)^2/(8*pi*G)'),
    ],
    note: 'Beyond about 4,300 Mpc “recession” is faster than light — fine, because it is space stretching, not motion through space.',
  },
  cmb: {
    inputs: [input('z', 'Redshift z (how far back)', '', 1100, 0, 3000)],
    outputs: [
      out('Temperature then', 'K', '2.7255*(1 + z)', { digits: 4 }),
      out('Peak wavelength then', 'm', '2.897771955e-3/(2.7255*(1 + z))', { prefix: true }),
      out('CMB photons per cm³ then', '', '411*(1 + z)^3'),
    ],
    note: 'z ≈ 1100 is when the light was released; the glow was orange-hot then.',
  },
  'atomic-clocks': {
    inputs: [input('frac', 'Fractional accuracy', '', 1e-18, 1e-19, 1e-9, LOG)],
    outputs: [
      out('Error over the age of the universe', 's', 'frac*13.8e9*yr', { prefix: true }),
      out('Smallest height change it can feel (gh/c²)', 'm', 'frac*c^2/g0', { prefix: true }),
    ],
    note: 'Caesium fountains reach ~10⁻¹⁶; the best optical clocks ~10⁻¹⁸.',
  },
  'neutron-stars': {
    inputs: [input('M', 'Mass', 'solar masses', 1.4, 0.5, 2.5), input('R', 'Radius', 'km', 12, 8, 20)],
    outputs: [
      out('Schwarzschild radius', 'm', '2*G*M*Msun/c^2', { key: 'rs', prefix: true }),
      out('Surface clock rate', '', 'sqrt(1 - rs/(R*1000))'),
      out('Time lost per day at the surface', 'hours', '(1 - sqrt(1 - rs/(R*1000)))*24', { digits: 3 }),
      out('Average density', 'kg/m³', 'M*Msun/(4/3*pi*(R*1000)^3)'),
      out('Escape speed', '× c', 'sqrt(rs/(R*1000))'),
    ],
  },
  'degeneracy-pressure': {
    inputs: [input('mue', 'Nucleons per electron μₑ', '', 2, 1, 4, { step: 0.01 })],
    outputs: [out('Chandrasekhar mass', 'solar masses', '5.83/mue^2', { digits: 3 }), out('In kilograms', 'kg', '5.83/mue^2*Msun')],
    note: 'Carbon, oxygen: μₑ = 2. Iron: about 2.15. Pure hydrogen: 1.',
  },

  // ---------------------------------------------------------------- quantum & extreme matter
  'bec-critical-temperature': {
    inputs: [
      input('m', 'Atom mass', 'u', 86.909, 1, 250),
      input('n', 'Density', 'atoms/m³', 1e20, 1e16, 1e24, LOG),
      input('T', 'Temperature of your gas', 'nK', 200, 1, 2000, LOG),
    ],
    outputs: [
      out('Critical temperature T_c', 'K', '2*pi*hbar^2/(m*u*kB)*(n/zeta(1.5))^(2/3)', { key: 'Tc', prefix: true }),
      out('Fraction condensed at your temperature', '', 'max(0, 1 - (T*1e-9/Tc)^1.5)'),
      out('Thermal de Broglie wavelength', 'm', 'h/sqrt(2*pi*m*u*kB*T*1e-9)', { key: 'lam', prefix: true }),
      out('n·λ³ (condenses above 2.612)', '', 'n*lam^3'),
    ],
    note: 'Defaults: rubidium-87. Sodium-23 is m = 23, lithium-7 is m = 7.',
  },
  'bose-einstein-statistics': {
    inputs: [input('x', 'Energy above μ', '× k_B T', 1, 0.001, 20, LOG)],
    outputs: [
      out('Bosons per state (Bose–Einstein)', '', '1/(exp(x) - 1)'),
      out('Classical particles (Boltzmann)', '', 'exp(-x)'),
      out('Fermions per state (Fermi–Dirac)', '', '1/(exp(x) + 1)'),
    ],
    note: 'Slide toward zero: bosons pile up without limit, fermions never pass 1, and all three agree at high energy.',
  },
  'fermi-dirac': {
    inputs: [input('n', 'Fermion density', 'per m³', 8.47e28, 1e20, 1e37, LOG), input('m', 'Particle mass', 'electron masses', 1, 1, 2000, LOG)],
    outputs: [
      out('Fermi energy E_F', 'eV', 'hbar^2/(2*m*me)*(3*pi^2*n)^(2/3)/eV', { key: 'EF', prefix: true }),
      out('Fermi temperature', 'K', 'EF*eV/kB', { prefix: true }),
      out('Fermi speed', '× c', 'sqrt(2*EF*eV/(m*me))/c'),
    ],
    note: 'Defaults: electrons in copper. Try 10³⁶ for a white dwarf — the speed nears c, where this formula (and the star) gives out. Neutrons: mass 1839.',
  },
  'quantum-harmonic-oscillator': {
    inputs: [input('f', 'Oscillation frequency', 'Hz', 100, 0.1, 1e15, LOG), input('m', 'Particle mass', 'u', 86.909, 0.00055, 1000, LOG)],
    outputs: [
      out('Ground-state size √(ħ/mω)', 'm', 'sqrt(hbar/(m*u*2*pi*f))', { prefix: true }),
      out('Level spacing ħω', 'eV', 'hbar*2*pi*f/eV', { prefix: true }),
      out('Level spacing as a temperature', 'K', 'hbar*2*pi*f/kB', { prefix: true }),
      out('Zero-point energy ½ħω', 'eV', '0.5*hbar*2*pi*f/eV', { prefix: true }),
    ],
    note: 'Defaults: a rubidium atom in a 100 Hz trap. A molecular vibration is ~10¹³ Hz.',
  },
  'uncertainty-principle': {
    inputs: [input('dx', 'Position spread σₓ', 'm', 1e-10, 1e-18, 1, LOG), input('m', 'Mass', 'kg', 9.109e-31, 1e-31, 1000, LOG)],
    outputs: [out('Minimum momentum spread', 'kg·m/s', 'hbar/(2*dx)'), out('Minimum speed spread', 'm/s', 'hbar/(2*dx*m)', { prefix: true })],
    note: 'An electron squeezed into an atom jiggles at hundreds of km/s. Try m = 0.001 (a 1 g bead) — the spread is absurdly small.',
  },
  'wave-particle-duality': {
    inputs: [
      input('m', 'Mass', 'u', 0.00054858, 0.0005, 1e6, LOG),
      input('v', 'Speed', 'm/s', 1e6, 0.001, 1e8, LOG),
      input('T', 'Temperature', 'K', 300, 1e-9, 1e4, LOG),
    ],
    outputs: [out('de Broglie wavelength h/mv', 'm', 'h/(m*u*v)', { prefix: true }), out('Thermal wavelength at T', 'm', 'h/sqrt(2*pi*m*u*kB*T)', { prefix: true })],
    note: 'Defaults: an electron (0.000549 u). Non-relativistic, so keep v well below c.',
  },
  'hydrogen-atom': {
    inputs: [input('ni', 'Upper level', '', 3, 2, 12, INT), input('nf', 'Lower level', '', 2, 1, 11, INT)],
    outputs: [
      out('Photon energy', 'eV', 'abs(13.605693*(1/nf^2 - 1/ni^2))', { key: 'E', digits: 4 }),
      out('Wavelength', 'm', 'h*c/(E*eV)', { prefix: true, digits: 4 }),
      out('Frequency', 'Hz', 'E*eV/h', { prefix: true }),
    ],
    note: '3 → 2 is the red H-α line. Anything ending on level 1 is ultraviolet (Lyman series). Ignores the small reduced-mass correction.',
  },
  'quantum-tunneling': {
    inputs: [
      input('V', 'Barrier height above the particle’s energy', 'eV', 1, 0.001, 50, LOG),
      input('L', 'Barrier width', 'nm', 1, 0.01, 10, LOG),
      input('m', 'Mass', 'electron masses', 1, 1, 8000, LOG),
    ],
    outputs: [
      out('Decay constant κ', '1/m', 'sqrt(2*m*me*V*eV)/hbar', { key: 'k' }),
      out('Chance of getting through ≈ e^(−2κL)', '', 'exp(-2*k*L*1e-9)'),
      out('Decay length 1/κ', 'm', '1/k', { prefix: true }),
    ],
    note: 'Try m = 1836 (a proton) or 7294 (an alpha particle): tunnelling collapses for heavy particles.',
  },
  'landau-criterion': {
    inputs: [input('gap', 'Roton gap Δ/k_B', 'K', 8.62, 1, 20), input('p0', 'Roton momentum p₀/ħ', '1/Å', 1.91, 0.5, 5)],
    outputs: [out('Critical velocity ≈ Δ/p₀', 'm/s', 'gap*kB/(p0*1e10*hbar)', { digits: 3 })],
  },
  'bogoliubov-dispersion': {
    inputs: [
      input('a', 'Scattering length', 'nm', 2.75, 0.01, 100, LOG),
      input('n', 'Condensate density', 'atoms/m³', 1e20, 1e17, 1e23, LOG),
      input('m', 'Atom mass', 'u', 22.99, 1, 250),
    ],
    outputs: [
      out('Interaction strength g', 'J·m³', '4*pi*hbar^2*a*1e-9/(m*u)', { key: 'g' }),
      out('Speed of sound c_s', 'm/s', 'sqrt(g*n/(m*u))', { prefix: true }),
      out('Healing length ξ', 'm', 'hbar/sqrt(2*m*u*g*n)', { prefix: true }),
      out('Interaction energy gn as temperature', 'K', 'g*n/kB', { prefix: true }),
    ],
    note: 'Defaults: sodium-23. Rubidium-87 is a = 5.3 nm, m = 87.',
  },
  'quantized-circulation': {
    inputs: [
      input('m', 'Mass of one boson', 'u', 4.0026, 1, 250),
      input('r', 'Distance from the vortex core', 'μm', 1, 0.001, 1000, LOG),
      input('W', 'How fast the bucket spins', 'rad/s', 1, 0.001, 100, LOG),
    ],
    outputs: [
      out('Quantum of circulation h/m', 'm²/s', 'h/(m*u)', { key: 'kappa' }),
      out('Flow speed at that distance', 'm/s', 'kappa/(2*pi*r*1e-6)', { prefix: true }),
      out('Vortices per cm² in the bucket', '', '2*W/kappa/1e4'),
    ],
  },
  'example-casimir': {
    inputs: [input('a', 'Plate separation', 'nm', 1000, 1, 1e5, LOG), input('A', 'Plate area', 'cm²', 1, 0.01, 1e4, LOG)],
    outputs: [
      out('Pressure pulling the plates together', 'Pa', 'pi^2*hbar*c/(240*(a*1e-9)^4)', { key: 'P', prefix: true }),
      out('Force on the plates', 'N', 'P*A*1e-4', { prefix: true }),
      out('Compared with air pressure', '', 'P/101325'),
    ],
    note: 'Halve the gap and the pressure goes up 16 times.',
  },
  'example-zeta-regularization': {
    inputs: [input('eps', 'Cutoff ε', '', 0.1, 0.001, 2, LOG)],
    outputs: [
      out('Σ n·e^(−εn), exactly', '', '1/(4*sinh(eps/2)^2)', { key: 'full', digits: 8 }),
      out('Divergent part 1/ε²', '', '1/eps^2', { digits: 8 }),
      out('What’s left over', '', 'full - 1/eps^2', { digits: 5 }),
    ],
    note: 'Shrink ε: the total blows up but the leftover settles on −1/12 = −0.08333.',
  },
  'critical-dimension': {
    inputs: [input('D', 'Spacetime dimensions', '', 26, 3, 40, INT)],
    outputs: [
      out('Transverse directions D − 2', '', 'D - 2'),
      out('Zero-point energy −(D − 2)/24', '', '-(D - 2)/24', { digits: 4 }),
      out('Mismatch with the required −1', '', '-(D - 2)/24 + 1', { digits: 4 }),
    ],
    note: 'Only D = 26 gives zero mismatch.',
  },
  'riemann-zeta': {
    inputs: [input('s', 's (a real number above 1)', '', 1.5, 1.01, 20)],
    outputs: [out('ζ(s)', '', 'zeta(s)', { digits: 7 }), out('For comparison, ζ(2) = π²/6', '', 'pi^2/6', { digits: 7 })],
    note: 'Near s = 1 it blows up (the harmonic series). Values at s ≤ 1, like ζ(−1) = −1/12, need analytic continuation.',
  },
  'example-qubit': {
    inputs: [input('p0', 'Probability of 0', '', 0.3333, 0, 1), input('phi', 'Relative phase φ', '°', 90, 0, 360)],
    outputs: [
      out('P(0)', '', 'p0', { digits: 3 }),
      out('P(1)', '', '1 - p0', { digits: 3 }),
      out('P(+) = ½ + √(p₀p₁)·cos φ', '', '0.5 + sqrt(p0*(1 - p0))*cos(phi*pi/180)', { digits: 3 }),
      out('P(−)', '', '0.5 - sqrt(p0*(1 - p0))*cos(phi*pi/180)', { digits: 3 }),
    ],
    note: 'The phase never changes P(0) or P(1) — but watch P(+) swing as you turn it.',
  },
  'bell-chsh': {
    inputs: [
      input('a', 'Alice, setting 1', '°', 0, 0, 180),
      input('a2', 'Alice, setting 2', '°', 45, 0, 180),
      input('b', 'Bob, setting 1', '°', 22.5, 0, 180),
      input('b2', 'Bob, setting 2', '°', 67.5, 0, 180),
    ],
    outputs: [
      out('S (quantum prediction)', '', 'cos(2*(a - b)*pi/180) - cos(2*(a - b2)*pi/180) + cos(2*(a2 - b)*pi/180) + cos(2*(a2 - b2)*pi/180)', { digits: 4 }),
      out('Largest S any local hidden-variable theory allows', '', '2'),
      out('Largest S quantum mechanics allows (2√2)', '', '2*sqrt(2)', { digits: 4 }),
    ],
    note: 'Polarizer angles for entangled photons. Any setting with S above 2 rules out local hidden variables.',
  },
  'quantum-computing': {
    inputs: [input('nq', 'Number of qubits', '', 50, 1, 400, INT)],
    outputs: [out('Amplitudes 2ⁿ', '', '2^nq'), out('Memory to store them on a classical computer', 'B', '16*2^nq', { prefix: true })],
    note: 'The observable universe has about 10⁸⁰ atoms. 16 bytes per complex amplitude.',
  },
  superconductivity: {
    inputs: [
      input('Tc', 'Critical temperature T_c', 'K', 9.25, 0.01, 150, LOG),
      input('B', 'Magnetic field', 'mT', 1, 1e-6, 1e4, LOG),
      input('A', 'Loop area', 'μm²', 100, 1, 1e8, LOG),
    ],
    outputs: [
      out('Energy gap Δ ≈ 1.76 k_B T_c', 'eV', '1.764*kB*Tc/eV', { prefix: true }),
      out('Frequency that breaks a pair, 2Δ/h', 'Hz', '2*1.764*kB*Tc/h', { prefix: true }),
      out('Flux quanta through the loop', '', 'B*1e-3*A*1e-12/(h/(2*qe))'),
    ],
    note: 'Defaults: niobium. The BCS gap formula is approximate for high-temperature superconductors.',
  },
  'josephson-effect': {
    inputs: [input('V', 'Voltage across the junction', 'μV', 1, 0.001, 10000, LOG)],
    outputs: [out('AC current frequency 2eV/h', 'Hz', '2*qe*V*1e-6/h', { prefix: true, digits: 5 })],
  },
  'quantum-hall-effect': {
    inputs: [input('nu', 'Filling factor ν', '', 1, 0.1, 10, { step: 0.001 })],
    outputs: [out('Hall resistance h/(νe²)', 'Ω', 'h/(nu*qe^2)', { prefix: true, digits: 6 })],
    note: 'Try 0.3333 for the ν = 1/3 fractional state.',
  },
  'stimulated-emission': {
    inputs: [input('lam', 'Wavelength', 'nm', 500, 1, 1e7, LOG), input('T', 'Temperature of the light source', 'K', 5772, 1, 1e6, LOG)],
    outputs: [out('Thermal photons per mode (stimulated : spontaneous)', '', '1/(exp(h*c/(lam*1e-9*kB*T)) - 1)')],
    note: 'Sunlight gives far less than one photon per mode, so emission is mostly spontaneous. A laser piles millions into one mode.',
  },

  // ---------------------------------------------------------------- classical & statistical physics
  'planck-blackbody': {
    inputs: [input('T', 'Temperature', 'K', 5772, 1, 1e8, LOG)],
    outputs: [
      out('Peak wavelength (Wien)', 'm', '2.897771955e-3/T', { prefix: true }),
      out('Peak frequency', 'Hz', '5.878925757e10*T', { prefix: true }),
      out('Power radiated per m² (σT⁴)', 'W/m²', 'sigmaSB*T^4', { prefix: true }),
    ],
    note: 'Defaults: the Sun’s surface. You are about 310 K; the CMB is 2.7 K.',
  },
  'rayleigh-scattering': {
    inputs: [input('l1', 'Shorter wavelength', 'nm', 450, 200, 1000), input('l2', 'Longer wavelength', 'nm', 700, 200, 2000)],
    outputs: [out('How much more the shorter one scatters', '', '(l2/l1)^4', { digits: 3 })],
  },
  'landauer-principle': {
    inputs: [input('T', 'Temperature', 'K', 300, 0.001, 1e4, LOG), input('bits', 'Bits erased', '', 8e9, 1, 1e21, LOG)],
    outputs: [
      out('Minimum heat per bit, k_B T ln 2', 'J', 'kB*T*ln(2)', { key: 'E1' }),
      out('Same, in electronvolts', 'eV', 'E1/eV', { prefix: true }),
      out('Minimum heat for all those bits', 'J', 'E1*bits', { prefix: true }),
    ],
    note: '8 × 10⁹ bits is one gigabyte.',
  },
  'statistical-mechanics': {
    inputs: [input('dE', 'Energy gap between two states', 'meV', 25, 0.001, 1000, LOG), input('T', 'Temperature', 'K', 300, 0.01, 1e5, LOG)],
    outputs: [
      out('Thermal energy k_B T', 'eV', 'kB*T/eV', { prefix: true }),
      out('Upper ÷ lower population, e^(−ΔE/k_BT)', '', 'exp(-dE*1e-3*eV/(kB*T))'),
      out('Share in the upper state', '', '1/(1 + exp(dE*1e-3*eV/(kB*T)))'),
    ],
  },
  'waves-normal-modes': {
    inputs: [
      input('L', 'String length', 'm', 0.65, 0.05, 5),
      input('T', 'Tension', 'N', 70, 1, 2000, LOG),
      input('mu', 'Mass per length', 'g/m', 1, 0.01, 100, LOG),
      input('nmode', 'Harmonic n', '', 1, 1, 20, INT),
    ],
    outputs: [out('Wave speed √(T/μ)', 'm/s', 'sqrt(T/(mu*1e-3))', { key: 'v', digits: 4 }), out('Frequency nv/2L', 'Hz', 'nmode*v/(2*L)', { digits: 4 })],
    note: 'Roughly a guitar string. Double the tension and the pitch rises by √2.',
  },
  'dispersion-relations': {
    inputs: [input('lam', 'Ocean wavelength', 'm', 10, 0.1, 1000, LOG)],
    outputs: [
      out('Crest speed √(gλ/2π)', 'm/s', 'sqrt(g0*lam/(2*pi))', { key: 'vp', digits: 3 }),
      out('Group speed (half as fast)', 'm/s', 'vp/2', { digits: 3 }),
      out('Period', 's', 'lam/vp', { digits: 3 }),
    ],
    note: 'Deep-water waves: long waves outrun short ones, which is why swell from a distant storm arrives sorted by wavelength.',
  },
  'virasoro-algebra': {
    inputs: [input('cc', 'Central charge c', '', 24, 0, 30), input('m', 'Mode number m', '', 2, 1, 10, INT)],
    outputs: [out('Central term in [L_m, L₋m]: c·m(m²−1)/12', '', 'cc*m*(m^2 - 1)/12', { digits: 4 })],
    note: 'm = 1 always gives zero: L₋₁, L₀, L₁ never see the anomaly.',
  },
};

export const PLAYGROUND = { calcs: CALCS };
export default PLAYGROUND;
