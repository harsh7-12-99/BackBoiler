const asycHander = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res
      .status(res.status(500))
      .json({ success: false, message: error.message });
  }
};

export { asycHander };
