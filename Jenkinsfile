pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:$WORKSPACE -w $WORKSPACE'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout the Git repo configured in your Pipeline project
                checkout scm
            }
        }
        stage('Configure Git') {
            steps {
                dir("${env.WORKSPACE}") {
                    sh '''
                        git config user.name "AhdiehE"
                        git config user.email "emadi.ahdieh@gmail.com"
                    '''
                }
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
            script {
                // Adding node block because sh needs a workspace (hudson.FilePath) to run in, which is only available inside a node {} block
                node {
                    sh 'docker-compose down'
                }
            }
        }
    }
}
