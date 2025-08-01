pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:$WORKSPACE -w $WORKSPACE'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'git@github.com:AhdiehE/jenkins-docker-selenium.git',
                        credentialsId: 'github-ssh'
                    ]]
                ])
            }
        }
        stage('Configure Git') {
            steps {
                sh '''
                    git config --global user.name "AhdiehE"
                    git config --global user.email "emadi.ahdieh@gmail.com"
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
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
    }
    post {
        always {
            sh 'docker-compose down'
        }
    }
}
