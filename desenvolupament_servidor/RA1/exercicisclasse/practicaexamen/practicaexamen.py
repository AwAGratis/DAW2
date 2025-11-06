import random
import string

for i in range (5) :
    numero_aleatorio = {random.randint(00000000, 99999999)}
    dni_aleatorio = f"{numero_aleatorio}{random.choices(string.ascii_uppercase, k=1)}"
    print(numero_aleatorio)