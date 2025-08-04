pipeline {
    agent {
        docker {
            label '' // Remove default label to avoid restrictions
            args '-v /var/run/docker.sock:/var/run/docker.sock'
            reuseNode true
        }
    }

    environment {
        GIT_COMMITTER_NAME = "AhdiehE"
        GIT_COMMITTER_EMAIL = "emadi.ahdieh@gmail.com"
    }

    stages {
        stage('Build Jenkins Agent Image') {
            steps {
                script {
                    docker.build('jenkins-agent', '-f Dockerfile.jenkins-agent .')
                }
            }
        }

        stage('Test Docker Access') {
            agent {
                docker {
                    image 'jenkins-agent'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh 'docker version && docker ps'
            }
        }

        stage('Checkout') {
            steps {
                git credentialsId: 'github-https',
                    url: 'https://github.com/AhdiehE/jenkins-docker-selenium.git',
                    branch: 'main'
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

        stage('Verify Docker Socket & Node') {
            steps {
                sh '''
                    echo "Checking Docker socket..."
                    ls -l /var/run/docker.sock
                    docker ps
                    node -v
                    npm -v
                '''
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline completed. Cleaning up...'
        }
    }
}
