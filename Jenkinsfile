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
        stage('Deploy') {
            steps {
                echo 'Build successful, now publishing artifacts...'
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'Ansible-Server', // Name configured in Jenkins global settings
                            transfers: [
                                sshTransfer(
                                    sourceFiles: '**', // Path to the artifact in your workspace
                                    remoteDirectory: '//opt//docker//MyWeatherAPP//published', // Target directory on the remote server
                                    removePrefix: '', // Optional: remove a prefix from source file paths
                                    execCommand: 'ansible-playbook /opt/docker/MyWeatherAPP/image_create.yml' // Optional: command to execute after transfer
                                )
                            ],
                            // Optional: execute commands before transfers
                            // execCommand: 'mkdir -p /path/on/remote/server'
                        )
                    ]
                )
            }
        }
    }
    post {
        success {
            echo 'Current build is stable. Triggering downstream project...'
            // Trigger another project named 'DownstreamProject'
            build job: 'my-weather-app-CD'
        }
    }
}