from datetime import datetime

# Preguntem el nom de l'usuari
usuari = input('Introdueix el teu nom: ')

activitats = [] # Fem activitats una array

while True:
    # Preguntem activitat a l'usuari
    activitat = input(f'Introdueix una activitat {usuari} (0 per sortir): ')
    if activitat == "0": 
        break
    if activitat.isdigit() or activitat.strip() == "":
        # Validem amb isdigit() i amb strip() per que l'usuari no posi espais com a nom
        print("Error: L'activitat no pot ser un nombre o una cadena buida.")
        continue

    # Preguntem data de l'activitat a l'usuari
    while True:
        data_activitat = input('Defineix una data (dd/mm/yyyy, 0 per sortir): ')
        if data_activitat == "0":
            break
        # Fem try/except per validar que la data sigui en format europeu
        try:
            data_europea = datetime.strptime(data_activitat, "%d/%m/%Y").date()
            activitats.append((activitat, data_europea.strftime("%d/%m/%Y")))
            break
        except ValueError:
            print("Error: La data ha de ser en format DD/MM/YYYY.")

    if data_activitat == "0":
        break

# En sortir del programa mostrarà totes les activitats i les seves dates.
print("\nActivitats programades:")
for act, dia in activitats: # Bucle per imprimir totes les activitats amb el seu dia.
    print(f"- {act} el dia {dia}")

# I dirà adeu a l'usuari amb el seu nom!
print(f"Adeu, {usuari}!")


# STRP = String  --> datetime
# STRF = datetime format --> Another datetime format (ex: American to European datetime)