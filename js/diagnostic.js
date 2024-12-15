const diseaseDatabase = {
  diagnoses: [
    {
      plant: "blé",
      organ: "grain",
      disease: "Carie commune",
      treatment:
        "Traitement de semences avec fongicide spécifique, utilisation de semences certifiées",
      description:
        "Les grains sont transformés en masse de spores noires et dégagent une odeur de poisson pourri. La maladie se propage lors de la récolte quand les grains cariés éclatent.",
      imageUrl: "../assets/images/diseases/Carie_commune.jpg",
    },
    {
      plant: "blé",
      organ: "épi",
      disease: "Fusariose de l'épi",
      treatment:
        "Rotation culturale, labour des résidus, choix variétal résistant, traitement fongicide à la floraison",
      description:
        "Les épillets prennent une couleur rose-orangée à blanchâtre. Les grains sont échaudés et peuvent contenir des mycotoxines dangereuses.",
      imageUrl: "../assets/images/diseases/Fusariose_de_l'epi.jpg",
    },
    {
      plant: "blé",
      organ: "racines et épi",
      disease: "Piétin échaudage",
      treatment:
        "Rotation longue (3 ans minimum), choix variétal tolérant, travail du sol favorisant la décomposition des résidus",
      description:
        "Les plantes jaunissent prématurément par foyers. Le système racinaire est nécrosé avec une coloration brun foncé. Les épis sont échaudés avec des grains ratatinés.",
      imageUrl: "../assets/images/diseases/Pietin_echaudage.jpg",
    },
    {
      plant: "orge",
      organ: "épi",
      disease: "Charbon nu",
      treatment:
        "Utilisation de semences certifiées, traitement de semences systémique spécifique",
      description:
        "Les épis sont transformés en masse noire poudreuse qui se disperse au vent. Seul le rachis de l'épi reste intact. L'infection se fait à la floraison.",
      imageUrl: "../assets/images/diseases/Charbon_nu.jpg",
    },
    {
      plant: "orge",
      organ: "feuilles",
      disease: "Helminthosporiose",
      treatment:
        "Rotation culturale, variétés résistantes, traitement fongicide au stade 1-2 nœuds et épiaison",
      description:
        "Taches brunes allongées sur les feuilles, bordées de jaune. Les taches peuvent fusionner et causer un dessèchement complet des feuilles.",
      imageUrl: "../assets/images/diseases/Helminthosporiose.jpg",
    },
    {
      plant: "maïs",
      organ: "épi",
      disease: "Fusariose de l'épi",
      treatment:
        "Rotation culturale, broyage fin des résidus, variétés tolérantes, traitement fongicide si risque élevé",
      description:
        "Moisissure rose à rouge sur les grains, débutant souvent à la pointe de l'épi. Production de mycotoxines dangereuses pour l'alimentation.",
      imageUrl: "../assets/images/diseases/Fusariose_de_l'epi2.jpg",
    },
    {
      plant: "maïs",
      organ: "tige",
      disease: "Charbon commun",
      treatment:
        "Équilibre de la fertilisation azotée, éviter les stress hydriques, gestion des résidus de culture",
      description:
        "Grosses tumeurs gris argenté sur tiges, feuilles et épis. Les tumeurs éclatent et libèrent une poudre noire de spores.",
      imageUrl: "../assets/images/diseases/Charbon_commun.jpg",
    },
    {
      plant: "blé",
      organ: "feuilles",
      disease: "Septoriose",
      treatment:
        "Programme fongicide adapté, choix variétal, date de semis adaptée",
      description:
        "Taches brunes allongées avec des points noirs (pycnides). Progression de bas en haut sur les étages foliaires avec le temps.",
      imageUrl: "../assets/images/diseases/Septoriose.jpg",
    },
    {
      plant: "orge",
      organ: "tige",
      disease: "Rhynchosporiose",
      treatment:
        "Rotation culturale, variétés résistantes, traitement fongicide préventif",
      description:
        "Taches ovales à centre clair et bordure brune sur feuilles. Progression rapide en conditions humides.",
      imageUrl: "../assets/images/diseases/Rhynchosporiose.jpg",
    },
    {
      plant: "orge",
      organ: "racines",
      disease: "Rhynchosporiose",
      treatment:
        "Rotation culturale, variétés tolérantes, traitement fongicide au stade 1-2 nœuds et,epiaison",
      description:
        "Taches brunes parallèles aux nervures. Dessèchement prématuré des feuilles en cas d'attaque sévère.",
      imageUrl: "../assets/images/diseases/Rhynchosporiose2.jpg",
    },
    {
      plant: "maïs",
      organ: "feuilles",
      disease: "Helminthosporiose",
      treatment:
        "Rotation des cultures, variétés tolérantes, gestion des résidus",
      description:
        "Longues taches brunes parallèles aux nervures. Dessèchement précoce du feuillage en cas d'attaque sévère.",
      imageUrl: "../assets/images/diseases/Helminthosporiose.jpg",
    },
    {
      plant: "maïs",
      organ: "racines",
      disease: "Rhynchosporiose",
      treatment:
        "Rotation culturale, variétés tolérantes, traitement fongicide au stade 1-2 nœuds et,epiaison",
      description:
        "Taches brunes parallèles aux nervures. Dessèchement prématuré des feuilles en cas d'attaque sévère.",
      imageUrl: "../assets/images/diseases/Rhynchosporiose3.jpg",
    },
  ],

  findDiagnosis(plant, organ) {
    return this.diagnoses.find((d) => {
      return d.plant === plant && d.organ === organ;
    });
  },
};

class DiagnosticTool {
  constructor() {
    this.currentStep = 1;
    this.maxSteps = 4;
    this.initializeElements();
    this.bindEvents();
    this.renderStepIndicators();
  }

  initializeElements() {
    this.formContainer = document.querySelector(".diagnostic-form");
    this.resultContainer = document.querySelector(
      ".diagnostic-result"
    );
    this.stepsContainer = document.querySelector(".progress-steps");
  }

  createFormStructure() {
    const plantGroup = document.createElement("div");
    plantGroup.className = "form-group";
    plantGroup.innerHTML = `
      <label for="plant-select">Choisir une plante :</label>
      <select id="plant-select" required>
          <option value="">Sélectionnez une plante</option>
          <option value="blé">Blé</option>
          <option value="orge">Orge</option>
          <option value="maïs">Maïs</option>
      </select>
    `;

    const organGroup = document.createElement("div");
    organGroup.className = "form-group";
    organGroup.innerHTML = `
      <label for="organ-select">Choisir l'organe touché :</label>
      <select id="organ-select" required>
          <option value="">Sélectionnez l'organe</option>
          <option value="grain">Grain</option>
          <option value="épi">Épi</option>
          <option value="feuilles">Feuilles</option>
          <option value="tige">Tige</option>
          <option value="racines">Racines</option>
      </select>
    `;

    this.formContainer.appendChild(plantGroup);
    this.formContainer.appendChild(organGroup);
  }

  renderStepIndicators() {
    this.stepsContainer.innerHTML = "";
    for (let i = 1; i <= this.maxSteps; i++) {
      const step = document.createElement("div");
      step.className = `step ${
        i <= this.currentStep ? "active" : ""
      }`;
      if (i <= this.currentStep) {
        step.style.backgroundColor = "#4CAF50";
        step.style.color = "white";
      }
      step.textContent = i;
      this.stepsContainer.appendChild(step);
    }
  }

  bindEvents() {
    const plantSelect = document.getElementById("plant-select");
    const organSelect = document.getElementById("organ-select");

    plantSelect.addEventListener("change", () => {
      if (plantSelect.value) {
        this.currentStep = Math.max(2, this.currentStep);
        this.updateStep();
      } else {
        this.currentStep = 1;
        this.updateStep();
        this.clearResult();
      }
      this.checkForDiagnosis();
    });

    organSelect.addEventListener("change", () => {
      if (organSelect.value && plantSelect.value) {
        this.currentStep = Math.max(3, this.currentStep);
        this.checkForDiagnosis();
      } else {
        this.clearResult();
      }
      this.updateStep();
    });
  }

  updateStep() {
    this.renderStepIndicators();
  }

  clearResult() {
    this.resultContainer.innerHTML = "";
    this.resultContainer.classList.add("hidden");
    this.resultContainer.classList.remove("fade-in");
  }

  checkForDiagnosis() {
    const plantSelect = document.getElementById("plant-select");
    const organSelect = document.getElementById("organ-select");

    if (plantSelect.value && organSelect.value) {
      const diagnosis = diseaseDatabase.findDiagnosis(
        plantSelect.value,
        organSelect.value
      );

      if (diagnosis) {
        setTimeout(() => {
          this.currentStep = 4;
          this.updateStep();
          this.showResult(diagnosis);
        }, 1000);
      } else {
        this.clearResult();
        console.log(
          "No diagnosis found for:",
          plantSelect.value,
          organSelect.value
        );
      }
    }
  }

  showResult(diagnosis) {
    const treatments = diagnosis.treatment
      .split(",")
      .map((t) => t.trim());

    this.resultContainer.innerHTML = `
        <div class="result-wrapper">
            <!-- Header Section -->
            <div class="result-header">
                <div class="header-content">
                    <h3>Résultat du diagnostic</h3>
                    <span class="diagnosis-badge">Diagnostic complet</span>
                </div>
                <div class="plant-details">
                    <span class="plant-type">${diagnosis.plant.toUpperCase()}</span>
                    <span class="organ-type">${diagnosis.organ.toUpperCase()}</span>
                </div>
            </div>

            <!-- Main Content Grid -->
            <div class="diagnosis-content">
                <!-- Left Column: Disease Info -->
                <div class="content-left">
                    <div class="disease-card">
                        <div class="card-header">
                            <span class="icon">🔍</span>
                            <h4>Maladie identifiée</h4>
                        </div>
                        <h5 class="disease-name">${
                          diagnosis.disease
                        }</h5>
                        <p class="disease-description">${
                          diagnosis.description
                        }</p>
                    </div>

                    <div class="treatment-card">
                        <div class="card-header">
                            <span class="icon">💊</span>
                            <h4>Traitement recommandé</h4>
                        </div>
                        <div class="treatment-steps">
                            ${treatments
                              .map(
                                (treatment, index) => `
                                <div class="treatment-step">
                                    <span class="step-number">${
                                      index + 1
                                    }</span>
                                    <p>${treatment}</p>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>

                <!-- Right Column: Image and Actions -->
                <div class="content-right">
                    <div class="image-card">
                        <img src="${diagnosis.imageUrl}" alt="${
      diagnosis.disease
    }" />
                        <div class="image-caption">Illustration des symptômes</div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn-primary" onclick="window.print()">
                            <span class="icon">📄</span>
                            Imprimer le diagnostic
                        </button>
                        <button class="btn-secondary" onclick="location.reload()">
                            <span class="icon">🔄</span>
                            Nouveau diagnostic
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    this.resultContainer.classList.remove("hidden");
    requestAnimationFrame(() => {
      this.resultContainer.classList.add("fade-in");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const diagnosticTool = new DiagnosticTool();
});
