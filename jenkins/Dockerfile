FROM jenkins/jenkins:lts

# Instalar Docker dentro do contêiner do Jenkins para usar Docker dentro de pipelines
USER root
RUN apt-get update && apt-get install -y docker.io

# Configurar permissões e usuários
RUN usermod -aG docker jenkins
USER jenkins
