# Используйте образ Nginx для развертывания приложения
FROM nginx:stable

# Копируйте статические файлы в каталог, который Nginx будет обслуживать
COPY src/ /usr/share/nginx/html

# Копируйте конфигурацию Nginx (если требуется)
# COPY nginx.conf /etc/nginx/nginx.conf

# Откройте порт 80
EXPOSE 80

# Запустите Nginx
CMD ["nginx", "-g", "daemon off;"]
