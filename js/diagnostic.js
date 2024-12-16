const diseaseDatabase = {
  diagnoses: [
    // Blé (Wheat) diseases
    {
      plant: "blé",
      organ: "grain",
      disease: "Maladie charbonneuse",
      treatment: "Rotation des cultures, traitement des semences",
      description:
        "Les grains sont transformés en une masse noire poudreuse. Ils sont entièrement détruits et remplacés par cette poudre noire.",
      imageUrl: "../assets/images/diseases/maladie_charbonneuse.webp",
    },
    {
      plant: "blé",
      organ: "épi",
      disease: "Charbon du blé",
      treatment:
        "Désinfection des semences avec fongicide systémique",
      description:
        "Les épis infectés deviennent noirs et poudreux, détruisant totalement les grains qu'ils contiennent.",
      imageUrl: "../assets/images/diseases/Charbon_commun.jpg",
    },
    {
      plant: "blé",
      organ: "tige",
      disease: "Piétin échaudage",
      treatment:
        "Rotation des cultures, désinfection des semences, amélioration du drainage",
      description:
        "Les bases des tiges montrent des nécroses, entraînant un affaiblissement et parfois un échaudage prématuré des plantes.",
      imageUrl: "../assets/images/diseases/Pietin_echaudage.jpg",
    },
    {
      plant: "blé",
      organ: "racines",
      disease: "Fonte des semis",
      treatment:
        "Traitement des semences, semis dans des conditions optimales",
      description:
        "Les racines des plantules se nécrosent, entraînant un flétrissement et parfois la mort des jeunes pousses.",
      imageUrl: "../assets/images/diseases/Fonte_semis.webp",
    },

    // Orge (Barley) diseases
    {
      plant: "orge",
      organ: "grain",
      disease: "Charbon nu de l'orge",
      treatment:
        "Désinfection des semences avec fongicide systémique",
      description:
        "Les grains infectés se transforment en une masse poudreuse noire. La contamination peut se propager rapidement.",
      imageUrl: "../assets/images/diseases/Charbon_nu.jpg",
    },
    {
      plant: "orge",
      organ: "tige",
      disease: "Piétin échaudage",
      treatment:
        "Rotation des cultures, variétés résistantes, amélioration des conditions de culture",
      description:
        "La base des tiges devient nécrosée, causant un affaiblissement structurel et une perte de rendement.",
      imageUrl: "../assets/images/diseases/Pietin_echaudage.jpg",
    },
    {
      plant: "orge",
      organ: "feuilles",
      disease: "Helminthosporiose",
      treatment:
        "Choix variétal, traitement fongicide, bonne gestion de la fertilisation",
      description:
        "Taches brun foncé entourées de jaune apparaissent sur les feuilles, réduisant leur capacité photosynthétique.",
      imageUrl: "../assets/images/diseases/Helminthosporiose.jpg",
    },

    // Maïs (Corn) diseases
    {
      plant: "maïs",
      organ: "grain",
      disease: "Fusariose",
      treatment:
        "Rotation des cultures, hygiène des champs, traitements fongicides en végétation",
      description:
        "Les grains présentent une moisissure rose ou rougeâtre, avec un risque élevé de contamination par des mycotoxines.",
      imageUrl: "../assets/images/diseases/Fusarioses_mais.jpg",
    },
    {
      plant: "maïs",
      organ: "tige",
      disease: "Charbon commun du maïs",
      treatment:
        "Amélioration des pratiques culturales, gestion des apports azotés",
      description:
        "Tumeurs remplies d'une poudre noire apparaissent sur les tiges et les épis, affectant la récolte.",
      imageUrl: "../assets/images/diseases/Charbon_commun.jpg",
    },

    // Seigle (Rye) diseases
    {
      plant: "seigle",
      organ: "épi",
      disease: "Ergot du seigle",
      treatment: "Rotation des cultures, semences certifiées",
      description:
        "Des excroissances noires et toxiques se forment à la place des grains, présentant un danger pour la consommation.",
      imageUrl: "../assets/images/diseases/Ergot_seigle.jpg",
    },

    // Generic diseases affecting all cereals
    {
      plant: "céréales",
      organ: "feuilles",
      disease: "Oïdium des céréales",
      treatment: "Traitement fongicide préventif, choix variétal",
      description:
        "Un feutrage blanc apparaît sur les feuilles, réduisant leur efficacité photosynthétique.",
      imageUrl: "../assets/images/diseases/Oidium_cereales.jpg",
    },
    {
      plant: "céréales",
      organ: "racines",
      disease: "Piétin commun",
      treatment:
        "Rotation culturale, amélioration du drainage, réduction des densités de semis",
      description:
        "Les racines se dégradent, affectant le développement des plantes et leur capacité à absorber l'eau.",
      imageUrl: "../assets/images/diseases/Pietin_echaudage.jpg",
    },
  ],

  findDiagnosis(plant, organ) {
    return this.diagnoses.find(
      d => d.plant === plant && d.organ === organ
    );
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

      setTimeout(() => {
        this.currentStep = 4;
        this.updateStep();
        diagnosis
          ? this.showResult(diagnosis)
          : this.showNoResult(plantSelect.value, organSelect.value);
      }, 1000);
    }
  }

  showResult(diagnosis) {
    const treatments = diagnosis.treatment
      .split(",")
      .map(t => t.trim());

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

  showNoResult(plant, organ) {
    this.resultContainer.innerHTML = `
        <div class="result-wrapper no-result">
            <!-- Header Section -->
            <div class="result-header">
                <div class="header-content">
                    <h3>Aucun Résultat Trouvé</h3>
                    <span class="diagnosis-badge error">Non trouvé</span>
                </div>
                <div class="plant-details">
                    <span class="plant-type">${plant.toUpperCase()}</span>
                    <span class="organ-type">${organ.toUpperCase()}</span>
                </div>
            </div>

            <!-- Main Content -->
            <div class="diagnosis-content">
                <div class="content-left">
                    <div class="disease-card error-card">
                        <div class="card-header">
                            <span class="icon">⚠️</span>
                            <h4>Information de Recherche</h4>
                        </div>
                        <div class="search-details">
                            <p>Aucun diagnostic n'a été trouvé pour cette combinaison:</p>
                            <ul class="search-params">
                                <li><strong>Plante:</strong> ${plant}</li>
                                <li><strong>Organe:</strong> ${organ}</li>
                            </ul>
                        </div>
                    </div>

                    <div class="suggestion-card">
                        <div class="card-header">
                            <span class="icon">💡</span>
                            <h4>Suggestions</h4>
                        </div>
                        <ul class="suggestions">
                            <li>Vérifiez que vous avez sélectionné la bonne combinaison plante/organe</li>
                            <li>Essayez de sélectionner un organe différent de la même plante</li>
                            <li>Consultez notre guide des maladies pour plus d'informations</li>
                        </ul>
                    </div>
                </div>

                <div class="content-right">
                    <div class="action-buttons">
                        <button class="btn-primary" onclick="location.reload()">
                            <span class="icon">🔄</span>
                            Nouveau diagnostic
                        </button>
                        <button class="btn-secondary" onclick="window.location.href='#contact'">
                            <span class="icon">📞</span>
                            Contacter le support
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
