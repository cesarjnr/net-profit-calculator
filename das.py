def get_das(revenue):
  annex_three_table = [
    {
      "from": 0,
      "to": 15000,
      "aliquot": 6,
      "deduction": 0
    },
    {
      "from": 15000.01,
      "to": 30000,
      "aliquot": 11.2,
      "deduction": 780
    },
    {
      "from": 30000.01,
      "to": 60000,
      "aliquot": 13.5,
      "deduction": 1470
    },
    {
      "from": 60000.01,
      "to": 150000,
      "aliquot": 16,
      "deduction": 2970
    },
    {
      "from": 150000.01,
      "to": 300000,
      "aliquot": 21,
      "deduction": 10470
    },
    {
      "from": 300000.01,
      "to": 400000,
      "aliquot": 21,
      "deduction": 54000
    }
  ]
  corresponding_range = None

  for range in annex_three_table:
    if (revenue > range["from"] and (range["to"] is None or revenue <= range["to"])):
      corresponding_range = range
      break

  das = (corresponding_range["aliquot"] / 100 * revenue) - corresponding_range["deduction"]

  return das