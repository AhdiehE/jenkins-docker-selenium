pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.jenkins'
            dir 'docker'
            additionalBuildArgs '--build-arg INSTALL_CHROME=true'
        }
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'google-chrome --version'
                sh 'npm ci'
            }
        }
        stage ('Use DEVICE_JSON') {
            steps {
                configFileProvider([configFile(fileId: '61506ee5-f1c2-415b-916d-2c2d0657048c', targetLocation: 'utility/device.json')]) {
                    sh 'cat utility/device.json'
                }
            }
        }
        stage ('Test') {
            steps {
                lock('build-lock') {
                    echo 'Testing...'
                    sh 'npm test'
                }
            }
        }
    }
    // post {
        // success { gerritReview labels: ['Code-Review': 1] }
        // unstable { gerritReview labels: ['Code-Review': 0], message: 'Build is unstable' }
        // failure { gerritReview labels: ['Code-Review': -1], message: 'Sanity check failed' }
    // }
}