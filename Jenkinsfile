pipeline {
    agent {
        docker {
            image 'node-docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:$WORKSPACE -w $WORKSPACE'
        }
    }
    stages {
        stage('Checkout') {
        steps {
            git credentialsId: 'github-https', // Your Jenkins HTTPS credential ID
                url: 'https://github.com/AhdiehE/jenkins-docker-selenium.git',
                branch: 'main'
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
        stage('Test Docker') {
            steps {
                sh 'docker ps'
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
        stage('Debug') {
            steps {
                sh 'node -v && npm -v'
            }
        }   
    }
    post {
        always {
            sh 'docker-compose down'
        }
    }
}
