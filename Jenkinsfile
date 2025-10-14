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
                sh 'sudo ./jenkins/test.sh'
            }
        }
        stage('Deliver') { 
            steps {
                sh 'sudo ./jenkins/deliver.sh' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh 'sudo ./jenkins/kill.sh' 
            }
        }
    }
}