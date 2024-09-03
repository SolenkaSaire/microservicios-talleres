# Usar una imagen base de Node.js con una versión más reciente
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "src/server.js"]
