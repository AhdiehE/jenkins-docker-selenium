pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clone repo before using a docker agent
                git url: 'https://github.com/AhdiehE/jenkins-docker-selenium.git', branch: 'main'
            }
        }
        stage('Configure Git') {
            steps {
                sh '''
                    git config  user.name "AhdiehE"
                    git config  user.email "emadi.ahdieh@gmail.com"
                '''
            }
        }
        stage('Test with Docker') {
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
        }
    }

    post {
        always {
            script {
                // Safely run docker-compose down from the host
                sh '''
                    docker-compose down || true
                '''
            }
        }
    }
}
