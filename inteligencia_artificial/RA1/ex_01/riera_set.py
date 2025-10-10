# Que son
# Els sets son estructures de dades que emmagatzemen
# elements unics, sense ordre i sense index.

# Que fan
# Permeten guardar valors sense duplicats i fer operacions 
# matematiques com unions, interseccions i diferencies.

# Per a que serveixen
# S’utilitzen per eliminar duplicats o treballar amb conjunts de dades
# on l’ordre no és important (com conjunts matematics).

# Diferencia amb les llistes:
# Els sets no mantenen l’ordre dels elements.
# No permeten elements duplicats.
# Son MUTABLES, pero els seus elements han de ser IMMUTABLES.
# No es pot accedir als elements per index.

# Creacio normal
set_1 = {1, 2, 3, 3, 4, 5}
print("Set 1 (sense duplicats):", set_1)

# Creacio amb la classe set()
set_2 = set(["a", "b", "c", "a"])
print("Set 2:", set_2)


# El metode add() afegeix un element nou
set_1.add(6)
print("Despres d’afegir 6:", set_1)

# El metode remove() elimina un element (error si no existeix)
set_1.remove(2)
print("Despres d’eliminar 2:", set_1)

# El metode union() unio de dos conjunts
set_union = set_1.union(set_2)
print("Unio de conjunts:", set_union)


# Convertir un set en llista
llista_des_de_set = list(set_1)
print("Set convertit a llista:", llista_des_de_set)

# Convertir una llista amb duplicats en set (per eliminar duplicats)
llista = [1, 2, 2, 3, 4, 4, 5]
set_des_de_llista = set(llista)
print("Llista convertida a set:", set_des_de_llista)

# Convertir set a tupla
tupla_des_de_set = tuple(set_2)
print("Set convertit a tupla:", tupla_des_de_set)


# Son els sets utils per mi?
# Si, son utils quan volem eliminar duplicats o fer operacions
# entre conjunts (per exemple, trobar elements comuns o diferents).
