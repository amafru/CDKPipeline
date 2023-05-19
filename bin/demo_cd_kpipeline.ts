#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DemoCdKpipelineStack } from '../lib/demo_cd_kpipeline-stack';

const app = new cdk.App();
new DemoCdKpipelineStack(app, 'DemoCdKpipelineStack', {
  env: { account: '769065143225', region: 'eu-west-1'},
});