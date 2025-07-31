pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:$WORKSPACE -w $WORKSPACE'
        }
    }
    stages {
        stage('Install Tools') {
            steps {
                sh '''
                    apk add --no-cache git docker-cli docker-compose
                '''
            }
        }
        stage('Checkout') {
            steps {
                git url: 'https://github.com/AhdiehE/jenkins-docker-selenium.git', branch: 'main'
            }
        }
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
            dir("${env.WORKSPACE}") {
                sh 'docker-compose down'
            }
        }
    }
}
