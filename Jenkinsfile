pipeline {
    agent any
    tools {nodejs "NodeJS LTS"}
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/test.sh'
            }
        }
        stage('Deliver') { 
            steps {
                sh './jenkins/deliver.sh' 
                //input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh './jenkins/kill.sh' 
            }
        }
    }
}