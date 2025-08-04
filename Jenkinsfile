pipeline {
    agent {
        docker {
          image 'jenkins-docker-test'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
      GIT_COMMITTER_NAME = "AhdiehE"
      GIT_COMMITTER_EMAIL = "emadi.ahdieh@gmail.com"
    }

    stages {
      stage('Test Docker') {
        steps {
          sh 'docker ps'  // Should work if docker CLI and socket are present
        }
      }
      stage('Checkout') {
        steps {
          git credentialsId: 'github-https', // Your Jenkins HTTPS credential ID
            url: 'https://github.com/AhdiehE/jenkins-docker-selenium.git',
            branch: 'main'
          }
        }
      stage('Install Dependencies') {
        steps {
          sh 'npm install'
        }
      }
      stage('Docker Info') {
        steps {
          sh 'docker --version && docker ps'
        }
      }
      stage('Build Docker Images') {
        steps {
          sh 'docker-compose build'
        }
      }
      stage('Run Tests') {
        steps {
          sh 'docker-compose up --abort-on-container-exit --exit-code-from test-runner'
        }
      }
      stage('Check Docker Socket') {
        steps {
          sh '''
            echo "Checking Docker socket..."
            ls -l /var/run/docker.sock
            docker version
          '''
        }
      }
      stage('Debug Node/NPM') {
        steps {
          sh 'node -v && npm -v'
        }
      }   
    }
    post {
      always {
        echo '✅ Pipeline completed. Cleaning up...'
      }
    }
}
