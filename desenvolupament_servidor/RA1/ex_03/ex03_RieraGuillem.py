import random
import re

# funcio auxiliar: comprova si la cadena representara un numero (admet un punt decimal)
def es_numero_valid(valor):
    # retorna True si valor es numeric (un punt decimal com a separador)
    return valor.replace('.', '', 1).isdigit()

# funcio per validar DNI: comprova format i lletra seguint l'algoritme espanyol
def validar_dni(dni: str) -> bool:
    # validem nomès si es una cadena
    if not isinstance(dni, str):
        return False
    # expressio regular: 8 digits seguits d'una lletra, permet espais o guions a l'entrada
    m = re.match(r'^\s*([0-9]{8})\s*([- ]?\s*[A-Za-z])\s*$', dni)
    if not m:
        return False
    # extreiem els numeros i la lletra, normalitzem la lletra a majuscules
    numeros = int(m.group(1))
    lletra = re.sub(r'[\s-]', '', m.group(2)).upper()
    # taula de comprovacio de la lletra del DNI
    taula = "TRWAGMYFPDXBNJZSQVHLCKE"
    return taula[numeros % 23] == lletra

class CompteCorrent:
    # classe que representa un compte corrent senzill
    def __init__(self):
        # creem un id aleatori de 10 digits
        self.__id = ''.join([str(random.randint(0, 9)) for _ in range(10)])
        # demanem el DNI i no avancem fins que sigui correcte
        dni_input = input("Introdueix el DNI (format 12345678A): ").strip()
        while not validar_dni(dni_input):
            print("Format de DNI invàlid. Ha de ser 8 dígits seguits d'una lletra i la lletra ha de ser correcta.")
            dni_input = input("Introdueix el DNI (format 12345678A): ").strip()
        # normalitzem el DNI (eliminem espais/guions) i posem majuscula
        self.__dni = re.sub(r'[\s-]', '', dni_input).upper()
        # demanem nom i cognoms (sense validacions complexes, agil)
        self.__nom = input("Introdueix el nom: ")
        self.__cognoms = input("Introdueix els cognoms: ")
        # demanem el saldo inicial i comprovem que sigui un numero valid
        saldo_input = input("Introdueix el saldo inicial: ")
        while not es_numero_valid(saldo_input):
            print("Si us plau, introdueix un numero valid.")
            saldo_input = input("Introdueix el saldo inicial: ")
        # convertim a float i guardem
        self.__saldo = float(saldo_input)

    # metode per ingressar diners al compte
    def ingressar(self):
        quantitat_input = input("Introdueix la quantitat a ingressar: ")
        if not es_numero_valid(quantitat_input):
            print("Si us plau, introdueix un numero valid.")
            return
        quantitat = float(quantitat_input)
        if quantitat <= 0:
            print("La quantitat ha de ser positiva.")
            return
        # actualitzem saldo i mostrem missatge
        self.__saldo += quantitat
        print(f"S'han ingressat {quantitat}€. Saldo actual: {self.__saldo}€")

    # metode per retirar diners del compte
    def retirar(self):
        quantitat_input = input("Introdueix la quantitat a retirar: ")
        if not es_numero_valid(quantitat_input):
            print("Si us plau, introdueix un numero valid.")
            return
        quantitat = float(quantitat_input)
        if quantitat <= 0:
            print("La quantitat ha de ser positiva.")
            return
        if self.__saldo < quantitat:
            print("Saldo insuficient.")
            return
        # actualitzem saldo i mostrem missatge
        self.__saldo -= quantitat
        print(f"S'han retirat {quantitat}€. Saldo actual: {self.__saldo}€")

    # metode per veure el saldo actual
    def veure_saldo(self):
        print(f"Saldo: {self.__saldo}€")

    # metode per veure totes les dades del compte (per debug o comprovacio)
    def veure_dades(self):
        print(f"ID: {self.__id}")
        print(f"DNI: {self.__dni}")
        print(f"Nom: {self.__nom}")
        print(f"Cognoms: {self.__cognoms}")
        print(f"Saldo: {self.__saldo}€")

# funcio principal que mostra un menu simple i crida metodes de la classe
def main():
    compte = CompteCorrent()

    while True:
        # menu interactiu basat en text
        print("\n=== MENÚ ===")
        print("1. Ingressar diners")
        print("2. Retirar diners")
        print("3. Veure saldo")
        print("4. Veure dades del compte")
        print("5. Sortir")

        opcio = input("\nSelecciona una opcio (1-5): ")

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
        # si l'usuari entra una opcio no valida, ho demanem de nou
        print("Opcio no valida. Si us plau, selecciona una opcio entre 1 i 5.")

if __name__ == "__main__":
    main()