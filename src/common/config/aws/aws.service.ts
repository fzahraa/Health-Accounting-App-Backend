import { Inject, Injectable, Logger } from '@nestjs/common';
import { AWSOptions } from './aws-options.type';
import { AWS_CONFIG_OPTIONS } from './aws-options.type';
import {
  GetObjectCommand,
  HeadObjectCommand,
  HeadObjectRequest,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import mime from 'mime-types';

@Injectable()
export default class AWSService {
  private batchWithdrawalBucket: string;
  private s3Client: S3Client;
  constructor(@Inject(AWS_CONFIG_OPTIONS) private options: AWSOptions) {
    this.s3Client = new S3Client({
      region: options.region,
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
    });
    this.batchWithdrawalBucket = options.batchWithdrawalBucket;
  }
  async getBatchWithdrawalFileUrl(fileName: string): Promise<string> {
    try {
      const headObjectInput: HeadObjectRequest = {
        Bucket: this.batchWithdrawalBucket,
        Key: fileName,
      };
      const headObjectCommand = new HeadObjectCommand(headObjectInput);
      await this.s3Client.send(headObjectCommand);

      const getObjectInput = {
        Bucket: this.batchWithdrawalBucket,
        Key: fileName,
        ResponseContentType: mime.lookup(fileName),
        Expires: 60, //seconds
      };
      const getObjectCommand = new GetObjectCommand(getObjectInput);

      const url = await getSignedUrl(this.s3Client, getObjectCommand);

      return url;
    } catch (error) {
      Logger.error(
        'Unable to get S3 file url ' + fileName + '. Error: ' + error,
      );
      return null;
    }
  }
}
