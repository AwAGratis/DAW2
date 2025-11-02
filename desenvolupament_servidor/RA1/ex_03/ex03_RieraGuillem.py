import random

def es_numero_valid(valor):
    return valor.replace('.', '', 1).isdigit()

class CompteCorrent:
    def __init__(self):
        self.__id = ''.join([str(random.randint(0, 9)) for _ in range(10)])
        self.__dni = input("Introdueix el DNI: ")
        self.__nom = input("Introdueix el nom: ")
        self.__cognoms = input("Introdueix els cognoms: ")
        saldo_input = input("Introdueix el saldo inicial: ")
        while not es_numero_valid(saldo_input):
            print("Si us plau, introdueix un número vàlid.")
            saldo_input = input("Introdueix el saldo inicial: ")
        self.__saldo = float(saldo_input)

    def ingressar(self):
        quantitat_input = input("Introdueix la quantitat a ingressar: ")
        if not es_numero_valid(quantitat_input):
            print("Si us plau, introdueix un número vàlid.")
            return
        quantitat = float(quantitat_input)
        if quantitat <= 0:
            print("La quantitat ha de ser positiva.")
            return
        self.__saldo += quantitat
        print(f"S'han ingressat {quantitat}€. Saldo actual: {self.__saldo}€")

    def retirar(self):
        quantitat_input = input("Introdueix la quantitat a retirar: ")
        if not es_numero_valid(quantitat_input):
            print("Si us plau, introdueix un número vàlid.")
            return
        quantitat = float(quantitat_input)
        if quantitat <= 0:
            print("La quantitat ha de ser positiva.")
            return
        if self.__saldo < quantitat:
            print("Saldo insuficient.")
            return
        self.__saldo -= quantitat
        print(f"S'han retirat {quantitat}€. Saldo actual: {self.__saldo}€")

    def veure_saldo(self):
        print(f"Saldo: {self.__saldo}€")

    def veure_dades(self):
        print(f"ID: {self.__id}")
        print(f"DNI: {self.__dni}")
        print(f"Nom: {self.__nom}")
        print(f"Cognoms: {self.__cognoms}")
        print(f"Saldo: {self.__saldo}€")

def main():
    compte = CompteCorrent()

    while True:
        print("\n=== MENÚ ===")
        print("1. Ingressar diners")
        print("2. Retirar diners")
        print("3. Veure saldo")
        print("4. Veure dades del compte")
        print("5. Sortir")

        opcio = input("\nSelecciona una opció (1-5): ")

        if opcio == "1":
            compte.ingressar()
            continue
        if opcio == "2":
            compte.retirar()
            continue
        if opcio == "3":
            compte.veure_saldo()
            continue
        if opcio == "4":
            compte.veure_dades()
            continue
        if opcio == "5":
            print("Gràcies per utilitzar el nostre servei.")
            break
        print("Opció no vàlida. Si us plau, selecciona una opció entre 1 i 5.")

if __name__ == "__main__":
    main()