pipeline {
    agent {
        docker {
            image 'docker/compose:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v $WORKSPACE:$WORKSPACE -w $WORKSPACE'
        }
    }
    stages {
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
            // Use 'script' to run imperative code
            script {
                // Adding node block because sh needs a workspace (hudson.FilePath) to run in, which is only available inside a node {} block
                node {
                    sh 'docker-compose down'
                }
            }
        }
    }
}
