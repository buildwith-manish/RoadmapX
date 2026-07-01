const Step    = require('../models/Step');
const Roadmap = require('../models/Roadmap');

/* ════════════════════════════════════════════════════════════
   SECURITY: Ownership helper
   Every step belongs to a roadmap, and every roadmap belongs to a user.
   Before any step read/write we must verify that the parent roadmap
   is owned by req.session.user — otherwise any logged-in user could
   add / read / complete steps on ANY other user's roadmap (IDOR).
══════════════════════════════════════════════════════════════ */
async function _loadOwnedRoadmap(roadmapId, sessionUser) {
  if (!roadmapId) return null;
  const roadmap = await Roadmap.findById(roadmapId).lean();
  if (!roadmap) return null;
  if (roadmap.userId !== sessionUser) return { forbidden: true };
  return roadmap;
}

// ─────────────────────────────────────────────────────────────
// POST /api/steps
// Add a new step to an existing roadmap.
// Body: { roadmapId, title, description? }
// ─────────────────────────────────────────────────────────────
const addStep = async (req, res) => {
  try {
    const { roadmapId, title, description } = req.body;

    if (!roadmapId || !title) {
      return res.status(400).json({
        success: false,
        message: 'roadmapId and title are required.',
      });
    }

    // Verify the parent roadmap actually exists AND belongs to this user
    const roadmap = await _loadOwnedRoadmap(roadmapId, req.session.user);
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: 'Roadmap not found.',
      });
    }
    if (roadmap.forbidden) {
      return res.status(403).json({ success: false, message: 'Forbidden.' });
    }

    const step = await Step.create({ roadmapId, title, description });

    return res.status(201).json({
      success: true,
      data: step,
    });
  } catch (err) {
    console.error('[stepController] addStep -', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Could not add step.',
    });
  }
};

// ─────────────────────────────────────────────────────────────
// GET /api/steps/:roadmapId
// Return all steps for a given roadmap, in insertion order.
// ─────────────────────────────────────────────────────────────
const getSteps = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    // Verify parent roadmap exists AND belongs to this user
    const roadmap = await _loadOwnedRoadmap(roadmapId, req.session.user);
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: 'Roadmap not found.',
      });
    }
    if (roadmap.forbidden) {
      return res.status(403).json({ success: false, message: 'Forbidden.' });
    }

    const steps = await Step.find({ roadmapId }).sort({ _id: 1 });

    return res.status(200).json({
      success: true,
      data: steps,
    });
  } catch (err) {
    console.error('[stepController] getSteps -', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch steps.',
    });
  }
};

// ─────────────────────────────────────────────────────────────
// PUT /api/steps/:id
// Mark a step as complete.
// Sets completed = true and completedAt = now.
// ─────────────────────────────────────────────────────────────
const completeStep = async (req, res) => {
  try {
    const step = await Step.findById(req.params.id);
    if (!step) {
      return res.status(404).json({
        success: false,
        message: 'Step not found.',
      });
    }

    // SECURITY: verify the parent roadmap belongs to this user before
    // allowing the step to be marked complete (was previously a pure
    // findByIdAndUpdate with no ownership check — IDOR).
    const roadmap = await Roadmap.findById(step.roadmapId).lean();
    if (!roadmap || roadmap.userId !== req.session.user) {
      return res.status(403).json({ success: false, message: 'Forbidden.' });
    }

    step.completed   = true;
    step.completedAt = new Date();
    await step.save();

    return res.status(200).json({
      success: true,
      data: step,
    });
  } catch (err) {
    console.error('[stepController] completeStep -', err.message);
    return res.status(500).json({
      success: false,
      message: 'Server error. Could not update step.',
    });
  }
};

module.exports = { addStep, getSteps, completeStep };
