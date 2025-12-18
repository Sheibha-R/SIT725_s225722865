function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateCertificate(payload) {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "body must be an object" };
  }

  const { title, platform, hours, completed } = payload;

  if (!isNonEmptyString(title)) return { ok: false, error: "title is required" };
  if (!isNonEmptyString(platform)) return { ok: false, error: "platform is required" };

  const h = Number(hours);
  if (!Number.isFinite(h) || h <= 0) return { ok: false, error: "hours must be a number > 0" };

  if (typeof completed !== "boolean") return { ok: false, error: "completed must be boolean" };

  return { ok: true, data: { title: title.trim(), platform: platform.trim(), hours: h, completed } };
}

module.exports = { validateCertificate };
