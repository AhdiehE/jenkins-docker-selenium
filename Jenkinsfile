pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git credentialsId: 'github-https', url: 'https://github.com/AhdiehE/jenkins-docker-selenium.git'
      }
    }

    stage('Build') {
      steps {
        echo "Repo cloned successfully!"
      }
    }
  }
}
