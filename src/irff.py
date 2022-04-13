def get_irrf(pro_labore_minus_inss):
  irff_table = [
    {
      "from": 0,
      "to": 1903.98,
      "aliquot": 0,
      "deduction": 0
    },
    {
      "from": 1903.99,
      "to": 2826.65,
      "aliquot": 7.5,
      "deduction": 142.80
    },
    {
      "from": 2826.66,
      "to": 3751.05,
      "aliquot": 15,
      "deduction": 354.80
    },
    {
      "from": 3751.06,
      "to": 4664.68,
      "aliquot": 22.5,
      "deduction": 636.13
    },
    {
      "from": 4664.69,
      "to": None,
      "aliquot": 27.5,
      "deduction": 869.36
    }
  ]
  corresponding_range = None

  for range in irff_table:
    if pro_labore_minus_inss > range["from"] and (range["to"] is None or pro_labore_minus_inss <= range["to"]):
      corresponding_range = range
      break

  irff = (corresponding_range["aliquot"] / 100 * pro_labore_minus_inss) - corresponding_range["deduction"]

  return irff