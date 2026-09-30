/*
  Site implementation generated with OpenAI ChatGPT based on
  requirements, review, and approval by the project owner.
*/

"use strict";

const NORMAL_MAX_ID = 16776415;
const CAPMAX_MSI_ALL_CALL_MIN = 16777056;
const CAPMAX_MSI_ALL_CALL_MAX = 16777183;
const CAPMAX_SITE_ALL_CALL = 16777213;
const CAPMAX_MULTI_SITE_ALL_CALL = 16777214;
const CAPMAX_SYSTEM_WIDE_ALL_CALL = 16777215;

const DEFAULTS = {
  radio: {
    label: "Radio ID",
    caiLabel: "CAI",
    cai: 12,
    rangeNote: "General MOTOTRBO: 1–16,776,415. Capacity Plus: 1–65,535.",
    aboutLimit: "Radio IDs use the range 1–16,776,415 on general MOTOTRBO systems. Capacity Plus Radio IDs are limited to 1–65,535.",
    tooltip: "CAI is the first octet of the MOTOTRBO network IP address. The Motorola default for individual Radio IDs is 12. Systems may use a different configured value."
  },
  talkgroup: {
    label: "Talkgroup ID",
    caiLabel: "Group CAI",
    cai: 225,
    rangeNote: "General MOTOTRBO: 1–16,776,415.\nCapacity Plus: 1–254; 255 is All Call.\nCapacity Max MSI Multi-Site All Call: 16,777,056–16,777,183.\nCapacity Max Site All Call: 16,777,213.\nCapacity Max Multi-Site All Call: 16,777,214.\nCapacity Max System-Wide All Call: 16,777,215.",
    aboutLimit: "Talkgroup IDs use the range 1–16,776,415 on general MOTOTRBO systems. Capacity Plus Talkgroup IDs use 1–254; Group ID 255 is reserved for All Call. Capacity Max additionally reserves 16,777,056–16,777,183 for MSI Multi-Site All Call, 16,777,213 for Site All Call, 16,777,214 for Multi-Site All Call, and 16,777,215 for System-Wide All Call.",
    tooltip: "Group CAI is the first octet of the MOTOTRBO group network IP address. The Motorola default for Talkgroup IDs is 225. Systems may use a different configured value."
  }
};

let selectedType = "radio";
let selectedDirection = "id-to-ip";

const form = document.getElementById("converter-form");
const typeButtons = document.querySelectorAll("[data-type]");
const directionButtons = document.querySelectorAll("[data-direction]");
const idInputPanel = document.getElementById("id-input-panel");
const ipInputPanel = document.getElementById("ip-input-panel");
const idInput = document.getElementById("id-input");
const caiInput = document.getElementById("cai-input");
const ipInput = document.getElementById("ip-input");
const idInputLabel = document.getElementById("id-input-label");
const caiLabel = document.getElementById("cai-label");
const caiTooltip = document.getElementById("cai-tooltip");
const idRangeNote = document.getElementById("id-range-note");
const limitsCopy = document.getElementById("limits-copy");
const idError = document.getElementById("id-error");
const caiError = document.getElementById("cai-error");
const ipError = document.getElementById("ip-error");
const capacityWarning = document.getElementById("capacity-warning");
const resultCard = document.getElementById("result-card");
const resultHeading = document.getElementById("result-heading");
const resultValue = document.getElementById("result-value");
const resultDetails = document.getElementById("result-details");
const derivedIdLabel = document.getElementById("derived-id-label");
const derivedIdValue = document.getElementById("derived-id-value");
const derivedCaiLabel = document.getElementById("derived-cai-label");
const derivedCaiValue = document.getElementById("derived-cai-value");
const copyButton = document.getElementById("copy-button");

function digitsOnly(value) {
  return value.replace(/[^0-9]/g, "");
}

function ipCharactersOnly(value) {
  return value.replace(/[^0-9.,]/g, "");
}

function setRadioGroup(buttons, selectedButton) {
  buttons.forEach(function (button) {
    const active = button === selectedButton;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-checked", active ? "true" : "false");
  });
}

function clearMessages() {
  [idError, caiError, ipError, capacityWarning].forEach(function (element) {
    element.hidden = true;
    element.textContent = "";
  });

  idInput.removeAttribute("aria-invalid");
  caiInput.removeAttribute("aria-invalid");
  ipInput.removeAttribute("aria-invalid");
}

function hideResult() {
  resultCard.hidden = true;
  resultValue.textContent = "";
  resultDetails.hidden = true;
  derivedIdValue.textContent = "";
  derivedCaiValue.textContent = "";
  copyButton.textContent = "Copy";
}

function showError(element, input, message) {
  element.textContent = message;
  element.hidden = false;
  input.setAttribute("aria-invalid", "true");
}

function updateLabelsAndDefaults(resetCai) {
  const config = DEFAULTS[selectedType];

  idInputLabel.textContent = config.label;
  idInput.placeholder = "Enter " + config.label;
  caiLabel.textContent = config.caiLabel;
  caiTooltip.textContent = config.tooltip;
  idRangeNote.textContent = config.rangeNote;
  limitsCopy.textContent = config.aboutLimit;

  if (resetCai) {
    caiInput.value = String(config.cai);
  }
}

function updateDirectionUI() {
  const idToIp = selectedDirection === "id-to-ip";
  idInputPanel.hidden = !idToIp;
  ipInputPanel.hidden = idToIp;
  clearMessages();
  hideResult();

  if (idToIp) {
    idInput.focus();
  } else {
    ipInput.focus();
  }
}

function isValidTalkgroupId(value) {
  return (
    (value >= 1 && value <= NORMAL_MAX_ID) ||
    (value >= CAPMAX_MSI_ALL_CALL_MIN && value <= CAPMAX_MSI_ALL_CALL_MAX) ||
    value === CAPMAX_SITE_ALL_CALL ||
    value === CAPMAX_MULTI_SITE_ALL_CALL ||
    value === CAPMAX_SYSTEM_WIDE_ALL_CALL
  );
}

function parsePositiveId(rawValue) {
  if (rawValue === "") {
    return { error: "Enter an ID to convert." };
  }

  const value = Number(rawValue);

  if (!Number.isSafeInteger(value) || value < 1) {
    return { error: "Enter a valid positive integer ID." };
  }

  if (selectedType === "radio" && value > NORMAL_MAX_ID) {
    return { error: "Radio ID must be between 1 and 16,776,415." };
  }

  if (selectedType === "talkgroup" && !isValidTalkgroupId(value)) {
    return { error: "Talkgroup ID is outside the valid general range and documented Capacity Max special All Call ranges." };
  }

  return { value: value };
}

function parseCai(rawValue) {
  if (rawValue === "") {
    return { error: "Enter a CAI value." };
  }

  const value = Number(rawValue);

  if (!Number.isInteger(value) || value < 0 || value > 255) {
    return { error: "CAI must be between 0 and 255." };
  }

  return { value: value };
}

function idToIp(id, cai) {
  const octet2 = (id >> 16) & 255;
  const octet3 = (id >> 8) & 255;
  const octet4 = id & 255;

  return [cai, octet2, octet3, octet4].join(".");
}

function parseIp(rawValue) {
  const normalized = rawValue.trim().replace(/,/g, ".");
  const parts = normalized.split(".");

  if (parts.length !== 4 || parts.some(function (part) { return part === ""; })) {
    return { error: "Enter a complete IPv4 address using four octets." };
  }

  if (parts.some(function (part) { return !/^\d{1,3}$/.test(part); })) {
    return { error: "Each IP octet must contain only 1–3 digits." };
  }

  const octets = parts.map(Number);

  if (octets.some(function (octet) { return octet < 0 || octet > 255; })) {
    return { error: "Each IP octet must be between 0 and 255." };
  }

  return {
    normalized: octets.join("."),
    octets: octets
  };
}

function ipToId(octets) {
  return (octets[1] * 65536) + (octets[2] * 256) + octets[3];
}

function showIdToIpResult(id, cai) {
  const ip = idToIp(id, cai);

  resultHeading.textContent = "IP address";
  resultValue.textContent = ip;
  resultDetails.hidden = true;
  resultCard.hidden = false;
}

function showIpToIdResult(parsedIp) {
  const id = ipToId(parsedIp.octets);
  const cai = parsedIp.octets[0];
  const config = DEFAULTS[selectedType];

  if (id < 1) {
    showError(ipError, ipInput, "This IP address maps to ID 0, which is not a valid Radio or Talkgroup ID.");
    return;
  }

  if (selectedType === "radio" && id > NORMAL_MAX_ID) {
    showError(ipError, ipInput, "This IP address maps to a reserved Radio ID range above 16,776,415.");
    return;
  }

  if (selectedType === "talkgroup" && !isValidTalkgroupId(id)) {
    showError(ipError, ipInput, "This IP address maps to a reserved or unsupported Talkgroup ID.");
    return;
  }

  ipInput.value = parsedIp.normalized;
  resultHeading.textContent = config.label;
  resultValue.textContent = id.toLocaleString("en-US");
  derivedIdLabel.textContent = config.label;
  derivedIdValue.textContent = id.toLocaleString("en-US");
  derivedCaiLabel.textContent = config.caiLabel;
  derivedCaiValue.textContent = String(cai);
  resultDetails.hidden = false;
  resultCard.hidden = false;
  if (cai !== config.cai) {
    capacityWarning.textContent = config.caiLabel + " " + cai + " differs from the Motorola default of " + config.cai + ".";
    capacityWarning.hidden = false;
  }
}

function convert() {
  clearMessages();
  hideResult();

  if (selectedDirection === "id-to-ip") {
    const parsedId = parsePositiveId(idInput.value);
    const parsedCai = parseCai(caiInput.value);

    if (parsedId.error) {
      showError(idError, idInput, parsedId.error);
    }

    if (parsedCai.error) {
      showError(caiError, caiInput, parsedCai.error);
    }

    if (parsedId.error || parsedCai.error) {
      return;
    }

    showIdToIpResult(parsedId.value, parsedCai.value);
    return;
  }

  if (ipInput.value.trim() === "") {
    showError(ipError, ipInput, "Enter an IP address to convert.");
    return;
  }

  const parsedIp = parseIp(ipInput.value);

  if (parsedIp.error) {
    showError(ipError, ipInput, parsedIp.error);
    return;
  }

  showIpToIdResult(parsedIp);
}

typeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedType = button.dataset.type;
    setRadioGroup(typeButtons, button);
    updateLabelsAndDefaults(true);
    clearMessages();
    hideResult();
  });
});

directionButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedDirection = button.dataset.direction;
    setRadioGroup(directionButtons, button);
    updateDirectionUI();
  });
});

idInput.addEventListener("input", function () {
  const sanitized = digitsOnly(idInput.value);
  if (sanitized !== idInput.value) {
    idInput.value = sanitized;
  }
  clearMessages();
  hideResult();
});

caiInput.addEventListener("input", function () {
  const sanitized = digitsOnly(caiInput.value);
  if (sanitized !== caiInput.value) {
    caiInput.value = sanitized;
  }
  clearMessages();
  hideResult();
});

ipInput.addEventListener("input", function () {
  const sanitized = ipCharactersOnly(ipInput.value);
  if (sanitized !== ipInput.value) {
    ipInput.value = sanitized;
  }
  clearMessages();
  hideResult();
});

[idInput, caiInput, ipInput].forEach(function (input) {
  input.addEventListener("blur", function () {
    if (input.offsetParent !== null && input.value.trim() !== "") {
      convert();
    }
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  convert();
});

copyButton.addEventListener("click", async function () {
  const text = resultValue.textContent;

  if (!text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text.replace(/,/g, ""));
    copyButton.textContent = "Copied";
    window.setTimeout(function () {
      copyButton.textContent = "Copy";
    }, 1400);
  } catch (error) {
    copyButton.textContent = "Copy failed";
    window.setTimeout(function () {
      copyButton.textContent = "Copy";
    }, 1600);
  }
});

updateLabelsAndDefaults(true);
