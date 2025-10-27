from datetime import date, datetime

# Què ens retorni la data i hora actuals
data_hora_avui = datetime.now()  # Obtenir data i hora
print(data_hora_avui)

# D'aquesta data i hora actuals fes un type. Per saber quin tipus de variable retorna dita funció.
print(type(data_hora_avui))
# Retorna el tipus datetime.datetime

# La creació d'una data a través dels paràmetres del constructor datetime i date.
data_creada = date(2023, 10, 5)  # Exemple de data
print(data_creada)

data_hora_creada = datetime(2023, 10, 5, 15, 30, 45)  # Exemple de data i hora
print(data_hora_creada)

# Amb la funció date que ens retorni la data d'avui.
data_avui = date.today()
print(data_avui)

# Aquesta, data d'avui, transformar-la en una data europea amb strftime().
data_europea = data_avui.strftime('%d/%m/%Y')
print(data_europea)