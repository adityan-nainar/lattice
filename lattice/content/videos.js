// Videos for topics: real YouTube videos, each checked with YouTube's oEmbed endpoint (title and channel below come from it).
// Merged only into entries that have no videos yet.
//   npm run merge -- content/videos.js

export const VIDEOS = {
  videos: {
    'monster-group': [
      { url: "https://www.youtube.com/watch?v=mH0oCDa74tE", title: "Group theory, abstraction, and the 196,883-dimensional monster", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=jsSeoGpiWsw", title: "Monster Group (John Conway) - Numberphile", channel: "Numberphile" },
      { url: "https://www.youtube.com/watch?v=dxRf3vHbuoA", title: "Why Do Sporadic Groups Exist?", channel: "Another Roof" },
    ],
    'j-invariant': [
      { url: "https://www.youtube.com/watch?v=DRxAVA6gYMM", title: "163 and Ramanujan Constant - Numberphile", channel: "Numberphile" },
    ],
    'monstrous-moonshine': [
      { url: "https://www.youtube.com/watch?v=mH0oCDa74tE", title: "Group theory, abstraction, and the 196,883-dimensional monster", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=Dz6nqXItDQE", title: "Jeffrey Harvey - From Moonshine to Black Holes: Number Theory in Math and Physics (Sept 6, 2017)", channel: "Simons Foundation" },
      { url: "https://www.youtube.com/watch?v=jQLOGT7pM94", title: "Richard Borcherds | Monstrous Moonshine: From Group Theory to String Theory | The Cartesian Cafe", channel: "Timothy Nguyen" },
    ],
    'vertex-operator-algebra': [
      { url: "https://www.youtube.com/watch?v=7j4YVIFmAXw", title: "A gentle description of a vertex algebra.", channel: "Michael Penn" },
      { url: "https://www.youtube.com/watch?v=ZAXiht8UK5I", title: "The Genesis of Vertex Algebras", channel: "Michael Penn" },
    ],
    'virasoro-algebra': [
      { url: "https://www.youtube.com/watch?v=u-umYsfju4w", title: "An algebra for string theory -- The Virasoro algebra.", channel: "Michael Penn" },
    ],
    'leech-lattice': [
      { url: "https://www.youtube.com/watch?v=LZ7X_YOfJqY", title: "Kissing Numbers - Numberphile", channel: "Numberphile" },
      { url: "https://www.youtube.com/watch?v=ycpmMnO3-Uk", title: "How to construct the Leech lattice", channel: "Richard E Borcherds" },
    ],
    'bosonic-string': [
      { url: "https://www.youtube.com/watch?v=k6TWO-ESC6A", title: "What are the Strings in String Theory?", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=n7cOlBxtKSo", title: "String Theory", channel: "ScienceClic English" },
    ],
    'critical-dimension': [
      { url: "https://www.youtube.com/watch?v=0Oazb7IWzbA", title: "Why -1/12 is a gold nugget", channel: "Numberphile" },
      { url: "https://www.youtube.com/watch?v=k6TWO-ESC6A", title: "What are the Strings in String Theory?", channel: "PBS Space Time" },
    ],
    'moonshine-module': [
      { url: "https://www.youtube.com/watch?v=jQLOGT7pM94", title: "Richard Borcherds | Monstrous Moonshine: From Group Theory to String Theory | The Cartesian Cafe", channel: "Timothy Nguyen" },
      { url: "https://www.youtube.com/watch?v=9X5jCer-z1k", title: "A guide to moonshine - John Duncan", channel: "Institute for Advanced Study" },
    ],
    'question-monster-universe': [
      { url: "https://www.youtube.com/watch?v=Dz6nqXItDQE", title: "Jeffrey Harvey - From Moonshine to Black Holes: Number Theory in Math and Physics (Sept 6, 2017)", channel: "Simons Foundation" },
    ],
    'why-24': [
      { url: "https://www.youtube.com/watch?v=vzjbRhYjELo", title: "John Baez on the number 24", channel: "James Waechter" },
      { url: "https://www.youtube.com/watch?v=LZ7X_YOfJqY", title: "Kissing Numbers - Numberphile", channel: "Numberphile" },
    ],
    superposition: [
      { url: "https://www.youtube.com/watch?v=ZUipVyVOm-Y", title: "Quantum Superposition, Explained Without Woo Woo", channel: "The Science Asylum" },
      { url: "https://www.youtube.com/watch?v=IHDMJqJHCQg", title: "Superposition Explained (Schrödinger's Cat) | Perimeter Institute for Theoretical Physics", channel: "Perimeter Institute for Theoretical Physics" },
    ],
    'schrodinger-equation': [
      { url: "https://www.youtube.com/watch?v=uVKMY-WTrVo", title: "What is the i really doing in Schrödinger's equation?", channel: "Welch Labs" },
      { url: "https://www.youtube.com/watch?v=QeUMFo8sODk", title: "What is The Schrödinger Equation, Exactly?", channel: "Up and Atom" },
    ],
    'born-rule': [
      { url: "https://www.youtube.com/watch?v=VHlqY44fOg0", title: "The Born Rule", channel: "Looking Glass Universe" },
      { url: "https://www.youtube.com/watch?v=cKlRnutiv-k", title: "It's possible to prove the Born Rule of quantum mechanics", channel: "Looking Glass Universe" },
    ],
    'bose-einstein-statistics': [
      { url: "https://www.youtube.com/watch?v=83vR9omSahs", title: "Fermions Vs. Bosons Explained with Statistical Mechanics!", channel: "PBS Space Time" },
    ],
    'bose-einstein-condensate': [
      { url: "https://www.youtube.com/watch?v=FuB2GrEmFIE", title: "Bose-Einstein Condensation - Wolfgang Ketterle", channel: "Serious Science" },
      { url: "https://www.youtube.com/watch?v=NoO7XKVmZC8", title: "2001 Nobel Laureate Lecture in Physics - Wolfgang Ketterle, The Story of Bose-Einstein Condensates", channel: "MIT Video Productions" },
      { url: "https://www.youtube.com/watch?v=lBpxQdikm0w", title: "Bose-Einstein Condensate: The Quantum BASICS - Bosons and their Wave Functions (Physics by Parth G)", channel: "Parth G" },
    ],
    'gross-pitaevskii': [
      { url: "https://www.youtube.com/watch?v=Ih01TfuEfqU", title: "19. Bose gases", channel: "MIT OpenCourseWare" },
    ],
    superfluidity: [
      { url: "https://www.youtube.com/watch?v=Ia2GwIpEdk4", title: "Is 'Perpetual Motion' Possible with Superfluids?", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=UNpKCYZFfDU", title: "Demo 22801: Superfluid Helium", channel: "Caltech's Feynman Lecture Hall" },
      { url: "https://www.youtube.com/watch?v=D0aPQKqA7rE", title: "Superfluidity of Ultracold Matter - Wolfgang Ketterle", channel: "Serious Science" },
    ],
    'quantized-circulation': [
      { url: "https://www.youtube.com/watch?v=Sfi2qFJACwQ", title: "Quantum vortices in Superfluid Helium", channel: "superfluidturbulence" },
    ],
    'speed-of-light': [
      { url: "https://www.youtube.com/watch?v=msVuCEs8Ydo", title: "The Speed of Light is NOT About Light", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=Zkv8sW6y3sY", title: "I finally understood why speed of light is a constant! (My mind is blown)", channel: "FloatHeadPhysics" },
    ],
    'sr-time-dilation': [
      { url: "https://www.youtube.com/watch?v=5qQheJn-FHc", title: "Visualizing Time Dilation", channel: "ScienceClic English" },
      { url: "https://www.youtube.com/watch?v=-NN_m2yKAAk", title: "Length Contraction and Time Dilation | Special Relativity Ch. 5", channel: "minutephysics" },
    ],
    'gravitational-time-dilation': [
      { url: "https://www.youtube.com/watch?v=GKD1vDAPkFQ", title: "How Does Gravity Warp the Flow of Time?", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=DjwQsKMh2v8", title: "What Causes Gravitational Time Dilation? A Physical Explanation.", channel: "Dialect" },
    ],
    'schwarzschild-metric': [
      { url: "https://www.youtube.com/watch?v=q6RufF4a6LM", title: "The Geometry of a Black Hole", channel: "Dialect" },
      { url: "https://www.youtube.com/watch?v=GQZ3R81iyE0", title: "Why Time and Space swap in a Black Hole", channel: "ScienceClic English" },
    ],
    'einstein-field-equations': [
      { url: "https://www.youtube.com/watch?v=UfThVvBWZxM", title: "Einstein's Field Equations of General Relativity Explained", channel: "Physics Videos by Eugene Khutoryansky" },
      { url: "https://www.youtube.com/watch?v=PCujLVSRuMk", title: "The Maths of General Relativity (7/8) - The Einstein equation", channel: "ScienceClic English" },
      { url: "https://www.youtube.com/watch?v=foRPKAKZWx8", title: "Einstein Field Equations - for beginners!", channel: "DrPhysicsA" },
    ],
    'clocks-superposition-gravity': [
      { url: "https://www.youtube.com/watch?v=5YZYfmAc4wY", title: "Atomic Clocks Prove Reality Is Stranger Than You Think | NOVA | PBS", channel: "NOVA PBS Official" },
      { url: "https://www.youtube.com/watch?v=eAtbzhpI4Js", title: "What If Gravity Isn’t Quantum? New Experiments Explore", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=DkRbNXILroI", title: "A Bet Against Quantum Gravity", channel: "Quanta Magazine" },
    ],
    'complex-numbers': [
      { url: "https://www.youtube.com/watch?v=cUzklzVXJwo", title: "How Imaginary Numbers Were Invented", channel: "Veritasium" },
      { url: "https://www.youtube.com/watch?v=T647CGsuOVU", title: "Imaginary Numbers Are Real [Part 1: Introduction]", channel: "Welch Labs" },
    ],
    calculus: [
      { url: "https://www.youtube.com/watch?v=WUvTyaaNkzM", title: "The essence of calculus", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=3d6DsjIBzJ4", title: "Taylor series | Chapter 11, Essence of calculus", channel: "3Blue1Brown" },
    ],
    'infinite-series': [
      { url: "https://www.youtube.com/watch?v=w-I6XTVZXww", title: "ASTOUNDING: 1 + 2 + 3 + 4 + 5 + ... = -1/12", channel: "Numberphile" },
      { url: "https://www.youtube.com/watch?v=beakj767uG4", title: "Does -1/12 Protect Us From Infinity? - Numberphile", channel: "Numberphile" },
    ],
    'generating-functions': [
      { url: "https://www.youtube.com/watch?v=bOXCLR3Wric", title: "Olympiad level counting  (Generating functions)", channel: "3Blue1Brown" },
    ],
    'linear-algebra': [
      { url: "https://www.youtube.com/watch?v=fNk_zzaMoSs", title: "Vectors | Chapter 1, Essence of linear algebra", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=TgKwz5Ikpc8", title: "Abstract vector spaces | Chapter 16, Essence of linear algebra", channel: "3Blue1Brown" },
    ],
    eigenvalues: [
      { url: "https://www.youtube.com/watch?v=PFDu9oVAE-g", title: "Eigenvectors and eigenvalues | Chapter 14, Essence of linear algebra", channel: "3Blue1Brown" },
    ],
    'differential-equations': [
      { url: "https://www.youtube.com/watch?v=p_di4Zn4wz4", title: "Differential equations, a tourist's guide | DE1", channel: "3Blue1Brown" },
    ],
    'vector-calculus': [
      { url: "https://www.youtube.com/watch?v=rB83DpBJQsE", title: "Divergence and curl:  The language of Maxwell's equations, fluid flow, and more", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=0UvNF_cfBJ4", title: "Stokes' Theorem // Geometric Intuition & Statement  //  Vector Calculus", channel: "Dr. Trefor Bazett" },
    ],
    'fourier-analysis': [
      { url: "https://www.youtube.com/watch?v=spUNpyF58BY", title: "But what is the Fourier Transform?  A visual introduction.", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=r6sGWTCMz2k", title: "But what is a Fourier series?  From heat flow to drawing with circles | DE4", channel: "3Blue1Brown" },
    ],
    probability: [
      { url: "https://www.youtube.com/watch?v=5nyQqOHNFCM", title: "Wavefunction Properties, Normalization, and Expectation Values", channel: "Professor Dave Explains" },
    ],
    'complex-analysis': [
      { url: "https://www.youtube.com/watch?v=NtoIXhUgqSk", title: "The 5 ways to visualize complex functions | Essence of complex analysis #3", channel: "Mathemaniac" },
      { url: "https://www.youtube.com/watch?v=EyBDtUtyshk", title: "Complex integration, Cauchy and residue theorems | Essence of Complex Analysis #6", channel: "Mathemaniac" },
    ],
    'riemann-zeta': [
      { url: "https://www.youtube.com/watch?v=sD0NjbwqlYw", title: "But what is the Riemann zeta function? Visualizing analytic continuation", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=krtf-v19TJg", title: "When CAN'T Math Be Generalized? | The Limits of Analytic Continuation", channel: "Morphocular" },
    ],
    'group-theory': [
      { url: "https://www.youtube.com/watch?v=mvmuCPvRoWQ", title: "Euler's formula with introductory group theory", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=KufsL2VgELo", title: "What is Group Theory? — Group Theory Ep. 1", channel: "Nemean" },
    ],
    'finite-simple-groups': [
      { url: "https://www.youtube.com/watch?v=dxRf3vHbuoA", title: "Why Do Sporadic Groups Exist?", channel: "Another Roof" },
      { url: "https://www.youtube.com/watch?v=mH0oCDa74tE", title: "Group theory, abstraction, and the 196,883-dimensional monster", channel: "3Blue1Brown" },
    ],
    'representation-theory': [
      { url: "https://www.youtube.com/watch?v=R-eCUwhnO8c", title: "Representations of Finite Groups | Definitions and simple examples.", channel: "Michael Penn" },
    ],
    'lie-algebras': [
      { url: "https://www.youtube.com/watch?v=ZRca3Ggpy_g", title: "What is Lie theory? Here is the big picture. | Lie groups, algebras, brackets #3", channel: "Mathemaniac" },
      { url: "https://www.youtube.com/watch?v=gj4kvpy1eCE", title: "Lie algebras visualized: why are they defined like that? Why Jacobi identity?", channel: "Mathemaniac" },
    ],
    lattices: [
      { url: "https://www.youtube.com/watch?v=CROeIGfr3gs", title: "The Best Way to Pack Spheres - Numberphile", channel: "Numberphile" },
      { url: "https://www.youtube.com/watch?v=AxPwhJTHxSg", title: "Counting points on the E8 lattice with modular forms (theta functions) | #SoME2", channel: "World Equation" },
    ],
    'tori-elliptic-curves': [
      { url: "https://www.youtube.com/watch?v=grzFM5XciAY", title: "Elliptic Curves and Modular Forms | The Proof of Fermat’s Last Theorem", channel: "Aleph 0" },
    ],
    'modular-forms': [
      { url: "https://www.youtube.com/watch?v=zLEyIT_BCgk", title: "The bridge between number theory and complex analysis", channel: "Aleph 0" },
      { url: "https://www.youtube.com/watch?v=grzFM5XciAY", title: "Elliptic Curves and Modular Forms | The Proof of Fermat’s Last Theorem", channel: "Aleph 0" },
    ],
    'eisenstein-discriminant': [
      { url: "https://www.youtube.com/watch?v=NjCIq58rZ8I", title: "Partitions - Numberphile", channel: "Numberphile" },
    ],
    tensors: [
      { url: "https://www.youtube.com/watch?v=bpG3gqDM80w", title: "What the HECK is a Tensor?!?", channel: "The Science Asylum" },
      { url: "https://www.youtube.com/watch?v=k2FP-T6S1x0", title: "I never intuitively understood Tensors...until now!", channel: "FloatHeadPhysics" },
    ],
    manifolds: [
      { url: "https://www.youtube.com/watch?v=OdWaYWtrZI4", title: "Why everything looks flat… until you zoom out", channel: "Aleph 0" },
    ],
    'riemannian-geometry': [
      { url: "https://www.youtube.com/watch?v=HJlhBPci_Bg", title: "The Maths of General Relativity (5/8) - Curvature", channel: "ScienceClic English" },
      { url: "https://www.youtube.com/watch?v=TvFvL_sMg4g", title: "Conceptualizing the Christoffel Symbols: An Adventure in Curvilinear Coordinates", channel: "Dialect" },
    ],
    'newtonian-gravity': [
      { url: "https://www.youtube.com/watch?v=kxkFaBG6a-A", title: "Newton's Law of Universal Gravitation", channel: "Professor Dave Explains" },
    ],
    'waves-normal-modes': [
      { url: "https://www.youtube.com/watch?v=0Rfushlee0U", title: "Standing Waves and Harmonics", channel: "Professor Dave Explains" },
    ],
    'dispersion-relations': [
      { url: "https://www.youtube.com/watch?v=EIqKG5TiSYs", title: "Phase Velocity versus Group Velocity:  Wave Dispersion", channel: "Physics Videos by Eugene Khutoryansky" },
    ],
    'lagrangian-mechanics': [
      { url: "https://www.youtube.com/watch?v=sUk9y23FPHk", title: "Explaining the Principle of Least Action: Physics Mini Lesson", channel: "Physics with Elliot" },
      { url: "https://www.youtube.com/watch?v=Q_CQDSlmboA", title: "Is ACTION The Most Fundamental Property in Physics?", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=Q10_srZ-pbs", title: "The Closest We’ve Come to a Theory of Everything", channel: "Veritasium" },
    ],
    'hamiltonian-mechanics': [
      { url: "https://www.youtube.com/watch?v=0DHNGtsmmH8", title: "Lagrangian and Hamiltonian Mechanics in Under 20 Minutes: Physics Mini Lesson", channel: "Physics with Elliot" },
    ],
    'noether-theorem': [
      { url: "https://www.youtube.com/watch?v=04ERSb06dOg", title: "Noether's Theorem and The Symmetries of Reality", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=CxlHLqJ9I0A", title: "The most beautiful idea in physics - Noether's Theorem", channel: "Looking Glass Universe" },
    ],
    'maxwell-light': [
      { url: "https://www.youtube.com/watch?v=aXRTczANuIs", title: "How wiggling charges give rise to light", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=F3QHUvr8d8I", title: "Maxwell's Equations - The Ultimate Beginner's Guide", channel: "Up and Atom" },
    ],
    thermodynamics: [
      { url: "https://www.youtube.com/watch?v=DxL2HoqLbyA", title: "The Most Misunderstood Concept in Physics", channel: "Veritasium" },
      { url: "https://www.youtube.com/watch?v=w2iTCm0xpDc", title: "A better description of entropy", channel: "Steve Mould" },
    ],
    'statistical-mechanics': [
      { url: "https://www.youtube.com/watch?v=ftjwF0TC2c8", title: "Maxwell-Boltzmann distribution", channel: "Physics Videos by Eugene Khutoryansky" },
    ],
    'fluid-dynamics': [
      { url: "https://www.youtube.com/watch?v=ERBVFcutl3M", title: "Navier-Stokes Equations - Numberphile", channel: "Numberphile" },
      { url: "https://www.youtube.com/watch?v=Ra7aQlenTb8", title: "The million dollar equation (Navier-Stokes equations)", channel: "vcubingx" },
    ],
    'wave-particle-duality': [
      { url: "https://www.youtube.com/watch?v=A9tKncAdlHQ", title: "Double Slit Experiment explained! by Jim Al-Khalili", channel: "The Royal Institution" },
      { url: "https://www.youtube.com/watch?v=fbzHNBT0nl0", title: "The biggest lie about the double slit experiment", channel: "Looking Glass Universe" },
    ],
    'hilbert-space': [
      { url: "https://www.youtube.com/watch?v=r2NMWEsNcTs", title: "9. Dirac's Bra and Ket Notation", channel: "MIT OpenCourseWare" },
    ],
    'observables-operators': [
      { url: "https://www.youtube.com/watch?v=so1szjHu7jY", title: "Ever heard of Quantum Operators and Commutators? (Explained for Beginners)!", channel: "Parth G" },
      { url: "https://www.youtube.com/watch?v=Nd4b0_vJZUk", title: "Before You Start On Quantum Mechanics, Learn This", channel: "Physics with Elliot" },
    ],
    'uncertainty-principle': [
      { url: "https://www.youtube.com/watch?v=MBnnXbOM5S4", title: "The more general uncertainty principle, regarding Fourier transforms", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=a8FTr2qMutA", title: "Heisenberg's Uncertainty Principle Explained", channel: "Veritasium" },
    ],
    'quantum-harmonic-oscillator': [
      { url: "https://www.youtube.com/watch?v=RCIz2hdJQy0", title: "Intro to the Quantum Harmonic Oscillator in 9 Minutes #PaCE1", channel: "Richard Behiel" },
      { url: "https://www.youtube.com/watch?v=bmGqhM-tUk4", title: "To Master Physics, First Master the Harmonic Oscillator", channel: "Physics with Elliot" },
    ],
    spin: [
      { url: "https://www.youtube.com/watch?v=pYeRS5a3HbE", title: "What is Spin? A Geometric explanation", channel: "ScienceClic English" },
      { url: "https://www.youtube.com/watch?v=PdN1mweN2ds", title: "I never understood why electrons have spin... until now!", channel: "FloatHeadPhysics" },
    ],
    'identical-particles': [
      { url: "https://www.youtube.com/watch?v=83vR9omSahs", title: "Fermions Vs. Bosons Explained with Statistical Mechanics!", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=Zlp2GQ3OLeE", title: "What causes the Pauli Exclusion Principle?", channel: "Physics Videos by Eugene Khutoryansky" },
    ],
    entanglement: [
      { url: "https://www.youtube.com/watch?v=ZuvK-od647c", title: "Quantum Entanglement & Spooky Action at a Distance", channel: "Veritasium" },
      { url: "https://www.youtube.com/watch?v=5_0o2fJhtSc", title: "Understanding Quantum Entanglement - with Philip Ball", channel: "The Royal Institution" },
    ],
    decoherence: [
      { url: "https://www.youtube.com/watch?v=igsuIuI_HAQ", title: "Understanding Quantum Mechanics #5: Decoherence", channel: "Sabine Hossenfelder" },
      { url: "https://www.youtube.com/watch?v=GlOwJWJWPUs", title: "How Decoherence Splits The Quantum Multiverse", channel: "PBS Space Time" },
    ],
    'scattering-length': [
      { url: "https://www.youtube.com/watch?v=O_zjGYvP4Ps", title: "20. Fermi gases, BEC-BCS crossover", channel: "MIT OpenCourseWare" },
    ],
    quasiparticles: [
      { url: "https://www.youtube.com/watch?v=le_ORQZzkmE", title: "How Are Quasiparticles Different From Particles?", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=KbsnY--LFh0", title: "How To Discover Weird New Particles | Emergent Quantum Quasiparticles", channel: "minutephysics" },
    ],
    'spontaneous-symmetry-breaking': [
      { url: "https://www.youtube.com/watch?v=yzqLHiA0uFI", title: "What is the ORIGIN of all MASS in the Universe? Physics of symmetry breaking", channel: "Arvin Ash" },
    ],
    'laser-cooling': [
      { url: "https://www.youtube.com/watch?v=hFkiMWrA2Bc", title: "How does laser cooling work?", channel: "Physics Girl" },
      { url: "https://www.youtube.com/watch?v=drnq_6ffTbo", title: "Laser Cooling - Sixty Symbols", channel: "Sixty Symbols" },
    ],
    interferometry: [
      { url: "https://www.youtube.com/watch?v=bFM9HHB9JXI", title: "The Genius Behind the Quantum Navigation Breakthrough", channel: "Dr Ben Miles" },
      { url: "https://www.youtube.com/watch?v=EoOAp9ZnNa0", title: "NASA | Atomic Interferometry", channel: "NASA Goddard" },
    ],
    'quantum-field-theory': [
      { url: "https://www.youtube.com/watch?v=zNVQfWC_evg", title: "Quantum Fields: The Real Building Blocks of the Universe - with David Tong", channel: "The Royal Institution" },
      { url: "https://www.youtube.com/watch?v=MmG2ah5Df4g", title: "Quantum Field Theory visualized", channel: "ScienceClic English" },
    ],
    regularization: [
      { url: "https://www.youtube.com/watch?v=Nm8DRUgmjZc", title: "The Biggest Ideas in the Universe | 11. Renormalization", channel: "Sean Carroll" },
    ],
    'principle-of-relativity': [
      { url: "https://www.youtube.com/watch?v=uTyAI1LbdgA", title: "Special Relativity", channel: "ScienceClic English" },
    ],
    'lorentz-transformations': [
      { url: "https://www.youtube.com/watch?v=Rh0pYtQG5wI", title: "Lorentz Transformations | Special Relativity Ch. 3", channel: "minutephysics" },
      { url: "https://www.youtube.com/watch?v=qdycfWfAtsM", title: "Spacetime rotations, understanding Lorentz transformations", channel: "ScienceClic English" },
    ],
    'minkowski-spacetime': [
      { url: "https://www.youtube.com/watch?v=hTxWAQGgeQw", title: "Spacetime Diagrams | Special Relativity Ch. 2", channel: "minutephysics" },
    ],
    'four-momentum': [
      { url: "https://www.youtube.com/watch?v=Xo232kyTsO0", title: "The Real Meaning of E=mc²", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=hW7DW9NIO9M", title: "Einstein's Proof of E=mc²", channel: "minutephysics" },
    ],
    'equivalence-principle': [
      { url: "https://www.youtube.com/watch?v=XRr1kaXKBsU", title: "What Everyone Gets Wrong About Gravity", channel: "Veritasium" },
      { url: "https://www.youtube.com/watch?v=vng2-R64rAY", title: "What is Einstein's Equivalence Principle?", channel: "Sabine Hossenfelder" },
    ],
    geodesics: [
      { url: "https://www.youtube.com/watch?v=3NnZzRb7L58", title: "The Maths of General Relativity (3/8) - Geodesics", channel: "ScienceClic English" },
      { url: "https://www.youtube.com/watch?v=m6WY6VtPYrk", title: "The Nature of Geodesics", channel: "Dialect" },
    ],
    'stress-energy-tensor': [
      { url: "https://www.youtube.com/watch?v=JKQMre-bze4", title: "The Maths of General Relativity (6/8) - Energy fluxes", channel: "ScienceClic English" },
    ],
    'newtonian-limit': [
      { url: "https://www.youtube.com/watch?v=GuLL_upE4zk", title: "Why General Relativity (and Newton's Laws) tell us The Sky is Falling Up", channel: "Dialect" },
    ],
    'gravitational-redshift': [
      { url: "https://www.youtube.com/watch?v=OHdV9aO6jaE", title: "How Does Gravity Affect Light?", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=aKwJayXTZUs", title: "The Best Test of General Relativity (by 2 Misplaced Satellites)", channel: "Veritasium" },
    ],
    'black-holes': [
      { url: "https://www.youtube.com/watch?v=mht-1c4wc0Q", title: "What Happens at the Event Horizon? | Space Time | PBS Digital Studios", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=zUyH3XhpLTo", title: "How to Understand What Black Holes Look Like", channel: "Veritasium" },
    ],
    'atomic-clocks': [
      { url: "https://www.youtube.com/watch?v=5YZYfmAc4wY", title: "Atomic Clocks Prove Reality Is Stranger Than You Think | NOVA | PBS", channel: "NOVA PBS Official" },
      { url: "https://www.youtube.com/watch?v=OKms5a0nGO4", title: "Who decides how long a second is? - John Kitching", channel: "TED-Ed" },
    ],
    'quantum-gravity-problem': [
      { url: "https://www.youtube.com/watch?v=YNEBhwimJWs", title: "Quantum Gravity and the Hardest Problem in Physics | Space Time", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=Ov98y_DCvRY", title: "How we know that Einstein's General Relativity can't be quite right", channel: "Sabine Hossenfelder" },
    ],
    'classical-string': [
      { url: "https://www.youtube.com/watch?v=KpIaWiWvuRs", title: "The First Thing You'll Learn in a String Theory Class", channel: "Physics with Elliot" },
    ],
    'light-cone-quantization': [
      { url: "https://www.youtube.com/watch?v=jhyWwA_bJ5A", title: "11. String Theory in the Light-cone Gauge", channel: "MIT OpenCourseWare" },
    ],
    'conformal-field-theory': [
      { url: "https://www.youtube.com/watch?v=jEEQO-tcyHc", title: "PiTP 2015 - \"Introduction to Topological and Conformal Field Theory (1 of 2)\" - Robbert Dijkgraaf", channel: "Institute for Advanced Study" },
    ],
    compactification: [
      { url: "https://www.youtube.com/watch?v=z91oGI5aP0A", title: "Does Gravity Require Extra Dimensions?", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=5UDUNqwWuNs", title: "Big Mysteries: Extra Dimensions", channel: "Fermilab" },
    ],
    'golay-m24': [
      { url: "https://www.youtube.com/watch?v=Tmx-v4FiP6I", title: "The Hidden Geometry of Error-Free Communication", channel: "Another Roof" },
      { url: "https://www.youtube.com/watch?v=X8jsijhllIA", title: "But what are Hamming codes? The origin of error correction", channel: "3Blue1Brown" },
    ],
    'borcherds-algebras': [
      { url: "https://www.youtube.com/watch?v=jQLOGT7pM94", title: "Richard Borcherds | Monstrous Moonshine: From Group Theory to String Theory | The Cartesian Cafe", channel: "Timothy Nguyen" },
    ],
    superstrings: [
      { url: "https://www.youtube.com/watch?v=kF4ju6j6aLE", title: "String theory - Brian Greene", channel: "TED-Ed" },
      { url: "https://www.youtube.com/watch?v=plU31-qtZ78", title: "M Theory | Towards a theory of everything?", channel: "ScienceClic English" },
    ],
    'mathieu-umbral-moonshine': [
      { url: "https://www.youtube.com/watch?v=Dz6nqXItDQE", title: "Jeffrey Harvey - From Moonshine to Black Holes: Number Theory in Math and Physics (Sept 6, 2017)", channel: "Simons Foundation" },
    ],
    'ads-cft': [
      { url: "https://www.youtube.com/watch?v=klpDHn8viX8", title: "The Holographic Universe Explained", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=DoCYY9sa2kU", title: "Does Space Emerge From A Holographic Boundary?", channel: "PBS Space Time" },
    ],
    octonions: [
      { url: "https://www.youtube.com/watch?v=_E2iiuunK-E", title: "Cohl Furey on the Octonions and Particle Physics", channel: "Quanta Magazine" },
      { url: "https://www.youtube.com/watch?v=3BR8tK-LuB0", title: "Fantastic Quaternions - Numberphile", channel: "Numberphile" },
    ],
    'e8': [
      { url: "https://www.youtube.com/watch?v=whNVIPiVl2o", title: "Something weird happens in dimension 8", channel: "Aleph 0" },
    ],
    'sphere-packing': [
      { url: "https://www.youtube.com/watch?v=mceaM2_zQd8", title: "Strange Spheres in Higher Dimensions - Numberphile", channel: "Numberphile" },
      { url: "https://www.youtube.com/watch?v=8qlZjarkS_g", title: "The solution to the sphere packing problem in 24 dimensions...-Stephen Miller", channel: "Institute for Advanced Study" },
    ],
    'riemann-hypothesis': [
      { url: "https://www.youtube.com/watch?v=zlm1aajH6gY", title: "The Riemann Hypothesis, Explained", channel: "Quanta Magazine" },
      { url: "https://www.youtube.com/watch?v=d6c6uIyieoo", title: "Riemann Hypothesis - Numberphile", channel: "Numberphile" },
    ],
    'modularity-fermat': [
      { url: "https://www.youtube.com/watch?v=nUN4NDVIfVI", title: "The Bridges to Fermat's Last Theorem - Numberphile", channel: "Numberphile" },
      { url: "https://www.youtube.com/watch?v=_bJeKUosqoY", title: "The Biggest Project in Modern Mathematics", channel: "Quanta Magazine" },
    ],
    'ramanujan-tau': [
      { url: "https://www.youtube.com/watch?v=BBTBj9yBy1o", title: "a bit about one of Ramanujan's favorite functions", channel: "Michael Penn" },
    ],
    'knot-theory': [
      { url: "https://www.youtube.com/watch?v=8DBhTXM_Br4", title: "The Insane Math Of Knot Theory", channel: "Veritasium" },
      { url: "https://www.youtube.com/watch?v=cuJY14BYac4", title: "Knots and Quantum Theory - Edward Witten", channel: "Institute for Advanced Study" },
    ],
    'topology-winding': [
      { url: "https://www.youtube.com/watch?v=b7FxPsqfkOY", title: "Winding numbers and domain coloring", channel: "3Blue1Brown" },
    ],
    'kaluza-klein': [
      { url: "https://www.youtube.com/watch?v=ZS2hJLIN1DM", title: "Does the Universe have Higher Dimensions? Part 1", channel: "Sabine Hossenfelder" },
    ],
    'calabi-yau': [
      { url: "https://www.youtube.com/watch?v=9If-K9R3Ka4", title: "Where Are All The Hidden Dimensions?", channel: "History of the Universe" },
    ],
    'holographic-principle': [
      { url: "https://www.youtube.com/watch?v=Ab8JIzckx_M", title: "The Black Hole Entropy Enigma", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=dmDKlcaAWO0", title: "Why do some scientists believe that our universe is a hologram?", channel: "Sabine Hossenfelder" },
    ],
    supersymmetry: [
      { url: "https://www.youtube.com/watch?v=0GUTJQCeKBE", title: "Supersymmetry, explained visually", channel: "ScienceClic English" },
      { url: "https://www.youtube.com/watch?v=0CeLRrBAI60", title: "What is Supersymmetry?", channel: "Fermilab" },
    ],
    'quantum-tunneling': [
      { url: "https://www.youtube.com/watch?v=WPZLRtyvEqo", title: "What is Quantum Tunneling, Exactly?", channel: "Up and Atom" },
      { url: "https://www.youtube.com/watch?v=RF7dDt3tVmI", title: "Quantum Tunneling", channel: "Physics Videos by Eugene Khutoryansky" },
    ],
    'hydrogen-atom': [
      { url: "https://www.youtube.com/watch?v=W2Xb2GFK2yc", title: "A Better Way To Picture Atoms", channel: "minutephysics" },
      { url: "https://www.youtube.com/watch?v=-Y0XL-K0jy0", title: "The Hydrogen Atom, Part 1 of 3: Intro to Quantum Physics", channel: "Richard Behiel" },
    ],
    'fermi-dirac': [
      { url: "https://www.youtube.com/watch?v=83vR9omSahs", title: "Fermions Vs. Bosons Explained with Statistical Mechanics!", channel: "PBS Space Time" },
    ],
    'stimulated-emission': [
      { url: "https://www.youtube.com/watch?v=y3SBSbsdiYg", title: "How lasers work (in theory)", channel: "minutephysics" },
      { url: "https://www.youtube.com/watch?v=lW4Uq_2VPhE", title: "How Lasers Work (in practice) - Smarter Every Day 33", channel: "SmarterEveryDay" },
    ],
    'path-integral': [
      { url: "https://www.youtube.com/watch?v=vSFRN-ymfgE", title: "Feynman's Infinite Quantum Paths", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=Sp5SvdDh2u8", title: "How Feynman did quantum mechanics (and you should too)", channel: "Physics with Elliot" },
    ],
    'dirac-equation': [
      { url: "https://www.youtube.com/watch?v=hYkaahzFWfo", title: "Anti-Matter and Quantum Relativity", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=CbYFanAGsSM", title: "Deriving the Dirac Equation", channel: "Richard Behiel" },
    ],
    'gauge-symmetry': [
      { url: "https://www.youtube.com/watch?v=V5kgruUjVBs", title: "Quantum Invariance & The Origin of The Standard Model", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=hF_uHfSoOGA", title: "The Symmetries of the universe", channel: "ScienceClic English" },
    ],
    'higgs-mechanism': [
      { url: "https://www.youtube.com/watch?v=G0Q4UAiKacw", title: "How the Higgs Mechanism Give Things Mass", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=Ztc6QPNUqls", title: "Your Mass is NOT From the Higgs Boson", channel: "Veritasium" },
    ],
    'standard-model': [
      { url: "https://www.youtube.com/watch?v=mYcLuWHzfmE", title: "The Map of Particle Physics | The Standard Model Explained", channel: "Domain of Science" },
      { url: "https://www.youtube.com/watch?v=Unl1jXFnzgo", title: "The Standard Model of Particle Physics: A Triumph of Science", channel: "Quanta Magazine" },
    ],
    'bell-chsh': [
      { url: "https://www.youtube.com/watch?v=zcqZHYo7ONs", title: "Bell's Theorem: The Quantum Venn Diagram Paradox", channel: "minutephysics" },
      { url: "https://www.youtube.com/watch?v=0RiAxvb_qI4", title: "Spooky Action at a Distance (Bell's Inequality) - Sixty Symbols", channel: "Sixty Symbols" },
    ],
    'measurement-problem': [
      { url: "https://www.youtube.com/watch?v=Be3HlA_9968", title: "The Problem with Quantum Measurement", channel: "Sabine Hossenfelder" },
    ],
    'quantum-computing': [
      { url: "https://www.youtube.com/watch?v=RQWpF2Gb-gU", title: "But what is quantum computing?  (Grover's Algorithm)", channel: "3Blue1Brown" },
      { url: "https://www.youtube.com/watch?v=-UlxHPIEVqA", title: "The Map of Quantum Computing - Quantum Computing Explained", channel: "Domain of Science" },
    ],
    superconductivity: [
      { url: "https://www.youtube.com/watch?v=bD2M7P6dTVA", title: "The Map of Superconductivity", channel: "Domain of Science" },
      { url: "https://www.youtube.com/watch?v=vruYFOlM1-Q", title: "How do Superconductors work at the Quantum level?", channel: "Arvin Ash" },
    ],
    'josephson-effect': [
      { url: "https://www.youtube.com/watch?v=_mVBbdbqHmw", title: "How Physicists Proved Everything is Quantum - Nobel Physics Prize 2025 Explained", channel: "Dr Ben Miles" },
      { url: "https://www.youtube.com/watch?v=wwJf9ZUuKi8", title: "The 2025 Nobel Prize in Physics (quantum tunnelling) - Sixty Symbols", channel: "Sixty Symbols" },
    ],
    'quantum-hall-effect': [
      { url: "https://www.youtube.com/watch?v=X9FDiyYaXos", title: "The Straightest Line EVER Measured?! | Quantum Hall Effect Explained", channel: "Parth G" },
      { url: "https://www.youtube.com/watch?v=GJHhnr9R_ZM", title: "What in the world is topological quantum matter? - Fan Zhang", channel: "TED-Ed" },
    ],
    'degeneracy-pressure': [
      { url: "https://www.youtube.com/watch?v=1QVPjrUdp0k", title: "The Ridiculous Density of White Dwarfs", channel: "The Science Asylum" },
      { url: "https://www.youtube.com/watch?v=oxYbShKkw-4", title: "What is the Chandrasekhar limit for White Dwarf Stars?", channel: "Physics Explained" },
    ],
    'neutron-stars': [
      { url: "https://www.youtube.com/watch?v=udFxKZRyQt4", title: "Neutron Stars – The Most Extreme Things that are not Black Holes", channel: "Kurzgesagt – In a Nutshell" },
      { url: "https://www.youtube.com/watch?v=1Ou1MckZHTA", title: "Neutron Stars: The Most Extreme Objects in the Universe", channel: "PBS Space Time" },
    ],
    'planck-blackbody': [
      { url: "https://www.youtube.com/watch?v=FXfrncRey-4", title: "The ULTRAVIOLET CATASTROPHE", channel: "Physics Girl" },
      { url: "https://www.youtube.com/watch?v=rCfPQLVzus4", title: "What is the Ultraviolet Catastrophe?", channel: "Physics Explained" },
    ],
    'rayleigh-scattering': [
      { url: "https://www.youtube.com/watch?v=4HBuHX4-VU8", title: "How Does Rayleigh Scattering ACTUALLY Work? (The Blue Sky)", channel: "The Science Asylum" },
    ],
    'landauer-principle': [
      { url: "https://www.youtube.com/watch?v=KR23aMjIHIY", title: "Reversing Entropy with Maxwell's Demon", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=XY-mbr-aAZE", title: "Pure Information Gives Off Heat", channel: "Up and Atom" },
    ],
    'gravitational-waves': [
      { url: "https://www.youtube.com/watch?v=iphcyNWFD10", title: "The Absurdity of Detecting Gravitational Waves", channel: "Veritasium" },
      { url: "https://www.youtube.com/watch?v=YHS9g72npqA", title: "Gravitational Waves Explained Using Stick Figures", channel: "minutephysics" },
    ],
    'hawking-radiation': [
      { url: "https://www.youtube.com/watch?v=qPKj0YnKANw", title: "Hawking Radiation", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=isezfMo8kWQ", title: "Hawking radiation", channel: "ScienceClic English" },
    ],
    'expanding-universe': [
      { url: "https://www.youtube.com/watch?v=9DrBQg_n2Uo", title: "What Actually Expands In An Expanding Universe?", channel: "Veritasium" },
      { url: "https://www.youtube.com/watch?v=6PiyUjVxukI", title: "What is the universe expanding into? - Sajan Saini", channel: "TED-Ed" },
    ],
    cmb: [
      { url: "https://www.youtube.com/watch?v=3tCMd1ytvWg", title: "Cosmic Microwave Background Explained", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=1loJTy6bOu8", title: "Cosmic Microwave Background Radiation - Sixty Symbols", channel: "Sixty Symbols" },
    ],
    'vacuum-energy-problem': [
      { url: "https://www.youtube.com/watch?v=n6jAOV7bZ3Y", title: "The Vacuum Catastrophe", channel: "PBS Space Time" },
    ],
    'er-epr': [
      { url: "https://www.youtube.com/watch?v=OBPpRqxY8Uw", title: "Leonard Susskind | \"ER = EPR\" or \"What's Behind the Horizons of Black Holes?\" - 1 of 2", channel: "Stanford Institute for Theoretical Physics" },
      { url: "https://www.youtube.com/watch?v=uOJCS1W1uzg", title: "How Physicists Created a Holographic Wormhole in a Quantum Computer", channel: "Quanta Magazine" },
    ],
    'gravitational-lensing': [
      { url: "https://www.youtube.com/watch?v=Dgv2WWpm7_s", title: "The Strange Universe of Gravitational Lensing", channel: "PBS Space Time" },
    ],
    'arrow-of-time': [
      { url: "https://www.youtube.com/watch?v=NfTmy1ApCvI", title: "Entropy and the Arrow of Time", channel: "ScienceClic English" },
      { url: "https://www.youtube.com/watch?v=QkWT-xMTm1M", title: "The Arrow of Time and How to Reverse It", channel: "PBS Space Time" },
    ],
    'puzzle-137': [
      { url: "https://www.youtube.com/watch?v=RCSSgxV9qNw", title: "Why Is 1/137 One of the Greatest Unsolved Problems In Physics?", channel: "PBS Space Time" },
    ],
    'puzzle-three-dimensions': [
      { url: "https://www.youtube.com/watch?v=DqI21DNdAcc", title: "Why Does Space Have Three Dimensions?", channel: "Sabine Hossenfelder" },
    ],
    'puzzle-weak-gravity': [
      { url: "https://www.youtube.com/watch?v=GjkqedrTwZo", title: "The Crisis in Physics: Why the Higgs Boson Should NOT Exist!", channel: "PBS Space Time" },
    ],
    'puzzle-effectiveness': [
      { url: "https://www.youtube.com/watch?v=ZBkzqLJPkmM", title: "The Unreasonable Effectiveness of Mathematics | World Science Festival", channel: "World Science Festival" },
    ],
    'puzzle-emergent-spacetime': [
      { url: "https://www.youtube.com/watch?v=DoCYY9sa2kU", title: "Does Space Emerge From A Holographic Boundary?", channel: "PBS Space Time" },
      { url: "https://www.youtube.com/watch?v=RIqVnFtOSr4", title: "When Physics Fails: The Problem of Space-Time", channel: "Quanta Magazine" },
    ],
    'puzzle-fine-tuning': [
      { url: "https://www.youtube.com/watch?v=U-B1MpTQfJQ", title: "Are The Fundamental Constants Finely Tuned? | The Naturalness Problem", channel: "PBS Space Time" },
    ],
    'unruh-effect': [
      { url: "https://www.youtube.com/watch?v=7cj6oiFDEXc", title: "The Unruh Effect", channel: "PBS Space Time" },
    ],
    'kerr-black-holes': [
      { url: "https://www.youtube.com/watch?v=fu3645D4ZlI", title: "Spinning Black Holes", channel: "Veritasium" },
      { url: "https://www.youtube.com/watch?v=UjgGdGzDFiM", title: "How Black Holes Spin Space Time", channel: "PBS Space Time" },
    ],
  },
};

export default VIDEOS;
