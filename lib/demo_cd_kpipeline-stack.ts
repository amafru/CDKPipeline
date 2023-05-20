import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

//Import the added stages from the relevant file
import { PipelineAppStage } from './demopipelinestages-app';
//Add in a manual approval step for e.g. deploying to Prod if build completes successfully in test env
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

export class DemoCdKpipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const democicdpipeline = new CodePipeline(this, 'demoPipelineId', {
      synth: new ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to Github
        // Other sources are available
        input: CodePipelineSource.gitHub('amafru/CDKPipeline', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      })
    })

    const testingStage = democicdpipeline.addStage(new PipelineAppStage(this, 'test', {
      env: { account: '769065143225', region: 'eu-west-1' }
    }));

    testingStage.addPost(new ManualApprovalStep('approval'));

    const prodStage = democicdpipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '769065143225', region: 'eu-west-1' }
    }));
  }
}
