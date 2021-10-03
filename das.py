def get_das(revenue, is_foreign_revenue):
  aliquot = None

  if (is_foreign_revenue == "Y"):
    aliquot = 3
  else:
    aliquot = 6

  return aliquot / 100 * revenue