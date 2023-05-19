import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

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
  }
}
