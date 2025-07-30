pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'docker-compose up --abort-on-container-exit --exit-code-from test-runner'
            }
        }
    }
    post {
        always {
            sh 'docker-compose down'
        }
    }
}
