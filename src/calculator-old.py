# from pro_labore import get_pro_labore
# from inss import get_inss
# from irff import get_irrf
# from das import get_das

# print("===============================")
# print("     Net Profit Calculator     ")
# print("===============================")

# revenue = float(input("Revenue: R$ "))

# pro_labore = get_pro_labore(revenue)

# inss = get_inss(pro_labore)

# pro_labore_minus_inss = pro_labore - inss
# irff = get_irrf(pro_labore_minus_inss)

# das = get_das(revenue)

# discounts = inss + irff + das
# net_profit = revenue - discounts

# print("Pro-labore: R$ {:.2f}".format(pro_labore))
# print("INSS: R$ {:.2f}".format(inss))
# print("IRFF: R$ {:.2f}".format(irff))
# print("DAS: R$ {:.2f}".format(das))
# print("Discounts: R$ {:.2f}".format(discounts))
# print("Net Profit: R$ {:.2f}".format(net_profit))
# print("===============================")