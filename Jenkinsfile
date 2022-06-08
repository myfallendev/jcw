pipeline {
	// agent any
	agent {
		label 'linux'
	}
	stages {
		stage ("Checkout") {
			steps {
				git branch: '${BRANCH}', credentialsId: 'git_jetcrypto', url: 'git@bitbucket.org:bytewerk_ru/jetcrypto_www.git'
			}
		}

		stage ("Build") {
			steps {
				sh '''
					#!/bin/bash -xe

					printenv
					if [ "${Production}" = "true" ]
					then 
						rpl -i '<JC_API>' "//jetcrypto.com" /home/jenkins/workspace/jetcrypto_webapp/src/index.js
					else
						rpl -i '<JC_API>' "//beta.jetcrypto.com" /home/jenkins/workspace/jetcrypto_webapp/src/index.js
					fi

					### Set window.buildNumber in webapp:
					rpl -i '<BUILD_NUMBER>' "${BUILD_NUMBER}" ${WORKSPACE}/src/index.js
					rpl -i '<GIT_COMMIT>' "${GIT_COMMIT}" ${WORKSPACE}/src/index.js
					rpl -i '<BUILD_NUMBER>' "${BUILD_NUMBER}" ${WORKSPACE}/src/style.sass

					rm -rf build
					npm install --quiet
					npm update
					npm run build

					source ./precompress_static.sh
				'''
			}
			post {
				success {
					echo "Build stage successful"
				}
				failure {
					slackSend message: "Build failed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", color: "danger"
					bitbucketStatusNotify(buildState: 'FAILED')
				}
			}
		}

		stage ('Deploy') {
			steps{
				sh '''
					#!/bin/bash -xe
					USER=jetcrypto
					WEBDIR="/var/www/html/jetcrypto/"
					if [ "${Production}" = "true" ]
					then 
						WEBSERVER="10.49.9.54"
					else
						WEBSERVER=$PRE_PRODUCTION_SERVER
					fi

					SRC="."

					cd build

					### Create app info marker file:
					echo '{"app_info": { "buildNumber": "'${BUILD_NUMBER}'", "gitCommit":"'${GIT_COMMIT}'", "branchName": "'${BRANCH}'", "productionFlag": "'${Production}'" } }' > app_info.json

					rsync -vr --delete --exclude=.git --filter 'protect /admin/' $SRC $USER@$WEBSERVER:$WEBDIR
					SRC="static"
					rsync -vr --delete --exclude=.git $SRC $USER@$WEBSERVER:$WEBDIR
					
				'''
			}
			post {
				success {
					echo "Deploy stage successful"
				}
				failure {
					slackSend message: "Deploy failed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", color: "danger"
				}
			}
		}
	}

	post {
		success {
			slackSend message: "Success ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", color: "good"
			bitbucketStatusNotify(buildState: 'SUCCESSFUL')
		}

		failure {
			slackSend message: "Failed ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", color: "danger"
			bitbucketStatusNotify(buildState: 'FAILED')
			error "Failed: ${err}"
		}
	}
}