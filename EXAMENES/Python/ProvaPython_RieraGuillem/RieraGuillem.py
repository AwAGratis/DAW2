import random

# Fem una llista per emmagatzemar les combinacions fallides
llista_fallos = []
alias_usuari = input("Introdueix el teu alias o escriu 'Sortir' per tancar el programa: ")

while True:

    if alias_usuari == "0":
        break
    
    # Faig servir la funció randint() que proporciona un número aleatori en el rang que li dones.
    combinacio_correcta = random.randint(1, 99)
    
    # !!!!!!! DESCOMENTAR PER SAPIGUER LA COMBINACIO CORRECTA !!!!!!!
    print(combinacio_correcta)

    # Utilitzo strip() per no deixar a l'usuari posar com a nom la tecla 'espai'
    while alias_usuari.strip() == "":
        print("El teu alias no es vàlid, torna a intentar-ho")
        alias_usuari = input("Introdueix el teu alias o escriu 'Sortir' per tancar el programa: ")
        # Validació per tancar el programa
        if alias_usuari == "Sortir":
            break
    
    if alias_usuari == "Sortir":
        break

    print("Nom correcte!")
    print(f"Hola {alias_usuari}! Començant programa...")

    numero_usuari = input(f"{alias_usuari} quina és la combinació correcta? (Escriu 'Sortir' per tancar el programa): ")
    if numero_usuari == "Sortir":
        break
    numero_usuari = int(numero_usuari)

    # Iteració dels intents per adivinar
    i = 5
    while i > 0 and numero_usuari != combinacio_correcta :
        
        # Guardem el número actual per fer després la comparació a la llógica d'apropar-se/allunyar-se
        ultim_num_usuari = numero_usuari
        
        # Enregistrem els valors introduits als intents fallats
        llista_fallos.append(numero_usuari)
        numero_usuari = input(f"Aquesta no es la combinació correcta! Et queden {i - 1} intents! (Escriu 'Sortir' per tancar el programa): ")
        
        if numero_usuari == "Sortir":
            break
        numero_usuari = int(numero_usuari)

        if numero_usuari == combinacio_correcta :
            break
        
        # Llògica d'apropar-se i allunyar-se
        if combinacio_correcta > numero_usuari :
            if combinacio_correcta - numero_usuari < combinacio_correcta - ultim_num_usuari:
                print("T'estàs apropant!")
            if combinacio_correcta - numero_usuari > combinacio_correcta - ultim_num_usuari:
                print("T'estàs allunyant!")

        if combinacio_correcta < numero_usuari :
            if combinacio_correcta - numero_usuari > combinacio_correcta - ultim_num_usuari:
                print("T'estàs apropant!")
            if combinacio_correcta - numero_usuari < combinacio_correcta - ultim_num_usuari:
                print("T'estàs allunyant!")

        i-=1

    # Alerta i llista si falles tots els intents
    if i <= 1 :
        print("!!! ALERTA INTRUSOS !!!")
        print("Les teves combinacions:")
        for fallo in llista_fallos :
            print(f"- Fallo: {fallo}")

    # Diàleg d'encert
    if numero_usuari == combinacio_correcta :
        print(f"Has encertat! La combinació era {combinacio_correcta}. Adeu {alias_usuari}!")            
        break

    break