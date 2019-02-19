def label = "jenkins-node-${UUID.randomUUID().toString()}"
podTemplate(label: label, containers: [
        containerTemplate(name: 'node', image: '086658912680.dkr.ecr.eu-west-1.amazonaws.com/cvs/nodejs-builder:latest', ttyEnabled: true, alwaysPullImage: true, command: 'cat'),]){
    node(label) {

        stage('checkout') {
            checkout scm
        }
        
        container('node'){    
            withFolderProperties{
                LBRANCH="${env.BRANCH}".toLowerCase()
            }    
            
            sh "cp -r /tmp/seed ."
            
            dir('seed'){
                
                stage ("npm deps") {
                    sh "npm install"
                }

                stage ("credentials") {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'jenkins-np-iam', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        sh "sls config credentials --provider aws --key ${AWS_ACCESS_KEY_ID} --secret ${AWS_SECRET_ACCESS_KEY}"
                    }
                }
                
                stage ("delete-table") {
    
                    sh "aws dynamodb delete-table --table-name cvs-${LBRANCH}-preparers --region=eu-west-1 || true"
                    sh "aws dynamodb wait table-not-exists --table-name cvs-${LBRANCH}-preparers --region=eu-west-1"

                }
                
                stage ("create-table") {
                    sh '''
                aws dynamodb create-table \
                --table-name cvs-local-preparers \
                --attribute-definitions \
                    AttributeName=preparerId,AttributeType=S \
                --key-schema AttributeName=preparerId,KeyType=HASH \
                --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --region=eu-west-1 --endpoint-url http://localhost:8006
                '''

                sh "sls dynamodb seed --seed=preparers"

                }
                
                stage ("seed-table") {
                        sh "./seed.js cvs-${LBRANCH}-preparers ../tests/resources/preparers.json"
                }
            }
        }
    }
}
