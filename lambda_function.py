import json
#1 Import boto3 and create client connection with bedrock
import boto3
client_bedrock=boto3.client('bedrock-runtime')
#print(boto3.__version__)

def lambda_handler(event, context):
#2 a. Store the input in a variable, b. print the event
    input_prompt=event['prompt']
   
#3. Create  Request

    client_bedrockrequest=client_bedrock.invoke_model(
       contentType='application/json',
       accept='application/json',
       modelId='cohere.command-light-text-v14',
       body=json.dumps( {
        "prompt": input_prompt,
        "temperature": 0.9,
        "p": 0.75,
        "k": 0,
        "max_tokens": 100}))
    

#4. Convert Streaming Body

    client_bedrock_byte=client_bedrockrequest['body'].read()
  
#5 a. Print the event and type , b. Store the input in a variable

    client_bedrock_string=json.loads(client_bedrock_byte)
  
  
#6. Update the 'return' by changing the 'body'
    client_final_response=client_bedrock_string['generations'][0]['text']
  

    return {
        'statusCode': 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
        'body': json.dumps(client_final_response)
    }
